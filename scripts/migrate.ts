/**
 * Justice Future Platform — database migration
 *
 * Usage:
 *   pnpm db:migrate
 *
 * Requires DATABASE_URL in .env.local (development) or environment.
 * Creates all tables if they do not already exist.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { neon } from "@neondatabase/serverless";

// Load .env.local using Node 20+ built-in (no dotenv dependency)
const envFile = resolve(process.cwd(), ".env.local");
if (existsSync(envFile)) {
  const lines = readFileSync(envFile, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error(
    "\n[migrate] Error: DATABASE_URL is not set.\n" +
    "  Copy .env.local.example to .env.local and add your connection string.\n"
  );
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const schemaPath = resolve(process.cwd(), "src/lib/db/schema.sql");
const schema = readFileSync(schemaPath, "utf8");

console.log("[migrate] Running schema migration...");

try {
  await sql(schema);
  console.log("[migrate] Done. Tables created or already exist.\n");
} catch (err) {
  console.error("[migrate] Migration failed:", err);
  process.exit(1);
}
