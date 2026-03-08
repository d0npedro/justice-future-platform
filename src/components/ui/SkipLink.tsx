"use client";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      onFocus={(e) => (e.currentTarget.style.top = "0")}
      onBlur={(e) => (e.currentTarget.style.top = "-100%")}
      style={{
        position: "absolute",
        top: "-100%",
        left: "1rem",
        zIndex: 9999,
        padding: "0.75rem 1.25rem",
        background: "#2563eb",
        color: "#fff",
        fontFamily: "var(--font-body), system-ui, sans-serif",
        fontSize: "0.875rem",
        fontWeight: 500,
        borderRadius: "0 0 6px 6px",
        textDecoration: "none",
        transition: "top 0.1s",
      }}
    >
      Skip to main content
    </a>
  );
}
