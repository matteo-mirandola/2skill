"use client";

import { useEffect, useRef, useState } from "react";

const C = {
  cobalt: "#2C5FE0",
  navy: "#0F2A5E",
  ink: "#0A1E3F",
  muted: "#5B6B85",
  border: "#E3E9F5",
  white: "#FBFCFE",
};
const MONO = "var(--font-geist-mono, ui-monospace, monospace)";
const SANS = "var(--font-geist-sans, Inter, system-ui, sans-serif)";

const NODEW = 158;
const PORTY = 20;

const ICON: Record<string, string> = {
  bolt: "M13 2 3 14h9l-1 8 10-12h-9l1-8z",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  mail: "M3 5h18v14H3z M3 6l9 7 9-7",
  task: "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  bill: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.9 1.9 0 0 0 3.4 0",
};

type Kind = "trigger" | "action";
type FlowNode = { id: number; title: string; kind: Kind; iconD: string; x: number; y: number; done: boolean };
type Conn = { from: number; to: number };

const ADD_BUTTONS: { label: string; icon: string }[] = [
  { label: "Create task", icon: ICON.task },
  { label: "Notify the team", icon: ICON.bell },
  { label: "Create invoice", icon: ICON.bill },
];

// Seed nodes use fixed ids (1-3); dynamically added nodes start at 301, so they never collide.
let uid = 300;
const nextId = () => ++uid;

// Deterministic zig-zag layout that fits both narrow (mobile) and wide canvases.
function seedNodes(): FlowNode[] {
  return [
    { id: 1, title: "When a lead comes in", kind: "trigger", iconD: ICON.bolt, x: 16, y: 28, done: false },
    { id: 2, title: "Add to CRM", kind: "action", iconD: ICON.users, x: 150, y: 150, done: false },
    { id: 3, title: "Send email", kind: "action", iconD: ICON.mail, x: 16, y: 272, done: false },
  ];
}
function seedConns(): Conn[] {
  return [{ from: 1, to: 2 }, { from: 2, to: 3 }];
}

