"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's one "hidden material" moment. Sealed by default, opens to
 * something small and real — never a decoy, never invented.
 */
export function DoNotOpen({
  label = "Do not open",
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="focus-ring group flex w-full flex-col items-start gap-3 rounded-sm border-2 border-dashed border-line-strong p-5 text-left transition-colors hover:border-live-signal"
        >
          <span className="rounded-sm border border-live-signal/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-live-signal">
            {label}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-fg-dim transition-colors group-hover:text-fg-muted">
            obviously, you&rsquo;re going to open it →
          </span>
        </button>
      ) : (
        <div className="rounded-sm border-2 border-live-signal/50 bg-bg-raised p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-live-signal">
            {label} — opened anyway
          </span>
          <div className="mt-3">{children}</div>
        </div>
      )}
    </div>
  );
}
