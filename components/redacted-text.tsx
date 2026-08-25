"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Inline redaction — a word or phrase rendered as a violet block until
 * clicked/focused, then it reveals. The sentence-level sibling of
 * RedactedPanel, for a single fact embedded in a line of prose.
 */
export function RedactedText({ children, className }: { children: React.ReactNode; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      aria-label={open ? String(children) : "Redacted — click to reveal"}
      className={cn(
        "focus-ring relative inline-flex items-baseline rounded-[2px] px-1 align-baseline transition-colors duration-200",
        open ? "bg-transparent text-fg" : "bg-inst text-inst hover:bg-inst/80",
        className
      )}
    >
      <span className={open ? "" : "select-none opacity-0"} aria-hidden={!open}>
        {children}
      </span>
    </button>
  );
}
