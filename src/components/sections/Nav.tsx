"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links: { href: string; label: string; accent?: boolean }[] = [
  { href: "/problem",      label: "Problem" },
  { href: "/solution",     label: "Solution" },
  { href: "/architecture", label: "Architecture" },
  { href: "/api",          label: "API" },
  { href: "/roadmap",      label: "Roadmap" },
  { href: "/about",        label: "About" },
  { href: "/demo",         label: "Demo", accent: true },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "var(--nav-h)",
          padding: "0 1.75rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(12, 22, 40, 0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          gap: "1rem",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
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
              fontSize: "0.92rem",
              fontWeight: 600,
              color: "#e2e8f0",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Justice Future
          </span>
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              color: "#334155",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              padding: "2px 7px",
              borderRadius: "999px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            Prototype
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          className="jf-desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.125rem",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "5px 11px",
                borderRadius: "5px",
                fontSize: "0.78rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.01em",
                fontFamily: "var(--font-body), system-ui, sans-serif",
                transition: "color 0.15s, background 0.15s",
                color: isActive(link.href)
                  ? "#e2e8f0"
                  : link.accent
                  ? "#93c5fd"
                  : "#64748b",
                background: isActive(link.href)
                  ? "rgba(255,255,255,0.07)"
                  : link.accent && !isActive(link.href)
                  ? "rgba(37,99,235,0.1)"
                  : "transparent",
                border: link.accent && !isActive(link.href)
                  ? "1px solid rgba(37,99,235,0.2)"
                  : "1px solid transparent",
                whiteSpace: "nowrap",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
          <Link
            href="/start"
            className="jf-desktop-nav"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 14px",
              background: "#2563eb",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "0.78rem",
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "var(--font-body), system-ui, sans-serif",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              transition: "background 0.15s",
            }}
          >
            Start a case
          </Link>
          <a
            href="https://github.com/d0npedro/justice-future-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="jf-nav-link jf-desktop-nav"
            style={{ display: "inline-flex", whiteSpace: "nowrap" }}
          >
            <GitHubIcon />
            GitHub
          </a>

          {/* Hamburger */}
          <button
            className="jf-hamburger"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — rendered as flex when open */}
      <div
        className="jf-mobile-menu"
        style={{ display: open ? "flex" : "none" }}
        aria-hidden={!open}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`jf-mobile-nav-item ${isActive(link.href) ? "jf-mobile-nav-item-active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/start"
          className="jf-mobile-nav-item"
          style={{ color: "#93c5fd", fontWeight: 600 }}
        >
          Start a case →
        </Link>
        <a
          href="https://github.com/d0npedro/justice-future-platform"
          target="_blank"
          rel="noopener noreferrer"
          className="jf-mobile-nav-item"
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <GitHubIcon /> GitHub
        </a>
      </div>
    </>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </svg>
  );
}
