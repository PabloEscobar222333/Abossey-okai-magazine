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

// Login PINs are exactly 4 digits
export function isValidPin(pin) {
  return typeof pin === "string" && /^\d{4}$/.test(pin);
}

// Easily guessed PINs: one repeated digit (1111) or a straight run (1234, 9876)
export function isWeakPin(pin) {
  if (/^(\d)\1{3}$/.test(pin)) return true;
  const steps = [1, 2, 3].map(i => Number(pin[i]) - Number(pin[i - 1]));
  return steps.every(s => s === 1) || steps.every(s => s === -1);
}

// Random temporary PIN the admin passes on to a merchant, e.g. "4827"
export function generateTempPin() {
  let pin;
  do {
    pin = String(crypto.randomInt(0, 10000)).padStart(4, "0");
  } while (isWeakPin(pin));
  return pin;
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
