import crypto from "crypto";

// Normalize a phone number to "+<digits>" so the same number always matches,
// however it was typed ("024 012 3456", "+233 24 012 3456", "233240123456").
// Ghana local numbers (10 digits starting with 0) are converted to +233.
export function normalizePhone(phone) {
  if (!phone) return null;
  let digits = String(phone).replace(/[^0-9]/g, "");
  if (!digits) return null;
  if (digits.length === 10 && digits.startsWith("0")) {
    digits = "233" + digits.slice(1);
  }
  return "+" + digits;
}

// Readable temporary password, e.g. "ao-7fk2-m9qd"
export function generateTempPassword() {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.randomBytes(8);
  let out = "";
  for (let i = 0; i < 8; i++) {
    out += alphabet[bytes[i] % alphabet.length];
    if (i === 3) out += "-";
  }
  return `ao-${out}`;
}

// SQL expression that turns stored base64 data-URL images into small URLs served by
// GET /api/products/:id/images/:idx, so list responses stay small. `?v=` busts caches on edit.
export const PRODUCT_IMAGES_SQL = `
  ARRAY(
    SELECT CASE WHEN img LIKE 'data:%'
      THEN '/api/products/' || p.id || '/images/' || (ord - 1) || '?v=' || FLOOR(EXTRACT(EPOCH FROM p.updated_at))::bigint
      ELSE img END
    FROM unnest(p.images) WITH ORDINALITY AS t(img, ord)
    ORDER BY ord
  ) AS images`;

// Every product column except the raw images array
export const PRODUCT_COLUMNS_SQL = `
  p.id, p.merchant_id, p.main_type, p.name, p.brand, p.category, p.condition,
  p.price, p.stock, p.status, p.views, p.description, p.compatibility_text,
  p.created_at, p.updated_at`;

// Merchant avatar: replace base64 data with a URL served by GET /api/merchants/:id/avatar
export const MERCHANT_AVATAR_SQL = `
  CASE WHEN m.avatar_url LIKE 'data:%'
    THEN '/api/merchants/' || m.id || '/avatar?v=' || FLOOR(EXTRACT(EPOCH FROM m.updated_at))::bigint
    ELSE m.avatar_url END AS avatar_url`;

// Decode a "data:<mime>;base64,<data>" string and send it as a cacheable binary response
export function sendDataUrl(res, dataUrl) {
  const match = /^data:([^;,]+);base64,(.+)$/s.exec(dataUrl || "");
  if (!match) return false;
  res.set("Content-Type", match[1]);
  res.set("Cache-Control", "public, max-age=31536000, immutable");
  res.send(Buffer.from(match[2], "base64"));
  return true;
}
