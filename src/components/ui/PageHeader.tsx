import { SectionLabel } from "@/components/ui/SectionLabel";

interface PageHeaderProps {
  overline: string;
  title: React.ReactNode;
  description: string;
  /** Optional accent phrase within the title — rendered in italic blue */
  accentPhrase?: string;
}

export function PageHeader({ overline, title, description }: PageHeaderProps) {
  return (
    <header
      className="jf-grain"
      style={{
        position: "relative",
        background: "var(--c-dark)",
        paddingTop: "calc(var(--nav-h) + 64px)",
        paddingBottom: "72px",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "0",
          right: "-5%",
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionLabel dark>{overline}</SectionLabel>

        <h1
          style={{
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            fontWeight: 600,
            color: "#f1f5f9",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            marginBottom: "1.25rem",
            maxWidth: "720px",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            fontSize: "1.05rem",
            fontWeight: 300,
            color: "#64748b",
            lineHeight: 1.75,
            maxWidth: "580px",
            fontFamily: "var(--font-body), system-ui, sans-serif",
          }}
        >
          {description}
        </p>
      </div>
    </header>
  );
}
