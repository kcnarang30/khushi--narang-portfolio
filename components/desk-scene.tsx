"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * A real 3D perspective stage — not a metaphor. Children with their own
 * translateZ (the paper stack, pinned objects) compose in true 3D space
 * because this establishes perspective + preserve-3d on the ancestor. The
 * whole scene tilts a few degrees toward the cursor, so depth is something
 * you see change, not just a bigger box-shadow.
 */
export function DeskScene({
  children,
  className,
  intensity = 5,
  perspective = 2000,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  perspective?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const px = (e.clientX - bounds.left) / bounds.width - 0.5;
    const py = (e.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * intensity);
    rotateX.set(py * -intensity);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div style={{ perspective }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
}
