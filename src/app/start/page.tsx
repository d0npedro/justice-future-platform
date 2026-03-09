import type { Metadata } from "next";
import { IntakeFlow } from "@/components/intake/IntakeFlow";

export const metadata: Metadata = {
  title: "Start a Case · Justice Future Platform",
  description:
    "Submit a structured case description. This is a prototype demonstration — not legal advice.",
};

export default function StartPage() {
  return (
    <>
      <header
        className="jf-grain"
        style={{
          position: "relative",
          background: "var(--c-dark)",
          paddingTop: "calc(var(--nav-h) + 56px)",
          paddingBottom: "56px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            right: "-5%",
            width: "500px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(37,99,235,0.10) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: "620px", margin: "0 auto", position: "relative", zIndex: 1 }}>
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
              padding: "5px 12px",
              fontSize: "0.68rem",
              fontWeight: 600,
              color: "#d97706",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              marginBottom: "1.25rem",
            }}
          >
            Prototype — not legal advice
          </div>

          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
            }}
          >
            Start a structured case record
          </h1>

          <p
            style={{
              fontSize: "1rem",
              fontWeight: 300,
              color: "#64748b",
              lineHeight: 1.75,
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            Three short steps to describe your situation. You'll receive a case reference number
            and a status page you can return to. This demonstration shows how structured intake
            works — no real institution is connected.
          </p>
        </div>
      </header>

      <main id="main-content" style={{ background: "var(--c-bg-alt)", minHeight: "60vh", padding: "3rem 2rem 80px" }}>
        <div style={{ maxWidth: "620px", margin: "0 auto" }}>
          {/* Trust note */}
          <div
            style={{
              marginBottom: "2rem",
              padding: "1rem 1.25rem",
              background: "#f8f7f5",
              border: "1px solid var(--c-border)",
              borderRadius: "8px",
              fontSize: "0.8rem",
              color: "var(--c-muted)",
              lineHeight: 1.7,
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            <strong style={{ color: "var(--c-fg)" }}>How this works:</strong> Your answers are
            stored as a case record in a development database. You'll receive a reference number
            — save it, as it's the only way to return to your case. Submitted data is used only
            for demonstrating the platform flow.
          </div>

          {/* Intake form */}
          <div className="jf-card">
            <IntakeFlow />
          </div>
        </div>
      </main>
    </>
  );
}
