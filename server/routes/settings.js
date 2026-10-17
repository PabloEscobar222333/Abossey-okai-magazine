import { Router } from "express";
import sql from "../db.js";

const router = Router();

// Settings every visitor needs (announcement banner, catalog taxonomy).
// Admin-only settings such as premoderation are served by GET /api/admin/settings.
const PUBLIC_KEYS = ["announcement", "vehicle_taxonomy", "part_categories", "accessory_categories", "form_brands"];

// ─── GET /api/settings ──────────────────────────────────
router.get("/", async (req, res) => {
  try {
    const rows = await sql`SELECT key, value FROM admin_settings WHERE key = ANY(${PUBLIC_KEYS})`;
    const settings = {};
    rows.forEach((r) => {
      settings[r.key] = r.value;
    });
    res.set("Cache-Control", "public, max-age=30");
    res.json({ settings });
  } catch (err) {
    console.error("Get public settings error:", err);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

export default router;
