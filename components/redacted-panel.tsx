"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's honest-gap motif: an interactive "redacted" exhibit. Click (or
 * tap) lifts the stripe to reveal the real note underneath instead of hiding
 * the gap or inventing a fact to fill it.
 */
export function RedactedPanel({
  label = "Redacted",
  note,
  className,
}: {
  label?: string;
  note: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={cn(
        "focus-ring group/redact relative block w-full overflow-hidden rounded-sm border border-inst text-left",
        className
      )}
    >
      <div
        className={cn(
          "redacted-stripe flex min-h-[9rem] flex-col items-start justify-between p-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/90">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-paper/70 underline decoration-paper/40 underline-offset-2">
          {open ? "hide" : "tap to reveal"}
        </span>
      </div>
      <div
        className={cn(
          "absolute inset-0 flex min-h-[9rem] flex-col justify-center bg-bg-raised p-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-fg-dim">
          Told honestly, not invented
        </span>
        <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{note}</p>
      </div>
    </button>
  );
}
