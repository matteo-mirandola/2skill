"use client";

import { useEffect, useRef, useState } from "react";

const C = {
  cobalt: "#2C5FE0",
  ink: "#0A1E3F",
  muted: "#5B6B85",
  border: "#E3E9F5",
  white: "#FBFCFE",
  sky: "#9DBDF5",
};
const MONO = "var(--font-geist-mono, ui-monospace, monospace)";
const SANS = "var(--font-geist-sans, Inter, system-ui, sans-serif)";

type Col = "todo" | "doing" | "done";
type Card = { id: number; title: string };
type Board = Record<Col, Card[]>;

const ORDER: Col[] = ["todo", "doing", "done"];
const COL_LABELS: Record<Col, string> = { todo: "To do", doing: "In progress", done: "Done" };
const NEW_TITLES = [
  "Prepare report",
  "Contact a lead",
  "Request a quote",
  "Plan the sprint",
  "Answer emails",
];

let uid = 200;
const nextId = () => ++uid;

function seed(): Board {
  return {
    todo: [
      { id: nextId(), title: "Update the website" },
      { id: nextId(), title: "Call the supplier" },
    ],
    doing: [
      { id: nextId(), title: "Client proposal" },
      { id: nextId(), title: "Review invoices" },
    ],
    done: [
      { id: nextId(), title: "Send payroll" },
      { id: nextId(), title: "Team meeting" },
    ],
  };
}

export function TaskBoard() {
  const [board, setBoard] = useState<Board>(seed);
  const [dragTitle, setDragTitle] = useState<string | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ id: number; col: Col } | null>(null);
  const ntiRef = useRef(0);

  const findCol = (id: number): Col | null =>
    ORDER.find((c) => board[c].some((x) => x.id === id)) ?? null;

  const moveCard = (id: number, from: Col, to: Col) => {
    if (from === to) return;
    setBoard((b) => {
      const copy: Board = { todo: [...b.todo], doing: [...b.doing], done: [...b.done] };
      const idx = copy[from].findIndex((x) => x.id === id);
      if (idx < 0) return b;
      const [card] = copy[from].splice(idx, 1);
      copy[to].push(card);
      return copy;
    });
  };

  const addCard = () => {
    setBoard((b) => {
      const total = b.todo.length + b.doing.length + b.done.length;
      if (total > 9) return seed();
      const title = NEW_TITLES[ntiRef.current++ % NEW_TITLES.length];
      return { ...b, todo: [...b.todo, { id: nextId(), title }] };
    });
  };

  const onCardDown = (e: React.PointerEvent, id: number, col: Col) => {
    const card = board[col].find((x) => x.id === id);
    dragRef.current = { id, col };
    setDragTitle(card ? card.title : "");
    e.preventDefault();
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const g = ghostRef.current;
      if (g && dragRef.current) g.style.transform = `translate(${e.clientX + 12}px,${e.clientY + 8}px)`;
    };
    const up = (e: PointerEvent) => {
      const d = dragRef.current;
      dragRef.current = null;
      setDragTitle(null);
      if (!d) return;
      const tgt = document.elementFromPoint(e.clientX, e.clientY);
      const colEl = tgt && (tgt as HTMLElement).closest?.("[data-col]");
      if (colEl) moveCard(d.id, d.col, (colEl as HTMLElement).dataset.col as Col);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [board]);

  const onCardKey = (e: React.KeyboardEvent, id: number) => {
    const col = findCol(id);
    if (!col) return;
    const i = ORDER.indexOf(col);
    if (e.key === "ArrowRight" && i < 2) {
      moveCard(id, col, ORDER[i + 1]);
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && i > 0) {
      moveCard(id, col, ORDER[i - 1]);
      e.preventDefault();
    }
  };

  const column = (col: Col) => {
    const isDone = col === "done";
    return (
      <div
        data-col={col}
        style={{
          flex: 1,
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 9,
          minHeight: 120,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: col === "doing" ? C.cobalt : C.muted,
            }}
          >
            {COL_LABELS[col]}
          </span>
          {col === "todo" && (
            <button
              onClick={addCard}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                border: `1px solid ${C.border}`,
                background: "#fff",
                color: C.cobalt,
                borderRadius: 7,
                padding: "4px 9px",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: SANS,
              }}
            >
              + Add
            </button>
          )}
        </div>
        {board[col].map((c) => (
          <div
            key={c.id}
            data-col={col}
            tabIndex={0}
            role="button"
            onPointerDown={(e) => onCardDown(e, c.id, col)}
            onKeyDown={(e) => onCardKey(e, c.id)}
            style={{
              background: isDone ? "#F4F7FD" : "#fff",
              border: `1px solid ${C.border}`,
              borderRadius: 9,
              padding: "11px 12px",
              fontSize: 14,
              color: isDone ? C.muted : C.ink,
              cursor: "grab",
              touchAction: "none",
              boxShadow: "0 1px 2px rgba(15,42,94,0.05)",
              borderLeft: col === "doing" ? `3px solid ${C.cobalt}` : undefined,
              textDecoration: isDone ? "line-through" : undefined,
              textDecorationColor: isDone ? C.sky : undefined,
            }}
          >
            {c.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="taskboard-cols">
        {ORDER.map((c) => (
          <div key={c} style={{ flex: 1, minWidth: 160 }}>
            {column(c)}
          </div>
        ))}
      </div>
      {dragTitle !== null && (
        <div
          ref={ghostRef}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 60,
            pointerEvents: "none",
            background: "#fff",
            border: `1px solid ${C.cobalt}`,
            borderRadius: 9,
            boxShadow: "0 10px 28px rgba(15,42,94,0.22)",
            padding: "11px 12px",
            fontSize: 14,
            color: C.ink,
            transform: "translate(-9999px,-9999px)",
          }}
        >
          {dragTitle}
        </div>
      )}
    </>
  );
}
