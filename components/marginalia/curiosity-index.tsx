"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Item = { label: string; kind: string };

/**
 * A real index card, not a decorative widget — cycles through what's
 * actually in `about.ts` (exploring + interests), one at a time, the way
 * flipping through an actual index card box turns up one entry at a time.
 * Advances on its own slowly; tapping moves it along immediately. Only
 * real content — nothing here is invented per-item copy.
 */
export function CuriosityIndex({ items }: { items: Item[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 4200);
    return () => clearInterval(id);
  }, [reduce, paused, items.length]);

  const current = items[i];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="inline-flex items-center gap-3"
    >
      <button
        type="button"
        onClick={() => setI((n) => (n + 1) % items.length)}
        aria-label="Next curiosity"
        className="focus-ring group relative flex h-16 w-44 items-center justify-center overflow-hidden rounded-[1px] border border-mg-line bg-mg-bg-raised px-3 text-left shadow-[0_10px_20px_-12px_rgba(36,31,24,0.35)] transition-transform duration-150 active:scale-[0.98]"
        style={{ transform: "rotate(-1deg)" }}
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-1 bg-mg-accent/60"
        />
        <AnimatePresence mode="wait">
          <motion.span
            key={current.label}
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="block pl-2"
          >
            <span className="block font-marginalia-sans text-[9.5px] uppercase tracking-wide text-mg-ink-faint">{current.kind}</span>
            <span className="block font-marginalia-serif text-[15px] leading-tight text-mg-ink">{current.label}</span>
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="font-marginalia-sans text-[11px] text-mg-ink-faint">
        {i + 1} / {items.length}
      </span>
    </div>
  );
}
