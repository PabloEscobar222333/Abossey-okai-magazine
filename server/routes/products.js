import { Router } from "express";
import sql from "../db.js";
import { requireAuth, requireMerchant, optionalAuth } from "../middleware/auth.js";
import { PRODUCT_COLUMNS_SQL, PRODUCT_IMAGES_SQL, sendDataUrl } from "../utils.js";

const router = Router();

const MAIN_TYPES = ["parts", "accessories"];
const CONDITIONS = ["New", "Used", "Refurbished"];
const STATUSES = ["Live", "Hidden", "Pending Review"];
const MAX_IMAGES = 5;

// Simple in-memory bucket cache for facet aggregations (60s TTL)
const facetCache = new Map();
const FACET_CACHE_TTL = 60 * 1000;

// Escape LIKE wildcards so a search for "50%" matches literally
function likePattern(text) {
  return `%${String(text).toLowerCase().replace(/[\\%_]/g, "\\$&")}%`;
}

// WHERE fragment limiting which products the requester may see:
// admins see everything; merchants see all of their own listings plus other shops' public ones;
// everyone else sees only Live listings from active shops.
function visibilityClause(user, add) {
  if (user?.role === "admin") return null;
  const publicRule = `(p.status = 'Live' AND COALESCE(m.status, 'Active') = 'Active')`;
  if (user?.role === "merchant") {
    return `(${publicRule} OR m.user_id = ${add(user.id)})`;
  }
  return publicRule;
}

