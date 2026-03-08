interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export function SectionLabel({ children, dark = false }: SectionLabelProps) {
  const color = dark ? "#3b82f6" : "var(--c-accent)";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.68rem",
        fontWeight: 700,
        color,
        letterSpacing: "0.13em",
        textTransform: "uppercase",
        fontFamily: "var(--font-body), system-ui, sans-serif",
        marginBottom: "1.5rem",
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "20px",
          height: "1px",
          background: color,
          verticalAlign: "middle",
        }}
      />
      {children}
    </div>
  );
}
