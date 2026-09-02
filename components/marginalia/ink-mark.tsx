"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_INK } from "@/lib/motion";

type Variant = "strike" | "circle" | "highlight" | "underline" | "arrow" | "checkmark" | "question";

const PATHS: Record<Variant, string> = {
  strike: "M1 5.5 C 20 3, 45 7.5, 60 4.5 S 85 6.5, 99 5",
  underline: "M2 6.5 C 40 3, 80 8.5, 118 5 S 170 3.5, 198 6",
  circle:
    "M50 3 C 20 3, 3 22, 6 42 C 9 62, 32 71, 55 68 C 82 64, 97 46, 92 26 C 88 10, 68 2, 50 4",
  highlight: "M0 5 L 100 5",
  arrow: "M2 12 C 8 10, 16 9, 22 9 M22 9 L 16 5 M22 9 L 17 14",
  checkmark: "M2 12 L 9 18 L 22 3",
  question: "M4 6 C 4 2, 9 0, 13 1 C 17 2, 18 6, 14 8 C 11.5 9.5, 11 11, 11 13 M11 17.5 L 11 18",
};

const VIEWBOX: Record<Variant, string> = {
  strike: "0 0 100 10",
  underline: "0 0 200 12",
  circle: "0 0 100 72",
  highlight: "0 0 100 10",
  arrow: "0 0 24 20",
  checkmark: "0 0 24 20",
  question: "0 0 22 22",
};

// Overlay marks stretch to fill the text they annotate. Standalone marks are
// small companion glyphs sized to sit beside a word, not on top of it.
const STANDALONE: Record<Variant, boolean> = {
  strike: false,
  underline: false,
  circle: false,
  highlight: false,
  arrow: true,
  checkmark: true,
  question: true,
};

/**
 * The single hand-drawn-mark primitive for the whole site. One SVG path per
 * variant, one draw-in mechanism (stroke-dashoffset via pathLength=1).
 *
 * Overlay marks (strike, underline, circle, highlight) sit absolutely over
 * the text they annotate — wrap the target in `position: relative`.
 * Standalone marks (arrow, checkmark, question) render as a small inline
 * glyph — drop one next to a word, don't stretch it.
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
  strokeWidth = 1.75,
  size = 18,
  className = "",
}: {
  variant: Variant;
  trigger?: "view" | "mount";
  delay?: number;
  color?: string;
  strokeWidth?: number;
  size?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const isHighlight = variant === "highlight";
  const standalone = STANDALONE[variant];

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
      preserveAspectRatio={standalone ? "xMidYMid meet" : "none"}
      aria-hidden
      className={
        standalone
          ? `inline-block shrink-0 align-middle ${className}`
          : `pointer-events-none absolute inset-0 h-full w-full ${className}`
      }
      style={standalone ? { width: size, height: size } : { overflow: "visible" }}
    >
      <motion.path
        d={PATHS[variant]}
        fill="none"
        stroke={color}
        strokeWidth={isHighlight ? 10 : strokeWidth}
        strokeLinecap={isHighlight ? "square" : "round"}
        strokeLinejoin="round"
        strokeOpacity={isHighlight ? 0.28 : 1}
        {...(reduce ? {} : motionProps)}
        transition={{ duration: DURATION.ink, delay, ease: EASE_INK }}
      />
    </svg>
  );
}
