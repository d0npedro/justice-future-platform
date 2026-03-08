import { AnimateIn } from "@/components/ui/AnimateIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const problems = [
  {
    icon: "⧖",
    title: "Reactive, not preventive",
    description:
      "People encounter the justice system at moments of high stress — and are expected to navigate something they've never seen before, without guidance, under time pressure.",
  },
  {
    icon: "⊞",
    title: "Fragmented and paper-heavy",
    description:
      "Documents live in different places. Forms are unclear. Communication happens through letters that take days. Each step creates more uncertainty, not less.",
  },
  {
    icon: "⦿",
    title: "Designed for professionals, not people",
    description:
      "Every process assumes you have a lawyer. Most people don't. The result is a system that filters rather than guides — and escalates instead of resolving.",
  },
  {
    icon: "△",
    title: "Escalation as the default",
    description:
      "Without a structured middle layer, minor conflicts follow the same path as serious ones. The system has no mechanism for early clarification or structured pre-resolution.",
  },
];

export function WhyMatters() {
  return (
    <section
      id="why"
      style={{ padding: "100px 2rem", background: "var(--c-bg)" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <AnimateIn>
          <SectionLabel>Why This Matters</SectionLabel>
        </AnimateIn>


        <AnimateIn delay={80}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 600,
              color: "var(--c-fg)",
              lineHeight: 1.18,
              marginBottom: "2.75rem",
            }}
          >
            The current system wasn&apos;t built for people.
            <br />
            <span
              style={{
                color: "var(--c-muted)",
                fontStyle: "italic",
                fontSize: "88%",
              }}
            >
              It was built for procedures.
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={160} stagger>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {problems.map((p) => (
              <div
                key={p.title}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  padding: "1.5rem 1.75rem",
                  background: "#f8f7f5",
                  border: "1px solid var(--c-border)",
                  borderRadius: "8px",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: "34px",
                    height: "34px",
                    borderRadius: "6px",
                    background: "rgba(239,68,68,0.07)",
                    border: "1px solid rgba(239,68,68,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1rem",
                    color: "#dc2626",
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--c-fg)",
                      marginBottom: "0.3rem",
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                    }}
                  >
                    {p.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--c-muted)",
                      lineHeight: 1.7,
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                    }}
                  >
                    {p.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

