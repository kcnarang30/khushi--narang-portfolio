"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Real perspective-responsive tilt — the pattern FloppyCard already used,
 * pulled out so every physical object on the site (photos, printed
 * screenshots, cards) shares one implementation instead of each
 * reimplementing mouse-tracked rotateX/rotateY. This only ever tilts the
 * *frame* — never wrap a real product screenshot's own pixels in this,
 * that stays flat per the site's one hard rule about physical vs. UI truth.
 */
export function TiltSurface({
  children,
  rest = 0,
  intensity = 14,
  lift: liftAmount = -6,
  perspective = 700,
  className,
}: {
  children: ReactNode;
  rest?: number;
  intensity?: number;
  lift?: number;
  perspective?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const lift = useSpring(useMotionValue(0), { stiffness: 300, damping: 22 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const px = (e.clientX - bounds.left) / bounds.width - 0.5;
    const py = (e.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * intensity);
    rotateX.set(py * -intensity);
    lift.set(liftAmount);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  return (
    <div style={{ perspective }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={false}
        animate={reduce ? undefined : { rotate: rest }}
        style={
          reduce
            ? { transform: `rotate(${rest}deg)` }
            : { rotateX, rotateY, y: lift, transformStyle: "preserve-3d" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
