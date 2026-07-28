import { Router } from "express";
import sql from "../db.js";
import { requireAuth, requireMerchant, requireAdmin, optionalAuth } from "../middleware/auth.js";

const router = Router();

// ─── GET /api/products ──────────────────────────────────
// List products with optional filters, search, and pagination
router.get("/", async (req, res) => {
  try {
    const {
      type, category, brand, condition, status,
      search, merchant_id, sort, page, limit,
      price_min, price_max
    } = req.query;

    const pageNum = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 50;
    const offset = (pageNum - 1) * pageSize;

    // Build dynamic WHERE clauses
    let conditions = [];
    let params = [];

    // For public listing, only show Live products
    if (status) {
      conditions.push(`p.status = '${status}'`);
    } else {
      conditions.push(`p.status = 'Live'`);
    }

    if (type && type !== "all") {
      conditions.push(`p.main_type = '${type}'`);
    }
    if (category) {
      conditions.push(`p.category = '${category}'`);
    }
    if (brand) {
      conditions.push(`p.brand = '${brand}'`);
    }
    if (condition) {
      conditions.push(`p.condition = '${condition}'`);
    }
    if (merchant_id) {
      conditions.push(`p.merchant_id = ${parseInt(merchant_id)}`);
    }
    if (price_min) {
      conditions.push(`p.price >= ${parseFloat(price_min)}`);
    }
    if (price_max) {
      conditions.push(`p.price <= ${parseFloat(price_max)}`);
    }

    const whereClause = conditions.length > 0 ? conditions.join(" AND ") : "1=1";

    // Sort
    let orderBy = "p.views DESC"; // default: popular
    if (sort === "newest") orderBy = "p.created_at DESC";
    else if (sort === "price_low") orderBy = "p.price ASC";
    else if (sort === "price_high") orderBy = "p.price DESC";
    else if (sort === "popular") orderBy = "p.views DESC";

    // Search filter
    let searchClause = "";
    if (search) {
      const searchLower = search.toLowerCase();
      searchClause = `AND (
        LOWER(p.name) LIKE '%${searchLower}%' OR 
        LOWER(p.brand) LIKE '%${searchLower}%' OR 
        LOWER(p.category) LIKE '%${searchLower}%' OR
        LOWER(p.description) LIKE '%${searchLower}%'
      )`;
    }

    const products = await sql(`
      SELECT p.*,
        m.shop_name as merchant_shop_name,
        m.phone as merchant_phone,
        m.location as merchant_location,
        m.coordinates as merchant_coordinates,
        m.verified as merchant_verified,
        m.since as merchant_since,
        COALESCE(
          (SELECT json_agg(json_build_object('make', pc.make, 'model', pc.model, 'years', pc.years))
           FROM product_compatibility pc WHERE pc.product_id = p.id),
          '[]'
        ) as compatibility
      FROM products p
      LEFT JOIN merchants m ON p.merchant_id = m.id
      WHERE ${whereClause} ${searchClause}
      ORDER BY ${orderBy}
      LIMIT ${pageSize} OFFSET ${offset}
    `);

    // Get total count for pagination
    const countResult = await sql(`
      SELECT COUNT(*) as total FROM products p
      WHERE ${whereClause} ${searchClause}
    `);

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: pageSize,
        total: parseInt(countResult[0].total),
        totalPages: Math.ceil(parseInt(countResult[0].total) / pageSize),
      },
    });
  } catch (err) {
    console.error("List products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ─── GET /api/products/:id ──────────────────────────────
// Get single product + increment views
router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Increment views
    await sql`UPDATE products SET views = views + 1 WHERE id = ${productId}`;

    const products = await sql`
      SELECT p.*,
        m.shop_name as merchant_shop_name,
        m.phone as merchant_phone,
        m.location as merchant_location,
        m.coordinates as merchant_coordinates,
        m.verified as merchant_verified,
        m.since as merchant_since,
        m.email as merchant_email,
        m.description as merchant_description
      FROM products p
      LEFT JOIN merchants m ON p.merchant_id = m.id
      WHERE p.id = ${productId}
    `;

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Get compatibility
    const compatibility = await sql`
      SELECT make, model, years FROM product_compatibility WHERE product_id = ${productId}
    `;

    res.json({
      product: { ...products[0], compatibility },
    });
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ─── POST /api/products ─────────────────────────────────
// Create a new product (merchant only)
router.post("/", requireAuth, requireMerchant, async (req, res) => {
  try {
    const {
      main_type, name, brand, category, condition,
      price, stock, description, images,
      compatibility, compatibility_text
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: "Product name and price are required" });
    }

    // Get merchant ID for this user
    const merchants = await sql`SELECT id FROM merchants WHERE user_id = ${req.user.id}`;
    if (merchants.length === 0) {
      return res.status(403).json({ error: "No merchant profile found. Complete onboarding first." });
    }

    const merchantId = merchants[0].id;
    const productStatus = "Live"; // Default to Live; if premoderation is on, admin can set "Pending Review"

    // Check admin premoderation setting
    const settings = await sql`SELECT value FROM admin_settings WHERE key = 'premoderation'`;
    const premod = settings.length > 0 ? settings[0].value.enabled : false;
    const finalStatus = premod ? "Pending Review" : "Live";

    const [product] = await sql`
      INSERT INTO products (merchant_id, main_type, name, brand, category, condition, price, stock, status, description, images, compatibility_text)
      VALUES (${merchantId}, ${main_type || "parts"}, ${name}, ${brand || null}, ${category || null}, ${condition || "New"}, ${price}, ${stock || "In Stock"}, ${finalStatus}, ${description || null}, ${images || []}, ${compatibility_text || null})
      RETURNING *
    `;

    // Insert compatibility records
    if (compatibility && Array.isArray(compatibility)) {
      for (const c of compatibility) {
        await sql`
          INSERT INTO product_compatibility (product_id, make, model, years)
          VALUES (${product.id}, ${c.make}, ${c.model}, ${c.years || null})
        `;
      }
    }

    res.status(201).json({ product });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

// ─── PUT /api/products/:id ──────────────────────────────
// Update a product (owner or admin)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    // Check ownership
    const products = await sql`
      SELECT p.*, m.user_id as merchant_user_id
      FROM products p
      LEFT JOIN merchants m ON p.merchant_id = m.id
      WHERE p.id = ${productId}
    `;

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (products[0].merchant_user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    const {
      name, brand, category, condition, price, stock,
      status, description, images, compatibility, compatibility_text
    } = req.body;

    const [updated] = await sql`
      UPDATE products SET
        name = COALESCE(${name || null}, name),
        brand = COALESCE(${brand || null}, brand),
        category = COALESCE(${category || null}, category),
        condition = COALESCE(${condition || null}, condition),
        price = COALESCE(${price || null}, price),
        stock = COALESCE(${stock || null}, stock),
        status = COALESCE(${status || null}, status),
        description = COALESCE(${description || null}, description),
        images = COALESCE(${images || null}, images),
        compatibility_text = COALESCE(${compatibility_text || null}, compatibility_text),
        updated_at = NOW()
      WHERE id = ${productId}
      RETURNING *
    `;

    // Update compatibility if provided
    if (compatibility && Array.isArray(compatibility)) {
      await sql`DELETE FROM product_compatibility WHERE product_id = ${productId}`;
      for (const c of compatibility) {
        await sql`
          INSERT INTO product_compatibility (product_id, make, model, years)
          VALUES (${productId}, ${c.make}, ${c.model}, ${c.years || null})
        `;
      }
    }

    res.json({ product: updated });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ─── DELETE /api/products/:id ───────────────────────────
// Delete a product (owner or admin)
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const products = await sql`
      SELECT p.*, m.user_id as merchant_user_id
      FROM products p
      LEFT JOIN merchants m ON p.merchant_id = m.id
      WHERE p.id = ${productId}
    `;

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (products[0].merchant_user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    await sql`DELETE FROM products WHERE id = ${productId}`;

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// ─── POST /api/products/:id/report ──────────────────────
// Report a listing
router.post("/:id/report", async (req, res) => {
  try {
    const { reason, details, reporter_phone } = req.body;

    const [report] = await sql`
      INSERT INTO reported_listings (product_id, reason, details, reporter_phone)
      VALUES (${req.params.id}, ${reason || null}, ${details || null}, ${reporter_phone || null})
      RETURNING *
    `;

    res.status(201).json({ report });
  } catch (err) {
    console.error("Report product error:", err);
    res.status(500).json({ error: "Failed to report product" });
  }
});

// ─── POST /api/products/:id/lead ────────────────────────
// Track a WhatsApp or Maps lead
router.post("/:id/lead", async (req, res) => {
  try {
    const { type } = req.body; // 'whatsapp' or 'maps'

    await sql`
      INSERT INTO lead_tracking (type, product_id)
      VALUES (${type}, ${req.params.id})
    `;

    res.json({ message: "Lead tracked" });
  } catch (err) {
    console.error("Track lead error:", err);
    res.status(500).json({ error: "Failed to track lead" });
  }
});

export default router;
