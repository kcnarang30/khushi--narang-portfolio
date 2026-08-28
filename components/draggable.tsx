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
  contentBearing = false,
}: {
  children: React.ReactNode;
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
  extraTilt?: number;
  contentBearing?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden={contentBearing ? undefined : true}
      drag
      dragConstraints={containerRef}
      dragElastic={reduce ? 0 : 0.15}
      dragMomentum={false}
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
