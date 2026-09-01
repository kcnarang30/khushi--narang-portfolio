"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Next.js remounts template.tsx on every navigation, which is what makes it
 * the right place for a page-enter transition — fast and quiet on purpose:
 * a page turning, not a scene change. No exit animation (that would delay
 * the next page's content, which the brief explicitly rules out).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
