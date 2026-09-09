import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import sql from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrate() {
  console.log("🔄 Running database migration...\n");

  try {
    const schema = readFileSync(join(__dirname, "schema.sql"), "utf-8");

    // Remove SQL comments and split by semicolons carefully
    // First, strip single-line comments
    const cleaned = schema
      .split("\n")
      .filter((line) => !line.trim().startsWith("--"))
      .join("\n");

    // Split by semicolons that are followed by whitespace/newline
    const statements = cleaned
      .split(/;\s*\n/)
      .map((s) => s.trim().replace(/;$/, ""))
      .filter((s) => s.length > 0);

    // Column migrations for existing tables
    const columnMigrations = [
      `ALTER TABLE merchants ADD COLUMN IF NOT EXISTS latitude DECIMAL(9,6)`,
      `ALTER TABLE merchants ADD COLUMN IF NOT EXISTS longitude DECIMAL(9,6)`,
      `ALTER TABLE merchants ADD COLUMN IF NOT EXISTS location_data JSONB`,
    ];

    for (const alterStmt of columnMigrations) {
      try {
        await sql(alterStmt);
        console.log(`  ✅ Schema update applied: ${alterStmt}`);
      } catch (colErr) {
        console.warn(`  ⏭️ Column migration note: ${colErr.message}`);
      }
    }

    for (const statement of statements) {
      try {
        await sql(statement);
        // Extract table/index name for logging
        const match = statement.match(
          /(?:CREATE\s+(?:TABLE|INDEX))\s+(?:IF\s+NOT\s+EXISTS\s+)?(\S+)/i
        );
        if (match) {
          console.log(`  ✅ Created: ${match[1]}`);
        }
      } catch (err) {
        if (err.message && err.message.includes("already exists")) {
          const match = statement.match(
            /(?:CREATE\s+(?:TABLE|INDEX))\s+(?:IF\s+NOT\s+EXISTS\s+)?(\S+)/i
          );
          console.log(`  ⏭️  Skipped (already exists): ${match?.[1] || "unknown"}`);
        } else {
          console.error(`  ❌ Error:`, err.message);
          console.error(`     First 120 chars: ${statement.substring(0, 120)}...`);
        }
      }
    }

    console.log("\n✅ Migration completed successfully!");
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  }

  process.exit(0);
}

migrate();
