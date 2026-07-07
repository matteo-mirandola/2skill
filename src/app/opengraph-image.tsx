import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "2Skill — Measure your team's real AI skill, then prove the uplift";

export default function OpengraphImage() {
  const logoBase64 = readFileSync(
    join(process.cwd(), "public", "logo.png")
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
          background: "#FBFCFE",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#0A1E3F",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={210} height={47} alt="2Skill" />

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
              background: "linear-gradient(100deg,#2C5FE0,#1B3E9C,#0F2A5E)",
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
            color: "#5B6B85",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#2C5FE0", fontWeight: 700 }}>Measure</span>
            <span>→ Train → Prove</span>
          </div>
          <div>· AI capability, made visible</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
