"use client";

import { useRef } from "react";
import { Polaroid } from "./polaroid";
import { PaperNote } from "./paper-note";
import { GameBoy } from "./game-boy";
import { CassetteDeck } from "./cassette-deck";
import { Draggable } from "./draggable";
import { cn } from "@/lib/utils";

/**
 * Purely decorative desk clutter — no project claim, just an object.
 * Matches the floppy visual language (grain, label sticker, write-notch)
 * without needing project data or the grid card's own tilt interaction,
 * which would fight the drag gesture.
 */
export function DeskFloppy({
  color = "var(--floppy-3)",
  title = "misc.",
  className,
}: {
  color?: string;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("w-24 rounded-[3px] p-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]", className)}
      style={{ background: color }}
    >
      <div className="h-2 w-7 rounded-b-[2px] bg-black/25" />
      <div className="grain-paper mt-6 rounded-sm bg-[#f4f1ea] p-1.5">
        <p className="font-mono text-[7px] uppercase tracking-wide text-black/40">title</p>
        <p className="font-pen text-sm leading-tight text-black/70">{title}</p>
      </div>
    </div>
  );
}

/** A loose cassette tape, not docked in the deck — just clutter on the board. */
function LooseCassette({ className }: { className?: string }) {
  return (
    <div className={cn("w-24 rounded-[3px] bg-[#2a2a2a] p-1.5 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.55)]", className)}>
      <div className="flex items-center justify-between rounded-sm bg-[#e8dcc0] px-2.5 py-3">
        <span className="h-3.5 w-3.5 rounded-full border-2 border-black/50" />
        <span className="h-3.5 w-3.5 rounded-full border-2 border-black/50" />
      </div>
      <p className="mt-1 text-center font-pen text-[10px] leading-none text-white/70">side b</p>
    </div>
  );
}

export function PlaygroundDesk() {
  const deskRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={deskRef} className="relative mt-4 h-[54rem] overflow-hidden sm:h-[32rem]">
      <p
        aria-hidden
        className="pointer-events-none absolute left-1 top-1 z-10 font-mono text-[9px] uppercase tracking-widest text-white/40"
      >
        the desk — drag stuff around
      </p>

      {/* Mobile: everything stacked in its own vertical band, nothing covers a
          button. Desktop (sm+): the original scattered layout. */}
      <div className="absolute left-1/2 top-[20%] -translate-x-1/2 -translate-y-1/2 sm:top-1/2">
        <GameBoy />
      </div>

      <Draggable containerRef={deskRef} className="left-[4%] top-[2%] sm:top-[12%]" extraTilt={-6}>
        <Polaroid src="/about/ribbon-night.jpg" alt="" rotate={-7} sizes="128px" className="w-28" />
      </Draggable>

      <Draggable containerRef={deskRef} className="right-[6%] top-[2%] sm:top-[6%]" extraTilt={5}>
        <DeskFloppy color="var(--floppy-3)" title="misc." />
      </Draggable>

      <Draggable containerRef={deskRef} className="left-[4%] top-[28%] sm:left-[2%] sm:top-[56%]" extraTilt={4}>
        <DeskFloppy color="var(--floppy-1)" title="backup — do not lose" />
      </Draggable>

      <Draggable containerRef={deskRef} className="right-[4%] top-[30%] sm:right-[2%] sm:top-[70%]" extraTilt={-5}>
        <LooseCassette />
      </Draggable>

      <Draggable containerRef={deskRef} className="bottom-[2%] left-[6%] sm:bottom-[8%]" extraTilt={-4}>
        <PaperNote rotate={-3} className="w-40">
          <p className="font-pen text-base leading-tight">go ahead — move these around.</p>
        </PaperNote>
      </Draggable>

      <CassetteDeck
        containerRef={deskRef}
        className="left-1/2 top-[50%] -translate-x-1/2 sm:left-auto sm:top-[42%] sm:right-[9%] sm:translate-x-0"
      />
    </div>
  );
}
