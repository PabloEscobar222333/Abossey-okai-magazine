import { Router } from "express";
import sql from "../db.js";

const router = Router();

// ─── GET /api/brands ────────────────────────────────────
// Public brands endpoint: get all brands or filter by type/category
router.get("/", async (req, res) => {
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
      brands = await sql`SELECT * FROM brands ORDER BY id ASC`;
    }
    res.json({ brands });
  } catch (err) {
    console.error("Get brands error:", err);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
});

export default router;