// ─── GET /api/products ──────────────────────────────────
// List products with optional filters, search, pagination, and price range facet support
router.get("/", optionalAuth, async (req, res) => {
  try {
    const {
      type, category, brand, condition, status,
      search, merchant_id, sort, page, limit,
      price_min, price_max, minPrice, maxPrice, min, max
    } = req.query;

    const pageNum = Math.max(parseInt(page) || 1, 1);
    const pageSize = Math.min(Math.max(parseInt(limit) || 50, 1), 200);
    const offset = (pageNum - 1) * pageSize;

    // Sanitize and normalize price range inputs
    const rawMin = minPrice ?? price_min ?? min;
    const rawMax = maxPrice ?? price_max ?? max;

    let parsedMin = rawMin !== undefined && rawMin !== null && rawMin !== "" ? parseFloat(rawMin) : null;
    let parsedMax = rawMax !== undefined && rawMax !== null && rawMax !== "" ? parseFloat(rawMax) : null;

    if (parsedMin !== null && (isNaN(parsedMin) || parsedMin < 0)) parsedMin = null;
    if (parsedMax !== null && (isNaN(parsedMax) || parsedMax < 0)) parsedMax = null;

    // Edge case: handle min > max by gracefully swapping them
    if (parsedMin !== null && parsedMax !== null && parsedMin > parsedMax) {
      const temp = parsedMin;
      parsedMin = parsedMax;
      parsedMax = temp;
    }

    // Build parameterized WHERE clauses — user input never goes into the SQL text
    const params = [];
    const add = (value) => {
      params.push(value);
      return `$${params.length}`;
    };

    // Filters shared by the listing and the facet aggregation
    const baseConditions = [];
    const visibility = visibilityClause(req.user, add);
    if (visibility) baseConditions.push(visibility);

    // Default listing shows only Live products; status=all returns everything the requester may see
    if (status && status !== "all") {
      baseConditions.push(`p.status = ${add(status)}`);
    } else if (!status) {
      baseConditions.push(`p.status = 'Live'`);
    }
    if (type && type !== "all") baseConditions.push(`p.main_type = ${add(type)}`);
    if (category) baseConditions.push(`p.category = ${add(category)}`);
    if (brand) baseConditions.push(`p.brand = ${add(brand)}`);

    const conditions = [...baseConditions];
    if (condition) conditions.push(`p.condition = ${add(condition)}`);
    if (merchant_id && !isNaN(parseInt(merchant_id))) {
      conditions.push(`p.merchant_id = ${add(parseInt(merchant_id))}`);
    }

    // Price range (BETWEEN or unbounded conditions)
    if (parsedMin !== null && parsedMax !== null) {
      conditions.push(`p.price BETWEEN ${add(parsedMin)} AND ${add(parsedMax)}`);
    } else if (parsedMin !== null) {
      conditions.push(`p.price >= ${add(parsedMin)}`);
    } else if (parsedMax !== null) {
      conditions.push(`p.price <= ${add(parsedMax)}`);
    }

    if (search) {
      const pattern = add(likePattern(search));
      conditions.push(`(
        LOWER(p.name) LIKE ${pattern} OR
        LOWER(p.brand) LIKE ${pattern} OR
        LOWER(p.category) LIKE ${pattern} OR
        LOWER(p.description) LIKE ${pattern}
      )`);
    }

    const whereClause = conditions.length > 0 ? conditions.join(" AND ") : "1=1";

    // Sort (whitelisted)
    let orderBy = "p.views DESC"; // default: popular
    if (sort === "newest") orderBy = "p.created_at DESC";
    else if (sort === "price_low" || sort === "price-low") orderBy = "p.price ASC";
    else if (sort === "price_high" || sort === "price-high") orderBy = "p.price DESC";

    const products = await sql(`
      SELECT ${PRODUCT_COLUMNS_SQL}, ${PRODUCT_IMAGES_SQL},
        m.shop_name as merchant_shop_name,
        m.phone as merchant_phone,
        m.location as merchant_location,
        m.coordinates as merchant_coordinates,
        m.verified as merchant_verified,
        m.since as merchant_since,
        m.status as merchant_status,
        COALESCE(
          (SELECT json_agg(json_build_object('make', pc.make, 'model', pc.model, 'years', pc.years))
           FROM product_compatibility pc WHERE pc.product_id = p.id),
          '[]'
        ) as compatibility
      FROM products p
      LEFT JOIN merchants m ON p.merchant_id = m.id
      WHERE ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ${pageSize} OFFSET ${offset}
    `, params);

    // Get total count for pagination
    const countResult = await sql(`
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN merchants m ON p.merchant_id = m.id
      WHERE ${whereClause}
    `, params);

    // Faceted counts & bucket aggregations with cache (keyed by who is asking, since visibility differs)
    const scope = req.user?.role === "admin" ? "admin" : req.user?.role === "merchant" ? `merchant:${req.user.id}` : "public";
    const cacheKey = `facets:${scope}:${status || "Live"}:${type || "all"}:${category || "all"}:${brand || "all"}`;
    let facetData = facetCache.get(cacheKey);
    const now = Date.now();

    if (!facetData || (now - facetData.timestamp > FACET_CACHE_TTL)) {
      try {
        // baseConditions only reference the first params, so a prefix of the array is enough
        const baseWhere = baseConditions.length > 0 ? baseConditions.join(" AND ") : "1=1";
        const baseParamCount = Math.max(0, ...[...baseWhere.matchAll(/\$(\d+)/g)].map((mt) => parseInt(mt[1])));

        const aggResult = await sql(`
          SELECT
            MIN(p.price) as min_catalog_price,
            MAX(p.price) as max_catalog_price,
            COUNT(CASE WHEN p.price < 500 THEN 1 END) as count_under_500,
            COUNT(CASE WHEN p.price >= 500 AND p.price < 1500 THEN 1 END) as count_500_1500,
            COUNT(CASE WHEN p.price >= 1500 AND p.price < 5000 THEN 1 END) as count_1500_5000,
            COUNT(CASE WHEN p.price >= 5000 THEN 1 END) as count_5000_plus
          FROM products p
          LEFT JOIN merchants m ON p.merchant_id = m.id
          WHERE ${baseWhere}
        `, params.slice(0, baseParamCount));

        if (aggResult && aggResult[0]) {
          facetData = {
            timestamp: now,
            data: {
              minCatalogPrice: parseFloat(aggResult[0].min_catalog_price) || 0,
              maxCatalogPrice: parseFloat(aggResult[0].max_catalog_price) || 10000,
              buckets: {
                under500: parseInt(aggResult[0].count_under_500) || 0,
                b500_1500: parseInt(aggResult[0].count_500_1500) || 0,
                b1500_5000: parseInt(aggResult[0].count_1500_5000) || 0,
                b5000_plus: parseInt(aggResult[0].count_5000_plus) || 0
              }
            }
          };
          facetCache.set(cacheKey, facetData);
        }
      } catch (aggErr) {
        console.warn("Facet aggregation warning:", aggErr.message);
      }
    }

    res.json({
      products,
      pagination: {
        page: pageNum,
        limit: pageSize,
        total: parseInt(countResult[0].total),
        totalPages: Math.ceil(parseInt(countResult[0].total) / pageSize),
      },
      facets: facetData ? facetData.data : null,
      appliedFilters: {
        minPrice: parsedMin,
        maxPrice: parsedMax
      }
    });
  } catch (err) {
    console.error("List products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ─── GET /api/products/:id/images/:idx ──────────────────
// Serve one stored product image as a binary file (cached by browsers and the CDN)
router.get("/:id/images/:idx", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const idx = parseInt(req.params.idx);
    if (isNaN(productId) || isNaN(idx) || idx < 0) {
      return res.status(404).end();
    }

    const rows = await sql`SELECT images[${idx + 1}::int] AS img FROM products WHERE id = ${productId}`;
    const img = rows[0]?.img;
    if (!img) return res.status(404).end();

    if (!sendDataUrl(res, img)) {
      // Not base64 data (e.g. an external or static URL) — point the browser at it
      res.redirect(img);
    }
  } catch (err) {
    console.error("Get product image error:", err);
    res.status(500).end();
  }
});

// ─── GET /api/products/:id ──────────────────────────────
// Get single product + increment views
router.get("/:id", optionalAuth, async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      return res.status(404).json({ error: "Product not found" });
    }

    const params = [productId];
    const add = (value) => {
      params.push(value);
      return `$${params.length}`;
    };
    const visibility = visibilityClause(req.user, add);

    const products = await sql(`
      SELECT ${PRODUCT_COLUMNS_SQL}, ${PRODUCT_IMAGES_SQL},
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
      WHERE p.id = $1 ${visibility ? `AND ${visibility}` : ""}
    `, params);

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Increment views
    await sql`UPDATE products SET views = views + 1 WHERE id = ${productId}`;

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

// Keep only valid image strings. When editing, the form sends back the URLs we served
// (/api/products/:id/images/:idx) — map those to the stored data so images aren't lost.
function resolveImages(images, productId = null, existingImages = []) {
  if (!Array.isArray(images)) return null;
  const ownUrl = /\/api\/products\/(\d+)\/images\/(\d+)/;
  const resolved = [];
  for (const img of images) {
    if (typeof img !== "string" || !img) continue;
    const match = ownUrl.exec(img);
    if (match) {
      if (productId !== null && parseInt(match[1]) === productId && existingImages[parseInt(match[2])]) {
        resolved.push(existingImages[parseInt(match[2])]);
      }
      continue;
    }
    if (img.startsWith("data:image/") || /^https?:\/\//.test(img) || img.startsWith("/")) {
      resolved.push(img);
    }
  }
  return resolved.slice(0, MAX_IMAGES);
}

// ─── POST /api/products ─────────────────────────────────
// Create a new product (merchant only)
router.post("/", requireAuth, requireMerchant, async (req, res) => {
  try {
    const {
      main_type, name, brand, category, condition,
      price, stock, description, images,
      compatibility, compatibility_text
    } = req.body;

    const parsedPrice = parseFloat(price);
    if (!name || isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ error: "Product name and a valid price are required" });
    }
    if (main_type && !MAIN_TYPES.includes(main_type)) {
      return res.status(400).json({ error: "Invalid listing type" });
    }
    if (condition && !CONDITIONS.includes(condition)) {
      return res.status(400).json({ error: "Invalid condition" });
    }

    // Get merchant profile for this user
    const merchants = await sql`SELECT id, status FROM merchants WHERE user_id = ${req.user.id}`;
    if (merchants.length === 0) {
      return res.status(403).json({ error: "No merchant profile found. Complete onboarding first." });
    }
    if (merchants[0].status && merchants[0].status !== "Active") {
      return res.status(403).json({ error: "Your shop is suspended. Contact the administrator to restore listing access." });
    }

    const merchantId = merchants[0].id;

    // Admin premoderation setting holds new listings for review
    const settings = await sql`SELECT value FROM admin_settings WHERE key = 'premoderation'`;
    const premod = settings.length > 0 ? !!settings[0].value?.enabled : false;
    const finalStatus = premod ? "Pending Review" : "Live";

    const [product] = await sql`
      INSERT INTO products (merchant_id, main_type, name, brand, category, condition, price, stock, status, description, images, compatibility_text)
      VALUES (${merchantId}, ${main_type || "parts"}, ${name}, ${brand || null}, ${category || null}, ${condition || "New"}, ${parsedPrice}, ${stock || "In Stock"}, ${finalStatus}, ${description || null}, ${resolveImages(images) || []}, ${compatibility_text || null})
      RETURNING id, name, status, main_type
    `;

    // Insert compatibility records
    if (compatibility && Array.isArray(compatibility)) {
      for (const c of compatibility) {
        if (!c?.make || !c?.model) continue;
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
    if (isNaN(productId)) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check ownership
    const products = await sql`
      SELECT p.status, p.images, m.user_id as merchant_user_id, m.status as merchant_status
      FROM products p
      LEFT JOIN merchants m ON p.merchant_id = m.id
      WHERE p.id = ${productId}
    `;

    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const existing = products[0];
    const isAdmin = req.user.role === "admin";

    if (existing.merchant_user_id !== req.user.id && !isAdmin) {
      return res.status(403).json({ error: "Not authorized" });
    }
    if (!isAdmin && existing.merchant_status && existing.merchant_status !== "Active") {
      return res.status(403).json({ error: "Your shop is suspended. Contact the administrator to restore listing access." });
    }

    const {
      main_type, name, brand, category, condition, price, stock,
      status, description, images, compatibility, compatibility_text
    } = req.body;

    if (main_type && !MAIN_TYPES.includes(main_type)) {
      return res.status(400).json({ error: "Invalid listing type" });
    }
    if (condition && !CONDITIONS.includes(condition)) {
      return res.status(400).json({ error: "Invalid condition" });
    }
    if (status) {
      if (!STATUSES.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      // Merchants can hide/unhide, but only an admin can approve a listing held for review
      if (!isAdmin && (status === "Pending Review" || (status === "Live" && existing.status === "Pending Review"))) {
        return res.status(403).json({ error: "This listing is awaiting admin review" });
      }
    }

    const resolvedImages = resolveImages(images, productId, existing.images || []);
    const compatProvided = Array.isArray(compatibility);

    const [updated] = await sql`
      UPDATE products SET
        main_type = COALESCE(${main_type || null}, main_type),
        name = COALESCE(${name || null}, name),
        brand = COALESCE(${brand || null}, brand),
        category = COALESCE(${category || null}, category),
        condition = COALESCE(${condition || null}, condition),
        price = COALESCE(${price || null}, price),
        stock = COALESCE(${stock || null}, stock),
        status = COALESCE(${status || null}, status),
        description = COALESCE(${description || null}, description),
        images = COALESCE(${resolvedImages}, images),
        compatibility_text = CASE WHEN ${compatProvided}
          THEN ${compatibility_text || null}
          ELSE COALESCE(${compatibility_text || null}, compatibility_text) END,
        updated_at = NOW()
      WHERE id = ${productId}
      RETURNING id, name, status, stock
    `;

    // Replace compatibility when provided (an empty array clears it, e.g. switching to Universal Fit)
    if (compatProvided) {
      await sql`DELETE FROM product_compatibility WHERE product_id = ${productId}`;
      for (const c of compatibility) {
        if (!c?.make || !c?.model) continue;
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
    if (isNaN(productId)) {
      return res.status(404).json({ error: "Product not found" });
    }

    const products = await sql`
      SELECT m.user_id as merchant_user_id
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
// Report a listing (public — buyers don't need an account)
router.post("/:id/report", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { reason, details, reporter_phone } = req.body;

    const products = isNaN(productId) ? [] : await sql`SELECT id FROM products WHERE id = ${productId}`;
    if (products.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [report] = await sql`
      INSERT INTO reported_listings (product_id, reason, details, reporter_phone)
      VALUES (${productId}, ${String(reason || "Reported by customer").slice(0, 255)}, ${details ? String(details).slice(0, 2000) : null}, ${reporter_phone ? String(reporter_phone).slice(0, 20) : null})
      RETURNING id
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
    const productId = parseInt(req.params.id);
    if (!["whatsapp", "maps"].includes(type) || isNaN(productId)) {
      return res.status(400).json({ error: "Invalid lead" });
    }

    await sql`
      INSERT INTO lead_tracking (type, product_id)
      VALUES (${type}, ${productId})
    `;

    res.json({ message: "Lead tracked" });
  } catch (err) {
    console.error("Track lead error:", err);
    res.status(500).json({ error: "Failed to track lead" });
  }
});

export default router;
