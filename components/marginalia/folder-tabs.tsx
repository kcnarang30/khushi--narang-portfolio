"use client";

import { motion } from "framer-motion";
import { EASE_RESPONSE, DURATION } from "@/lib/motion";

/**
 * Real folder tabs, not filter pills — the active one sits raised and
 * connects directly into the panel below (same background colour, no gap,
 * a hairline seam), the way pulling one folder forward in a drawer works.
 * Inactive tabs recede: smaller, set back, duller. This is Archive's one
 * signature device — the most literal borrow from the reference material,
 * and the one place on the site a UI filter becomes a physical object.
 */
export function FolderTabs<T extends string>({
  options,
  active,
  onChange,
}: {
  options: { value: T; label: string }[];
  active: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-end gap-1 overflow-x-auto overflow-y-visible pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filter by year">
      {options.map((opt) => {
        const isActive = opt.value === active;
        return (
          <motion.button
            key={opt.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            initial={false}
            animate={{
              y: isActive ? 0 : 4,
              scale: isActive ? 1 : 0.96,
            }}
            whileHover={!isActive ? { y: 1 } : undefined}
            transition={{ duration: DURATION.hover, ease: EASE_RESPONSE }}
            className="focus-ring relative shrink-0 rounded-t-[3px] px-4 py-2 font-marginalia-sans text-[13px]"
            style={{
              backgroundColor: isActive ? "var(--mg-bg-raised)" : "var(--mg-line)",
              color: isActive ? "var(--mg-ink)" : "var(--mg-ink-faint)",
              zIndex: isActive ? 10 : 1,
            }}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}
