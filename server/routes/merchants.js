import { Router } from "express";
import sql from "../db.js";
import { requireAuth, requireMerchant, requireAdmin } from "../middleware/auth.js";

const router = Router();

// ─── GET /api/merchants ─────────────────────────────────
// List all merchants (public)
router.get("/", async (req, res) => {
  try {
    const merchants = await sql`
      SELECT m.*, u.full_name as owner_name
      FROM merchants m
      LEFT JOIN users u ON m.user_id = u.id
      ORDER BY m.created_at DESC
    `;
    res.json({ merchants });
  } catch (err) {
    console.error("List merchants error:", err);
    res.status(500).json({ error: "Failed to fetch merchants" });
  }
});

// ─── GET /api/merchants/:id ─────────────────────────────
// Get single merchant profile (public)
router.get("/:id", async (req, res) => {
  try {
    const merchants = await sql`
      SELECT m.*, u.full_name as owner_name
      FROM merchants m
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ${req.params.id}
    `;

    if (merchants.length === 0) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    // Also fetch their products
    const products = await sql`
      SELECT p.*, 
        COALESCE(
          json_agg(
            json_build_object('make', pc.make, 'model', pc.model, 'years', pc.years)
          ) FILTER (WHERE pc.id IS NOT NULL),
          '[]'
        ) as compatibility
      FROM products p
      LEFT JOIN product_compatibility pc ON p.id = pc.product_id
      WHERE p.merchant_id = ${req.params.id}
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;

    res.json({ merchant: merchants[0], products });
  } catch (err) {
    console.error("Get merchant error:", err);
    res.status(500).json({ error: "Failed to fetch merchant" });
  }
});

// ─── PUT /api/merchants/:id ─────────────────────────────
// Update merchant profile (owner or admin)
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const merchantId = req.params.id;

    // Verify ownership or admin
    const merchants = await sql`SELECT * FROM merchants WHERE id = ${merchantId}`;
    if (merchants.length === 0) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    const merchant = merchants[0];
    if (merchant.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to edit this merchant" });
    }

    const {
      shop_name, phone, email, location, coordinates,
      description, specialty, avatar_url
    } = req.body;

    const [updated] = await sql`
      UPDATE merchants SET
        shop_name = COALESCE(${shop_name || null}, shop_name),
        phone = COALESCE(${phone || null}, phone),
        email = COALESCE(${email || null}, email),
        location = COALESCE(${location || null}, location),
        coordinates = COALESCE(${coordinates || null}, coordinates),
        description = COALESCE(${description || null}, description),
        specialty = COALESCE(${specialty || null}, specialty),
        avatar_url = COALESCE(${avatar_url || null}, avatar_url),
        updated_at = NOW()
      WHERE id = ${merchantId}
      RETURNING *
    `;

    res.json({ merchant: updated });
  } catch (err) {
    console.error("Update merchant error:", err);
    res.status(500).json({ error: "Failed to update merchant" });
  }
});

// ─── PATCH /api/merchants/:id/verify ────────────────────
// Toggle merchant verification (admin only)
router.patch("/:id/verify", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { verified, verification_notes } = req.body;

    const [updated] = await sql`
      UPDATE merchants SET
        verified = ${verified},
        verification_notes = COALESCE(${verification_notes || null}, verification_notes),
        updated_at = NOW()
      WHERE id = ${req.params.id}
      RETURNING *
    `;

    if (!updated) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    // Log admin action
    await sql`
      INSERT INTO audit_logs (admin_id, action, target, details)
      VALUES (${req.user.id}, 'MERCHANT_VERIFY_TOGGLE', ${updated.shop_name}, ${`Verified status set to ${verified}`})
    `;

    res.json({ merchant: updated });
  } catch (err) {
    console.error("Verify merchant error:", err);
    res.status(500).json({ error: "Failed to update verification" });
  }
});

// ─── PATCH /api/merchants/:id/status ────────────────────
// Change merchant status - Active/Suspended/Inactive (admin only)
router.patch("/:id/status", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const [updated] = await sql`
      UPDATE merchants SET status = ${status}, updated_at = NOW()
      WHERE id = ${req.params.id}
      RETURNING *
    `;

    if (!updated) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    await sql`
      INSERT INTO audit_logs (admin_id, action, target, details)
      VALUES (${req.user.id}, 'MERCHANT_STATUS_CHANGE', ${updated.shop_name}, ${`Status changed to ${status}`})
    `;

    res.json({ merchant: updated });
  } catch (err) {
    console.error("Merchant status error:", err);
    res.status(500).json({ error: "Failed to update merchant status" });
  }
});

export default router;
