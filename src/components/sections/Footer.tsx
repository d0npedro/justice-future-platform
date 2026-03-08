export function Footer() {
  return (
    <footer
      style={{
        padding: "1.75rem 2rem",
        background: "var(--c-dark)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "0.78rem",
            color: "#1e293b",
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          © 2026 Justice Future Platform · Public Prototype
        </span>
        <span
          style={{
            fontSize: "0.78rem",
            color: "#1e293b",
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          Not a legal service. Not connected to any government institution.
        </span>
      </div>
    </footer>
  );
}
