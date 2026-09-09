import { Router } from "express";
import sql from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

// All admin routes require auth + admin role
router.use(requireAuth, requireAdmin);

// ─── GET /api/admin/settings ────────────────────────────
router.get("/settings", async (req, res) => {
  try {
    const settings = await sql`SELECT key, value FROM admin_settings`;
    const result = {};
    settings.forEach((s) => {
      result[s.key] = s.value;
    });
    res.json({ settings: result });
  } catch (err) {
    console.error("Get settings error:", err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

// ─── PUT /api/admin/settings ────────────────────────────
router.put("/settings", async (req, res) => {
  try {
    const { key, value } = req.body;

    await sql`
      INSERT INTO admin_settings (key, value, updated_at)
      VALUES (${key}, ${JSON.stringify(value)}::jsonb, NOW())
      ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}::jsonb, updated_at = NOW()
    `;

    await sql`
      INSERT INTO audit_logs (admin_id, action, target, details)
      VALUES (${req.user.id}, 'SETTINGS_CHANGE', ${key}, ${JSON.stringify(value)})
    `;

    res.json({ message: "Setting updated" });
  } catch (err) {
    console.error("Update settings error:", err);
    res.status(500).json({ error: "Failed to update settings" });
  }
});

// ─── GET /api/admin/analytics ───────────────────────────
router.get("/analytics", async (req, res) => {
  try {
    const [merchantCount] = await sql`SELECT COUNT(*) as count FROM merchants`;
    const [productCount] = await sql`SELECT COUNT(*) as count FROM products`;
    const [liveCount] = await sql`SELECT COUNT(*) as count FROM products WHERE status = 'Live'`;
    const [pendingCount] = await sql`SELECT COUNT(*) as count FROM products WHERE status = 'Pending Review'`;
    const [hiddenCount] = await sql`SELECT COUNT(*) as count FROM products WHERE status = 'Hidden'`;
    const [verifiedCount] = await sql`SELECT COUNT(*) as count FROM merchants WHERE verified = true`;
    const [reportCount] = await sql`SELECT COUNT(*) as count FROM reported_listings WHERE status = 'open'`;
    const [userCount] = await sql`SELECT COUNT(*) as count FROM users`;

    // Lead stats
    const [waLeads] = await sql`SELECT COUNT(*) as count FROM lead_tracking WHERE type = 'whatsapp'`;
    const [mapLeads] = await sql`SELECT COUNT(*) as count FROM lead_tracking WHERE type = 'maps'`;

    // Total views
    const [totalViews] = await sql`SELECT COALESCE(SUM(views), 0) as total FROM products`;

    res.json({
      analytics: {
        totalMerchants: parseInt(merchantCount.count),
        totalProducts: parseInt(productCount.count),
        liveProducts: parseInt(liveCount.count),
        pendingProducts: parseInt(pendingCount.count),
        hiddenProducts: parseInt(hiddenCount.count),
        verifiedMerchants: parseInt(verifiedCount.count),
        openReports: parseInt(reportCount.count),
        totalUsers: parseInt(userCount.count),
        whatsappLeads: parseInt(waLeads.count),
        mapsLeads: parseInt(mapLeads.count),
        totalViews: parseInt(totalViews.total),
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

// ─── GET /api/admin/audit-logs ──────────────────────────
router.get("/audit-logs", async (req, res) => {
  try {
    const logs = await sql`
      SELECT al.*, u.full_name as admin_name
      FROM audit_logs al
      LEFT JOIN users u ON al.admin_id = u.id
      ORDER BY al.created_at DESC
      LIMIT 200
    `;
    res.json({ logs });
  } catch (err) {
    console.error("Get audit logs error:", err);
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
});

// ─── DELETE /api/admin/audit-logs ───────────────────────
router.delete("/audit-logs", async (req, res) => {
  try {
    await sql`DELETE FROM audit_logs`;
    res.json({ message: "Audit logs cleared" });
  } catch (err) {
    console.error("Clear audit logs error:", err);
    res.status(500).json({ error: "Failed to clear audit logs" });
  }
});

// ─── GET /api/admin/reports ─────────────────────────────
router.get("/reports", async (req, res) => {
  try {
    const reports = await sql`
      SELECT rl.*, p.name as product_name, p.brand as product_brand,
        m.shop_name as merchant_shop_name
      FROM reported_listings rl
      LEFT JOIN products p ON rl.product_id = p.id
      LEFT JOIN merchants m ON p.merchant_id = m.id
      ORDER BY rl.created_at DESC
    `;
    res.json({ reports });
  } catch (err) {
    console.error("Get reports error:", err);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// ─── PATCH /api/admin/reports/:id ───────────────────────
router.patch("/reports/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const [updated] = await sql`
      UPDATE reported_listings SET status = ${status}
      WHERE id = ${req.params.id}
      RETURNING *
    `;

    if (!updated) {
      return res.status(404).json({ error: "Report not found" });
    }

    await sql`
      INSERT INTO audit_logs (admin_id, action, target, details)
      VALUES (${req.user.id}, 'REPORT_STATUS_CHANGE', ${`Report #${req.params.id}`}, ${`Status changed to ${status}`})
    `;

    res.json({ report: updated });
  } catch (err) {
    console.error("Update report error:", err);
    res.status(500).json({ error: "Failed to update report" });
  }
});

// ─── PUT /api/admin/products/:id/status ─────────────────
// Admin can change any product status (Live, Hidden, Pending Review)
router.put("/products/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const [product] = await sql`
      UPDATE products SET status = ${status}, updated_at = NOW()
      WHERE id = ${req.params.id}
      RETURNING *
    `;

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await sql`
      INSERT INTO audit_logs (admin_id, action, target, details)
      VALUES (${req.user.id}, 'PRODUCT_STATUS_CHANGE', ${product.name}, ${`Status changed to ${status}`})
    `;

    res.json({ product });
  } catch (err) {
    console.error("Admin product status error:", err);
    res.status(500).json({ error: "Failed to update product status" });
  }
});

// ─── GET /api/admin/categories ──────────────────────────
router.get("/categories", async (req, res) => {
  try {
    const categories = await sql`SELECT * FROM categories ORDER BY type, name`;
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// ─── GET /api/admin/brands ──────────────────────────────
router.get("/brands", async (req, res) => {
  try {
    const { type, category } = req.query;
    let brands;
    if (type && category) {
      brands = await sql`SELECT * FROM brands WHERE type = ${type} AND category = ${category} ORDER BY name`;
    } else if (type) {
      brands = await sql`SELECT * FROM brands WHERE type = ${type} ORDER BY name`;
    } else if (category) {
      brands = await sql`SELECT * FROM brands WHERE category = ${category} ORDER BY name`;
    } else {
      brands = await sql`SELECT * FROM brands ORDER BY name`;
    }
    res.json({ brands });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

// ─── POST /api/admin/brands ─────────────────────────────
router.post("/brands", async (req, res) => {
  try {
    const { name, slug, logo, type, category } = req.body;
    const brandSlug = slug || name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const brandType = type || "vehicle";
    const brandCategory = category || "other";

    const [brand] = await sql`
      INSERT INTO brands (slug, name, logo, type, category)
      VALUES (${brandSlug}, ${name}, ${logo || null}, ${brandType}, ${brandCategory})
      ON CONFLICT (name) DO UPDATE SET
        slug = EXCLUDED.slug,
        logo = COALESCE(EXCLUDED.logo, brands.logo),
        type = EXCLUDED.type,
        category = EXCLUDED.category
      RETURNING *
    `;
    res.status(201).json({ brand });
  } catch (err) {
    console.error("Add brand error:", err);
    res.status(500).json({ error: "Failed to add brand" });
  }
});

// ─── DELETE /api/admin/brands/:id ───────────────────────
router.delete("/brands/:id", async (req, res) => {
  try {
    await sql`DELETE FROM brands WHERE id = ${req.params.id}`;
    res.json({ message: "Brand deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete brand" });
  }
});

// ─── POST /api/admin/audit-logs ─────────────────────────
// Insert a manual audit log entry from the admin frontend
router.post("/audit-logs", async (req, res) => {
  try {
    const { action, target, details } = req.body;

    const [log] = await sql`
      INSERT INTO audit_logs (admin_id, action, target, details)
      VALUES (${req.user.id}, ${action}, ${target || null}, ${details || null})
      RETURNING *
    `;

    res.status(201).json({ log });
  } catch (err) {
    console.error("Insert audit log error:", err);
    res.status(500).json({ error: "Failed to insert audit log" });
  }
});

export default router;
