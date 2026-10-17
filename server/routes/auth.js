import { Router } from "express";
import bcrypt from "bcryptjs";
import { auth as firebaseAuth } from "../firebase-admin.js";
import sql from "../db.js";
import { generateToken, requireAuth, requireAdmin } from "../middleware/auth.js";
import { normalizePhone, generateTempPassword } from "../utils.js";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

// ─── POST /api/auth/register ────────────────────────────
// Register a new customer account (merchants are onboarded by an admin)
router.post("/register", async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    const phone = normalizePhone(req.body.phone);

    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone number is required" });
    }

    // Check if user already exists
    if (email) {
      const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
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

    const passwordHash = await bcrypt.hash(password, 12);

    const [user] = await sql`
      INSERT INTO users (email, phone, password_hash, full_name, role)
      VALUES (${email || null}, ${phone || null}, ${passwordHash}, ${full_name || null}, 'customer')
      RETURNING id, email, phone, full_name, role, created_at
    `;

    const token = generateToken(user);

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.full_name,
        role: user.role,
        created_at: user.created_at,
      },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ─── POST /api/auth/login ───────────────────────────────
// Login with email or phone + password
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email ? String(req.body.email).trim().toLowerCase() : null;
    const phone = normalizePhone(req.body.phone);

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
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
    if (!user.password_hash) {
      return res.status(401).json({ error: "This account uses Google sign-in. Please use the Google button." });
    }
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If merchant, also fetch merchant profile
    let merchantProfile = null;
    if (user.role === "merchant") {
      const merchants = await sql`SELECT * FROM merchants WHERE user_id = ${user.id}`;
      if (merchants.length > 0) {
        merchantProfile = merchants[0];
      }
    }

    const token = generateToken(user);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.full_name,
        role: user.role,
        created_at: user.created_at,
      },
      merchantProfile,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ─── GET /api/auth/me ───────────────────────────────────
// Get current user from JWT token
router.get("/me", requireAuth, async (req, res) => {
  try {
    const users = await sql`
      SELECT id, email, phone, full_name, role, created_at
      FROM users WHERE id = ${req.user.id}
    `;

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    // If merchant, also fetch merchant profile
    let merchantProfile = null;
    if (user.role === "merchant") {
      const merchants = await sql`SELECT * FROM merchants WHERE user_id = ${user.id}`;
      if (merchants.length > 0) {
        merchantProfile = merchants[0];
      }
    }

    res.json({ user, merchantProfile });
  } catch (err) {
    console.error("Auth me error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ─── POST /api/auth/change-password ─────────────────────
// Logged-in user replaces their password (e.g. the temporary one from onboarding)
router.post("/change-password", requireAuth, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    if (!new_password || new_password.length < 8) {
      return res.status(400).json({ error: "New password must be at least 8 characters" });
    }

    const users = await sql`SELECT id, password_hash FROM users WHERE id = ${req.user.id}`;
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];
    if (user.password_hash) {
      const valid = current_password && await bcrypt.compare(current_password, user.password_hash);
      if (!valid) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }
    }

    const passwordHash = await bcrypt.hash(new_password, 12);
    await sql`UPDATE users SET password_hash = ${passwordHash}, updated_at = NOW() WHERE id = ${user.id}`;

    res.json({ message: "Password updated" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ error: "Failed to change password" });
  }
});

// ─── POST /api/auth/register-merchant ───────────────────
// Admin onboards a merchant: creates the login account + shop profile in one step.
// Returns a temporary password the admin passes on to the merchant.
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

    const temporaryPassword = generateTempPassword();
    const passwordHash = await bcrypt.hash(temporaryPassword, 12);

    // Create user
    const [user] = await sql`
      INSERT INTO users (email, phone, password_hash, full_name, role)
      VALUES (${email}, ${phone}, ${passwordHash}, ${full_name || null}, 'merchant')
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
      temporaryPassword,
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
