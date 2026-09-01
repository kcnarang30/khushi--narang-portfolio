"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_INK } from "@/lib/motion";

type Variant = "strike" | "circle" | "highlight" | "underline";

const PATHS: Record<Variant, string> = {
  strike: "M1 5.5 C 20 3, 45 7.5, 60 4.5 S 85 6.5, 99 5",
  underline: "M2 6.5 C 40 3, 80 8.5, 118 5 S 170 3.5, 198 6",
  circle:
    "M50 3 C 20 3, 3 22, 6 42 C 9 62, 32 71, 55 68 C 82 64, 97 46, 92 26 C 88 10, 68 2, 50 4",
  highlight: "M0 5 L 100 5",
};

const VIEWBOX: Record<Variant, string> = {
  strike: "0 0 100 10",
  underline: "0 0 200 12",
  circle: "0 0 100 72",
  highlight: "0 0 100 10",
};

/**
 * The single hand-drawn-mark primitive for the whole site. One SVG path per
 * variant, one draw-in mechanism (stroke-dashoffset via pathLength=1). Used
 * for a real edit (strike), emphasis (circle), a marker pass (highlight), or
 * a hover affordance (underline — though most interactive text should use
 * <HandUnderline> directly, which wraps this with the right positioning).
 *
 * `trigger="view"` draws once when scrolled into view; `trigger="mount"`
 * draws once on mount (for marks meant to read as already-there); pass a
 * numeric `delay` to sequence multiple marks against each other.
 */
export function InkMark({
  variant,
  trigger = "view",
  delay = 0,
  color = "var(--mg-accent)",
  strokeWidth = 2.5,
  className = "",
}: {
  variant: Variant;
  trigger?: "view" | "mount";
  delay?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const isHighlight = variant === "highlight";

  const motionProps =
    trigger === "view"
      ? {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-40px" } as const,
        }
      : { initial: { pathLength: 0 }, animate: { pathLength: 1 } };

  return (
    <svg
      viewBox={VIEWBOX[variant]}
      preserveAspectRatio="none"
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ overflow: "visible" }}
    >
      <motion.path
        d={PATHS[variant]}
        fill="none"
        stroke={color}
        strokeWidth={isHighlight ? 10 : strokeWidth}
        strokeLinecap={isHighlight ? "square" : "round"}
        strokeOpacity={isHighlight ? 0.28 : 1}
        {...(reduce ? {} : motionProps)}
        transition={{ duration: DURATION.ink, delay, ease: EASE_INK }}
      />
    </svg>
  );
}
