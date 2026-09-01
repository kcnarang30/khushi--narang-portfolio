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
          className="focus-ring group flex w-full flex-col items-start gap-3 rounded-[2px] border-2 border-dashed border-mg-line p-5 text-left transition-colors hover:border-mg-accent/60"
        >
          <span className="rounded-[2px] border border-mg-accent/60 px-2 py-1 font-marginalia-sans text-[10.5px] uppercase tracking-wide text-mg-accent">
            {label}
          </span>
          <span className="font-marginalia-sans text-[12px] text-mg-ink-faint transition-colors group-hover:text-mg-ink-muted">
            obviously, you&rsquo;re going to open it &rarr;
          </span>
        </button>
      ) : (
        <div className="rounded-[2px] border-2 border-mg-accent/50 bg-mg-bg-raised p-5">
          <span className="font-marginalia-sans text-[10.5px] uppercase tracking-wide text-mg-accent">
            {label} &mdash; opened anyway
          </span>
          <div className="mt-3">{children}</div>
        </div>
      )}
    </div>
  );
}
