"use client";

import { useState } from "react";
import { ExpenseTracker } from "./ExpenseTracker";
import { TaskBoard } from "./TaskBoard";
import { FlowBuilder } from "./FlowBuilder";

const C = {
  cobalt: "#2C5FE0",
  ink: "#0A1E3F",
  muted: "#5B6B85",
  border: "#E3E9F5",
  tint: "#EEF3FF",
};
const MONO = "var(--font-geist-mono, ui-monospace, monospace)";
const SANS = "var(--font-geist-sans, Inter, system-ui, sans-serif)";

const TABS = ["expenses.app", "tasks.app", "flows.app"];

export function MiniAppsShowcase() {
  const [slide, setSlide] = useState(0);
  const go = (i: number) => setSlide(((i % 3) + 3) % 3);

  const navBtn: React.CSSProperties = {
    width: 34,
    height: 34,
    borderRadius: 9999,
    border: `1px solid ${C.border}`,
    background: "#fff",
    color: C.ink,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <button onClick={() => go(slide - 1)} aria-label="Previous" style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to ${TABS[i]}`}
              style={{
                width: 9,
                height: 9,
                borderRadius: 9999,
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all .2s ease",
                background: i === slide ? C.cobalt : C.border,
                transform: i === slide ? "scale(1.35)" : "scale(1)",
              }}
            />
          ))}
        </div>
        <button onClick={() => go(slide + 1)} aria-label="Next" style={navBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", boxShadow: "0 18px 50px rgba(15,42,94,0.14)" }}>
        <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: C.tint, borderBottom: `1px solid ${C.border}` }}>
            <span style={{ width: 11, height: 11, borderRadius: 9999, background: "#E5A5A0" }} />
            <span style={{ width: 11, height: 11, borderRadius: 9999, background: "#E8C98C" }} />
            <span style={{ width: 11, height: 11, borderRadius: 9999, background: "#A7C6A0" }} />
            <div style={{ fontFamily: MONO, marginLeft: 10, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "4px 14px", fontSize: 12, color: C.muted }}>
              {TABS[slide]}
            </div>
          </div>
          <div style={{ padding: "20px clamp(14px,2.6vw,24px)", minHeight: 460 }}>
            <div style={{ display: slide === 0 ? "block" : "none" }}>
              <ExpenseTracker />
            </div>
            <div style={{ display: slide === 1 ? "block" : "none" }}>
              <TaskBoard />
            </div>
            <div style={{ display: slide === 2 ? "block" : "none" }}>
              <FlowBuilder />
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontFamily: MONO, textAlign: "center", color: C.muted, fontSize: 12, margin: "16px 0 0", opacity: 0.85 }}>
        None of these use AI under the hood — all three can be built by learning to use it.
      </p>

      <div style={{ textAlign: "center", marginTop: 20 }}>
        <a
          href="#book"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            background: "linear-gradient(90deg, #2C5FE0, #0F2A5E)",
            color: "#fff",
            border: "none",
            borderRadius: 9999,
            padding: "13px 26px",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: SANS,
            textDecoration: "none",
            boxShadow: "0 10px 30px -8px rgba(44,95,224,0.35)",
          }}
        >
          I want my team to be able to do this.
        </a>
      </div>
    </div>
  );
}
