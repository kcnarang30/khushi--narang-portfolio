"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The site's honest-gap motif: a redacted exhibit you have to click to
 * reveal, like lifting a real censor strip off a document. Click (or tap)
 * lifts the stripe to reveal the real note underneath instead of hiding the
 * gap or inventing a fact to fill it.
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
        "focus-ring group/redact relative block w-full overflow-hidden rounded-[1px] border border-mg-ink/20 text-left",
        className
      )}
    >
      <div
        className={cn(
          "flex min-h-[9rem] flex-col items-start justify-between p-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "-translate-y-full" : "translate-y-0"
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--mg-ink) 0 7px, #1a170f 7px 14px)",
        }}
      >
        <span className="font-marginalia-sans text-[11px] uppercase tracking-[0.1em] text-mg-bg/85">
          {label}
        </span>
        <span className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-bg/65 underline decoration-mg-bg/40 underline-offset-2">
          {open ? "hide" : "tap to reveal"}
        </span>
      </div>
      <div
        className={cn(
          "absolute inset-0 flex min-h-[9rem] flex-col justify-center bg-mg-bg-raised p-4 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          open ? "translate-y-0" : "translate-y-full"
        )}
      >
        <span className="font-marginalia-sans text-[10px] uppercase tracking-[0.1em] text-mg-ink-faint">
          Told honestly, not invented
        </span>
        <p className="mt-2 font-marginalia-sans text-[13.5px] leading-relaxed text-mg-ink-muted">{note}</p>
      </div>
    </button>
  );
}
