"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * reducedMotion="user" makes every Framer Motion component respect the OS
 * "reduce motion" setting automatically: transform/layout animations are
 * skipped, opacity is preserved. This covers the JS-driven animations that a
 * CSS `prefers-reduced-motion` media query cannot reach.
 */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
