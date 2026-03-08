import { AnimateIn } from "@/components/ui/AnimateIn";

export function Closing() {
  return (
    <section
      id="closing"
      className="jf-grain"
      style={{
        position: "relative",
        padding: "130px 2rem",
        background: "var(--c-dark)",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.11) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "580px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <AnimateIn>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#3b82f6",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{ width: "18px", height: "1px", background: "#3b82f6" }}
            />
            The Long View
            <span
              style={{ width: "18px", height: "1px", background: "#3b82f6" }}
            />
          </div>
        </AnimateIn>

        <AnimateIn delay={80}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.1rem)",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.12,
              marginBottom: "1.5rem",
            }}
          >
            The foundation is
            <br />
            being built now.
          </h2>
        </AnimateIn>

        <AnimateIn delay={160}>
          <p
            style={{
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.85,
              marginBottom: "2.75rem",
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            Real institutional integration will come through proper interface
            design, data agreements, and legal frameworks. This prototype is
            the honest first step — a public commitment to building something
            that actually helps people navigate one of the most stressful
            situations of their lives.
          </p>
        </AnimateIn>

        <AnimateIn delay={260}>
          <a href="/join" className="jf-btn jf-btn-primary">
            Watch it take shape →
          </a>
        </AnimateIn>
      </div>
    </section>
  );
}
