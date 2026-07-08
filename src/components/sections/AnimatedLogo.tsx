"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export function AnimatedLogo() {
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;

    const onScroll = () => {
      if (window.scrollY > 50) {
        el.classList.add("scrolled");
      } else {
        el.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="#top"
      ref={logoRef}
      className="ts-wm"
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        position: "relative",
        height: 30,
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        fontWeight: 800,
        fontSize: 28,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        color: "#0A1E3F",
      }}
    >
      <span className="ts-letters" style={{ display: "block" }}>
        t
      </span>

      <svg
        className="ts-ticks"
        width="44"
        height="26"
        viewBox="0 0 44 26"
        fill="none"
        stroke="#2C5FE0"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: "block", margin: "0 1px 1px" }}
      >
        <path d="M3 7 L11 20 L20 4" />
        <path d="M24 7 L32 20 L41 4" />
      </svg>

      <span className="ts-letters" style={{ display: "block" }}>
        oskıll
      </span>

      <span
        className="ts-dot"
        style={{
          position: "absolute",
          left: 108,
          top: 3,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "#2C5FE0",
        }}
      />

      <style jsx global>{`
        .ts-wm .ts-letters {
          transition: opacity 0.25s ease;
        }
        .ts-wm .ts-ticks {
          transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ts-wm .ts-dot {
          transition: transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ts-wm.scrolled .ts-letters {
          opacity: 0;
        }
        .ts-wm.scrolled .ts-ticks {
          transform: translateX(-15px);
        }
        .ts-wm.scrolled .ts-dot {
          transform: translateX(-64px);
        }
        @media (prefers-reduced-motion: reduce) {
          .ts-wm .ts-letters,
          .ts-wm .ts-ticks,
          .ts-wm .ts-dot {
            transition: none !important;
          }
        }
      `}</style>
    </Link>
  );
}
