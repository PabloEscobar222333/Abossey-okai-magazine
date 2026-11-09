import { Router } from "express";
import bcrypt from "bcryptjs";
import sql from "../db.js";
import { generateToken, requireAuth, requirePinChangeAuth, requireAdmin } from "../middleware/auth.js";
import { normalizePhone, isValidPin, isWeakPin, generateTempPin } from "../utils.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// A 4-digit PIN has only 10,000 combinations, so lock the account after a few wrong tries.
// Kept in the database because serverless instances don't share memory.
const MAX_PIN_ATTEMPTS = 5;
const PIN_LOCK_MINUTES = 15;

function lockedMessage(lockedUntil) {
  const minutes = Math.max(1, Math.ceil((new Date(lockedUntil) - Date.now()) / 60000));
  return `Too many wrong PINs. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`;
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    full_name: user.full_name,
    role: user.role,
    avatar_url: user.avatar_url,
    created_at: user.created_at,
    must_change_pin: !!user.must_change_pin,
  };
}

async function findMerchantProfile(user) {
  if (user.role !== "merchant") return null;
  const merchants = await sql`SELECT * FROM merchants WHERE user_id = ${user.id}`;
  return merchants[0] || null;
}

// ─── POST /api/auth/identify ────────────────────────────
// First step of email / mobile number sign-in. Merchants and admins are asked for their PIN;
// anyone else is signed straight in as a customer (an account is created the first time).
router.post("/identify", async (req, res) => {
  try {
    const email = req.body.email ? String(req.body.email).trim().toLowerCase() : null;
    const phone = email ? null : normalizePhone(req.body.phone);

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Enter a valid email address" });
    }
    if (!email && (!phone || phone.length < 10)) {
      return res.status(400).json({ error: "Enter a valid email address or mobile number" });
    }

    const users = email
      ? await sql`SELECT * FROM users WHERE LOWER(email) = ${email}`
      : await sql`SELECT * FROM users WHERE regexp_replace(phone, '[^0-9]', '', 'g') = ${phone.slice(1)}`;

    let user = users[0];
    if (user && (user.role === "merchant" || user.role === "admin")) {
      return res.json({ next: "pin" });
    }

    if (!user) {
      [user] = await sql`
        INSERT INTO users (email, phone, role)
        VALUES (${email}, ${phone}, 'customer')
        RETURNING *
      `;
    }

    res.json({
      user: publicUser(user),
      merchantProfile: null,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("Identify error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ─── POST /api/auth/login ───────────────────────────────
// Merchants and admins log in with email or phone + 4-digit PIN (customers don't have one)
router.post("/login", async (req, res) => {
  try {
    const pin = req.body.pin == null ? "" : String(req.body.pin);
    const email = req.body.email ? String(req.body.email).trim().toLowerCase() : null;
    const phone = normalizePhone(req.body.phone);

    if (!isValidPin(pin)) {
      return res.status(400).json({ error: "Enter your 4-digit PIN" });
    }
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone is required" });
    }

    let users;
    if (email) {
      users = await sql`SELECT * FROM users WHERE LOWER(email) = ${email}`;
    } else {
      // Compare digits only so numbers saved before normalization still match
      const digits = phone.slice(1);
      users = await sql`SELECT * FROM users WHERE regexp_replace(phone, '[^0-9]', '', 'g') = ${digits}`;
    }

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];
    // PINs are only for merchants and admins; customers sign in through /identify or Google
    if (user.role === "customer") {
      return res.status(403).json({ error: "Customer accounts don't need a PIN. Enter your email or mobile number and tap Continue." });
    }
    if (user.pin_locked_until && new Date(user.pin_locked_until) > new Date()) {
      return res.status(429).json({ error: lockedMessage(user.pin_locked_until) });
    }
    if (!user.pin_hash) {
      const error = user.google_id
        ? "This account signs in with Google. Use the Google button, or ask the admin for a PIN."
        : "No PIN has been set for this account yet. Ask the admin for a temporary PIN.";
      return res.status(401).json({ error });
    }

    const validPin = await bcrypt.compare(pin, user.pin_hash);
    if (!validPin) {
      // Count the miss atomically; the last allowed miss starts the lock and resets the count
      const [after] = await sql`
        UPDATE users SET
          failed_pin_attempts = CASE WHEN failed_pin_attempts + 1 >= ${MAX_PIN_ATTEMPTS} THEN 0 ELSE failed_pin_attempts + 1 END,
          pin_locked_until = CASE WHEN failed_pin_attempts + 1 >= ${MAX_PIN_ATTEMPTS}
            THEN NOW() + (${PIN_LOCK_MINUTES}::int * INTERVAL '1 minute') ELSE pin_locked_until END
        WHERE id = ${user.id}
        RETURNING failed_pin_attempts, pin_locked_until
      `;
      if (after.pin_locked_until && new Date(after.pin_locked_until) > new Date()) {
        return res.status(429).json({ error: lockedMessage(after.pin_locked_until) });
      }
      const left = MAX_PIN_ATTEMPTS - after.failed_pin_attempts;
      return res.status(401).json({ error: `Incorrect PIN. ${left} attempt${left === 1 ? "" : "s"} left before the account is locked for ${PIN_LOCK_MINUTES} minutes.` });
    }

    if (user.failed_pin_attempts || user.pin_locked_until) {
      await sql`UPDATE users SET failed_pin_attempts = 0, pin_locked_until = NULL WHERE id = ${user.id}`;
    }

    // A temporary PIN only unlocks the "set a new PIN" step
    const token = generateToken(user, { pinChangeRequired: !!user.must_change_pin });

    res.json({
      user: publicUser(user),
      merchantProfile: await findMerchantProfile(user),
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ─── GET /api/auth/me ───────────────────────────────────
// Get current user from JWT token (also answers for a temporary-PIN token,
// so the app can bring back the "set a new PIN" step after a reload)
router.get("/me", requirePinChangeAuth, async (req, res) => {
  try {
    const users = await sql`
      SELECT id, email, phone, full_name, role, avatar_url, created_at, must_change_pin
      FROM users WHERE id = ${req.user.id}
    `;

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    res.json({
      user: { ...publicUser(user), must_change_pin: !!(req.user.pin_change_required && user.must_change_pin) },
      merchantProfile: await findMerchantProfile(user),
    });
  } catch (err) {
    console.error("Auth me error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ─── POST /api/auth/change-pin ──────────────────────────
// Set a new 4-digit PIN. Right after logging in with a temporary PIN the current PIN
// isn't asked for again; otherwise it must be given. Returns a fresh full-access token.
router.post("/change-pin", requirePinChangeAuth, async (req, res) => {
  try {
    const currentPin = req.body.current_pin == null ? "" : String(req.body.current_pin);
    const newPin = req.body.new_pin == null ? "" : String(req.body.new_pin);

    if (!isValidPin(newPin)) {
      return res.status(400).json({ error: "New PIN must be exactly 4 digits" });
    }
    if (isWeakPin(newPin)) {
      return res.status(400).json({ error: "That PIN is too easy to guess. Avoid repeated digits (1111) and runs (1234)." });
    }

    const users = await sql`SELECT * FROM users WHERE id = ${req.user.id}`;
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    if (user.role === "customer") {
      return res.status(403).json({ error: "Customer accounts don't use a PIN." });
    }
    const isFirstLoginChange = !!(req.user.pin_change_required && user.must_change_pin);
    if (user.pin_hash && !isFirstLoginChange) {
      const valid = isValidPin(currentPin) && await bcrypt.compare(currentPin, user.pin_hash);
      if (!valid) {
        return res.status(401).json({ error: "Current PIN is incorrect" });
      }
    }
    if (user.pin_hash && await bcrypt.compare(newPin, user.pin_hash)) {
      return res.status(400).json({ error: "Choose a PIN different from your current one" });
    }

    const pinHash = await bcrypt.hash(newPin, 12);
    const [updated] = await sql`
      UPDATE users
      SET pin_hash = ${pinHash}, must_change_pin = FALSE, failed_pin_attempts = 0, pin_locked_until = NULL, updated_at = NOW()
      WHERE id = ${user.id}
      RETURNING *
    `;

    res.json({
      message: "PIN updated",
      user: publicUser(updated),
      merchantProfile: await findMerchantProfile(updated),
      token: generateToken(updated),
    });
  } catch (err) {
    console.error("Change PIN error:", err);
    res.status(500).json({ error: "Failed to change PIN" });
  }
});

// ─── POST /api/auth/register-merchant ───────────────────
// Admin onboards a merchant: creates the login account + shop profile in one step.
// Returns a temporary 4-digit PIN the admin passes on to the merchant.
router.post("/register-merchant", requireAuth, requireAdmin, async (req, res) => {
  try {
    const {
      full_name,
      shop_name, shop_location, shop_coordinates,
      shop_description, shop_specialty
    } = req.body;
    const email = req.body.email ? String(req.body.email).trim().toLowerCase() : null;
    const phone = normalizePhone(req.body.phone);

    if (!shop_name) {
      return res.status(400).json({ error: "Shop name is required" });
    }
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone number is required" });
    }

    // Check existing
    if (email) {
      const existing = await sql`SELECT id FROM users WHERE LOWER(email) = ${email}`;
      if (existing.length > 0) {
        return res.status(409).json({ error: "Email already registered" });
      }
    }
    if (phone) {
      const existing = await sql`SELECT id FROM users WHERE regexp_replace(phone, '[^0-9]', '', 'g') = ${phone.slice(1)}`;
      if (existing.length > 0) {
        return res.status(409).json({ error: "Phone number already registered" });
      }
    }

    const temporaryPin = generateTempPin();
    const pinHash = await bcrypt.hash(temporaryPin, 12);

    // Create user; the merchant must replace the temporary PIN on first login
    const [user] = await sql`
      INSERT INTO users (email, phone, pin_hash, must_change_pin, full_name, role)
      VALUES (${email}, ${phone}, ${pinHash}, TRUE, ${full_name || null}, 'merchant')
      RETURNING id, email, phone, full_name, role, created_at
    `;

    // Create merchant profile (admin-onboarded dealers are verified by default)
    const since = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

    const [merchant] = await sql`
      INSERT INTO merchants (user_id, shop_name, phone, email, location, coordinates, description, specialty, since, verified)
      VALUES (${user.id}, ${shop_name}, ${phone}, ${email}, ${shop_location || null}, ${shop_coordinates || "5.5565, -0.2282"}, ${shop_description || null}, ${shop_specialty || null}, ${since}, true)
      RETURNING *
    `;

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.full_name,
        role: user.role,
        created_at: user.created_at,
      },
      merchantProfile: merchant,
      temporaryPin,
    });
  } catch (err) {
    console.error("Register merchant error:", err);
    res.status(500).json({ error: "Merchant registration failed" });
  }
});

// ─── POST /api/auth/google ──────────────────────────────
// Authenticate with Google ID token from Firebase Auth
router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Firebase ID token is required" });
    }

    // Loaded on demand so a Firebase problem can only affect Google sign-in, not the whole API
    let firebaseAuth;
    try {
      ({ auth: firebaseAuth } = await import("../firebase-admin.js"));
    } catch (loadErr) {
      console.error("Firebase Admin failed to load:", loadErr);
      return res.status(503).json({ error: "Google sign-in is temporarily unavailable. Please log in with email or phone." });
    }

    // 1. Verify the Firebase ID token cryptographically
    let decodedToken;
    try {
      decodedToken = await firebaseAuth.verifyIdToken(credential);
    } catch (verifyErr) {
      console.error("Firebase token verification failed:", verifyErr.message);
      return res.status(401).json({ error: "Invalid Firebase token: " + verifyErr.message });
    }

    const { uid: googleId, email, name, picture } = decodedToken;

    if (!email) {
      return res.status(400).json({ error: "Google account has no email" });
    }

    // 2. Check if user already exists (by google_id or email)
    let users = [];
    if (googleId) {
      users = await sql`SELECT * FROM users WHERE google_id = ${googleId}`;
    }
    
    if (users.length === 0) {
      // Try matching by email
      users = await sql`SELECT * FROM users WHERE email = ${email}`;
    }

    let user;

    if (users.length > 0) {
      // Existing user — update google_id and avatar if not set
      user = users[0];
      await sql`
        UPDATE users 
        SET google_id = COALESCE(google_id, ${googleId || 'g_' + Date.now()}), 
            avatar_url = COALESCE(avatar_url, ${picture}),
            full_name = COALESCE(full_name, ${name}),
            updated_at = NOW()
        WHERE id = ${user.id}
      `;
      // Re-fetch to get updated fields
      const updated = await sql`SELECT * FROM users WHERE id = ${user.id}`;
      user = updated[0];
    } else {
      // New user — auto-register as customer
      const [newUser] = await sql`
        INSERT INTO users (email, google_id, full_name, avatar_url, role, password_hash)
        VALUES (${email}, ${googleId || 'g_' + Date.now()}, ${name || null}, ${picture || null}, 'customer', NULL)
        RETURNING *
      `;
      user = newUser;
    }

    // 3. If merchant, fetch merchant profile
    let merchantProfile = null;
    if (user.role === "merchant") {
      const merchants = await sql`SELECT * FROM merchants WHERE user_id = ${user.id}`;
      if (merchants.length > 0) {
        merchantProfile = merchants[0];
      }
    }

    // 4. Issue JWT
    const token = generateToken(user);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.full_name,
        role: user.role,
        avatar_url: user.avatar_url,
        created_at: user.created_at,
      },
      merchantProfile,
      token,
    });
  } catch (err) {
    console.error("Google auth error:", err);
    res.status(500).json({ error: "Google authentication failed" });
  }
});

export default router;
