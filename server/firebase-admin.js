// ─── Firebase Admin SDK Initialization ───────────────────
// Used server-side to verify Firebase ID tokens from the frontend.
// Requires a service account key for verifyIdToken() to work.
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

if (!getApps().length) {
  // 1. Try loading from environment variable (ideal for Vercel / serverless deployments)
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT.trim();
      const serviceAccount = JSON.parse(raw.startsWith("{") ? raw : Buffer.from(raw, "base64").toString("utf-8"));
      initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID,
      });
      console.log("✅ Firebase Admin initialized with FIREBASE_SERVICE_ACCOUNT env var");
    } catch (err) {
      console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", err.message);
    }
  }

  // 2. Try loading service account key file (local development)
  if (!getApps().length) {
    const serviceAccountPath = resolve(__dirname, "service-account.json");
    if (existsSync(serviceAccountPath)) {
      try {
        const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
        initializeApp({
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID,
        });
        console.log("✅ Firebase Admin initialized with service account key");
      } catch (err) {
        console.error("❌ Failed to load service account key:", err.message);
        initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
        console.warn("⚠️ Firebase Admin initialized with projectId only — verifyIdToken may fail");
      }
    } else {
      initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
      console.warn("⚠️ Firebase Admin initialized with projectId only — verifyIdToken will fail without credentials");
    }
  }
}

const auth = getAuth();

export { auth };
