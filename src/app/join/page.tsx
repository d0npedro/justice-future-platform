import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Follow Development · Justice Future Platform",
  description:
    "Stay informed as Justice Future is built. No spam, no hype — just honest progress updates on a serious public platform.",
};

export default function JoinPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--c-dark)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "560px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.78rem",
            color: "#475569",
            textDecoration: "none",
            fontFamily: "var(--font-body), system-ui, sans-serif",
            marginBottom: "3rem",
            transition: "color 0.2s",
          }}
          className="jf-nav-link"
        >
          ← Back to platform
        </Link>

        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.65rem",
            fontWeight: 700,
            color: "#3b82f6",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body), system-ui, sans-serif",
            marginBottom: "1.75rem",
          }}
        >
          <span style={{ width: "16px", height: "1px", background: "#3b82f6" }} />
          Follow Development
          <span style={{ width: "16px", height: "1px", background: "#3b82f6" }} />
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 600,
            color: "#f1f5f9",
            lineHeight: 1.15,
            marginBottom: "1.25rem",
          }}
        >
          Watch it being built.
          <br />
          <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
            Honestly.
          </span>
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#64748b",
            lineHeight: 1.8,
            marginBottom: "2.75rem",
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          This is a public prototype in active development. The best way to
          follow progress is directly on GitHub — every commit, every decision,
          in the open.
        </p>

        {/* GitHub CTA */}
        <a
          href="https://github.com/d0npedro/justice-future-platform"
          target="_blank"
          rel="noopener noreferrer"
          className="jf-btn jf-btn-primary"
          style={{ marginBottom: "1rem" }}
        >
          View on GitHub →
        </a>

        {/* Honest note */}
        <p
          style={{
            marginTop: "2.5rem",
            fontSize: "0.78rem",
            color: "#334155",
            lineHeight: 1.65,
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          No mailing list. No waitlist. No hype.
          <br />
          Just a public repository and honest progress.
        </p>
      </div>
    </div>
  );
}
