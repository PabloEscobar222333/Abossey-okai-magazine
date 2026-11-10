import { Router } from "express";
import sql from "../db.js";
import { normalizePhone } from "../utils.js";

const router = Router();

// ─── Schema safety net ──────────────────────────────────
// Production deploys don't run migrate.js, so the tables these public forms write to
// are created on first use. Everything here is idempotent and only runs once per process.
let schemaReady = null;
export function ensurePublicSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS merchant_applications (
        id          SERIAL PRIMARY KEY,
        shop_name   VARCHAR(255) NOT NULL,
        owner_name  VARCHAR(255),
        phone       VARCHAR(20),
        email       VARCHAR(255),
        location    TEXT,
        specialty   VARCHAR(50),
        message     TEXT,
        status      VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'onboarded', 'declined')),
        created_at  TIMESTAMPTZ DEFAULT NOW(),
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      )`;
      await sql`ALTER TABLE reported_listings ADD COLUMN IF NOT EXISTS listing_ref TEXT`;
      await sql`ALTER TABLE reported_listings ADD COLUMN IF NOT EXISTS shop_name VARCHAR(255)`;
      await sql`ALTER TABLE reported_listings ADD COLUMN IF NOT EXISTS reporter_name VARCHAR(255)`;
    })().catch((err) => {
      schemaReady = null; // try again on the next request
      throw err;
    });
  }
  return schemaReady;
}

const text = (v, max) => (v == null ? null : String(v).trim().slice(0, max) || null);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── POST /api/public/scam-reports ──────────────────────
// "Report Scam Listings" page: anyone can report a listing, a shop or a scam attempt,
// with or without a product id. Lands in the admin Buyer Reports queue.
router.post("/scam-reports", async (req, res) => {
  try {
    await ensurePublicSchema();

    const reason = text(req.body.reason, 255);
    const details = text(req.body.details, 2000);
    const listingRef = text(req.body.listing_ref, 500);
    const shopName = text(req.body.shop_name, 255);
    const reporterName = text(req.body.reporter_name, 255);
    const reporterPhone = text(req.body.reporter_phone, 20);

    if (!reason) return res.status(400).json({ error: "Choose what went wrong." });
    if (!details || details.length < 10) return res.status(400).json({ error: "Describe what happened in a few words (at least 10 characters)." });
    if (!listingRef && !shopName) return res.status(400).json({ error: "Tell us which listing or shop you are reporting." });

    // Attach the product when a valid listing id or link was given
    let productId = parseInt(req.body.product_id, 10);
    if (isNaN(productId) && listingRef) {
      const m = listingRef.match(/[?&]product=(\d+)/) || listingRef.match(/^#?(\d+)$/);
      if (m) productId = parseInt(m[1], 10);
    }
    if (!isNaN(productId)) {
      const found = await sql`SELECT id FROM products WHERE id = ${productId}`;
      if (found.length === 0) productId = NaN;
    }

    const [report] = await sql`
      INSERT INTO reported_listings (product_id, reason, details, reporter_phone, reporter_name, listing_ref, shop_name)
      VALUES (${isNaN(productId) ? null : productId}, ${reason}, ${details}, ${reporterPhone}, ${reporterName}, ${listingRef}, ${shopName})
      RETURNING id, created_at
    `;

    res.status(201).json({ report, message: "Report received. Our moderators will review it." });
  } catch (err) {
    console.error("Scam report error:", err);
    res.status(500).json({ error: "Could not send your report. Please try again." });
  }
});

// ─── POST /api/public/stall-applications ────────────────
// "Register Seller Stall" page: a dealer asks to be onboarded. Admins vet and register
// them from the Onboard & Manage tab (merchants never self-register, see the PRD).
router.post("/stall-applications", async (req, res) => {
  try {
    await ensurePublicSchema();

    const shopName = text(req.body.shop_name, 255);
    const ownerName = text(req.body.owner_name, 255);
    const email = text(req.body.email, 255)?.toLowerCase() || null;
    const phone = normalizePhone(req.body.phone);
    const location = text(req.body.location, 1000);
    const specialty = text(req.body.specialty, 50) || "general";
    const message = text(req.body.message, 2000);

    if (!shopName) return res.status(400).json({ error: "Enter your shop name." });
    if (!ownerName) return res.status(400).json({ error: "Enter the owner's or manager's name." });
    if (!phone || phone.length < 10) return res.status(400).json({ error: "Enter a valid WhatsApp number." });
    if (email && !EMAIL_RE.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
    if (!location) return res.status(400).json({ error: "Tell us where your stall is in Abossey Okai." });

    const digits = phone.slice(1);
    const existingMerchant = await sql`
      SELECT id FROM merchants
      WHERE regexp_replace(COALESCE(phone, ''), '[^0-9]', '', 'g') = ${digits}
         OR (${email}::text IS NOT NULL AND LOWER(email) = ${email})
      LIMIT 1
    `;
    if (existingMerchant.length > 0) {
      return res.status(409).json({ error: "A shop with this number or email is already registered. Use Merchant Portal Login instead." });
    }

    const pending = await sql`
      SELECT id FROM merchant_applications
      WHERE status IN ('pending', 'contacted')
        AND (regexp_replace(COALESCE(phone, ''), '[^0-9]', '', 'g') = ${digits}
             OR (${email}::text IS NOT NULL AND LOWER(email) = ${email}))
      LIMIT 1
    `;
    if (pending.length > 0) {
      return res.status(409).json({ error: "We already have your request and will call you soon." });
    }

    const [application] = await sql`
      INSERT INTO merchant_applications (shop_name, owner_name, phone, email, location, specialty, message)
      VALUES (${shopName}, ${ownerName}, ${phone}, ${email}, ${location}, ${specialty}, ${message})
      RETURNING id, created_at
    `;

    res.status(201).json({ application, message: "Request received. Our team will call you to verify your stall." });
  } catch (err) {
    console.error("Stall application error:", err);
    res.status(500).json({ error: "Could not send your request. Please try again." });
  }
});

export default router;
