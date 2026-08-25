"use client";

import { cn } from "@/lib/utils";

/**
 * A structural diagram of ShuruKar's real onboarding flow, built from the
 * actual TBP_app Figma flow chart — not a pasted screenshot of the board.
 * Every node/label here is a stage name read directly off that diagram.
 * No invented questions, no invented per-journey meaning.
 */

function Node({ label, num, className }: { label: string; num?: string; className?: string }) {
  return (
    <div
      className={cn(
        "shrink-0 rounded-sm border border-line-strong bg-bg-raised px-3 py-2.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-accent",
        className
      )}
    >
      {num && <span className="block font-mono text-[9px] text-fg-dim">{num}</span>}
      <span className="font-mono text-[11px] uppercase tracking-wide text-fg">{label}</span>
    </div>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "shrink-0 text-fg-dim",
        vertical ? "text-lg leading-none" : "text-base"
      )}
    >
      {vertical ? "↓" : "→"}
    </span>
  );
}

export function ShuruKarFlowExhibit() {
  return (
    <div className="rounded-sm border border-dashed border-line-strong bg-bg-raised/40 p-5 sm:p-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
        Blueprint — onboarding structure, read from the real flow file
      </p>

      {/* Main sequential path into the branch */}
      <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
        <Node num="01" label="Splash" />
        <Arrow />
        <Node num="02" label="Onboarding" />
        <Arrow />
        <Node num="03" label="Personalization" />
      </div>

      {/* Branch marker */}
      <div className="my-4 flex items-center gap-3 pl-2">
        <Arrow vertical />
        <p className="font-mono text-[10px] italic text-fg-dim">splits based on how someone answers</p>
      </div>

      {/* Three parallel journeys */}
      <div className="flex flex-col gap-2 border-l-2 border-dashed border-line-strong pl-4 sm:flex-row sm:gap-3 sm:pl-6">
        <Node label="Journey A" className="border-accent/40" />
        <Node label="Journey B" className="border-accent/40" />
        <Node label="Journey C" className="border-accent/40" />
      </div>

      {/* Convergence */}
      <div className="my-4 flex items-center gap-3 pl-2">
        <Arrow vertical />
        <p className="font-mono text-[10px] italic text-fg-dim">converges back into one product</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Node num="04" label="Onboarding complete" />
        <Arrow />
        <Node num="05" label="Walkthrough" />
        <Arrow />
        <Node num="06" label="Home" className="border-live-signal/50" />
      </div>

      {/* Edge cases + returning users, as small annotations, not main-path nodes */}
      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <div>
          <p className="font-mono text-[9.5px] uppercase tracking-widest text-fg-dim">
            Edge cases handled in-flow
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["Offline state", "Invalid phone number", "Invalid input mid-onboarding"].map((c) => (
              <span
                key={c}
                className="rounded-sm border border-line px-2 py-1 font-mono text-[10px] text-fg-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[9.5px] uppercase tracking-widest text-fg-dim">
            Returning users
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <Node label="Home" className="!py-1.5" />
            <span aria-hidden className="font-mono text-fg-dim">
              ⇄
            </span>
            <Node label="Returning-user screens" className="!py-1.5" />
          </div>
          <p className="mt-2 font-mono text-[10px] text-fg-dim">A separate path back in — not onboarding again.</p>
        </div>
      </div>
    </div>
  );
}
