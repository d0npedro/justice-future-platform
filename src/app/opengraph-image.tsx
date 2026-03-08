import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Justice Future Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1628",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Top: wordmark + badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#3b82f6",
            }}
          />
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#e2e8f0",
              letterSpacing: "0.01em",
            }}
          >
            Justice Future
          </span>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              color: "#475569",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "3px 10px",
              borderRadius: "999px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Prototype
          </span>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{ width: "32px", height: "1px", background: "#3b82f6" }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#3b82f6",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Public Prototype · 2026
            </span>
          </div>
          <div
            style={{
              fontSize: "62px",
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {"Most conflicts don't need"}
            <br />
            {"a courtroom."}
            <span style={{ color: "#93c5fd", fontStyle: "italic" }}>
              {" They need clarity."}
            </span>
          </div>
        </div>

        {/* Bottom: descriptor */}
        <div
          style={{
            fontSize: "17px",
            color: "#475569",
            lineHeight: 1.6,
            maxWidth: "700px",
          }}
        >
          A structured digital layer for conflict resolution before escalation.
          Building the missing infrastructure between conflict and formal
          proceedings.
        </div>
      </div>
    ),
    { ...size }
  );
}
