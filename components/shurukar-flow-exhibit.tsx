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
        "shrink-0 rounded-[1px] border border-mg-line bg-mg-bg px-3 py-2.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-mg-accent/50",
        className
      )}
    >
      {num && <span className="block font-marginalia-sans text-[9px] text-mg-ink-faint">{num}</span>}
      <span className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink">{label}</span>
    </div>
  );
}

function Arrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <span aria-hidden className={cn("shrink-0 text-mg-ink-faint", vertical ? "text-lg leading-none" : "text-base")}>
      {vertical ? "↓" : "→"}
    </span>
  );
}

export function ShuruKarFlowExhibit() {
  return (
    <div className="rounded-[1px] border border-dashed border-mg-line bg-mg-bg-raised/50 p-5 sm:p-7">
      <p className="font-marginalia-sans text-[10.5px] uppercase tracking-[0.1em] text-mg-ink-faint">
        Blueprint &mdash; onboarding structure, read from the real flow file
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
        <Node num="01" label="Splash" />
        <Arrow />
        <Node num="02" label="Onboarding" />
        <Arrow />
        <Node num="03" label="Personalization" />
      </div>

      <div className="my-4 flex items-center gap-3 pl-2">
        <Arrow vertical />
        <p className="font-marginalia-sans text-[11px] italic text-mg-ink-faint">splits based on how someone answers</p>
      </div>

      <div className="flex flex-col gap-2 border-l-2 border-dashed border-mg-line pl-4 sm:flex-row sm:gap-3 sm:pl-6">
        <Node label="Journey A" className="border-mg-accent/30" />
        <Node label="Journey B" className="border-mg-accent/30" />
        <Node label="Journey C" className="border-mg-accent/30" />
      </div>

      <div className="my-4 flex items-center gap-3 pl-2">
        <Arrow vertical />
        <p className="font-marginalia-sans text-[11px] italic text-mg-ink-faint">converges back into one product</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Node num="04" label="Onboarding complete" />
        <Arrow />
        <Node num="05" label="Walkthrough" />
        <Arrow />
        <Node num="06" label="Home" className="border-mg-accent/40" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-mg-line pt-6 sm:grid-cols-2">
        <div>
          <p className="font-marginalia-sans text-[10px] uppercase tracking-wide text-mg-ink-faint">
            Edge cases handled in-flow
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["Offline state", "Invalid phone number", "Invalid input mid-onboarding"].map((c) => (
              <span
                key={c}
                className="rounded-[1px] border border-mg-line px-2 py-1 font-marginalia-sans text-[10.5px] text-mg-ink-muted"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-marginalia-sans text-[10px] uppercase tracking-wide text-mg-ink-faint">Returning users</p>
          <div className="mt-2.5 flex items-center gap-2">
            <Node label="Home" className="!py-1.5" />
            <span aria-hidden className="font-marginalia-sans text-mg-ink-faint">
              ⇄
            </span>
            <Node label="Returning-user screens" className="!py-1.5" />
          </div>
          <p className="mt-2 font-marginalia-sans text-[11px] text-mg-ink-faint">A separate path back in &mdash; not onboarding again.</p>
        </div>
      </div>
    </div>
  );
}
