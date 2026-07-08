"use client";

import { useEffect, useRef } from "react";

const NAVY = "#0A1E3F";
const COBALT = "#2C5FE0";

// How many pixels of page scroll it takes to fully morph the wordmark
// into the compact tick+dot symbol.
const SCROLL_RANGE = 500;

type Rect = { x: number; y: number; w: number; h: number };
type Placement = { s: number; tx: number; ty: number };
type Point = { cx: number; cy: number; s: number };

type MorphState = {
  ticksWord: Placement;
  ticksSym: Placement;
  dotRest: Point;
  dotLift: Point;
  dotSym: Point;
  dcx: number;
  dcy: number;
  left: { cx: number; cy: number };
  right: { cx: number; cy: number };
};

export function AnimatedLogo() {
  const elTRef = useRef<SVGTextElement>(null);
  const elWordRef = useRef<SVGTextElement>(null);
  const elLeftRef = useRef<SVGGElement>(null);
  const elRightRef = useRef<SVGGElement>(null);
  const elTicksRef = useRef<SVGGElement>(null);
  const elDotRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const elT = elTRef.current;
    const elWord = elWordRef.current;
    const elLeft = elLeftRef.current;
    const elRight = elRightRef.current;
    const elTicks = elTicksRef.current;
    const elDot = elDotRef.current;
    if (!elT || !elWord || !elLeft || !elRight || !elTicks || !elDot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Internal SVG coordinate space (independent of on-screen render size,
    // which is controlled purely via the <svg> element's CSS height).
    const CX = 500;
    const CY = 210;
    const F = 175;
    const BASE = 262;
    const Ht = F * 0.58;
    const Hs = 156;
    const GAP1 = 6;
    const GAP2 = 10;

    let state: MorphState | null = null;

    function bbox(el: SVGGraphicsElement): Rect {
      const b = el.getBBox();
      return { x: b.x, y: b.y, w: b.width, h: b.height };
    }

    function computeState(): MorphState {
      const tb = bbox(elTicks!);
      const db = bbox(elDot!);

      const uX = Math.min(tb.x, db.x);
      const uY = Math.min(tb.y, db.y);
      const uX2 = Math.max(tb.x + tb.w, db.x + db.w);
      const uY2 = Math.max(tb.y + tb.h, db.y + db.h);
      const ub = { x: uX, y: uY, w: uX2 - uX, h: uY2 - uY };

      const advT = elT!.getComputedTextLength();
      const sTickW = Ht / tb.h;
      const wTicks = tb.w * sTickW;
      const advW = elWord!.getComputedTextLength();
      const total = advT + GAP1 + wTicks + GAP2 + advW;
      const xT = CX - total / 2;
      const xTicks = xT + advT + GAP1;
      const xWord = xTicks + wTicks + GAP2;

      elT!.setAttribute("x", String(xT));
      elT!.setAttribute("y", String(BASE));
      elWord!.setAttribute("x", String(xWord));
      elWord!.setAttribute("y", String(BASE));

      const ticksTop = BASE - Ht;
      const ticksWord: Placement = {
        s: sTickW,
        tx: xTicks - sTickW * tb.x,
        ty: ticksTop - sTickW * tb.y,
      };

      const charPos = elWord as unknown as {
        getStartPositionOfChar(i: number): { x: number };
        getEndPositionOfChar(i: number): { x: number };
      };
      const iStart = charPos.getStartPositionOfChar(3).x;
      const iEnd = charPos.getEndPositionOfChar(3).x;
      const iCx = (iStart + iEnd) / 2;
      const dotCy = BASE - F * 0.74;
      const Hd = F * 0.135;
      const sDotW = Hd / db.h;
      const dcx = db.x + db.w / 2;
      const dcy = db.y + db.h / 2;

      const sSym = Hs / ub.h;
      const wSym = ub.w * sSym;
      const symTLx = CX - wSym / 2;
      const symTLy = CY - Hs / 2;
      const sym: Placement = {
        s: sSym,
        tx: symTLx - sSym * ub.x,
        ty: symTLy - sSym * ub.y,
      };

      const dotSymCx = sSym * dcx + sym.tx;
      const dotSymCy = sSym * dcy + sym.ty;

      const lb = bbox(elLeft!);
      const rb = bbox(elRight!);

      return {
        ticksWord,
        ticksSym: sym,
        dotRest: { cx: iCx, cy: dotCy, s: sDotW },
        dotLift: { cx: iCx, cy: dotCy - 52, s: sDotW * 1.14 },
        dotSym: { cx: dotSymCx, cy: dotSymCy, s: sSym },
        dcx,
        dcy,
        left: { cx: lb.x + lb.w / 2, cy: lb.y + lb.h / 2 },
        right: { cx: rb.x + rb.w / 2, cy: rb.y + rb.h / 2 },
      };
    }

    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);
    const backOut = (t: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const remap = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

    function setMatrix(el: SVGGElement, s: number, tx: number, ty: number) {
      el.setAttribute("transform", `matrix(${s},0,0,${s},${tx},${ty})`);
    }

    function dotMatrix(s: MorphState, cx: number, cy: number, scale: number) {
      setMatrix(elDot!, scale, cx - scale * s.dcx, cy - scale * s.dcy);
    }

    function render(p: number) {
      const s = state;
      if (!s) return;

      const lp = easeOut(remap(p, 0, 0.3));
      const op = 1 - lp;
      const k = 1 - lp * 0.14;
      const shift = lp * 26;
      elLeft!.setAttribute("opacity", String(op));
      elRight!.setAttribute("opacity", String(op));
      const L = s.left;
      const R = s.right;
      setMatrix(elLeft!, k, L.cx - k * L.cx + shift, L.cy - k * L.cy);
      setMatrix(elRight!, k, R.cx - k * R.cx - shift, R.cy - k * R.cy);

      const tp = easeInOut(remap(p, 0.32, 0.86));
      const w = s.ticksWord;
      const sy = s.ticksSym;
      setMatrix(elTicks!, lerp(w.s, sy.s, tp), lerp(w.tx, sy.tx, tp), lerp(w.ty, sy.ty, tp));

      const dr = s.dotRest;
      const dl = s.dotLift;
      const ds = s.dotSym;
      if (p < 0.3) {
        const t = easeOut(remap(p, 0, 0.3));
        dotMatrix(s, lerp(dr.cx, dl.cx, t), lerp(dr.cy, dl.cy, t), lerp(dr.s, dl.s, t));
      } else {
        const t2 = remap(p, 0.3, 1);
        const te = backOut(t2);
        const pcx = (dl.cx + ds.cx) / 2;
        const pcy = Math.min(dl.cy, ds.cy) - 70;
        const mt = 1 - te;
        const bx = mt * mt * dl.cx + 2 * mt * te * pcx + te * te * ds.cx;
        const by = mt * mt * dl.cy + 2 * mt * te * pcy + te * te * ds.cy;
        dotMatrix(s, bx, by, lerp(dl.s, ds.s, clamp01(t2)));
      }
    }

    const currentP = () => clamp01(window.scrollY / SCROLL_RANGE);

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        render(currentP());
        ticking = false;
      });
    }

    function init() {
      state = computeState();
      if (reduce) {
        render(1);
        return;
      }
      render(currentP());
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(init);
    } else {
      init();
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a href="#top" className="flex items-center" aria-label="twoskill">
      <svg
        viewBox="0 110 1000 200"
        style={{ overflow: "visible" }}
        className="h-8 w-auto sm:h-9"
        role="img"
        aria-label="twoskill"
      >
        <g ref={elLeftRef}>
          <text
            ref={elTRef}
            x={0}
            y={0}
            fill={NAVY}
            fontSize={175}
            fontWeight={500}
            fontFamily="var(--font-geist-sans), sans-serif"
          >
            t
          </text>
        </g>
        <g ref={elRightRef}>
          <text
            ref={elWordRef}
            x={0}
            y={0}
            fill={NAVY}
            fontSize={175}
            fontWeight={500}
            fontFamily="var(--font-geist-sans), sans-serif"
            letterSpacing={0.5}
          >
            oskıll
          </text>
        </g>
        <g ref={elTicksRef}>
          <g transform="translate(0,161) scale(0.1,-0.1)" fill={COBALT} stroke="none">
            <path d="M2926 1522 c-31 -7 -26 -1 -251 -332 -62 -91 -170 -249 -241 -353 -71 -103 -160 -233 -198 -288 l-68 -101 -19 29 c-11 15 -67 102 -124 192 -58 91 -112 173 -122 183 -14 16 -34 18 -180 18 -99 0 -163 -4 -163 -10 0 -13 499 -763 513 -772 20 -13 162 -9 179 5 8 6 73 98 143 202 71 105 149 219 174 255 25 36 124 179 221 319 171 249 221 320 312 451 115 166 131 191 125 196 -8 8 -267 13 -301 6z" />
            <path d="M1334 1302 c-6 -4 -127 -180 -269 -392 -142 -212 -271 -402 -287 -422 l-29 -37 -151 227 c-83 125 -160 237 -171 250 -20 21 -27 22 -178 22 -87 0 -160 -4 -163 -9 -3 -5 5 -24 17 -42 13 -19 66 -97 118 -174 53 -77 169 -250 259 -385 90 -135 168 -248 174 -252 19 -13 161 -9 178 5 9 6 60 77 113 157 54 80 128 188 165 240 241 342 550 797 550 810 0 12 -308 14 -326 2z" />
          </g>
        </g>
        <g ref={elDotRef}>
          <g transform="translate(0,161) scale(0.1,-0.1)" fill={COBALT} stroke="none">
            <path d="M3037 378 c-74 -46 -101 -140 -63 -220 21 -43 48 -63 109 -80 135 -36 255 99 199 224 -27 63 -71 91 -147 96 -49 2 -67 -1 -98 -20z" />
          </g>
        </g>
      </svg>
    </a>
  );
}
