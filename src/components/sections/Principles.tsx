import { AnimateIn } from "@/components/ui/AnimateIn";

const principles = [
  {
    title: "Clarity first",
    description:
      "Every step should be understandable to anyone, regardless of legal background. If someone needs a lawyer to understand the platform, the platform has failed.",
  },
  {
    title: "Structured communication",
    description:
      "Conflict escalates in the absence of structure. This platform provides a defined format for exchanging information — reducing ambiguity, not adding to it.",
  },
  {
    title: "Transparency",
    description:
      "People deserve to know where they stand. Status is visible. Next steps are clear. No black boxes, no unexplained delays.",
  },
  {
    title: "Human-centered process",
    description:
      "The system should adapt to how people actually experience conflict — not demand they adapt to procedures designed for professionals.",
  },
  {
    title: "Future-ready interfaces",
    description:
      "Real institutional integration will happen through clearly defined APIs and interface contracts. The architecture is being built to support this from the start.",
  },
];

export function Principles() {
  return (
    <section
      id="principles"
      style={{ padding: "100px 2rem", background: "var(--c-bg-alt)" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <AnimateIn>
          <SectionLabel>Principles</SectionLabel>
        </AnimateIn>

        <AnimateIn delay={80}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 600,
              color: "var(--c-fg)",
              lineHeight: 1.18,
              marginBottom: "3rem",
            }}
          >
            Built on five commitments.
          </h2>
        </AnimateIn>

        <AnimateIn delay={140} stagger>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="jf-principle-row"
                style={{
                  padding: "1.75rem 0",
                  borderBottom:
                    i < principles.length - 1
                      ? "1px solid rgba(0,0,0,0.08)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--c-fg)",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    paddingTop: "2px",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--c-muted)",
                    lineHeight: 1.75,
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                  }}
                >
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
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
