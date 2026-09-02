"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The one hand-drawn mark on the homepage — a real correction, not a
 * decorative accent. Reads as if someone actually crossed out "a
 * well-defined brief" and wrote "messy problem" above it in red pen. Runs
 * once on load: headline settles, the strike draws itself in, then the
 * replacement lands — a sequence, not a simultaneous fade.
 */
export function HeroCorrection() {
  const reduce = useReducedMotion();

  return (
    <h1 className="max-w-[13ch] font-marginalia-serif text-[32px] font-medium leading-[1.05] text-mg-ink sm:max-w-[11ch] sm:text-[56px] sm:leading-[0.98] lg:text-[84px]">
      <motion.span
        initial={reduce ? undefined : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        Give me a{" "}
      </motion.span>
      <motion.span
        initial={reduce ? undefined : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-block whitespace-nowrap text-mg-ink-faint"
      >
        well&#8209;defined brief
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ overflow: "visible" }}
        >
          <motion.path
            d="M1 5.5 C 20 3, 45 7.5, 60 4.5 S 85 6.5, 99 5"
            fill="none"
            stroke="var(--mg-accent)"
            strokeWidth="1.75"
            strokeLinecap="round"
            initial={reduce ? undefined : { pathLength: 0 }}
            animate={reduce ? undefined : { pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.75, ease: "easeInOut" }}
          />
        </svg>
      </motion.span>{" "}
      <motion.span
        initial={reduce ? undefined : { opacity: 0, y: 10, rotate: -3, scale: 0.94 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, rotate: -2, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.15, ease: [0.34, 1.56, 0.64, 1] }}
        className="inline-block font-marginalia-hand text-[0.72em] text-mg-accent"
      >
        messy problem
      </motion.span>
      .
    </h1>
  );
}
