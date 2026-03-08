import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "The Problem · Justice Future Platform",
  description:
    "Why many conflicts escalate unnecessarily, and why current processes often make things worse before they get better.",
};

const frictions = [
  {
    icon: "⧖",
    title: "Reactive, not preventive",
    body: "People encounter the justice system at moments of maximum stress — and are expected to navigate something they have never seen before, without guidance, under time pressure. The system only engages after damage is already accumulating.",
  },
  {
    icon: "⊞",
    title: "Fragmented and paper-heavy",
    body: "Documents live in different places. Forms are unclear. Communication happens through letters that take days. There is no single structured space to hold everything together. Every step creates more uncertainty instead of less.",
  },
  {
    icon: "⦿",
    title: "Designed for professionals",
    body: "Every process assumes you have a lawyer. Most people don't. The language of formal proceedings is built for experts. Everyone else must hire someone just to understand what is being asked of them — before anything substantive even begins.",
  },
  {
    icon: "△",
    title: "Escalation as the default",
    body: "Without a structured middle layer, minor conflicts follow the same path as serious ones. There is no mechanism for early clarification, no space for structured dialogue, and no off-ramp before the full machinery of a formal proceeding begins.",
  },
];

const costs = [
  {
    label: "Time",
    value: "Months",
    description: "The average time between a conflict beginning and any formal resolution — during which uncertainty compounds.",
  },
  {
    label: "Access",
    value: "Unequal",
    description: "People with more financial resources can afford professional guidance from the start. Everyone else navigates blind.",
  },
  {
    label: "Relationships",
    value: "Hardened",
    description: "The longer conflict goes unaddressed without structure, the more positions harden and the less room there is for resolution.",
  },
  {
    label: "Clarity",
    value: "Delayed",
    description: "In many cases, parties simply need structured clarification — but that structure doesn't arrive until long after it would have mattered.",
  },
];

export default function ProblemPage() {
  return (
    <>
      <PageHeader
        overline="The Problem"
        title={
          <>
            Conflict finds people
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              unprepared.
            </span>
          </>
        }
        description="Most disputes don't start as legal matters. They become legal matters because no structured alternative existed at the moment it would have mattered most."
      />

      <main id="main-content">

        {/* Section 1: What's actually happening */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>The Current Reality</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                The gap between conflict and resolution{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>is almost entirely unstructured.</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "3rem" }}>
                When conflict begins, most people have no structured way to think through it, document it, or communicate about it clearly. The options are: ignore it, escalate informally, or enter a formal process. There is almost nothing in between — and that missing middle layer is where the most damage happens.
              </p>
            </AnimateIn>

            <AnimateIn delay={180} stagger>
              <div className="jf-two-col" style={{ gap: "1rem" }}>
                {frictions.map((f) => (
                  <div key={f.title} className="jf-card">
                    <div
                      style={{
                        fontSize: "1.1rem",
                        marginBottom: "0.75rem",
                        width: "36px",
                        height: "36px",
                        borderRadius: "7px",
                        background: "rgba(239,68,68,0.06)",
                        border: "1px solid rgba(239,68,68,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#dc2626",
                      }}
                      aria-hidden
                    >
                      {f.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "0.88rem",
                        fontWeight: 600,
                        color: "var(--c-fg)",
                        marginBottom: "0.4rem",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                      }}
                    >
                      {f.title}
                    </div>
                    <div className="jf-prose" style={{ fontSize: "0.84rem" }}>
                      {f.body}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Section 2: What it costs */}
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
              <SectionLabel dark>What It Actually Costs</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2, marginBottom: "2.5rem" }}>
                The damage accumulates{" "}
                <span style={{ color: "#93c5fd", fontStyle: "italic" }}>before anything formal begins.</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={140} stagger>
              <div className="jf-two-col" style={{ gap: "1px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", overflow: "hidden" }}>
                {costs.map((c) => (
                  <div key={c.label} style={{ padding: "1.75rem 2rem", background: "rgba(255,255,255,0.015)" }}>
                    <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "var(--font-body), system-ui, sans-serif", marginBottom: "0.4rem" }}>
                      {c.label}
                    </div>
                    <div style={{ fontSize: "1.5rem", fontWeight: 600, color: "#e2e8f0", marginBottom: "0.6rem", fontFamily: "var(--font-display), Georgia, serif" }}>
                      {c.value}
                    </div>
                    <div className="jf-prose-dark" style={{ fontSize: "0.82rem" }}>
                      {c.description}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Section 3: Why it's solvable */}
        <section style={{ background: "var(--c-bg-alt)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Why This Is Solvable</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                The missing layer is digital,{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>not legal.</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "2rem" }}>
                Structured early intervention works. Research on pre-mediation, structured dialogue, and conflict resolution consistently shows that earlier clarity — even just a shared understanding of what each party believes happened — reduces escalation and improves outcomes.
              </p>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "2.5rem" }}>
                The problem is not that this is impossible. The problem is that it has never been built as an accessible, digital-first platform that operates before formal proceedings begin. That is the gap this project is designed to close.
              </p>
              <a href="/solution" className="jf-btn jf-btn-outline">
                See the proposed solution →
              </a>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
