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

// Ghana Bounding Box for geospatial validation
const GHANA_BOUNDS = {
  minLat: 4.5,
  maxLat: 11.5,
  minLng: -3.5,
  maxLng: 1.5,
};

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
      description, specialty, avatar_url, latitude, longitude, location_data
    } = req.body;

    let parsedLat = latitude !== undefined ? parseFloat(latitude) : null;
    let parsedLng = longitude !== undefined ? parseFloat(longitude) : null;

    if (coordinates && (!parsedLat || !parsedLng)) {
      const parts = coordinates.split(",").map((s) => parseFloat(s.trim()));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        parsedLat = parts[0];
        parsedLng = parts[1];
      }
    }

    const [updated] = await sql`
      UPDATE merchants SET
        shop_name = COALESCE(${shop_name || null}, shop_name),
        phone = COALESCE(${phone || null}, phone),
        email = COALESCE(${email || null}, email),
        location = COALESCE(${location || null}, location),
        coordinates = COALESCE(${coordinates || null}, coordinates),
        latitude = COALESCE(${parsedLat}, latitude),
        longitude = COALESCE(${parsedLng}, longitude),
        location_data = COALESCE(${location_data ? JSON.stringify(location_data) : null}::jsonb, location_data),
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

// ─── PUT /api/merchants/:id/location ────────────────────
// Update merchant shop location with geospatial validation & provenance
router.put("/:id/location", requireAuth, async (req, res) => {
  try {
    const merchantId = req.params.id;

    // Verify ownership or admin
    const merchants = await sql`SELECT * FROM merchants WHERE id = ${merchantId}`;
    if (merchants.length === 0) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    const merchant = merchants[0];
    if (merchant.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to update this merchant location" });
    }

    const {
      latitude,
      longitude,
      accuracy_meters,
      source,
      formatted_address,
      custom_location_text,
      landmarks,
      stall_number
    } = req.body;

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ error: "Valid latitude and longitude are required." });
    }

    // Validate coordinates fall within Ghana's bounding box
    if (lat < GHANA_BOUNDS.minLat || lat > GHANA_BOUNDS.maxLat || lng < GHANA_BOUNDS.minLng || lng > GHANA_BOUNDS.maxLng) {
      return res.status(400).json({
        error: `Selected coordinates (${lat.toFixed(4)}, ${lng.toFixed(4)}) fall outside Ghana's geographic boundaries (${GHANA_BOUNDS.minLat}°N to ${GHANA_BOUNDS.maxLat}°N, ${GHANA_BOUNDS.minLng}°W to ${GHANA_BOUNDS.maxLng}°E). Please pinpoint a valid location in Ghana.`,
      });
    }

    const locationMetadata = {
      latitude: lat,
      longitude: lng,
      accuracy_meters: typeof accuracy_meters === "number" ? Math.round(accuracy_meters) : 15,
      source: ["manual_pin", "gps", "search", "preset"].includes(source) ? source : "manual_pin",
      formatted_address: formatted_address || "Abossey Okai, Accra, Ghana",
      custom_location_text: custom_location_text || null,
      landmarks: landmarks || null,
      stall_number: stall_number || null,
      captured_at: new Date().toISOString(),
    };

    const coordsString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    const finalLocationString = custom_location_text || formatted_address || `Abossey Okai (${coordsString})`;

    const [updated] = await sql`
      UPDATE merchants SET
        latitude = ${lat},
        longitude = ${lng},
        coordinates = ${coordsString},
        location = ${finalLocationString},
        location_data = ${JSON.stringify(locationMetadata)}::jsonb,
        updated_at = NOW()
      WHERE id = ${merchantId}
      RETURNING *
    `;

    res.json({
      message: "Shop location updated successfully",
      merchant: updated,
      location_data: locationMetadata,
    });
  } catch (err) {
    console.error("Update merchant location error:", err);
    res.status(500).json({ error: "Failed to update merchant location" });
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

// ─── DELETE /api/merchants/:id ──────────────────────────
// Delete a merchant entirely (admin only)
router.delete("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const merchants = await sql`SELECT * FROM merchants WHERE id = ${req.params.id}`;
    if (merchants.length === 0) {
      return res.status(404).json({ error: "Merchant not found" });
    }

    const merchant = merchants[0];

    // Delete user account too (cascades merchants + products via FK)
    if (merchant.user_id) {
      await sql`DELETE FROM users WHERE id = ${merchant.user_id}`;
    } else {
      // Fallback: delete merchant directly (products cascade via FK)
      await sql`DELETE FROM merchants WHERE id = ${req.params.id}`;
    }

    // Log admin action
    await sql`
      INSERT INTO audit_logs (admin_id, action, target, details)
      VALUES (${req.user.id}, 'MERCHANT_DELETE', ${merchant.shop_name}, ${'Merchant and all listings deleted permanently'})
    `;

    res.json({ message: "Merchant deleted", merchant });
  } catch (err) {
    console.error("Delete merchant error:", err);
    res.status(500).json({ error: "Failed to delete merchant" });
  }
});

export default router;
