"use client";

import { useState } from "react";
import type {
  DemoCase,
  TimelineEvent,
  MockDocument,
  Message,
  AvailableAction,
} from "@/lib/demo/data";

// ─── Tab types ──────────────────────────────────────────────────────────────
type Tab = "overview" | "timeline" | "documents" | "messages" | "next-steps";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview",   label: "Overview" },
  { id: "timeline",   label: "Timeline" },
  { id: "documents",  label: "Documents" },
  { id: "messages",   label: "Messages" },
  { id: "next-steps", label: "Next Steps" },
];

// ─── Status config ──────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  clarification_in_progress: { color: "#2563eb", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.18)" },
  intake_complete:            { color: "#16a34a", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
  notice_delivered:           { color: "#d97706", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.18)" },
  response_received:          { color: "#7c3aed", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.18)" },
  documents_uploaded:         { color: "#0891b2", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.18)" },
  settlement_available:       { color: "#16a34a", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
  escalation_possible:        { color: "#dc2626", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.18)" },
  resolved:                   { color: "#16a34a", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
};

const ACTION_COLORS = {
  primary:   { color: "#2563eb", bg: "rgba(37,99,235,0.06)", border: "rgba(37,99,235,0.25)", dot: "#2563eb" },
  secondary: { color: "var(--c-fg)", bg: "#f8f7f5", border: "var(--c-border)", dot: "var(--c-subtle)" },
  caution:   { color: "#92400e", bg: "rgba(254,252,232,0.9)", border: "rgba(251,191,36,0.3)", dot: "#d97706" },
};

const DOC_STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  verified: { color: "#16a34a", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)" },
  pending:  { color: "#d97706", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.18)" },
  reviewed: { color: "#2563eb", bg: "rgba(37,99,235,0.08)", border: "rgba(37,99,235,0.18)" },
};

const MSG_COLORS: Record<string, { border: string; dot: string }> = {
  system_notice:  { border: "rgba(100,116,139,0.2)", dot: "#94a3b8" },
  party_message:  { border: "rgba(37,99,235,0.2)",   dot: "#2563eb" },
  status_update:  { border: "rgba(34,197,94,0.2)",   dot: "#16a34a" },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function OverviewTab({ caseData }: { caseData: DemoCase }) {
  const s = STATUS_CONFIG[caseData.status] ?? STATUS_CONFIG.intake_complete;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* Summary */}
      <div className="jf-card">
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.75rem" }}>
          Case Summary
        </div>
        <p style={{ fontSize: "0.9rem", color: "var(--c-muted)", lineHeight: 1.75, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          {caseData.summary}
        </p>
      </div>

      {/* Quick stats */}
      <div className="jf-case-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--c-border)", border: "1px solid var(--c-border)", borderRadius: "8px", overflow: "hidden" }}>
        {[
          { label: "Active for", value: `${caseData.daysActive} days` },
          { label: "Documents", value: `${caseData.documents.length} submitted` },
          { label: "Messages", value: `${caseData.messages.length} in thread` },
          { label: "Deadline", value: caseData.deadlineAt },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: "#f8f7f5", padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.3rem" }}>
              {label}
            </div>
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Parties */}
      <div className="jf-card">
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.875rem" }}>
          Involved parties
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {caseData.parties.map((party) => (
            <div key={party.role} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: party.role === "initiating" ? "rgba(37,99,235,0.1)" : "rgba(100,116,139,0.1)", border: `1px solid ${party.role === "initiating" ? "rgba(37,99,235,0.2)" : "rgba(100,116,139,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: 700, color: party.role === "initiating" ? "#2563eb" : "#64748b", fontFamily: "ui-monospace, monospace", flexShrink: 0 }}>
                {party.label.split(" ")[1]}
              </div>
              <div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {party.label}
                  <span style={{ marginLeft: "0.5rem", fontSize: "0.65rem", fontWeight: 600, color: party.role === "initiating" ? "#2563eb" : "#64748b", background: party.role === "initiating" ? "rgba(37,99,235,0.08)" : "rgba(100,116,139,0.08)", borderRadius: "4px", padding: "2px 6px", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {party.role}
                  </span>
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--c-muted)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {party.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current position */}
      <div style={{ padding: "1.25rem 1.5rem", background: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px" }}>
        <div style={{ fontSize: "0.65rem", fontWeight: 700, color: s.color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.5rem" }}>
          Current position
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--c-fg)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          {caseData.statusDescription}
        </p>
      </div>

    </div>
  );
}

function TimelineTab({ events }: { events: TimelineEvent[] }) {
  return (
    <div>
      <div style={{ position: "relative", paddingLeft: "2rem" }}>
        {/* Vertical line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "7px",
            top: "8px",
            bottom: "8px",
            width: "2px",
            background: "linear-gradient(to bottom, rgba(37,99,235,0.3), rgba(100,116,139,0.1))",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {events.map((event, i) => {
            const isLast = i === events.length - 1;
            const dotColor =
              event.status === "complete" ? "#16a34a" :
              event.status === "current"  ? "#2563eb" : "#e2e8eb";
            const dotBorder =
              event.status === "complete" ? "rgba(34,197,94,0.4)" :
              event.status === "current"  ? "rgba(37,99,235,0.4)" : "rgba(148,163,184,0.3)";

            return (
              <div
                key={event.id}
                style={{ position: "relative", paddingBottom: isLast ? "0" : "2rem" }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-25px",
                    top: "3px",
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: dotColor,
                    border: `2px solid ${dotBorder}`,
                    boxShadow: event.status === "current" ? "0 0 0 4px rgba(37,99,235,0.12)" : "none",
                  }}
                />

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {event.title}
                    </span>
                    {event.status === "current" && (
                      <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#2563eb", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)", borderRadius: "20px", padding: "2px 8px", letterSpacing: "0.06em", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        Current
                      </span>
                    )}
                    {event.status === "upcoming" && (
                      <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "var(--c-subtle)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        Upcoming
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--c-subtle)", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.4rem", letterSpacing: "0.02em" }}>
                    {event.date}
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--c-muted)", lineHeight: 1.65, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DocumentsTab({ documents }: { documents: MockDocument[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {documents.map((doc) => {
        const s = DOC_STATUS_CONFIG[doc.status];
        return (
          <div
            key={doc.id}
            className="jf-card"
            style={{ padding: "1rem 1.25rem", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "1rem", alignItems: "start" }}
          >
            {/* File icon */}
            <div style={{ width: "40px", height: "40px", borderRadius: "6px", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#2563eb", fontFamily: "ui-monospace, monospace", letterSpacing: "0.04em" }}>
                {doc.fileType}
              </span>
            </div>

            {/* Details */}
            <div>
              <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.2rem" }}>
                {doc.name}
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--c-subtle)", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.5rem" }}>
                Uploaded by {doc.uploadedBy} · {doc.uploadedAt} · {doc.size}
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--c-muted)", lineHeight: 1.6, margin: "0 0 0.5rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                {doc.description}
              </p>
              <div style={{ fontSize: "0.72rem", color: s.color, background: s.bg, border: `1px solid ${s.border}`, display: "inline-block", borderRadius: "4px", padding: "2px 7px", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                {doc.statusNote}
              </div>
            </div>

            {/* Status badge */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem", flexShrink: 0 }}>
              <span style={{ fontSize: "0.62rem", fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: "20px", padding: "3px 9px", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", whiteSpace: "nowrap" }}>
                {doc.status}
              </span>
            </div>
          </div>
        );
      })}

      {/* Note */}
      <div style={{ padding: "0.875rem 1.125rem", background: "#f8f7f5", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.78rem", color: "var(--c-muted)", lineHeight: 1.65, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
        <strong style={{ color: "var(--c-fg)" }}>In a real case:</strong> Every document is timestamped at upload, assigned an integrity hash, and added to the case audit trail. Access is controlled — each party sees only documents they are permitted to view.
      </div>
    </div>
  );
}

function MessagesTab({ messages }: { messages: Message[] }) {
  const msgTypeLabel: Record<string, string> = {
    system_notice: "System notice",
    party_message: "Party message",
    status_update: "Status update",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {messages.map((msg) => {
        const c = MSG_COLORS[msg.type];
        const isSystem = msg.type === "system_notice" || msg.type === "status_update";
        return (
          <div
            key={msg.id}
            style={{
              padding: "1rem 1.25rem",
              background: isSystem ? "#f8f7f5" : "#fff",
              border: `1px solid ${c.border}`,
              borderRadius: "8px",
              borderLeft: `3px solid ${c.dot}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {msg.from}
                </span>
                <span style={{ fontSize: "0.62rem", color: "var(--c-subtle)", background: "rgba(100,116,139,0.08)", borderRadius: "4px", padding: "2px 6px", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {msgTypeLabel[msg.type]}
                </span>
                {!msg.acknowledged && (
                  <span style={{ fontSize: "0.62rem", fontWeight: 700, color: "#d97706", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "4px", padding: "2px 6px", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    Unread
                  </span>
                )}
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--c-subtle)", fontFamily: "var(--font-body), system-ui, sans-serif", whiteSpace: "nowrap" }}>
                {msg.sentAt}
              </span>
            </div>
            <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.4rem" }}>
              {msg.subject}
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--c-muted)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
              {msg.body}
            </p>
          </div>
        );
      })}

      {/* Note */}
      <div style={{ padding: "0.875rem 1.125rem", background: "#f8f7f5", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.78rem", color: "var(--c-muted)", lineHeight: 1.65, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
        <strong style={{ color: "var(--c-fg)" }}>In a real case:</strong> All messages are immutable once submitted. Every message is attributed, timestamped, and delivery-acknowledged. This thread is the official communication record of the case.
      </div>
    </div>
  );
}

function NextStepsTab({ caseData }: { caseData: DemoCase }) {
  const ns = caseData.nextSteps;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {[
        { label: "Where things stand now", body: ns.current, color: "#2563eb", bg: "rgba(37,99,235,0.06)", border: "rgba(37,99,235,0.18)" },
        { label: "If no action is taken", body: ns.ifNoAction, color: "#d97706", bg: "rgba(251,191,36,0.06)", border: "rgba(251,191,36,0.18)" },
        { label: "If clarification succeeds", body: ns.ifClarificationSucceeds, color: "#16a34a", bg: "rgba(34,197,94,0.06)", border: "rgba(34,197,94,0.18)" },
        { label: "If escalation becomes necessary", body: ns.ifEscalationRequired, color: "#475569", bg: "rgba(100,116,139,0.06)", border: "rgba(100,116,139,0.15)" },
      ].map(({ label, body, color, bg, border }) => (
        <div
          key={label}
          style={{ padding: "1.25rem 1.5rem", background: bg, border: `1px solid ${border}`, borderRadius: "8px" }}
        >
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.5rem" }}>
            {label}
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--c-fg)", lineHeight: 1.7, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
            {body}
          </p>
        </div>
      ))}

      {/* Honest note */}
      <div
        role="note"
        style={{ marginTop: "0.5rem", padding: "1rem 1.25rem", background: "#fffbf0", border: "1px solid #fde68a", borderRadius: "8px", fontSize: "0.78rem", color: "#92400e", lineHeight: 1.7, fontFamily: "var(--font-body), system-ui, sans-serif" }}
      >
        <strong>This is a simulation.</strong> The scenarios described above show how the platform is designed to work — not what it can currently do with live institutional backing. No real case is affected by anything in this demo.
      </div>
    </div>
  );
}

// ─── Action panel ────────────────────────────────────────────────────────────
function ActionPanel({ actions }: { actions: AvailableAction[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
      {actions.map((action) => {
        const c = ACTION_COLORS[action.type];
        const isExpanded = expandedId === action.id;
        return (
          <div key={action.id}>
            <button
              onClick={() => handleClick(action.id)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                padding: "0.875rem 1rem",
                border: `1px solid ${c.border}`,
                borderRadius: isExpanded ? "8px 8px 0 0" : "8px",
                background: c.bg,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "border-color 0.15s",
                fontFamily: "var(--font-body), system-ui, sans-serif",
              }}
              aria-expanded={isExpanded}
            >
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.dot, marginTop: "5px", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--c-fg)", marginBottom: "0.15rem", lineHeight: 1.4 }}>
                  {action.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--c-muted)", lineHeight: 1.5 }}>
                  {action.description}
                </div>
                {action.deadlineNote && !isExpanded && (
                  <div style={{ marginTop: "0.3rem", fontSize: "0.68rem", fontWeight: 600, color: "#d97706" }}>
                    {action.deadlineNote}
                  </div>
                )}
              </div>
              <span style={{ fontSize: "0.65rem", color: "var(--c-subtle)", flexShrink: 0, marginTop: "2px", transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                ▼
              </span>
            </button>
            {isExpanded && (
              <div
                style={{
                  padding: "0.875rem 1rem",
                  background: "#f8f7f5",
                  border: `1px solid ${c.border}`,
                  borderTop: "none",
                  borderRadius: "0 0 8px 8px",
                  fontSize: "0.78rem",
                  color: "var(--c-muted)",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
              >
                <strong style={{ color: "var(--c-fg)", display: "block", marginBottom: "0.3rem", fontSize: "0.72rem", letterSpacing: "0.04em" }}>
                  Simulation note:
                </strong>
                {action.detail}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function CaseDetail({ caseData }: { caseData: DemoCase }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const s = STATUS_CONFIG[caseData.status] ?? STATUS_CONFIG.intake_complete;

  return (
    <div>

      {/* Case header */}
      <div
        className="jf-grain"
        style={{
          background: "var(--c-dark)",
          paddingTop: "calc(var(--nav-h) + 48px)",
          paddingBottom: "48px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden style={{ position: "absolute", top: 0, right: "-5%", width: "500px", height: "400px", background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1040px", margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Prototype banner */}
          <div
            role="note"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.18)", borderRadius: "6px", padding: "5px 10px", fontSize: "0.68rem", fontWeight: 600, color: "#d97706", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "1.25rem" }}
          >
            Prototype simulation — not a real case
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
            <div>
              <div style={{ fontSize: "0.72rem", fontWeight: 600, color: "#334155", letterSpacing: "0.08em", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.4rem" }}>
                {caseData.caseRef} · {caseData.issueType}
              </div>
              <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2, margin: 0, maxWidth: "640px" }}>
                {caseData.title}
              </h1>
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: s.color, background: s.bg, border: `1px solid ${s.border}`, borderRadius: "20px", padding: "5px 12px", letterSpacing: "0.04em", fontFamily: "var(--font-body), system-ui, sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>
              {caseData.statusLabel}
            </span>
          </div>

          {/* Meta row */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "Created", value: caseData.createdAt },
              { label: "Next checkpoint", value: caseData.nextCheckpoint },
              { label: "Deadline", value: caseData.deadlineAt },
            ].map(({ label, value }) => (
              <div key={label}>
                <span style={{ fontSize: "0.68rem", color: "#334155", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {label}:{" "}
                </span>
                <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "#64748b", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ background: "var(--c-bg-alt)", minHeight: "60vh" }}>
        <div className="jf-case-layout" style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 2rem 80px", display: "grid", gridTemplateColumns: "1fr 320px", gap: "2rem", alignItems: "start" }}>

          {/* Left: tabbed content */}
          <div>
            {/* Tab bar */}
            <div
              role="tablist"
              style={{
                display: "flex",
                gap: "0",
                borderBottom: "1px solid var(--c-border)",
                marginBottom: "1.75rem",
                overflowX: "auto",
                background: "var(--c-bg-alt)",
                position: "sticky",
                top: "var(--nav-h)",
                zIndex: 10,
              }}
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "1rem 1.25rem",
                    fontSize: "0.8rem",
                    fontWeight: 500,
                    color: activeTab === tab.id ? "var(--c-accent)" : "var(--c-subtle)",
                    cursor: "pointer",
                    border: "none",
                    borderBottom: activeTab === tab.id ? "2px solid var(--c-accent)" : "2px solid transparent",
                    background: "transparent",
                    transition: "color 0.15s, border-color 0.15s",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    whiteSpace: "nowrap",
                    marginBottom: "-1px",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab panels */}
            <div role="tabpanel">
              {activeTab === "overview"   && <OverviewTab caseData={caseData} />}
              {activeTab === "timeline"   && <TimelineTab events={caseData.timeline} />}
              {activeTab === "documents"  && <DocumentsTab documents={caseData.documents} />}
              {activeTab === "messages"   && <MessagesTab messages={caseData.messages} />}
              {activeTab === "next-steps" && <NextStepsTab caseData={caseData} />}
            </div>
          </div>

          {/* Right: action sidebar */}
          <div style={{ paddingTop: "3.25rem" }}>
            <div style={{ position: "sticky", top: "calc(var(--nav-h) + 1rem)", display: "flex", flexDirection: "column", gap: "1rem" }}>

              {/* Current status card */}
              <div style={{ padding: "1rem 1.25rem", background: s.bg, border: `1px solid ${s.border}`, borderRadius: "8px" }}>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, color: s.color, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.4rem" }}>
                  Current status
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.3rem" }}>
                  {caseData.statusLabel}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#d97706", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  Deadline: {caseData.deadlineAt}
                </div>
              </div>

              {/* Actions */}
              <div className="jf-card" style={{ padding: "1rem 1.25rem" }}>
                <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.875rem" }}>
                  Available actions
                </div>
                <ActionPanel actions={caseData.actions} />
              </div>

              {/* Audit note */}
              <div style={{ padding: "0.875rem 1rem", background: "#f8f7f5", border: "1px solid var(--c-border)", borderRadius: "6px", fontSize: "0.72rem", color: "var(--c-muted)", lineHeight: 1.6, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                Every action taken in this case is recorded in an append-only audit trail. Nothing is deleted or modified retroactively.
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
