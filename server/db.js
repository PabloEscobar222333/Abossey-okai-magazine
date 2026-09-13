import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env from cwd and server/.env
dotenv.config();
const serverEnv = resolve(__dirname, ".env");
if (existsSync(serverEnv)) {
  dotenv.config({ path: serverEnv });
}

let _sql = null;

function getSql() {
  if (!_sql) {
    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      throw new Error("DATABASE_URL environment variable is not set. Please add it in your Vercel Project Settings > Environment Variables.");
    }
    _sql = neon(dbUrl);
  }
  return _sql;
}

// Proxy tag function so `sql` tagged template literal works lazily
const sql = (strings, ...values) => {
  const instance = getSql();
  return instance(strings, ...values);
};

export default sql;
