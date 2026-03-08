import type { Metadata } from "next";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DEMO_CASE_LIST } from "@/lib/demo/data";

export const metadata: Metadata = {
  title: "Interactive Demo · Justice Future Platform",
  description:
    "A simulated case walkthrough showing how the platform guides a dispute from intake to resolution. Not a live case. Not legal advice.",
};

const statusColors: Record<string, { bg: string; color: string; border: string }> = {
  clarification_in_progress: {
    bg: "rgba(37,99,235,0.08)",
    color: "#2563eb",
    border: "rgba(37,99,235,0.18)",
  },
};

export default function DemoPage() {
  const cases = DEMO_CASE_LIST;

  return (
    <>
      {/* Page header — no PageHeader component, custom for demo context */}
      <header
        className="jf-grain"
        style={{
          position: "relative",
          background: "var(--c-dark)",
          paddingTop: "calc(var(--nav-h) + 64px)",
          paddingBottom: "72px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "0",
            right: "-5%",
            width: "500px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(37,99,235,0.10) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "860px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Prototype notice */}
          <div
            role="note"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.18)",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "#d97706",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              marginBottom: "1.5rem",
            }}
          >
            <span aria-hidden>◈</span>
            Prototype simulation — not a live case
          </div>

          <SectionLabel dark>Interactive Demo</SectionLabel>

          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem",
              maxWidth: "720px",
            }}
          >
            See how a case moves
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              through the platform.
            </span>
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "#64748b",
              lineHeight: 1.75,
              maxWidth: "560px",
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            Below is a simulated example dispute. Click through to see the full case: status,
            timeline, documents, communication history, and available next steps.
          </p>
        </div>
      </header>

      <main id="main-content">

        {/* Case list */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Example Case</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
                  fontWeight: 600,
                  color: "var(--c-fg)",
                  lineHeight: 1.2,
                  marginBottom: "2rem",
                }}
              >
                One simulated case.{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>End to end.</span>
              </h2>
            </AnimateIn>

            <AnimateIn delay={140}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {cases.map((c) => {
                  const s = statusColors[c.status] ?? {
                    bg: "rgba(100,116,139,0.08)",
                    color: "#64748b",
                    border: "rgba(100,116,139,0.15)",
                  };
                  return (
                    <Link
                      key={c.id}
                      href={`/demo/case/${c.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="jf-card"
                        style={{
                          padding: "0",
                          transition: "border-color 0.15s, box-shadow 0.15s",
                          cursor: "pointer",
                        }}
                      >
                        {/* Card header */}
                        <div
                          style={{
                            padding: "1.25rem 1.75rem",
                            borderBottom: "1px solid var(--c-border)",
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            gap: "1rem",
                            flexWrap: "wrap",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                color: "var(--c-subtle)",
                                letterSpacing: "0.08em",
                                fontFamily: "var(--font-body), system-ui, sans-serif",
                                marginBottom: "0.3rem",
                              }}
                            >
                              {c.caseRef} · {c.issueType}
                            </div>
                            <div
                              style={{
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: "var(--c-fg)",
                                fontFamily: "var(--font-body), system-ui, sans-serif",
                              }}
                            >
                              {c.title}
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              color: s.color,
                              background: s.bg,
                              border: `1px solid ${s.border}`,
                              borderRadius: "20px",
                              padding: "3px 10px",
                              letterSpacing: "0.04em",
                              fontFamily: "var(--font-body), system-ui, sans-serif",
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            {c.statusLabel}
                          </span>
                        </div>

                        {/* Card body */}
                        <div style={{ padding: "1.25rem 1.75rem" }}>
                          <p
                            className="jf-prose"
                            style={{ fontSize: "0.875rem", marginBottom: "1.25rem", maxWidth: "640px" }}
                          >
                            {c.summary.slice(0, 200)}…
                          </p>
                          <div
                            style={{
                              display: "flex",
                              gap: "2rem",
                              flexWrap: "wrap",
                              marginBottom: "1.25rem",
                            }}
                          >
                            {[
                              ["Active for", `${c.daysActive} days`],
                              ["Deadline", c.deadlineAt],
                              ["Documents", `${c.documents.length} submitted`],
                              ["Messages", `${c.messages.length} in thread`],
                            ].map(([label, value]) => (
                              <div key={label}>
                                <div
                                  style={{
                                    fontSize: "0.62rem",
                                    fontWeight: 700,
                                    color: "var(--c-subtle)",
                                    letterSpacing: "0.1em",
                                    textTransform: "uppercase",
                                    fontFamily: "var(--font-body), system-ui, sans-serif",
                                    marginBottom: "0.15rem",
                                  }}
                                >
                                  {label}
                                </div>
                                <div
                                  style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    color: "var(--c-fg)",
                                    fontFamily: "var(--font-body), system-ui, sans-serif",
                                  }}
                                >
                                  {value}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.4rem",
                              fontSize: "0.85rem",
                              fontWeight: 500,
                              color: "var(--c-accent)",
                              fontFamily: "var(--font-body), system-ui, sans-serif",
                            }}
                          >
                            View this case →
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* What the demo shows */}
        <section style={{ background: "var(--c-bg-alt)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>What This Demonstrates</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
                  fontWeight: 600,
                  color: "var(--c-fg)",
                  lineHeight: 1.2,
                  marginBottom: "2rem",
                }}
              >
                What good process looks like.
              </h2>
            </AnimateIn>
            <AnimateIn delay={120} stagger>
              <div className="jf-two-col" style={{ gap: "1rem" }}>
                {[
                  {
                    title: "Structured clarity",
                    body: "Every element of the case is visible, labelled, and timestamped. No ambiguity about what has happened or what comes next.",
                  },
                  {
                    title: "Transparent process",
                    body: "The timeline shows every stage the case has moved through — and every stage still ahead. Nothing happens without it being recorded.",
                  },
                  {
                    title: "Organised evidence",
                    body: "Documents are categorised, timestamped, and attributed. Both parties know exactly what has been submitted.",
                  },
                  {
                    title: "Meaningful next steps",
                    body: "The platform shows what options exist at every point — and what happens under each scenario. No guessing. No silence.",
                  },
                  {
                    title: "Humane communication",
                    body: "Messages are structured, recorded, and attributed. There is a clear thread — not scattered emails. Every exchange is part of the case record.",
                  },
                  {
                    title: "Honest framing",
                    body: "At every stage, the platform is clear about what it is and what it isn't. Not a court. Not legal advice. A structured space for clarity.",
                  },
                ].map((item) => (
                  <div key={item.title} className="jf-card">
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--c-fg)",
                        marginBottom: "0.4rem",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                      }}
                    >
                      {item.title}
                    </div>
                    <div className="jf-prose" style={{ fontSize: "0.82rem" }}>
                      {item.body}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          </div>
        </section>

        {/* Honest limits */}
        <section style={{ background: "var(--c-bg)", padding: "64px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <div
                role="note"
                style={{
                  padding: "1.5rem 1.75rem",
                  background: "#fffbf0",
                  border: "1px solid #fde68a",
                  borderRadius: "8px",
                  fontSize: "0.84rem",
                  color: "#92400e",
                  lineHeight: 1.75,
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
              >
                <strong>This is a prototype simulation.</strong> The case shown is fictional. No
                real parties are involved. Nothing in this demo constitutes legal advice. The
                platform is not connected to any court, government body, or legal institution.
                Actions in the demo do not have real-world effect. This demo exists to show
                what the platform is designed to do — not what it can currently do with live
                institutional backing.
              </div>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
