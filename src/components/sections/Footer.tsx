import Link from "next/link";

const navGroups = [
  {
    label: "Platform",
    links: [
      { href: "/problem",  label: "The Problem" },
      { href: "/solution", label: "The Solution" },
      { href: "/roadmap",  label: "Roadmap" },
    ],
  },
  {
    label: "Technical",
    links: [
      { href: "/architecture", label: "Architecture" },
      { href: "/api",          label: "Interface Design" },
    ],
  },
  {
    label: "Project",
    links: [
      { href: "/about", label: "About" },
      { href: "/join",  label: "Follow Development" },
      {
        href: "https://github.com/d0npedro/justice-future-platform",
        label: "GitHub",
        external: true,
      },
    ],
  },
];

const linkStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  color: "#334155",
  textDecoration: "none",
  fontFamily: "var(--font-body), system-ui, sans-serif",
  lineHeight: 1,
  padding: "5px 0",
  transition: "color 0.15s",
};

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--c-dark)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Main footer body */}
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "3rem",
          alignItems: "start",
        }}
      >
        {/* Wordmark + mission */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.875rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3b82f6" }} />
            <span
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              Justice Future
            </span>
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#334155",
              lineHeight: 1.7,
              maxWidth: "320px",
              fontFamily: "var(--font-body), system-ui, sans-serif",
            }}
          >
            A public prototype of a future digital justice platform.
            Not a legal service. Not connected to any government institution.
          </p>
        </div>

        {/* Nav groups */}
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {navGroups.map((group) => (
            <div key={group.label}>
              <div
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "#1e293b",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "0.875rem",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
              >
                {group.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {group.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      className="jf-footer-link"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={linkStyle}
                      className="jf-footer-link"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.03)",
          padding: "1.25rem 2rem",
          maxWidth: "860px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span style={{ fontSize: "0.72rem", color: "#1e293b", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          © 2026 Justice Future Platform · Public Prototype
        </span>
        <span style={{ fontSize: "0.72rem", color: "#1e293b", fontFamily: "var(--font-body), system-ui, sans-serif" }}>
          Not a legal service · Not connected to any institution
        </span>
      </div>
    </footer>
  );
}
