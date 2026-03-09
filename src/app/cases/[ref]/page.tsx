import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCaseByRef } from "@/lib/db/cases";
import {
  STATUS_LABELS,
  STATUS_GUIDANCE,
  ISSUE_TYPE_LABELS,
  PARTY_ROLE_LABELS,
  CASE_STATUSES,
} from "@/lib/domain/case";
import type { CaseStatus } from "@/lib/domain/case";

// Always render fresh from DB — no caching
export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ ref: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ref } = await params;
  return {
    title: `Case ${ref} · Justice Future Platform`,
    description: `Status page for case ${ref}. This is a prototype demonstration.`,
  };
}

const STATUS_CONFIG: Record<
  CaseStatus,
  { color: string; bg: string; border: string; step: number }
> = {
  submitted:               { color: "#2563eb", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.18)", step: 1 },
  under_review:            { color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.18)", step: 2 },
  clarification_requested: { color: "#d97706", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.18)", step: 3 },
  ready_for_next_step:     { color: "#16a34a", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)", step: 4 },
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date: Date): string {
  return new Date(date).toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CasePage({ params }: Props) {
  const { ref } = await params;

  // Gracefully handle DB not configured
  let caseRecord = null;
  let dbError = false;

  try {
    caseRecord = await getCaseByRef(ref);
  } catch {
    dbError = true;
  }

  if (dbError) {
    return (
      <main
        id="main-content"
        style={{ paddingTop: "calc(var(--nav-h) + 80px)", padding: "calc(var(--nav-h) + 80px) 2rem 80px", maxWidth: "620px", margin: "0 auto" }}
      >
        <div style={{ padding: "1.5rem", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", fontSize: "0.875rem", color: "#dc2626", lineHeight: 1.7, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          <strong>Database not available.</strong> This page requires a configured database.
          See <code>.env.local.example</code> for setup instructions, then run <code>pnpm db:migrate</code>.
        </div>
      </main>
    );
  }

  if (!caseRecord) {
    notFound();
  }

  const status = caseRecord.status as CaseStatus;
  const s = STATUS_CONFIG[status] ?? STATUS_CONFIG.submitted;
  const currentStep = s.step;

  const milestones: { label: string; status: CaseStatus; step: number }[] = [
    { label: "Case submitted",           status: "submitted",               step: 1 },
    { label: "Under review",             status: "under_review",            step: 2 },
    { label: "Clarification requested",  status: "clarification_requested", step: 3 },
    { label: "Ready for next step",      status: "ready_for_next_step",     step: 4 },
  ];

  return (
    <>
      {/* Case header */}
      <header
        className="jf-grain"
        style={{
          position: "relative",
          background: "var(--c-dark)",
          paddingTop: "calc(var(--nav-h) + 48px)",
          paddingBottom: "48px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: "-5%",
            width: "500px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            role="note"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.18)",
              borderRadius: "6px",
              padding: "5px 10px",
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#d97706",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              marginBottom: "1.25rem",
            }}
          >
            Prototype — not a real legal case
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 600, color: "#334155", letterSpacing: "0.08em", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.3rem" }}>
                Case reference
              </div>
              <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0, fontFamily: "ui-monospace, monospace" }}>
                {ref}
              </h1>
            </div>
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: s.color,
                background: s.bg,
                border: `1px solid ${s.border}`,
                borderRadius: "20px",
                padding: "5px 14px",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                whiteSpace: "nowrap",
                flexShrink: 0,
                alignSelf: "center",
              }}
            >
              {STATUS_LABELS[status]}
            </span>
          </div>

          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: "0.68rem", color: "#334155", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                Issue type:{" "}
              </span>
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#64748b", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                {ISSUE_TYPE_LABELS[caseRecord.issue_type] ?? caseRecord.issue_type}
              </span>
            </div>
            <div>
              <span style={{ fontSize: "0.68rem", color: "#334155", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                Submitted:{" "}
              </span>
              <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#64748b", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                {formatDateTime(caseRecord.created_at)}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content" style={{ background: "var(--c-bg-alt)", padding: "3rem 2rem 80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Save your reference notice */}
          <div style={{ padding: "1rem 1.25rem", background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.18)", borderRadius: "8px", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
            <span style={{ fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}>◈</span>
            <div style={{ fontSize: "0.82rem", color: "var(--c-fg)", lineHeight: 1.7, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
              <strong>Save this reference number: </strong>
              <code style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, color: "var(--c-accent)", background: "rgba(37,99,235,0.08)", padding: "1px 6px", borderRadius: "4px" }}>
                {ref}
              </code>
              {" "}— it&apos;s the only way to return to this page. Bookmark this URL or copy the reference above.
            </div>
          </div>

          {/* Current status + guidance */}
          <div style={{ padding: "1.5rem", background: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px" }}>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: s.color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.5rem" }}>
              Current status
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.5rem" }}>
              {STATUS_LABELS[status]}
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--c-muted)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
              {STATUS_GUIDANCE[status]}
            </p>
          </div>

          {/* Progress milestones */}
          <div className="jf-card">
            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "1.25rem" }}>
              Progress
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {milestones.map((m, i) => {
                const isDone = m.step < currentStep;
                const isCurrent = m.step === currentStep;
                const isUpcoming = m.step > currentStep;
                const isLast = i === milestones.length - 1;

                const dotColor = isDone ? "#16a34a" : isCurrent ? s.color : "var(--c-border)";

                return (
                  <div key={m.status} style={{ display: "flex", gap: "1rem", paddingBottom: isLast ? "0" : "1.25rem", position: "relative" }}>
                    {/* Line connector */}
                    {!isLast && (
                      <div
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: "11px",
                          top: "22px",
                          width: "2px",
                          height: "calc(100% - 10px)",
                          background: isDone ? "#16a34a" : "var(--c-border)",
                        }}
                      />
                    )}
                    {/* Dot */}
                    <div style={{ flexShrink: 0, marginTop: "2px" }}>
                      <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: isDone ? "#16a34a" : isCurrent ? s.bg : "#f0ede7", border: `2px solid ${dotColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", fontWeight: 700, color: isDone ? "#fff" : isCurrent ? s.color : "var(--c-subtle)" }}>
                        {isDone ? "✓" : m.step}
                      </div>
                    </div>
                    {/* Label */}
                    <div style={{ paddingTop: "3px" }}>
                      <div style={{ fontSize: "0.82rem", fontWeight: isCurrent ? 600 : 500, color: isUpcoming ? "var(--c-subtle)" : "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        {m.label}
                      </div>
                      {isCurrent && (
                        <div style={{ fontSize: "0.72rem", color: s.color, fontFamily: "var(--font-body), system-ui, sans-serif", marginTop: "0.1rem" }}>
                          Current stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case details */}
          <div className="jf-card">
            <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "1.25rem" }}>
              Case details
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.2rem" }}>
                    Issue type
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {ISSUE_TYPE_LABELS[caseRecord.issue_type] ?? caseRecord.issue_type}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.2rem" }}>
                    Your role
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {PARTY_ROLE_LABELS[caseRecord.party_role] ?? caseRecord.party_role}
                  </div>
                </div>
                {caseRecord.relevant_date && (
                  <div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.2rem" }}>
                      Relevant date
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {caseRecord.relevant_date}
                    </div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.2rem" }}>
                    Last updated
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {formatDate(caseRecord.updated_at)}
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.5rem" }}>
                  Summary
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--c-fg)", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {caseRecord.summary}
                </p>
              </div>

              {caseRecord.notes && (
                <div>
                  <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--c-subtle)", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.5rem" }}>
                    Additional notes
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--c-muted)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {caseRecord.notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Prototype framing */}
          <div
            role="note"
            style={{
              padding: "1.25rem 1.5rem",
              background: "#fffbf0",
              border: "1px solid #fde68a",
              borderRadius: "8px",
              fontSize: "0.82rem",
              color: "#92400e",
              lineHeight: 1.75,
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            <strong>This is a prototype demonstration.</strong> This case record is stored in a
            development database. This is not legal advice and has no legal effect. No court,
            government body, or legal institution is connected to this platform. This page
            demonstrates how a real case status page would work.
          </div>

          {/* Footer actions */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/demo/case/rental-deposit-2026" className="jf-btn jf-btn-outline">
              See the interactive demo →
            </Link>
            <Link href="/start" className="jf-btn" style={{ background: "transparent", color: "var(--c-muted)", border: "1px solid var(--c-border)", fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.875rem" }}>
              Submit another case
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
