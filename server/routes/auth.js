import { Router } from "express";
import bcrypt from "bcryptjs";
import sql from "../db.js";
import { generateToken, requireAuth } from "../middleware/auth.js";

const router = Router();

// ─── POST /api/auth/register ────────────────────────────
// Register a new user (customer or merchant)
router.post("/register", async (req, res) => {
  try {
    const { email, phone, password, full_name, role } = req.body;

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
      const existing = await sql`SELECT id FROM users WHERE phone = ${phone}`;
      if (existing.length > 0) {
        return res.status(409).json({ error: "Phone number already registered" });
      }
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const userRole = role === "merchant" ? "merchant" : "customer";

    const [user] = await sql`
      INSERT INTO users (email, phone, password_hash, full_name, role)
      VALUES (${email || null}, ${phone || null}, ${passwordHash}, ${full_name || null}, ${userRole})
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
    const { email, phone, password } = req.body;

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone is required" });
    }

    let users;
    if (email) {
      users = await sql`SELECT * FROM users WHERE email = ${email}`;
    } else {
      users = await sql`SELECT * FROM users WHERE phone = ${phone}`;
    }

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];
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

// ─── POST /api/auth/register-merchant ───────────────────
// Register + create merchant profile in one step (onboarding)
router.post("/register-merchant", async (req, res) => {
  try {
    const {
      email, phone, password, full_name,
      shop_name, shop_location, shop_coordinates,
      shop_description, shop_specialty
    } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }
    if (!shop_name) {
      return res.status(400).json({ error: "Shop name is required" });
    }

    // Check existing
    if (email) {
      const existing = await sql`SELECT id FROM users WHERE email = ${email}`;
      if (existing.length > 0) {
        return res.status(409).json({ error: "Email already registered" });
      }
    }

    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const [user] = await sql`
      INSERT INTO users (email, phone, password_hash, full_name, role)
      VALUES (${email || null}, ${phone || null}, ${passwordHash}, ${full_name || null}, 'merchant')
      RETURNING id, email, phone, full_name, role, created_at
    `;

    // Create merchant profile
    const since = new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

    const [merchant] = await sql`
      INSERT INTO merchants (user_id, shop_name, phone, email, location, coordinates, description, specialty, since)
      VALUES (${user.id}, ${shop_name}, ${phone || null}, ${email || null}, ${shop_location || null}, ${shop_coordinates || "5.5565, -0.2282"}, ${shop_description || null}, ${shop_specialty || null}, ${since})
      RETURNING *
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
      merchantProfile: merchant,
      token,
    });
  } catch (err) {
    console.error("Register merchant error:", err);
    res.status(500).json({ error: "Merchant registration failed" });
  }
});

export default router;
