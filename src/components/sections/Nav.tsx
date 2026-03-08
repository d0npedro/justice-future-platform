export function Nav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "64px",
        padding: "0 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(12, 22, 40, 0.88)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      {/* Wordmark */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#3b82f6",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#e2e8f0",
            letterSpacing: "0.01em",
          }}
        >
          Justice Future
        </span>
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 600,
            color: "#475569",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "2px 8px",
            borderRadius: "999px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          Prototype
        </span>
      </div>

      {/* Right link */}
      <a
        href="https://github.com/d0npedro/justice-future-platform"
        target="_blank"
        rel="noopener noreferrer"
        className="jf-nav-link"
      >
        <GitHubIcon />
        Follow development
      </a>
    </nav>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
