"use client";

import { cn } from "@/lib/utils";

/**
 * A photographic "exhibit" — the dossier's tear-sheet treatment for anything
 * that isn't literally software UI (events, branding, illustration). Use
 * WindowFrame instead when the image genuinely is an app screen.
 */
export function ExhibitFrame({
  label,
  meta,
  rotate = 0,
  children,
  className,
}: {
  label: string;
  meta?: string;
  rotate?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("group/exhibit relative bg-paper p-2 pb-9 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:!rotate-0 hover:-translate-y-1", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative overflow-hidden">{children}</div>
      <p className="mt-2 px-0.5 font-mono text-[9.5px] uppercase tracking-[0.08em] text-bg/60">
        {label}
      </p>
      {meta && (
        <span className="pointer-events-none absolute right-2 top-2 rounded-sm bg-bg/85 px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-wide text-live-signal opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/exhibit:opacity-100">
          {meta}
        </span>
      )}
    </div>
  );
}
