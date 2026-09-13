import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import merchantRoutes from "./routes/merchants.js";
import productRoutes from "./routes/products.js";
import adminRoutes from "./routes/admin.js";
import brandRoutes from "./routes/brands.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ─────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:4173",
  "http://localhost:3000",
  "http://localhost:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:8080",
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith(".vercel.app") ||
      process.env.FRONTEND_URL === origin ||
      process.env.VERCEL
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

app.use((req, res, next) => {
  console.log(`[API REQUEST] ${req.method} ${req.url} (originalUrl: ${req.originalUrl || req.url})`);
  next();
});

// ─── Health Check ───────────────────────────────────────
const handleHealth = async (req, res) => {
  try {
    const sql = (await import("./db.js")).default;
    const result = await sql`SELECT NOW() as server_time`;
    res.json({
      status: "ok",
      server_time: result[0].server_time,
      message: "Abbossey Okai API is running 🚀",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

app.get("/api/health", handleHealth);
app.get("/health", handleHealth);

// ─── API Routes ─────────────────────────────────────────
// Mount with /api prefix (standard Vite + local proxy)
app.use("/api/auth", authRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/admin", adminRoutes);

// Also mount without /api prefix in case serverless router forwards path without prefix
app.use("/auth", authRoutes);
app.use("/merchants", merchantRoutes);
app.use("/products", productRoutes);
app.use("/brands", brandRoutes);
app.use("/admin", adminRoutes);

// ─── 404 Handler ────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `API endpoint not found: ${req.method} ${req.url}` });
});

// ─── Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ─── Start Server (Local Only) ──────────────────────────
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Abbossey Okai API Server running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/api/health`);
    console.log(`   Products:     http://localhost:${PORT}/api/products`);
    console.log(`   Merchants:    http://localhost:${PORT}/api/merchants\n`);
  });
}

export default app;
