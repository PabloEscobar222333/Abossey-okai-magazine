import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const IS_PRODUCTION = !!process.env.VERCEL || process.env.NODE_ENV === "production";

// Never fall back to a known secret in production: anyone could forge admin tokens with it.
function getJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (IS_PRODUCTION) {
    throw new Error("JWT_SECRET environment variable is not set. Add it in Vercel Project Settings > Environment Variables.");
  }
  return "ao_local_dev_secret";
}

if (!process.env.JWT_SECRET) {
  console.warn(
    IS_PRODUCTION
      ? "❌ JWT_SECRET is not set — all logins will fail until it is configured."
      : "⚠️ JWT_SECRET is not set — using a local development secret."
  );
}

// Generate a JWT token for a user.
// A pinChangeRequired token (issued after logging in with a temporary PIN) is only
// accepted by routes that use requirePinChangeAuth, so it can do nothing but set a new PIN.
// rememberDevice ("Keep me logged in on this device") stretches the session from 7 to 30 days.
export function generateToken(user, { pinChangeRequired = false, rememberDevice = false } = {}) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    full_name: user.full_name,
  };
  if (pinChangeRequired) payload.pin_change_required = true;
  const expiresIn = pinChangeRequired ? "1h" : (rememberDevice ? "30d" : "7d");
  return jwt.sign(payload, getJwtSecret(), { expiresIn });
}

// Reads the optional "remember this device" flag sent with a login request
export function wantsRememberDevice(body) {
  const v = body && body.remember_device;
  return v === true || v === "true" || v === 1 || v === "1";
}

function authenticate(req, res, next, allowPinChange) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = jwt.verify(token, getJwtSecret());
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  if (decoded.pin_change_required && !allowPinChange) {
    return res.status(403).json({ error: "Please set a new PIN before continuing.", code: "PIN_CHANGE_REQUIRED" });
  }
  req.user = decoded;
  next();
}

// Middleware: Verify JWT and attach user to req
export function requireAuth(req, res, next) {
  authenticate(req, res, next, false);
}

// Middleware: like requireAuth, but also accepts a temporary-PIN token
export function requirePinChangeAuth(req, res, next) {
  authenticate(req, res, next, true);
}

// Middleware: Require merchant role
export function requireMerchant(req, res, next) {
  if (!req.user || (req.user.role !== "merchant" && req.user.role !== "admin")) {
    return res.status(403).json({ error: "Merchant access required" });
  }
  next();
}

// Middleware: Require admin role
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

// Optional auth — attaches user if token present, but doesn't block
export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, getJwtSecret());
      // A temporary-PIN token browses as a guest until the new PIN is set
      if (!decoded.pin_change_required) req.user = decoded;
    } catch (err) {
      // Invalid token — just continue without user
    }
  }
  next();
}
