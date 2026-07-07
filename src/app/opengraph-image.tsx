import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "2Skill — Measure your team's real AI skill, then prove the uplift";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05060a",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#f4f5fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
              color: "#05060a",
              background: "linear-gradient(135deg,#8b5cf6,#35d6ee)",
            }}
          >
            A
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>2Skill</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Know how well your team uses AI.
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              background: "linear-gradient(100deg,#a78bfa,#e94bd0,#35d6ee)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Then prove it improved.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 28,
            color: "#9aa3b8",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#a3e635", fontWeight: 700 }}>Measure</span>
            <span>→ Train → Prove</span>
          </div>
          <div>· AI capability, made visible</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
