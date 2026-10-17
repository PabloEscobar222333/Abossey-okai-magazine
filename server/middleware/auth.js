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

// Generate a JWT token for a user
export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
    },
    getJwtSecret(),
    { expiresIn: "7d" }
  );
}

// Middleware: Verify JWT and attach user to req
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
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
      req.user = jwt.verify(token, getJwtSecret());
    } catch (err) {
      // Invalid token — just continue without user
    }
  }
  next();
}
