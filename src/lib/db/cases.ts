import { getDb } from "./client";
import type { CaseRecord, CaseStatus, NewCaseInput } from "@/lib/domain/case";

// ─── Reference ID generation ─────────────────────────────────────────────────
// Format: JF-{YEAR}-{5 unambiguous uppercase chars}
// e.g. JF-2026-A4BX2
// Avoids 0/O, 1/I/L confusion.

const REF_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function generateRef(): string {
  const year = new Date().getFullYear();
  let suffix = "";
  for (let i = 0; i < 5; i++) {
    suffix += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)];
  }
  return `JF-${year}-${suffix}`;
}

// ─── Data access functions ───────────────────────────────────────────────────

export async function createCase(input: NewCaseInput): Promise<CaseRecord> {
  const sql = getDb();
  let ref = generateRef();

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const rows = await sql`
        INSERT INTO cases (ref, issue_type, party_role, summary, relevant_date, notes)
        VALUES (
          ${ref},
          ${input.issueType},
          ${input.partyRole},
          ${input.summary.trim()},
          ${input.relevantDate || null},
          ${input.notes?.trim() || null}
        )
        RETURNING *
      `;
      return rows[0] as CaseRecord;
    } catch (err: unknown) {
      const isCollision =
        err instanceof Error &&
        "code" in err &&
        (err as { code: string }).code === "23505";
      if (isCollision && attempt < 2) {
        ref = generateRef();
        continue;
      }
      throw err;
    }
  }

  throw new Error("Failed to generate unique case reference after 3 attempts");
}

export async function getCaseByRef(ref: string): Promise<CaseRecord | null> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM cases WHERE ref = ${ref} LIMIT 1
  `;
  return (rows[0] as CaseRecord) ?? null;
}

export async function updateCaseStatus(
  ref: string,
  status: CaseStatus
): Promise<void> {
  const sql = getDb();
  await sql`
    UPDATE cases
    SET status = ${status}, updated_at = NOW()
    WHERE ref = ${ref}
  `;
}

export async function listCases(): Promise<CaseRecord[]> {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM cases ORDER BY created_at DESC LIMIT 100
  `;
  return rows as CaseRecord[];
}
