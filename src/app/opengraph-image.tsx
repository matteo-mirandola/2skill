import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "2Skill — Measure your team's real AI skill, then prove the uplift";

export default function OpengraphImage() {
  const logoBase64 = readFileSync(
    join(process.cwd(), "public", "logo-dark.png")
  ).toString("base64");
  const logoSrc = `data:image/png;base64,${logoBase64}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={210} height={50} alt="2Skill" />

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
