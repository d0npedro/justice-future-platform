/**
 * /internal — Development and demo operator panel
 *
 * NOT a public page. Accessed directly by URL only.
 * No auth is implemented in Phase 4. This route is clearly marked as
 * internal/dev in intent. Auth will be added in a later phase.
 *
 * Capabilities:
 * - List all submitted cases
 * - Change case status (for demo and development purposes)
 */

import type { Metadata } from "next";
import Link from "next/link";
import { listCases } from "@/lib/db/cases";
import { updateStatusAction } from "@/app/actions/case";
import {
  STATUS_LABELS,
  ISSUE_TYPE_LABELS,
  CASE_STATUSES,
} from "@/lib/domain/case";
import type { CaseRecord, CaseStatus } from "@/lib/domain/case";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Internal Panel · Justice Future Platform",
  robots: { index: false, follow: false },
};

function formatDateTime(date: Date): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const STATUS_COLORS: Record<CaseStatus, string> = {
  submitted:               "#2563eb",
  under_review:            "#7c3aed",
  clarification_requested: "#d97706",
  ready_for_next_step:     "#16a34a",
};

export default async function InternalPage() {
  let cases: CaseRecord[] = [];
  let dbError = false;

  try {
    cases = await listCases();
  } catch {
    dbError = true;
  }

  return (
    <main
      id="main-content"
      style={{
        paddingTop: "var(--nav-h)",
        minHeight: "100vh",
        background: "#0a0f1a",
        padding: "var(--nav-h) 2rem 80px",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Internal banner */}
        <div
          role="banner"
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            padding: "1rem 1.25rem",
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "0.875rem",
          }}
        >
          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>⚠</span>
          <div style={{ fontSize: "0.82rem", color: "#fca5a5", lineHeight: 1.6, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
            <strong style={{ color: "#f87171" }}>Internal development panel.</strong>{" "}
            This page is not indexed, not linked from the public site, and is accessed by URL only.
            No authentication is implemented in Phase 4. Do not share this URL publicly.
            A proper admin auth system will replace this in a later phase.
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.25rem" }}>
            Case Management
          </h1>
          <p style={{ fontSize: "0.82rem", color: "#64748b", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
            {dbError
              ? "Database not configured — see .env.local.example"
              : `${cases.length} case${cases.length !== 1 ? "s" : ""} submitted`}
          </p>
        </div>

        {/* DB error */}
        {dbError && (
          <div style={{ padding: "1.5rem", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", color: "#fca5a5", fontSize: "0.875rem", lineHeight: 1.7, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
            <strong>Database not available.</strong> Set <code>DATABASE_URL</code> in <code>.env.local</code>{" "}
            and run <code>pnpm db:migrate</code> to initialize the schema.
          </div>
        )}

        {/* Empty state */}
        {!dbError && cases.length === 0 && (
          <div style={{ padding: "3rem 2rem", textAlign: "center", color: "#334155", fontSize: "0.875rem", fontFamily: "var(--font-body), system-ui, sans-serif", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
            No cases submitted yet.{" "}
            <Link href="/start" style={{ color: "#3b82f6" }}>Submit a test case →</Link>
          </div>
        )}

        {/* Cases table */}
        {!dbError && cases.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {cases.map((c) => {
              const statusColor = STATUS_COLORS[c.status as CaseStatus] ?? "#94a3b8";
              return (
                <div
                  key={c.ref}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {/* Row header */}
                  <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
                        <Link
                          href={`/cases/${c.ref}`}
                          style={{
                            fontFamily: "ui-monospace, monospace",
                            fontSize: "0.9rem",
                            fontWeight: 700,
                            color: "#93c5fd",
                            textDecoration: "none",
                          }}
                        >
                          {c.ref}
                        </Link>
                        <span
                          style={{
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            color: statusColor,
                            background: `${statusColor}18`,
                            border: `1px solid ${statusColor}30`,
                            borderRadius: "20px",
                            padding: "2px 8px",
                            letterSpacing: "0.06em",
                            fontFamily: "var(--font-body), system-ui, sans-serif",
                          }}
                        >
                          {STATUS_LABELS[c.status as CaseStatus] ?? c.status}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#475569", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        {ISSUE_TYPE_LABELS[c.issue_type] ?? c.issue_type}
                        {" · "}
                        {formatDateTime(c.created_at)}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <p style={{ fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {c.summary.length > 200 ? c.summary.slice(0, 200) + "…" : c.summary}
                    </p>
                  </div>

                  {/* Status update form */}
                  <form
                    action={updateStatusAction}
                    style={{ padding: "0.875rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}
                  >
                    <input type="hidden" name="ref" value={c.ref} />
                    <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#475569", fontFamily: "var(--font-body), system-ui, sans-serif", whiteSpace: "nowrap" }}>
                      Change status:
                    </label>
                    <select
                      name="status"
                      defaultValue={c.status}
                      style={{
                        padding: "5px 10px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "5px",
                        color: "#94a3b8",
                        fontSize: "0.8rem",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      {CASE_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABELS[s]}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      style={{
                        padding: "5px 14px",
                        background: "rgba(59,130,246,0.15)",
                        border: "1px solid rgba(59,130,246,0.25)",
                        borderRadius: "5px",
                        color: "#93c5fd",
                        fontSize: "0.78rem",
                        fontWeight: 500,
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                    >
                      Update
                    </button>
                    <Link
                      href={`/cases/${c.ref}`}
                      style={{ fontSize: "0.72rem", color: "#3b82f6", marginLeft: "auto", fontFamily: "var(--font-body), system-ui, sans-serif", textDecoration: "none" }}
                    >
                      View public page →
                    </Link>
                  </form>
                </div>
              );
            })}
          </div>
        )}

        {/* Quick links */}
        <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/start" style={{ fontSize: "0.8rem", color: "#3b82f6", fontFamily: "var(--font-body), system-ui, sans-serif", textDecoration: "none" }}>
            + Submit test case
          </Link>
          <Link href="/" style={{ fontSize: "0.8rem", color: "#475569", fontFamily: "var(--font-body), system-ui, sans-serif", textDecoration: "none" }}>
            ← Public site
          </Link>
        </div>

      </div>
    </main>
  );
}
