"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";

/**
 * A physical object you can pick up and move around its container — mouse
 * or touch, both handled by Framer Motion's pointer-based drag gesture.
 * Bounded to the container (dragConstraints), no momentum fling, snaps back
 * within bounds on release — it can be shoved to an edge, never lost.
 *
 * Optionally reveals on scroll first (settles into place, same as the rest
 * of the site's Reveal-style entrances) before becoming draggable — pass
 * `reveal` to turn that on.
 *
 * Purely a bonus interaction: nothing unique is gated behind it, so by
 * default the whole thing is aria-hidden and excluded from tab order.
 * Content-bearing objects (a real image + caption, not decoration) should
 * pass `contentBearing` so screen readers can still reach what's inside.
 */
export function Draggable({
  children,
  containerRef,
  className,
  extraTilt = 6,
  reveal = false,
  revealDelay = 0,
  revealFrom = { y: 24, x: 0, rotate: 0, scale: 0.95 },
  contentBearing = false,
}: {
  children: React.ReactNode;
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
  extraTilt?: number;
  reveal?: boolean;
  revealDelay?: number;
  revealFrom?: { y?: number; x?: number; rotate?: number; scale?: number };
  contentBearing?: boolean;
}) {
  const reduce = useReducedMotion();
  const skipReveal = reduce || !reveal;

  return (
    <motion.div
      aria-hidden={contentBearing ? undefined : true}
      drag
      dragConstraints={containerRef}
      dragElastic={reduce ? 0 : 0.15}
      dragMomentum={false}
      initial={skipReveal ? undefined : { opacity: 0, ...revealFrom }}
      whileInView={skipReveal ? undefined : { opacity: 1, y: 0, x: 0, rotate: 0, scale: 1 }}
      viewport={reveal ? { once: true, margin: "-60px" } : undefined}
      transition={reveal ? { duration: 0.6, delay: revealDelay, ease: [0.16, 1, 0.3, 1] } : undefined}
      whileDrag={reduce ? undefined : { scale: 1.07, rotate: extraTilt, zIndex: 40 }}
      whileHover={reduce ? undefined : { scale: 1.02 }}
      style={{ touchAction: "none" }}
      className={cn(
        "absolute cursor-grab touch-none select-none active:cursor-grabbing",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
