"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function NormalCurveBackdrop() {
  const reduce = useReducedMotion();

  // logical viewBox; the SVG scales responsively via preserveAspectRatio
  const W = 1000;
  const H = 340;

  const d = useMemo(() => {
    const cx = W / 2;
    const sigma = 135;
    const amp = 250;
    const base = H - 28;
    const N = 240;
    let path = "";
    for (let i = 0; i <= N; i++) {
      const x = (i / N) * W;
      const t = (x - cx) / sigma;
      const y = base - amp * Math.exp(-(t * t) / 2);
      path += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
    }
    return path.trim();
  }, []);

  const LIT = 0.16;
  const GAP = 1 - LIT;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl [mask-image:radial-gradient(ellipse_75%_80%_at_50%_55%,black,transparent)]"
    >
      <div className="absolute -left-24 top-8 h-[360px] w-[360px] rounded-full bg-violet/20 blur-[110px]" />
      <div className="absolute -right-16 bottom-0 h-[320px] w-[320px] rounded-full bg-cyan/20 blur-[110px]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-70"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          <linearGradient id="ncb-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2C5FE0" />
            <stop offset="100%" stopColor="#5C8AEE" />
          </linearGradient>
        </defs>

        <path
          d={d}
          stroke="#2C5FE0"
          strokeOpacity={0.18}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <motion.path
          d={d}
          pathLength={1}
          stroke="url(#ncb-stroke)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={`${LIT} ${GAP}`}
          style={{
            filter:
              "drop-shadow(0 0 6px rgba(44,95,224,0.6)) drop-shadow(0 0 16px rgba(92,138,238,0.45))",
          }}
          initial={{ strokeDashoffset: reduce ? -0.5 : 0 }}
          animate={reduce ? { strokeDashoffset: -0.5 } : { strokeDashoffset: [0, -1] }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 10, ease: "linear", repeat: Infinity }
          }
        />
      </svg>
    </div>
  );
}
