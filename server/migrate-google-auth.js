// migrate-google-auth.js — Add Google OAuth columns to users table
import sql from "./db.js";

async function migrateGoogleAuth() {
  console.log("🔄 Running Google Auth migration on Neon DB...\n");

  try {
    // 1. Make password_hash nullable (Google-only users won't have a password)
    await sql`ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL`;
    console.log("✅ Made password_hash nullable");

    // 2. Add google_id column for storing Google's unique 'sub' claim
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE`;
    console.log("✅ Added google_id column");

    // 3. Add avatar_url column for Google profile pictures
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT`;
    console.log("✅ Added avatar_url column");

    // 4. Create index on google_id for fast lookups
    await sql`CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id)`;
    console.log("✅ Created index on google_id");

    console.log("\n🎉 Google Auth migration completed successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  }

  process.exit(0);
}

migrateGoogleAuth();
