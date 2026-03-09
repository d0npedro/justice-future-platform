-- Justice Future Platform — database schema
-- Run via: pnpm db:migrate
-- Compatible with: Neon, Vercel Postgres, or any PostgreSQL 14+

CREATE TABLE IF NOT EXISTS cases (
  id            SERIAL PRIMARY KEY,
  ref           TEXT UNIQUE NOT NULL,
  status        TEXT NOT NULL DEFAULT 'submitted',
  issue_type    TEXT NOT NULL,
  party_role    TEXT NOT NULL,
  summary       TEXT NOT NULL,
  relevant_date TEXT,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for ref lookups (case status page)
CREATE INDEX IF NOT EXISTS cases_ref_idx ON cases (ref);

-- Index for listing by date (internal panel)
CREATE INDEX IF NOT EXISTS cases_created_idx ON cases (created_at DESC);
