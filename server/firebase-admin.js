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
  // Try loading service account key file first (most reliable for verifyIdToken)
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
      // Fallback to project ID only (will fail on verifyIdToken without ADC)
      initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
      console.warn("⚠️ Firebase Admin initialized with projectId only — verifyIdToken may fail");
    }
  } else {
    // No service account file found — try Application Default Credentials (ADC)
    // This works on Google Cloud (Cloud Run, App Engine, etc.) or if
    // GOOGLE_APPLICATION_CREDENTIALS env var is set
    console.warn("⚠️ No service-account.json found at:", serviceAccountPath);
    console.warn("   Download it from: Firebase Console → Project Settings → Service Accounts → Generate New Private Key");
    console.warn("   Save it as: server/service-account.json");
    initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });
    console.warn("⚠️ Firebase Admin initialized with projectId only — verifyIdToken will fail without credentials");
  }
}

const auth = getAuth();

export { auth };
