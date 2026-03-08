import { AnimateIn } from "@/components/ui/AnimateIn";

const visionPoints = [
  {
    icon: "◈",
    title: "Guided intake",
    description:
      "Structured questions help people describe what's happening in their own words — no legal training required.",
  },
  {
    icon: "◉",
    title: "Digital documents",
    description:
      "Evidence and paperwork in one place, not scattered across emails, folders, and letters.",
  },
  {
    icon: "◎",
    title: "Transparent status",
    description:
      "People know where they stand at every step. No silence. No uncertainty. No surprises.",
  },
  {
    icon: "◇",
    title: "Structured dialogue",
    description:
      "A defined format for exchanging information between parties — before anything formal begins.",
  },
];

export function BetterPath() {
  return (
    <section
      id="vision"
      className="jf-grain"
      style={{
        position: "relative",
        padding: "100px 2rem",
        background: "var(--c-dark)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AnimateIn>
          <DarkSectionLabel>A Better Path</DarkSectionLabel>
        </AnimateIn>

        <AnimateIn delay={80}>
          <h2
            style={{
              fontSize: "clamp(1.9rem, 3.5vw, 2.9rem)",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.18,
              marginBottom: "1.5rem",
            }}
          >
            Earlier clarity.{" "}
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              Less damage.
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn delay={160}>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#64748b",
              lineHeight: 1.8,
              maxWidth: "620px",
              marginBottom: "3rem",
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            This platform is being built as the structured middle layer that
            doesn&apos;t exist today. Not a replacement for courts or legal
            professionals — but the missing step{" "}
            <span style={{ color: "#94a3b8" }}>before they become necessary.</span>{" "}
            A place where conflict can be described clearly, documents handled
            digitally, and both parties given a genuine chance to resolve things
            before a formal process consumes everyone involved.
          </p>
        </AnimateIn>

        <AnimateIn delay={240} stagger>
          <div
            className="jf-vision-grid"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {visionPoints.map((point) => (
              <div
                key={point.title}
                style={{
                  padding: "1.75rem 2rem",
                  background: "rgba(255,255,255,0.015)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    fontSize: "1.35rem",
                    marginBottom: "0.75rem",
                    color: "#3b82f6",
                    lineHeight: 1,
                  }}
                >
                  {point.icon}
                </div>
                <div
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#e2e8f0",
                    marginBottom: "0.4rem",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                  }}
                >
                  {point.title}
                </div>
                <div
                  style={{
                    fontSize: "0.81rem",
                    color: "#475569",
                    lineHeight: 1.65,
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                  }}
                >
                  {point.description}
                </div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function DarkSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.68rem",
        fontWeight: 700,
        color: "#3b82f6",
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
          background: "#3b82f6",
          verticalAlign: "middle",
        }}
      />
      {children}
    </div>
  );
}
