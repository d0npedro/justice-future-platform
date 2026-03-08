import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "The Solution · Justice Future Platform",
  description:
    "A structured digital layer for clarity, communication, and guided pre-escalation — before formal proceedings begin.",
};

const capabilities = [
  {
    icon: "◈",
    title: "Structured intake",
    body: "A guided process for describing a situation clearly. Structured questions, defined fields, consistent format. The system asks the right questions so users don't need to know them in advance. No legal knowledge required.",
  },
  {
    icon: "◉",
    title: "Guided next steps",
    body: "Context-sensitive guidance about what typically happens next, what documentation is relevant, and what options exist. The process becomes visible rather than opaque.",
  },
  {
    icon: "◎",
    title: "Document handling",
    body: "A single organized place for evidence, documents, contracts, and relevant materials. Timestamped. Auditable. Structured by case rather than scattered across emails and phone storage.",
  },
  {
    icon: "◇",
    title: "Status transparency",
    body: "Both parties always know where they stand. What has been submitted. What is waiting. What the next step is. No silence, no uncertainty, no unexplained delays.",
  },
  {
    icon: "⬡",
    title: "Structured communication",
    body: "Asynchronous, documented communication in a structured thread format. Not informal messaging. Not email. A proper record: sender, receiver, timestamp, content, acknowledgement.",
  },
  {
    icon: "◐",
    title: "Pre-escalation clarification",
    body: "A formal opportunity to resolve or clarify before full proceedings begin. Not mandatory. Not legally binding. But a structured space where resolution becomes possible.",
  },
];

const beforeAfter = [
  {
    label: "Getting started",
    before: "Search for information, consult friends, try to understand what a formal process involves",
    after: "Structured intake guides you through describing the situation in a consistent, documented format",
  },
  {
    label: "Documents and evidence",
    before: "Scattered across email threads, text messages, phone photos, and physical paperwork",
    after: "Centralized, labeled, timestamped, and organized by case — accessible to both parties as appropriate",
  },
  {
    label: "Communication",
    before: "Informal, unstructured, often emotional — no record, no acknowledgement, no shared understanding",
    after: "Structured threads with clear sender attribution, timestamps, and read acknowledgement",
  },
  {
    label: "Understanding next steps",
    before: "Unclear — either guess, or pay for professional advice to understand what comes next",
    after: "Guided guidance about what typically happens next, what matters, and what options are available",
  },
];

export default function SolutionPage() {
  return (
    <>
      <PageHeader
        overline="The Solution"
        title={
          <>
            A structured layer
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              before the process begins.
            </span>
          </>
        }
        description="Not a court. Not a legal service. A digital infrastructure for clarity, communication, and guided pre-escalation — available before anything formal needs to happen."
      />

      <main id="main-content">

        {/* Core idea */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>The Idea</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Many conflicts can be clarified without ever entering a formal process —{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>if the right tools exist at the right moment.</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px" }}>
                Justice Future is designed to be that tool: a structured digital space where people can describe their situation, understand their options, exchange documents and information, and communicate in a defined format — before anything formal needs to happen. The goal is clarity and structure at the moment they are most needed, not after damage has already accumulated.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Capabilities grid */}
        <section style={{ background: "var(--c-bg-alt)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Core Capabilities</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "2.5rem" }}>
                Six things the platform does.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130} stagger>
              <div className="jf-three-col" style={{ gap: "1rem" }}>
                {capabilities.map((c) => (
                  <div key={c.title} className="jf-card">
                    <div
                      aria-hidden
                      style={{
                        fontSize: "1.1rem",
                        color: "var(--c-accent)",
                        marginBottom: "0.75rem",
                        lineHeight: 1,
                      }}
                    >
                      {c.icon}
                    </div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--c-fg)", marginBottom: "0.4rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {c.title}
                    </div>
                    <div className="jf-prose" style={{ fontSize: "0.82rem" }}>
                      {c.body}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Before / After */}
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
              <SectionLabel dark>What Changes</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2, marginBottom: "2.5rem" }}>
                The experience, compared.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130}>
              {/* Column headers */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", marginBottom: "0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ padding: "0.75rem 1rem", fontSize: "0.62rem", fontWeight: 700, color: "#1e293b", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  Situation
                </div>
                <div style={{ padding: "0.75rem 1rem", fontSize: "0.62rem", fontWeight: 700, color: "#1e293b", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  Without the platform
                </div>
                <div style={{ padding: "0.75rem 1rem", fontSize: "0.62rem", fontWeight: 700, color: "#3b82f6", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                  With the platform
                </div>
              </div>

              {beforeAfter.map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "0",
                    borderBottom: i < beforeAfter.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div style={{ padding: "1.25rem 1rem", fontSize: "0.8rem", fontWeight: 600, color: "#475569", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {row.label}
                  </div>
                  <div style={{ padding: "1.25rem 1rem", fontSize: "0.8rem", color: "#334155", lineHeight: 1.6, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {row.before}
                  </div>
                  <div style={{ padding: "1.25rem 1rem", fontSize: "0.8rem", color: "#64748b", lineHeight: 1.6, fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                    {row.after}
                  </div>
                </div>
              ))}
            </AnimateIn>
          </div>
        </section>

        {/* What it is not */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Honest Boundaries</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "2rem" }}>
                What this is not.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  ["Not a legal service", "Nothing on this platform constitutes legal advice. No claim is made about legal outcomes."],
                  ["Not a court", "This platform has no judicial authority. It cannot compel any party to act."],
                  ["Not connected to institutions", "No real government, court, or legal institution is connected to this platform today."],
                  ["Not a guarantee", "Using this platform does not guarantee resolution, a favorable outcome, or legal protection."],
                ].map(([title, desc], i, arr) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      gap: "1.25rem",
                      padding: "1.5rem 0",
                      borderBottom: i < arr.length - 1 ? "1px solid var(--c-border)" : "none",
                      alignItems: "start",
                    }}
                  >
                    <span style={{ color: "var(--c-subtle)", fontWeight: 700, marginTop: "2px", flexShrink: 0 }}>✕</span>
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--c-fg)", marginBottom: "0.25rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                        {title}
                      </div>
                      <div className="jf-prose" style={{ fontSize: "0.84rem" }}>
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn delay={200}>
              <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="/architecture" className="jf-btn jf-btn-outline">
                  See how it's designed →
                </a>
                <a href="/roadmap" className="jf-btn" style={{ background: "transparent", color: "var(--c-muted)", fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", padding: "14px 0" }}>
                  View the roadmap →
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
