import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Architecture · Justice Future Platform",
  description:
    "How the Justice Future platform is designed — explained plainly first, with technical detail for those who need it.",
};

const modules = [
  {
    number: "01",
    name: "Case Intake",
    plain: "The front door. A user submits a structured description of their situation.",
    technical: "Validates input against a case schema. Produces a structured case record with a stable ID, status, parties, and initial document references.",
    boundary: "Read/write. External parties submit. Internal modules consume.",
  },
  {
    number: "02",
    name: "Workflow Engine",
    plain: "Manages where a case is in the process. What has happened, what's next, what's waiting.",
    technical: "A state machine over case status. Enforces valid transitions. Emits events on state change. Drives notifications and next-step guidance.",
    boundary: "Internal only. Driven by case events. Readable via audit API.",
  },
  {
    number: "03",
    name: "Communication Layer",
    plain: "Structured, documented messaging between parties. Not email. A proper record.",
    technical: "Threaded messages with sender attribution, timestamps, delivery receipts, and read acknowledgements. Immutable once submitted. Indexed per case.",
    boundary: "Read/write. Parties submit via UI. Readable via audit trail.",
  },
  {
    number: "04",
    name: "Evidence & Documents",
    plain: "A single organized place for files, photos, contracts, and other materials.",
    technical: "File storage with case-scoped access control. Versioned. Metadata indexed. Timestamped at upload. Future: digital signature verification.",
    boundary: "Write on upload. Read with access control. Referenced by case record.",
  },
  {
    number: "05",
    name: "Audit Trail",
    plain: "Every action is recorded. Who did what, when, and why. Nothing disappears.",
    technical: "Append-only event log. Every state change, message, document upload, and access event is written here. Required for institutional trust.",
    boundary: "Write-only by system. Read via privileged audit API only.",
  },
  {
    number: "06",
    name: "Interface Layer",
    plain: "The future connection point with external institutions and systems.",
    technical: "Versioned REST API surface. Designed around explicit contracts. Auth via token + scope. Each integration is a defined adapter, not a hardcoded assumption.",
    boundary: "External. Authenticated. Version-pinned. No raw DB access.",
  },
  {
    number: "07",
    name: "Admin & Operations",
    plain: "Internal tooling for oversight, escalation, intervention, and case management.",
    technical: "Role-based access. Case review dashboards. Escalation triggers. Audit log access. No automated enforcement — human review required for consequential actions.",
    boundary: "Internal. Privileged roles only. All actions logged to audit trail.",
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        overline="Architecture"
        title={
          <>
            How the platform
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              is designed to work.
            </span>
          </>
        }
        description="Plain language first. Technical depth for those who need it. Every module has a clear job, clear boundaries, and clear dependencies."
      />

      <main id="main-content">

        {/* Plain language overview */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>The Big Picture</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Distinct modules.{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>Defined boundaries. Clean interfaces.</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "1.5rem" }}>
                The platform is designed as a set of distinct but connected modules. Each module has a clear job. They communicate through defined interfaces. This makes the system auditable, maintainable, and extensible — and allows each module to be replaced or extracted independently as the platform evolves.
              </p>
              <p className="jf-prose" style={{ maxWidth: "660px" }}>
                This is not premature abstraction. It is the minimum structure required for a platform that will eventually need to connect with real institutions, demonstrate auditability, and earn institutional trust.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Architecture diagram (text-based) */}
        <section style={{ background: "var(--c-bg-alt)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>System Overview</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <div className="jf-code-block" style={{ fontFamily: "var(--font-body, system-ui, sans-serif)", fontSize: "0.82rem" }}>
                <pre style={{ margin: 0, whiteSpace: "pre", fontFamily: "inherit", overflowX: "auto" }}>
{`┌─────────────────────────────────────────────────────┐
│                   User Interface                     │
│          (Next.js · Accessible · Responsive)         │
└────────────────────────┬────────────────────────────┘
                         │
          ┌──────────────▼──────────────┐
          │        Case Intake           │  ← structured intake
          └──────────────┬──────────────┘
                         │
          ┌──────────────▼──────────────┐
          │      Workflow Engine          │  ← state machine
          └────┬──────────┬─────────────┘
               │          │
    ┌──────────▼──┐  ┌────▼───────────────┐
    │ Communication│  │  Evidence & Docs    │
    │    Layer     │  │  (files, metadata)  │
    └──────────────┘  └────────────────────┘
               │          │
          ┌────▼──────────▼─────────────┐
          │         Audit Trail          │  ← append-only log
          └──────────────┬──────────────┘
                         │
          ┌──────────────▼──────────────┐
          │       Interface Layer         │  ← versioned API
          └──────────────┬──────────────┘
                         │
          ┌──────────────▼──────────────┐
          │  Future: Institutional APIs   │  ← not yet connected
          └─────────────────────────────┘`}
                </pre>
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Module detail */}
        <section
          className="jf-grain"
          style={{ background: "var(--c-dark)", padding: "80px 2rem", position: "relative", overflow: "hidden" }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute", top: "30%", right: "-5%",
              width: "500px", height: "500px",
              background: "radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            <AnimateIn>
              <SectionLabel dark>Module Reference</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2, marginBottom: "2.5rem" }}>
                Seven modules. Each with a precise job.
              </h2>
            </AnimateIn>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {modules.map((mod, i) => (
                <AnimateIn key={mod.name} delay={i * 60 + 100}>
                  <div
                    style={{
                      padding: "2rem 0",
                      borderBottom: i < modules.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                      display: "grid",
                      gridTemplateColumns: "80px 1fr",
                      gap: "1.5rem",
                      alignItems: "start",
                    }}
                  >
                    {/* Number */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#1e293b", fontFamily: "var(--font-body), system-ui, sans-serif", letterSpacing: "0.08em" }}>
                        {mod.number}
                      </span>
                      <div style={{ width: "20px", height: "1px", background: "#1e3a5f" }} />
                    </div>

                    {/* Content */}
                    <div>
                      <div style={{ fontSize: "1rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.6rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        {mod.name}
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.7, marginBottom: "0.875rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        {mod.plain}
                      </p>
                      {/* Technical detail */}
                      <div style={{ padding: "1rem 1.25rem", background: "rgba(0,0,0,0.25)", borderRadius: "6px", borderLeft: "2px solid #1e3a5f", marginBottom: "0.75rem" }}>
                        <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.4rem" }}>
                          Technical
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#475569", lineHeight: 1.65, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                          {mod.technical}
                        </p>
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#334155", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        <span style={{ color: "#1e3a5f", fontWeight: 600, marginRight: "0.4rem" }}>Boundary:</span>
                        {mod.boundary}
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>

        {/* Integration philosophy */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Integration Philosophy</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Contracts before connections.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130}>
              <p className="jf-prose" style={{ maxWidth: "640px", marginBottom: "1.5rem" }}>
                No real institutional integration exists today. The architecture is designed so that future integration is clean: every external connection goes through the interface layer, every interaction is logged to the audit trail, and every integration is a defined adapter with an explicit contract.
              </p>
              <p className="jf-prose" style={{ maxWidth: "640px", marginBottom: "2.5rem" }}>
                This is not a workaround. Designing interfaces before implementing them is the right order. It forces clarity about what data flows, who owns it, what auth is required, and what audit obligations exist — before any real institution is involved.
              </p>
              <a href="/api" className="jf-btn jf-btn-outline">
                See the interface design →
              </a>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
