"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * One piece of a scene arriving onto the desk — not a page-wide fade, a
 * staggered sequence where each object settles into place a beat after
 * the last, the way a real load-in on niccolomiranda.com reads as "stuff
 * happening" rather than one panel appearing. Delay is per-instance so a
 * whole scene can be composed by giving each piece a slightly later time.
 */
export function SettleIn({
  children,
  delay = 0,
  y = 22,
  rotate = -3,
  scale = 0.94,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  scale?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y, rotate, scale }}
      animate={reduce ? undefined : { opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
