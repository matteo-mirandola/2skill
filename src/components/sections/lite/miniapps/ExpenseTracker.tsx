"use client";

import { useState } from "react";

const C = {
  cobalt: "#2C5FE0",
  navy: "#0F2A5E",
  ink: "#0A1E3F",
  muted: "#5B6B85",
  border: "#E3E9F5",
  tint: "#EEF3FF",
  white: "#FBFCFE",
};
const MONO = "var(--font-geist-mono, ui-monospace, monospace)";
const SANS = "var(--font-geist-sans, Inter, system-ui, sans-serif)";

type Category = "Supplies" | "Software" | "Travel" | "Marketing" | "Other";
type Expense = { id: number; concept: string; amount: number; cat: Category };

const CATEGORIES: Category[] = ["Supplies", "Software", "Travel", "Marketing", "Other"];

let uid = 100;
const nextId = () => ++uid;

function seed(): Expense[] {
  return [
    { id: nextId(), concept: "CRM subscription", amount: 49, cat: "Software" },
    { id: nextId(), concept: "Madrid train tickets", amount: 120, cat: "Travel" },
    { id: nextId(), concept: "Social media ads", amount: 80, cat: "Marketing" },
    { id: nextId(), concept: "Office supplies", amount: 35, cat: "Supplies" },
  ];
}

const money = (n: number) => `${Math.round(n * 100) / 100} €`;

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>(seed);
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");
  const [cat, setCat] = useState<Category>("Software");

  const add = () => {
    const value = parseFloat((amount || "").replace(",", ".")) || 0;
    setExpenses((xs) => [
      ...xs,
      { id: nextId(), concept: concept.trim() || "Expense", amount: value, cat },
    ]);
    setConcept("");
    setAmount("");
  };

  const del = (id: number) => setExpenses((xs) => xs.filter((x) => x.id !== id));

  const total = expenses.reduce((a, b) => a + (b.amount || 0), 0);
  const catTotals = CATEGORIES.map((c) => ({
    cat: c,
    sum: expenses.filter((e) => e.cat === c).reduce((a, b) => a + (b.amount || 0), 0),
  })).filter((x) => x.sum > 0);
  const max = catTotals.reduce((m, x) => Math.max(m, x.sum), 0) || 1;

  const inputStyle: React.CSSProperties = {
    background: "#fff",
    border: `1px solid ${C.border}`,
    borderRadius: 9,
    padding: "11px 14px",
    fontSize: 14,
    fontFamily: SANS,
    color: C.ink,
    outline: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <input
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Item"
          style={{ ...inputStyle, flex: 1, minWidth: 150 }}
        />
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          inputMode="decimal"
          placeholder="€"
          style={{ ...inputStyle, width: 92, fontFamily: MONO }}
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as Category)}
          style={{ ...inputStyle, padding: "11px 12px", cursor: "pointer" }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={add}
          style={{
            background: C.cobalt,
            color: "#fff",
            border: "none",
            borderRadius: 9,
            padding: "11px 18px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: SANS,
          }}
        >
          Add
        </button>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ flex: 1.4, minWidth: 240, display: "flex", flexDirection: "column", gap: 8 }}>
          {expenses.map((e) => (
            <div
              key={e.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                background: "#fff",
              }}
            >
              <span style={{ flex: 1, fontSize: 14, color: C.ink }}>{e.concept}</span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: C.cobalt,
                  background: C.tint,
                  borderRadius: 6,
                  padding: "2px 8px",
                }}
              >
                {e.cat}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 14,
                  color: C.ink,
                  minWidth: 64,
                  textAlign: "right",
                }}
              >
                {money(e.amount)}
              </span>
              <button
                onClick={() => del(e.id)}
                aria-label="Delete"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  border: `1px solid ${C.border}`,
                  background: "#fff",
                  color: C.muted,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, background: C.white }}>
            <div
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: C.muted,
                marginBottom: 6,
              }}
            >
              Total spent
            </div>
            <div style={{ fontFamily: MONO, fontSize: 32, fontWeight: 700, color: C.navy, letterSpacing: "-0.02em" }}>
              {money(total)}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {catTotals.map((b) => (
              <div key={b.cat}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 4 }}>
                  <span>{b.cat}</span>
                  <span style={{ fontFamily: MONO }}>{money(b.sum)}</span>
                </div>
                <div style={{ height: 8, borderRadius: 9999, background: C.border, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 9999,
                      background: C.cobalt,
                      transition: "width .5s cubic-bezier(.16,1,.3,1)",
                      width: `${Math.max(6, Math.round((b.sum / max) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
