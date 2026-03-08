import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Interface Design · Justice Future Platform",
  description:
    "How future institutional integrations will connect. Clean interface contracts defined before any real connections exist.",
};

const domains = [
  {
    name: "Case API",
    base: "/v1/cases",
    description: "Create and manage structured case records. Enforces status transitions through a defined state machine.",
    endpoints: [
      { method: "POST",  path: "/v1/cases",              note: "Create a new case record" },
      { method: "GET",   path: "/v1/cases/{id}",         note: "Retrieve case state and metadata" },
      { method: "PATCH", path: "/v1/cases/{id}/status",  note: "Advance case status (validated transition)" },
    ],
  },
  {
    name: "Communication API",
    base: "/v1/cases/{id}/messages",
    description: "Structured, threaded, documented communication. Immutable once submitted. Not email — a proper message record.",
    endpoints: [
      { method: "POST", path: "/v1/cases/{id}/messages",      note: "Submit a structured message" },
      { method: "GET",  path: "/v1/cases/{id}/messages",      note: "List all messages for a case" },
      { method: "POST", path: "/v1/cases/{id}/messages/{mid}/ack", note: "Acknowledge message receipt" },
    ],
  },
  {
    name: "Document API",
    base: "/v1/cases/{id}/documents",
    description: "Upload, retrieve, and label documents and evidence. Versioned. Access-controlled. Timestamped.",
    endpoints: [
      { method: "POST", path: "/v1/cases/{id}/documents",         note: "Upload a document with metadata" },
      { method: "GET",  path: "/v1/cases/{id}/documents",         note: "List documents for a case" },
      { method: "GET",  path: "/v1/cases/{id}/documents/{did}",   note: "Retrieve a specific document" },
    ],
  },
  {
    name: "Audit API",
    base: "/v1/cases/{id}/audit",
    description: "Read-only access to the append-only audit log. Every system action is recorded here. Required for institutional trust.",
    endpoints: [
      { method: "GET", path: "/v1/cases/{id}/audit",              note: "Full audit trail for a case (privileged)" },
      { method: "GET", path: "/v1/cases/{id}/audit?actor={id}",   note: "Filter by actor" },
    ],
  },
  {
    name: "Identity API",
    base: "/v1/identity",
    description: "Future: verify user identity against institutional providers. Placeholder — no real integration exists today.",
    endpoints: [
      { method: "POST", path: "/v1/identity/verify",        note: "Request identity verification (future)" },
      { method: "GET",  path: "/v1/identity/{id}/status",   note: "Check verification status (future)" },
    ],
  },
];

const methodColor: Record<string, string> = {
  GET:   "#86efac",
  POST:  "#93c5fd",
  PATCH: "#fbbf24",
  PUT:   "#fbbf24",
  DELETE:"#f87171",
};

