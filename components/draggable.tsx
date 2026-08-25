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
 * Purely a bonus interaction: nothing unique is gated behind it, so the
 * whole thing is aria-hidden and excluded from tab order. Keyboard users
 * aren't missing content, only a fidget.
 */
export function Draggable({
  children,
  containerRef,
  className,
  extraTilt = 6,
}: {
  children: React.ReactNode;
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
  extraTilt?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
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
