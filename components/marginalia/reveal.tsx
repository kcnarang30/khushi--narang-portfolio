"use client";

import { motion, useReducedMotion } from "framer-motion";
import { revealUp } from "@/lib/motion";

/**
 * The one scroll-entrance wrapper for the whole site. Every page reaches for
 * this instead of hand-rolling initial/whileInView props — same easing, same
 * duration, same viewport margin everywhere, so entrances feel like one
 * system instead of a different animation per component.
 */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} {...revealUp(delay)}>
      {children}
    </motion.div>
  );
}
