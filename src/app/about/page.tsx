import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = {
  title: "About · Justice Future Platform",
  description:
    "What this project is, what it is not, and why it is being built in public — one honest step at a time.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        overline="About"
        title={
          <>
            What this is,
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              and what it isn&apos;t.
          </span>
          </>
        }
        description="A public project. An honest prototype. An interface-first approach to a problem that has been structural for a long time."
      />

      <main id="main-content">

        {/* What this is */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>The Project</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                A platform for structured pre-escalation —{" "}
                <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>built in public.</span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "1.5rem" }}>
                Justice Future is an attempt to build the missing middle layer between conflict and formal proceedings. Most disputes are not primarily legal problems — they are information problems, communication problems, and structure problems. People don&apos;t know where to start, how to document what happened, how to communicate in a way that creates a record, or what steps typically come next.
              </p>
              <p className="jf-prose" style={{ maxWidth: "660px" }}>
                This platform is designed to solve that — before anything formal needs to happen. Structured intake. Documented communication. Organized evidence. Clear status. Guided next steps. All of it auditable, all of it transparent.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Interface-first */}
        <section style={{ background: "var(--c-bg-alt)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>The Approach</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "1.5rem" }}>
                Interfaces before integrations.
              </h2>
            </AnimateIn>
            <AnimateIn delay={140}>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "1.5rem" }}>
                The platform is not connected to any real institution. No court system, no government body, no legal authority. That is intentional — not a limitation to apologize for, but a design principle.
              </p>
              <p className="jf-prose" style={{ maxWidth: "660px", marginBottom: "1.5rem" }}>
                Connecting to real institutions requires answering hard questions first: What data flows? Who owns it? What audit obligations apply? What happens when something goes wrong? Designing the interfaces before any real connection exists forces those questions to be answered in a structured way — before the pressure of a live integration creates shortcuts.
              </p>
              <p className="jf-prose" style={{ maxWidth: "660px" }}>
                The conceptual API contracts published on this platform are that work happening in public. They are not live endpoints. They are commitments about what real integration would require.
              </p>
            </AnimateIn>
          </div>
        </section>

        {/* Open development */}
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
              <SectionLabel dark>Open Development</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.2, marginBottom: "2rem" }}>
                Built in public. Every step visible.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130}>
              <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.75, maxWidth: "600px", marginBottom: "1.5rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                The entire codebase is public. Architecture decisions are documented. The roadmap is honest about what phase we are in and what each next step requires. There is no private version with different claims. What you see here is what exists.
              </p>
              <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: 1.75, maxWidth: "600px", marginBottom: "2rem", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                This approach serves a purpose beyond transparency: institutional trust must be earned before it can be expected. Building in public is not a development style choice — it is the only credible path for a platform that will eventually ask real institutions to connect to it.
              </p>
              <a
                href="https://github.com/d0npedro/justice-future-platform"
                target="_blank"
                rel="noopener noreferrer"
                className="jf-btn jf-btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                View on GitHub
              </a>
            </AnimateIn>
          </div>
        </section>

        {/* What this is not */}
        <section style={{ background: "var(--c-bg)", padding: "80px 2rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <AnimateIn>
              <SectionLabel>Honest Limits</SectionLabel>
            </AnimateIn>
            <AnimateIn delay={80}>
              <h2 style={{ fontSize: "clamp(1.7rem, 3vw, 2.5rem)", fontWeight: 600, color: "var(--c-fg)", lineHeight: 1.2, marginBottom: "2rem" }}>
                What this project is not.
              </h2>
            </AnimateIn>
            <AnimateIn delay={130}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  ["Not a legal service", "Nothing here is legal advice. The platform does not provide legal guidance, represent any party, or make any claim about legal rights or outcomes."],
                  ["Not an institution", "This is a private project. It has no affiliation with any government body, court system, or legal authority."],
                  ["Not connected — yet", "No real institution is connected to this platform. Current integration work is conceptual: interface design, not live endpoints."],
                  ["Not complete", "This is Phase 01 of a five-phase roadmap. Features described in later phases do not exist yet and will not be claimed until they do."],
                  ["Not without risk", "Digital platforms for conflict resolution introduce their own risks: power imbalances, evidence gaps, platform errors. These are real and are being designed against — but they are not solved."],
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
              <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="/roadmap" className="jf-btn jf-btn-outline">
                  See the roadmap →
                </a>
                <a href="/problem" className="jf-btn" style={{ background: "transparent", color: "var(--c-muted)", fontFamily: "var(--font-body), system-ui, sans-serif", fontSize: "0.875rem", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", padding: "14px 0" }}>
                  Read the problem statement →
                </a>
              </div>
            </AnimateIn>
          </div>
        </section>

      </main>
    </>
  );
}
