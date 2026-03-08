import { AnimateIn } from "@/components/ui/AnimateIn";

const isItems = [
  "A public prototype of a future digital justice interface",
  "A structured foundation for the missing pre-escalation layer",
  "Built with future API and institutional integration in mind",
  "An honest first step in a long-term, serious project",
];

const isNotItems = [
  "A legal service or source of legal advice",
  "A court system or replacement for any legal institution",
  "Connected to any government body or authority today",
  "A guarantee of resolution, outcome, or legal protection",
];

export function HonestFraming() {
  return (
    <section
      id="framing"
      style={{ padding: "100px 2rem", background: "var(--c-bg)" }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <AnimateIn>
          <SectionLabel>Honest Framing</SectionLabel>
        </AnimateIn>

        <AnimateIn delay={80}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 600,
              color: "var(--c-fg)",
              lineHeight: 1.18,
              marginBottom: "2.5rem",
            }}
          >
            What this is.
            <br />
            <span style={{ color: "var(--c-muted)", fontStyle: "italic" }}>
              What it is not.
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={160}>
          <div className="jf-two-col" style={{ marginBottom: "1.5rem" }}>
            {/* Is */}
            <div
              style={{
                padding: "2rem",
                background: "rgba(37,99,235,0.03)",
                border: "1px solid rgba(37,99,235,0.12)",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "var(--c-accent)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
              >
                This is
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                {isItems.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "0.7rem",
                      fontSize: "0.86rem",
                      color: "var(--c-fg)",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--c-accent)",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: "1px",
                        fontSize: "0.9rem",
                      }}
                    >
                      ↗
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Is not */}
            <div
              style={{
                padding: "2rem",
                background: "rgba(0,0,0,0.02)",
                border: "1px solid var(--c-border)",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "var(--c-subtle)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
              >
                This is not
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                {isNotItems.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      gap: "0.7rem",
                      fontSize: "0.86rem",
                      color: "var(--c-muted)",
                      lineHeight: 1.6,
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--c-subtle)",
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={260}>
          <div
            role="note"
            style={{
              padding: "1.25rem 1.5rem",
              background: "#fffbf0",
              border: "1px solid #fde68a",
              borderRadius: "8px",
              fontSize: "0.84rem",
              color: "#92400e",
              lineHeight: 1.7,
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            <strong>Note:</strong> Real integration with courts, government
            systems, or legal institutions does not exist yet. This is a public
            prototype and structured concept. When institutional integration
            becomes appropriate, it will happen through proper API design, data
            agreements, and legal frameworks — not shortcuts.
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
