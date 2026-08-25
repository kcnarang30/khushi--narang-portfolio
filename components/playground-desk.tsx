"use client";

import { useRef } from "react";
import { Polaroid } from "./polaroid";
import { PaperNote } from "./paper-note";
import { GameBoy } from "./game-boy";
import { CassetteDeck } from "./cassette-deck";
import { Draggable } from "./draggable";

/**
 * Purely decorative desk clutter — no project claim, just an object.
 * Matches the floppy visual language (grain, label sticker, write-notch)
 * without needing project data or the grid card's own tilt interaction,
 * which would fight the drag gesture.
 */
function DeskFloppy() {
  return (
    <div className="w-24 rounded-[3px] p-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" style={{ background: "var(--floppy-3)" }}>
      <div className="h-2 w-7 rounded-b-[2px] bg-black/25" />
      <div className="grain-paper mt-6 rounded-sm bg-[#f4f1ea] p-1.5">
        <p className="font-mono text-[7px] uppercase tracking-wide text-black/40">title</p>
        <p className="font-pen text-sm leading-tight text-black/70">misc.</p>
      </div>
    </div>
  );
}

export function PlaygroundDesk() {
  const deskRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={deskRef}
      className="relative mt-4 h-[50rem] overflow-hidden rounded-sm border border-dashed border-line-strong bg-bg-raised/30 sm:h-[30rem]"
    >
      <p
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[9px] uppercase tracking-widest text-fg-dim/60"
      >
        the desk
      </p>

      {/* Mobile: everything stacked in its own vertical band, nothing covers a
          button. Desktop (sm+): the original scattered layout. */}
      <div className="absolute left-1/2 top-[22%] -translate-x-1/2 -translate-y-1/2 sm:top-1/2">
        <GameBoy />
      </div>

      <Draggable containerRef={deskRef} className="left-[6%] top-[3%] sm:top-[14%]" extraTilt={-6}>
        <Polaroid src="/about/ribbon-night.jpg" alt="" rotate={-7} sizes="128px" className="w-28" />
      </Draggable>

      <Draggable containerRef={deskRef} className="right-[8%] top-[3%] sm:top-[8%]" extraTilt={5}>
        <DeskFloppy />
      </Draggable>

      <Draggable containerRef={deskRef} className="bottom-[3%] left-[8%] sm:bottom-[10%]" extraTilt={-4}>
        <PaperNote rotate={-3} className="w-40">
          <p className="font-pen text-base leading-tight">go ahead — move these around.</p>
        </PaperNote>
      </Draggable>

      <CassetteDeck
        containerRef={deskRef}
        className="left-1/2 top-[56%] -translate-x-1/2 sm:left-auto sm:top-[44%] sm:right-[6%] sm:translate-x-0"
      />
    </div>
  );
}