function bezier(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.max(40, Math.abs(x2 - x1) / 2);
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

const iconFor = (title: string) =>
  ({
    "Create task": ICON.task,
    "Notify the team": ICON.bell,
    "Create invoice": ICON.bill,
    "Add to CRM": ICON.users,
    "Send email": ICON.mail,
  } as Record<string, string>)[title] || ICON.task;

export function FlowBuilder() {
  const [nodes, setNodes] = useState<FlowNode[]>(seedNodes);
  const [conns, setConns] = useState<Conn[]>(seedConns);

  const canvasRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tempRef = useRef<SVGPathElement | null>(null);
  const pulseRef = useRef<SVGCircleElement | null>(null);

  const nodeDrag = useRef<{ id: number; sx: number; sy: number; ox: number; oy: number } | null>(null);
  const connDrag = useRef<{ from: number } | null>(null);
  const reduce = useRef(false);
  const runRaf = useRef<number | null>(null);

  useEffect(() => {
    reduce.current =
      typeof window !== "undefined" &&
      !!window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      if (runRaf.current) cancelAnimationFrame(runRaf.current);
    };
  }, []);

  const addNode = (title: string) => {
    setNodes((ns) => {
      if (ns.length > 5) return ns;
      return [
        ...ns,
        {
          id: nextId(),
          title,
          kind: "action",
          iconD: iconFor(title),
          x: 60 + Math.random() * 360,
          y: 180 + Math.random() * 150,
          done: false,
        },
      ];
    });
  };

  const addConnection = (from: number, to: number) => {
    if (from === to) return;
    setConns((cs) => (cs.find((c) => c.from === from && c.to === to) ? cs : [...cs, { from, to }]));
  };

  const onNodeDown = (e: React.PointerEvent, id: number) => {
    if (reduce.current) return;
    const n = nodes.find((x) => x.id === id);
    if (!n) return;
    nodeDrag.current = { id, sx: e.clientX, sy: e.clientY, ox: n.x, oy: n.y };
    e.preventDefault();
  };

  const onPortDown = (e: React.PointerEvent, node: number, port: "in" | "out") => {
    e.stopPropagation();
    if (reduce.current || port !== "out") return;
    connDrag.current = { from: node };
    e.preventDefault();
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const host = canvasRef.current;
      if (!host) return;
      const r = host.getBoundingClientRect();
      if (nodeDrag.current) {
        const d = nodeDrag.current;
        let nx = d.ox + (e.clientX - d.sx);
        let ny = d.oy + (e.clientY - d.sy);
        nx = Math.max(0, Math.min(r.width - NODEW, nx));
        ny = Math.max(0, Math.min(r.height - 52, ny));
        setNodes((ns) => ns.map((n) => (n.id === d.id ? { ...n, x: nx, y: ny } : n)));
      } else if (connDrag.current) {
        const tp = tempRef.current;
        const from = nodes.find((n) => n.id === connDrag.current!.from);
        if (!tp || !from) return;
        const x1 = from.x + NODEW, y1 = from.y + PORTY;
        const x2 = e.clientX - r.left, y2 = e.clientY - r.top;
        tp.setAttribute("d", bezier(x1, y1, x2, y2));
        tp.style.opacity = "0.7";
      }
    };
    const up = (e: PointerEvent) => {
      if (connDrag.current) {
        const tp = tempRef.current;
        if (tp) tp.style.opacity = "0";
        const tgt = document.elementFromPoint(e.clientX, e.clientY);
        const portEl = tgt && (tgt as HTMLElement).closest?.('[data-port="in"]');
        if (portEl) addConnection(connDrag.current.from, Number((portEl as HTMLElement).dataset.node));
        connDrag.current = null;
      }
      nodeDrag.current = null;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [nodes]);

  const markDone = (id: number) => setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, done: true } : n)));

  const run = () => {
    if (reduce.current) {
      setNodes((ns) => ns.map((n) => ({ ...n, done: true })));
      return;
    }
    if (runRaf.current) cancelAnimationFrame(runRaf.current);
    setNodes((ns) => ns.map((n) => ({ ...n, done: false })));
    setTimeout(() => {
      const svg = svgRef.current;
      const paths = svg ? Array.from(svg.querySelectorAll<SVGPathElement>("[data-ci]")) : [];
      if (!paths.length) {
        setNodes((ns) => ns.map((n) => ({ ...n, done: true })));
        return;
      }
      const segs = paths.map((p) => {
        const L = p.getTotalLength();
        const N = 24;
        const pts: { x: number; y: number }[] = [];
        for (let k = 0; k <= N; k++) {
          const pt = p.getPointAtLength((L * k) / N);
          pts.push({ x: pt.x, y: pt.y });
        }
        return { from: Number(p.getAttribute("data-from")), to: Number(p.getAttribute("data-to")), pts };
      });
      markDone(segs[0].from);
      let idx = 0;
      let t0: number | null = null;
      const dur = 650;
      const step = (now: number) => {
        if (idx >= segs.length) {
          if (pulseRef.current) pulseRef.current.style.opacity = "0";
          runRaf.current = null;
          return;
        }
        if (t0 == null) t0 = now;
        const seg = segs[idx];
        const s = Math.min(1, (now - t0) / dur);
        const fi = s * (seg.pts.length - 1);
        const i0 = Math.floor(fi);
        const i1 = Math.min(seg.pts.length - 1, i0 + 1);
        const f = fi - i0;
        const x = seg.pts[i0].x + (seg.pts[i1].x - seg.pts[i0].x) * f;
        const y = seg.pts[i0].y + (seg.pts[i1].y - seg.pts[i0].y) * f;
        if (pulseRef.current) {
          pulseRef.current.setAttribute("cx", String(x));
          pulseRef.current.setAttribute("cy", String(y));
          pulseRef.current.style.opacity = "1";
        }
        if (s >= 1) {
          markDone(seg.to);
          idx++;
          t0 = null;
        }
        runRaf.current = requestAnimationFrame(step);
      };
      runRaf.current = requestAnimationFrame(step);
    }, 70);
  };

  const nodeById: Record<number, FlowNode> = {};
  nodes.forEach((n) => (nodeById[n.id] = n));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ADD_BUTTONS.map((b) => (
            <button
              key={b.label}
              onClick={() => addNode(b.label)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                border: `1px dashed ${C.border}`,
                background: "#fff",
                color: C.cobalt,
                borderRadius: 8,
                padding: "6px 11px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: SANS,
              }}
            >
              + {b.label}
            </button>
          ))}
        </div>
        <button
          onClick={run}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: C.cobalt,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: SANS,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
          Run
        </button>
      </div>

      <div
        ref={canvasRef}
        style={{
          position: "relative",
          height: 380,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          background: `linear-gradient(0deg,${C.white},${C.white}), radial-gradient(${C.border} 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 22px 22px",
          overflow: "hidden",
          touchAction: "none",
        }}
      >
        <svg ref={svgRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}>
          {conns.map((c, i) => {
            const a = nodeById[c.from];
            const b = nodeById[c.to];
            if (!a || !b) return null;
            return (
              <path
                key={i}
                data-ci={i}
                data-from={c.from}
                data-to={c.to}
                d={bezier(a.x + NODEW, a.y + PORTY, b.x, b.y + PORTY)}
                fill="none"
                stroke={C.cobalt}
                strokeWidth={2}
                strokeLinecap="round"
                style={{ opacity: 0.55 }}
              />
            );
          })}
          <path ref={tempRef} d="" fill="none" stroke={C.cobalt} strokeWidth={2} strokeDasharray="5 5" style={{ opacity: 0 }} />
          <circle ref={pulseRef} r={5.5} fill={C.cobalt} style={{ opacity: 0, filter: "drop-shadow(0 0 7px rgba(44,95,224,0.85))" }} />
        </svg>

        {nodes.map((n) => (
          <div
            key={n.id}
            onPointerDown={(e) => onNodeDown(e, n.id)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: NODEW,
              transform: `translate(${n.x}px,${n.y}px)`,
              borderLeft: `3px solid ${n.kind === "trigger" ? C.navy : C.cobalt}`,
              background: "#fff",
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "11px 13px 11px 15px",
              boxShadow: "0 2px 10px rgba(15,42,94,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 9,
              cursor: "grab",
              touchAction: "none",
              zIndex: 1,
            }}
          >
            <div
              data-node={n.id}
              data-port="in"
              onPointerDown={(e) => onPortDown(e, n.id, "in")}
              style={{ position: "absolute", left: -6, top: 19, width: 13, height: 13, borderRadius: 9999, background: "#fff", border: `2px solid ${C.cobalt}`, cursor: "crosshair", zIndex: 3 }}
            />
            <div
              data-node={n.id}
              data-port="out"
              onPointerDown={(e) => onPortDown(e, n.id, "out")}
              style={{ position: "absolute", right: -6, top: 19, width: 13, height: 13, borderRadius: 9999, background: C.cobalt, border: "2px solid #fff", cursor: "crosshair", zIndex: 3 }}
            />
            <span style={{ color: n.kind === "trigger" ? C.navy : C.cobalt, display: "inline-flex", flex: "none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={n.iconD} />
              </svg>
            </span>
            <span style={{ fontSize: 13, color: C.ink, lineHeight: 1.2 }}>{n.title}</span>
            {n.done && (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  width: 20,
                  height: 20,
                  borderRadius: 9999,
                  background: C.cobalt,
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 0 3px #fff",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-4-4" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      <div style={{ fontFamily: MONO, fontSize: 11, color: C.muted, opacity: 0.8 }}>
        Drag the nodes, connect an output port to an input port, then hit Run.
      </div>
    </div>
  );
}