export default function ApiPage() {
  return (
    <>
      <PageHeader
        overline="Interface Design"
        title={
          <>
            How future integrations
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              will connect.
            </span>
          </>
        }
        description="Clean interface contracts defined before any real connections exist. This is what good integration architecture looks like."
      />

      <main id="main-content">

        {/* Why it matters */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Why This Comes First</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Connecting to real institutions is a trust problem first,{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>a technical problem second.</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "1.5rem" }}>
                Integrating a digital platform with real justice institutions requires clear answers to hard questions before any code is written: What data flows? Who owns it? What audit obligations apply? What happens when something goes wrong? Who is authorized to do what?
              </p>
              <p className="jf-prose" style={{ maxWidth: "660px" }}>
                Designing the interfaces first — before any real connections exist — forces those questions to be answered in a structured way. These are conceptual API contracts, not live endpoints. They exist to demonstrate what real integration would require.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* API domains */}
        <section style={{ background: "var(--c-bg-alt)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Interface Domains</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "2.5rem" }}>
                Five conceptual API domains.
              </h2>
            </AnimateIn>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {domains.map((domain, i) => (
                <AnimateIn key={domain.name} delay={i * 80 + 100}>
                  <div className="jf-card" style={{ padding: "0" }}>
                    {/* Domain header */}
                    <div style={{ padding: "1.25rem 1.75rem", borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--c-fg)", marginBottom: "0.2rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                          {domain.name}
                        </div>
                        <div className="jf-prose" style={{ fontSize: "0.82rem" }}>
                          {domain.description}
                        </div>
                      </div>
                    </div>
                    {/* Endpoints */}
                    <div style={{ padding: "0.75rem 1.75rem 1.25rem" }}>
                      {domain.endpoints.map((ep) => (
                        <div key={ep.path} style={{ display: "flex", alignItems: "baseline", gap: "0.875rem", padding: "0.5rem 0", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                          <span style={{
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            color: methodColor[ep.method] ?? "#94a3b8",
                            fontFamily: "ui-monospace, monospace",
                            minWidth: "44px",
                            letterSpacing: "0.04em",
                          }}>
                            {ep.method}
                          </span>
                          <code style={{ fontSize: "0.78rem", color: "#334155", fontFamily: "ui-monospace, monospace", flex: 1 }}>
                            {ep.path}
                          </code>
                          <span style={{ fontSize: "0.75rem", color: "var(--c-subtle)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                            {ep.note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Example contract */}
        <section
          className="jf-grain"
          style={{ background: "var(--c-dark)", padding: "80px 2rem", position: "relative", overflow: "hidden" }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "700px", height: "400px",
              background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <AnimateIn>
              <SectionLabel dark>Example Contract</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2, marginBottom: "2rem" }}>
                What a case creation looks like.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                {/* Request */}
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.75rem" }}>
                    Request — POST /v1/cases
                  </div>
                  <div className="jf-code-block">
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
{`{
  `}<span className="t-key">&quot;type&quot;</span>{`: `}<span className="t-str">&quot;contract_dispute&quot;</span>{`,
  `}<span className="t-key">&quot;parties&quot;</span>{`: [
    {
      `}<span className="t-key">&quot;role&quot;</span>{`: `}<span className="t-str">&quot;initiating&quot;</span>{`,
      `}<span className="t-key">&quot;id&quot;</span>{`: `}<span className="t-str">&quot;user_a1b2&quot;</span>{`
    },
    {
      `}<span className="t-key">&quot;role&quot;</span>{`: `}<span className="t-str">&quot;responding&quot;</span>{`,
      `}<span className="t-key">&quot;id&quot;</span>{`: `}<span className="t-str">&quot;user_c3d4&quot;</span>{`
    }
  ],
  `}<span className="t-key">&quot;summary&quot;</span>{`: `}<span className="t-str">&quot;Structured description...&quot;</span>{`,
  `}<span className="t-key">&quot;requested_outcome&quot;</span>{`: `}<span className="t-str">&quot;clarification&quot;</span>{`
}`}
                    </pre>
                  </div>
                </div>

                {/* Response */}
                <div>
                  <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.75rem" }}>
                    Response — 201 Created
                  </div>
                  <div className="jf-code-block">
                    <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
{`{
  `}<span className="t-key">&quot;id&quot;</span>{`: `}<span className="t-str">&quot;case_7f2a9b&quot;</span>{`,
  `}<span className="t-key">&quot;status&quot;</span>{`: `}<span className="t-str">&quot;intake_complete&quot;</span>{`,
  `}<span className="t-key">&quot;created_at&quot;</span>{`: `}<span className="t-str">&quot;2026-03-08T14:00:00Z&quot;</span>{`,
  `}<span className="t-key">&quot;next_step&quot;</span>{`: `}<span className="t-str">&quot;awaiting_response&quot;</span>{`,
  `}<span className="t-key">&quot;expires_at&quot;</span>{`: `}<span className="t-str">&quot;2026-03-22T14:00:00Z&quot;</span>{`,
  `}<span className="t-key">&quot;audit_ref&quot;</span>{`: `}<span className="t-str">&quot;audit_9k1m3p&quot;</span>{`
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Principles */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Design Principles</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "2.5rem" }}>
                Four non-negotiables.
              </h2>
            </AnimateIn>
            <AnimateIn delay={120} stagger>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  {
                    title: "Authentication",
                    body: "Every request is authenticated. Identity is explicit. Institutional credentials use separate trust chains with defined scope. No ambient authority — every access is deliberate and logged.",
                  },
                  {
                    title: "Versioning",
                    body: "All routes are versioned from day one (/v1/, /v2/). Breaking changes always increment the major version. Old versions are supported through a defined deprecation window — no surprise breaks for integration partners.",
                  },
                  {
                    title: "Auditability",
                    body: "Every mutation is logged to the audit trail. Audit logs are append-only. Access to audit data is role-controlled. When real institutional integrations begin, audit data will be subject to explicit data agreements.",
                  },
                  {
                    title: "Explicit boundaries",
                    body: "No integration has direct database access. No integration bypasses the interface layer. Every external system is an adapter with a defined contract — not a trusted internal service.",
                  },
                ].map((p, i, arr) => (
                  <div
                    key={p.title}
                    className="jf-principle-row"
                    style={{ padding: "1.75rem 0", borderBottom: i < arr.length - 1 ? "1px solid var(--c-border)" : "none" }}
                  >
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {p.title}
                    </div>
                    <div className="jf-prose" style={{ fontSize: "0.875rem" }}>
                      {p.body}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div
                role="note"
                style={{ marginTop: "2.5rem", padding: "1.25rem 1.5rem", background: "#fffbf0", border: "1px solid #fde68a", borderRadius: "8px", fontSize: "0.84rem", color: "#92400e", lineHeight: 1.7, fontFamily: "var(--font-body), system-ui, sans-serif" }}
              >
                <strong>Current status:</strong> None of these APIs are live or connected to real institutions. These are interface specifications — future contracts, not current endpoints. They exist to demonstrate the design intent and prepare for real integration when the time is right.
              </div>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
