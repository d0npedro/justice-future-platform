import { neon } from "@neondatabase/serverless";
import type { NeonQueryFunction } from "@neondatabase/serverless";

// Lazy initialization: neon() is only called on the first actual DB request,
// not at module evaluation time. This prevents build-time errors when
// DATABASE_URL is not set in the build environment.

let _sql: NeonQueryFunction<false, false> | null = null;

export function getDb(): NeonQueryFunction<false, false> {
  if (!_sql) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set.\n" +
        "Copy .env.local.example to .env.local, add your connection string, " +
        "then run: pnpm db:migrate"
      );
    }
    _sql = neon(url);
  }
  return _sql;
}
