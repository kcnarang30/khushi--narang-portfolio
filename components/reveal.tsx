"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
  settle = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Settle in from a slight extra rotation, like an object being placed
   *  down rather than a panel fading up — for things on the desk, not
   *  ordinary text blocks. */
  settle?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : settle ? { opacity: 0, y: 20, rotate: -2.5 } : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : settle ? { opacity: 1, y: 0, rotate: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: settle ? 0.6 : 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
