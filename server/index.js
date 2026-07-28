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
app.use(cors({
  origin: [
    "http://localhost:5173",    // Vite dev server
    "http://localhost:4173",    // Vite preview
    "http://127.0.0.1:5173",
    "http://127.0.0.1:4173",
  ],
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

// ─── Health Check ───────────────────────────────────────
app.get("/api/health", async (req, res) => {
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
});

// ─── API Routes ─────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/products", productRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/admin", adminRoutes);

// ─── 404 Handler ────────────────────────────────────────
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// ─── Error Handler ──────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// ─── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Abbossey Okai API Server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Products:     http://localhost:${PORT}/api/products`);
  console.log(`   Merchants:    http://localhost:${PORT}/api/merchants\n`);
});
