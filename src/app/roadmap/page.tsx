import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "Roadmap · Justice Future Platform",
  description:
    "Five phases from public prototype to real institutional integration. Honest about where each phase starts and what it requires.",
};

const phases = [
  {
    number: "01",
    name: "Public Prototype",
    status: "active" as const,
    statusLabel: "In progress",
    summary: "A publicly accessible, fully designed platform that demonstrates the full user journey — from intake to resolution — without any live data or institutional connection.",
    goals: [
      "All core pages live and publicly accessible",
      "Structured intake flow with guided questions",
      "Case detail view with status, messages, and documents",
      "Architecture and API documentation published",
      "Honest framing throughout — no claims beyond the prototype",
    ],
    exit: "Anyone can visit the platform, understand its purpose, and navigate a complete simulated user flow.",
  },
  {
    number: "02",
    name: "Structured Product",
    status: "planned" as const,
    statusLabel: "Planned",
    summary: "A real working product where actual users can create cases, exchange structured messages, and upload documents — with a full audit trail. No institutional integration, but real data and real value.",
    goals: [
      "User authentication and persistent case records",
      "Working communication layer with message threading",
      "Document upload with timestamping and access control",
      "Admin interface for escalation and oversight",
      "Full audit trail for every action",
    ],
    exit: "Two real parties can use the platform to structure and document a dispute, fully audited, before any formal process begins.",
  },
  {
    number: "03",
    name: "Mock Integrations",
    status: "planned" as const,
    statusLabel: "Planned",
    summary: "The interface layer is implemented and tested against simulated institutional endpoints. All integration contracts are published. Real institutions can review what connection would require.",
    goals: [
      "Versioned REST API fully implemented and documented",
      "Adapter framework built and tested against mock endpoints",
      "Identity verification flow designed (mock only)",
      "Integration review documentation published for external partners",
      "Security review completed",
    ],
    exit: "A technical reviewer from a real institution can evaluate what real integration would require — and say yes or no based on a real specification.",
  },
  {
    number: "04",
    name: "Pilot Readiness",
    status: "future" as const,
    statusLabel: "Future",
    summary: "Legal, governance, and operational work required before any real institution connects. Data agreements, privacy analysis, liability questions, and governance structure are resolved.",
    goals: [
      "Privacy impact assessment completed",
      "Data ownership and retention policies established",
      "Governance structure defined (who operates this, under what authority)",
      "Legal liability questions addressed",
      "At least one institutional partner willing to evaluate connection",
    ],
    exit: "The platform can legally and ethically connect to a real institution, with clear accountability at every layer.",
  },
  {
    number: "05",
    name: "Real Integration Pilot",
    status: "future" as const,
    statusLabel: "Future",
    summary: "A limited, supervised pilot with one real institutional partner. Cases processed through the platform are connected to a real institutional workflow. Scope is narrow by design.",
    goals: [
      "One real institutional integration, narrow scope",
      "Supervised pilot with explicit boundaries",
      "Audit trail reviewed by institutional partner",
      "Outcomes measured against the problem the platform was designed to solve",
      "Public report on what worked, what didn't, what's next",
    ],
    exit: "One real case has been supported by the platform with a real institutional connection — transparently reported.",
  },
];

const statusStyles: Record<string, { bg: string; color: string; border: string }> = {
  active:   { bg: "rgba(34,197,94,0.08)",  color: "#16a34a", border: "rgba(34,197,94,0.2)" },
  planned:  { bg: "rgba(59,130,246,0.08)", color: "#3b82f6", border: "rgba(59,130,246,0.2)" },
  future:   { bg: "rgba(100,116,139,0.08)", color: "#475569", border: "rgba(100,116,139,0.15)" },
};

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        overline="Roadmap"
        title={
          <>
            Five phases.
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              Honest about each one.
            </span>
          </>
        }
        description="From public prototype to real institutional integration. Every phase has clear entry conditions, goals, and an honest exit criterion."
      />

      <main id="main-content">

        {/* Context */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>How to Read This</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Each phase is a real threshold,{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>not a schedule.</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "1.5rem" }}>
                This roadmap is not a Gantt chart. There are no dates. Each phase has an exit criterion — a specific, concrete thing that must be true before the next phase begins. Some phases will take weeks. Some will take years. The order is fixed. The timeline is not.
              </p>
              <p className="jf-prose" style={{ maxWidth: "660px" }}>
                This is also a public commitment: the platform will not claim to do something it cannot do. Phase 01 is a prototype. It will say so. Real institutional integration is Phase 05. That label will not appear until Phase 04 is complete.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Phase list */}
        <section style={{ background: "var(--c-bg-alt)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>The Phases</SectionLabel>
            </AnimateIn>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "2.5rem" }}>
              {phases.map((phase, i) => {
                const s = statusStyles[phase.status];
                return (
                  <AnimateIn key={phase.name} delay={i * 80 + 80}>
                    <div className="jf-card" style={{ padding: "0" }}>
                      {/* Phase header */}
                      <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid var(--c-border)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--c-subtle)", fontFamily: "ui-monospace, monospace", letterSpacing: "0.08em" }}>
                            {phase.number}
                          </span>
                          <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--c-fg)", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                            {phase.name}
                          </div>
                        </div>
                        <span style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          color: s.color,
                          background: s.bg,
                          border: `1px solid ${s.border}`,
                          borderRadius: "20px",
                          padding: "3px 10px",
                          letterSpacing: "0.04em",
                          fontFamily: "var(--font-body), system-ui, sans-serif",
                          whiteSpace: "nowrap",
                        }}>
                          {phase.statusLabel}
                        </span>
                      </div>

                      {/* Phase body */}
                      <div style={{ padding: "1.5rem 1.75rem" }}>
                        <p className="jf-prose" style={{ fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                          {phase.summary}
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          {/* Goals */}
                          <div>
                            <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.75rem" }}>
                              Goals
                            </div>
                            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                              {phase.goals.map((g) => (
                                <li key={g} style={{ display: "flex", gap: "0.5rem", alignItems: "baseline" }}>
                                  <span style={{ color: "var(--c-accent)", fontSize: "0.6rem", flexShrink: 0, marginTop: "1px" }}>◆</span>
                                  <span style={{ fontSize: "0.8rem", color: "var(--c-muted)", lineHeight: 1.55, fontFamily: "var(--font-body), system-ui, sans-serif" }}>{g}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Exit criterion */}
                          <div style={{ padding: "1rem 1.25rem", background: "var(--c-bg-alt)", borderRadius: "8px", border: "1px solid var(--c-border)", alignSelf: "start" }}>
                            <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "var(--c-subtle)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.6rem" }}>
                              Exit criterion
                            </div>
                            <p style={{ fontSize: "0.8rem", color: "var(--c-muted)", lineHeight: 1.65, margin: 0, fontFamily: "var(--font-body), system-ui, sans-serif", fontStyle: "italic" }}>
                              {phase.exit}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* Honest note */}
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
              <SectionLabel dark>The Honest Version</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2, marginBottom: "2rem" }}>
                Phase 01 is all that exists right now.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130}>
              <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.75, maxWidth: "600px", marginBottom: "1.5rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                This is a public prototype. There are no real users. There are no live cases. There is no institutional connection. The value of Phase 01 is demonstrating that the idea is coherent, the architecture is honest, and the intent is serious.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.75, maxWidth: "600px", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                Phases 02–05 each have real prerequisites. Phase 04 in particular — governance, legal structure, data agreements — may take longer than all the technical work combined. That is expected. Building the interfaces first is the right order.
              </p>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
