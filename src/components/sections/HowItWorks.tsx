import { AnimateIn } from "@/components/ui/AnimateIn";

const steps = [
  {
    number: "01",
    title: "Describe your situation",
    description:
      "A structured intake process that helps you explain what's happening — in plain language, without legal jargon. The system asks the right questions so you don't need to know them in advance.",
    badge: "No legal knowledge required",
  },
  {
    number: "02",
    title: "Understand your options",
    description:
      "Clear information about what typically happens next, what documentation matters, and what paths are available. The process becomes visible, not opaque.",
    badge: "Step-by-step guidance",
  },
  {
    number: "03",
    title: "Communicate and document",
    description:
      "A structured environment for exchanging information, submitting evidence, and tracking status — before anything formal needs to happen.",
    badge: "Structured · Auditable · Clear",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ padding: "100px 2rem", background: "var(--c-bg)" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <AnimateIn>
          <SectionLabel>How It Works</SectionLabel>
        </AnimateIn>

        <AnimateIn delay={80}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 600,
              color: "var(--c-fg)",
              lineHeight: 1.18,
              marginBottom: "3.5rem",
            }}
          >
            Three steps.
            <br />
            <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>
              Before the heavy machinery starts.
            </span>
          </h2>
        </AnimateIn>

        <div style={{ position: "relative" }}>
          {/* Connector line */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "23px",
              top: "48px",
              bottom: "48px",
              width: "1px",
              background:
                "linear-gradient(to bottom, var(--c-accent), transparent)",
              opacity: 0.18,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, i) => (
              <AnimateIn key={step.number} delay={i * 120 + 160}>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    padding: "2rem 0 2.5rem",
                    borderBottom:
                      i < steps.length - 1
                        ? "1px solid var(--c-border)"
                        : "none",
                  }}
                >
                  {/* Step number circle */}
                  <div style={{ flexShrink: 0 }}>
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "50%",
                        background: "var(--c-bg)",
                        border: "1px solid var(--c-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: "var(--c-accent)",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                        letterSpacing: "0.05em",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: "6px" }}>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--c-fg)",
                        marginBottom: "0.6rem",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--c-muted)",
                        lineHeight: 1.75,
                        marginBottom: "0.875rem",
                        maxWidth: "560px",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                      }}
                    >
                      {step.description}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.68rem",
                        fontWeight: 600,
                        color: "var(--c-accent)",
                        background: "rgba(37,99,235,0.06)",
                        border: "1px solid rgba(37,99,235,0.14)",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        letterSpacing: "0.05em",
                        fontFamily: "var(--font-body), system-ui, sans-serif",
                      }}
                    >
                      {step.badge}
                    </span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.68rem",
        fontWeight: 700,
        color: "var(--c-accent)",
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        fontFamily: "var(--font-body), system-ui, sans-serif",
        marginBottom: "1.5rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "1px",
          background: "var(--c-accent)",
          verticalAlign: "middle",
        }}
      />
      {children}
    </div>
  );
}
