export function Hero() {
  return (
    <section
      id="hero"
      className="jf-grain"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--c-dark)",
        display: "flex",
        alignItems: "center",
        padding: "100px 2rem 80px",
        overflow: "hidden",
      }}
    >
      {/* Radial glows */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-5%",
          right: "-8%",
          width: "650px",
          height: "650px",
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.13) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-12%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at center, rgba(37,99,235,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "820px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Staggered children — no JS needed, pure CSS keyframes */}
        <div className="jf-hero-item">
          {/* Overline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "2.25rem",
            }}
          >
            <div
              style={{ width: "28px", height: "1px", background: "#3b82f6" }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "#3b82f6",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontFamily: "var(--font-body), system-ui, sans-serif",
              }}
            >
              Public Prototype · 2026
            </span>
          </div>
        </div>

        <div className="jf-hero-item">
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5.5vw, 4.4rem)",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "1.75rem",
            }}
          >
            Most conflicts don&apos;t need
            <br />
            <span style={{ color: "#ffffff" }}>a courtroom.</span>
            <br />
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              They need clarity.
            </span>
          </h1>
        </div>

        <div className="jf-hero-item">
          <p
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              fontWeight: 300,
              color: "#94a3b8",
              lineHeight: 1.8,
              maxWidth: "580px",
              marginBottom: "2.75rem",
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            Justice Future is building the structured digital layer that&apos;s
            been missing — clearer communication, guided intake, and transparent
            next steps that happen{" "}
            <em style={{ color: "#cbd5e1", fontStyle: "italic" }}>
              before formal proceedings begin.
            </em>
          </p>
        </div>

        <div className="jf-hero-item">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.875rem",
              alignItems: "center",
            }}
          >
            <a href="#how-it-works" className="jf-btn jf-btn-primary">
              See How It Works
              <ArrowDown />
            </a>
            <a href="/join" className="jf-btn jf-btn-ghost">
              Follow Development →
            </a>
          </div>
        </div>

        {/* Status strip */}
        <div className="jf-hero-item">
          <div
            style={{
              marginTop: "4.5rem",
              paddingTop: "1.75rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexWrap: "wrap",
              gap: "2.5rem",
            }}
          >
            {[
              { label: "Status", value: "Public Prototype" },
              { label: "Integration", value: "Interface-ready design" },
              { label: "Approach", value: "Pre-escalation first" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontSize: "0.63rem",
                    fontWeight: 700,
                    color: "#334155",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    marginBottom: "5px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#94a3b8",
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into light section */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: "linear-gradient(to bottom, transparent, var(--c-bg))",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </section>
  );
}

function ArrowDown() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}
