"use client";

import { useRef } from "react";
import Image from "next/image";
import { getPlayground } from "@/data/projects";
import { Polaroid } from "./polaroid";
import { PaperNote } from "./paper-note";
import { PaperClip } from "./paper-clip";
import { PushPin } from "./push-pin";
import { Tape } from "./tape";
import { PaperStack } from "./paper-stack";
import { Marginalia } from "./marginalia";
import { GameBoy } from "./game-boy";
import { CassetteDeck } from "./cassette-deck";
import { ConsolePing } from "./console-ping";
import { Draggable } from "./draggable";
import { Sticker } from "./sticker";
import { ImagePlaceholder } from "./image-placeholder";

/**
 * Not a portfolio section — a desk. Every real playground piece gets its
 * own physical form instead of a repeated card shape: taped, pinned,
 * stacked, torn, or still just a scrap. Nothing here is invented — the
 * images and copy all come from data/projects.ts; the handwritten notes
 * are honest reactions to real status (a "concept" stays a concept), not
 * claims about a process no one can verify. Everything on the board is
 * draggable — content-bearing pieces stay in the accessibility tree, the
 * drag is a bonus, not a way to hide the content.
 *
 * Every object here is a plain <Draggable> positioned directly (no nested
 * scroll-reveal animation) — Framer Motion's `drag` and a `whileInView`
 * `animate` fight over the same x/y motion values when stacked on one
 * element or nested across two, so it's left out here in favour of the
 * drag actually working everywhere, which is the part that matters.
 */

const knwn = getPlayground().find((p) => p.slug === "knwn")!;
const cyberAngel = getPlayground().find((p) => p.slug === "cyber-angel")!;
const greekComics = getPlayground().find((p) => p.slug === "greek-comics")!;
const internetMagazine = getPlayground().find((p) => p.slug === "internet-magazine")!;
const sipCoffee = getPlayground().find((p) => p.slug === "sip-coffee")!;

/** A little paper label carrying a real one-liner — never bare text floating on cork. */
function Tag({ text, name, status, rotate = -1, className }: { text: string; name?: string; status?: string; rotate?: number; className?: string }) {
  return (
    <div
      className={`grain-paper inline-block max-w-[14rem] bg-paper px-2.5 py-2 shadow-[0_10px_20px_-12px_rgba(0,0,0,0.45)] ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {name && (
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-sm font-bold leading-tight text-bg">{name}</p>
          {status && (
            <span className="shrink-0 font-mono text-[8.5px] uppercase tracking-widest text-bg/45">{status}</span>
          )}
        </div>
      )}
      <p className={`font-mono text-[10px] leading-snug text-bg/65 ${name ? "mt-1" : ""}`}>{text}</p>
    </div>
  );
}

/** Same floppy material as the rest of the site's retro objects, local to this file. */
function FloppyScrap({ color, title }: { color: string; title: string }) {
  return (
    <div className="w-24 rounded-[3px] p-2 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]" style={{ background: color }}>
      <div className="h-2 w-7 rounded-b-[2px] bg-black/25" />
      <div className="grain-paper mt-6 rounded-sm bg-[#f4f1ea] p-1.5">
        <p className="font-mono text-[7px] uppercase tracking-wide text-black/40">title</p>
        <p className="font-pen text-sm leading-tight text-black/70">{title}</p>
      </div>
    </div>
  );
}

/** An empty slot, honestly labelled, waiting for a real image — not a fake project. */
function PendingScrap({ label, rotate = -3 }: { label: string; rotate?: number }) {
  return (
    <div style={{ transform: `rotate(${rotate}deg)` }}>
      <PaperClip rotate={rotate * 2} className="-left-3 -top-3 h-9 w-9" />
      <div className="bg-white p-2 shadow-[0_18px_34px_-16px_rgba(0,0,0,0.5)]">
        <ImagePlaceholder label={label} aspect="aspect-[4/5]" className="w-40" />
      </div>
    </div>
  );
}

export function PlaygroundCanvas() {
  const deskRef = useRef<HTMLDivElement>(null);

  return (
    <div className="wood-frame relative m-3 sm:m-6">
      <div className="corkboard relative overflow-hidden">
        <Sticker variant="star" color="var(--hot-pink)" rotate={-12} size="2.5rem" className="left-6 top-16 sm:left-10" />
        <Sticker variant="smiley" color="var(--bright-blue)" rotate={9} size="2.25rem" className="right-8 top-28 sm:right-14" />
        <Sticker variant="star" color="var(--bright-green)" rotate={16} size="2rem" className="bottom-24 left-10 hidden sm:block" />

        <div ref={deskRef} className="relative mx-auto h-[210rem] max-w-[92rem] px-5 pb-24 pt-16 sm:h-[118rem] sm:px-10 sm:pt-24">
          {/* ── HERO — huge type sitting directly on the board ── */}
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">Playground</p>
          <h1 className="mt-2 max-w-3xl font-poster uppercase leading-[0.82] text-paper [font-size:clamp(2.6rem,9vw,6.5rem)]">
            Things I made
            <br />
            because I wanted
            <br />
            to see if I could.
          </h1>

          <Draggable
            containerRef={deskRef}
            contentBearing
            className="right-[8%] top-[13%] hidden w-28 sm:block sm:right-[16%] sm:top-[8%]"
          >
            <Polaroid src="/about/ribbon-night.jpg" alt="Out and about, Bengaluru" rotate={-8} sizes="112px" />
          </Draggable>

          <Draggable containerRef={deskRef} extraTilt={4} className="left-[6%] top-[16%] sm:left-[12%] sm:top-[24%]">
            <PaperNote rotate={4} className="w-36 sm:w-40">
              <p className="font-pen text-base leading-tight">why did I make this?</p>
            </PaperNote>
          </Draggable>

          <Draggable containerRef={deskRef} contentBearing className="right-[6%] top-[18%] sm:right-[24%] sm:top-[22%]">
            <ConsolePing />
          </Draggable>

          {/* ── THE DESK — one continuous surface, nothing shares a shape ── */}
          <p
            aria-hidden
            className="pointer-events-none absolute left-1 top-[19%] font-mono text-[9px] uppercase tracking-widest text-white/35 sm:top-[26%]"
          >
            everything below is real — nothing staged for the photo
          </p>

          {/* knwn — the big one, pinned flat, no border pretending to be a frame */}
          <Draggable
            containerRef={deskRef}
            contentBearing
            extraTilt={-3}
            className="left-[3%] top-[21%] w-[74%] sm:left-[4%] sm:top-[30%] sm:w-[26rem]"
          >
            <div style={{ transform: "rotate(-2.5deg)" }}>
              <PushPin color="yellow" size="1.2rem" className="-top-2 left-10" />
              <PushPin color="yellow" size="1.2rem" className="-top-2 right-10" />
              <div className="border-[10px] border-white bg-white shadow-[0_28px_50px_-18px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image src={knwn.coverImageSrc!} alt={knwn.name} fill sizes="420px" className="object-cover"  draggable={false} />
                </div>
              </div>
              <Tag text={knwn.oneLiner} name={knwn.name} status={knwn.status} rotate={1} className="mt-2" />
            </div>
          </Draggable>

          {/* internet-magazine — tucked half under cyber-angel, torn top edge */}
          <Draggable
            containerRef={deskRef}
            contentBearing
            extraTilt={5}
            className="left-[6%] top-[44%] w-[46%] sm:left-[36%] sm:top-[28%] sm:w-52"
          >
            <div style={{ transform: "rotate(4deg)" }}>
              <PaperClip rotate={-14} className="-left-3 -top-3 h-9 w-9" />
              <div className="torn-edge-top bg-white p-1.5 pb-4 shadow-[0_20px_38px_-16px_rgba(0,0,0,0.55)]">
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={internetMagazine.coverImageSrc!}
                    alt={internetMagazine.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                   draggable={false} />
                </div>
              </div>
              <Tag text={internetMagazine.oneLiner} name={internetMagazine.name} status={internetMagazine.status} rotate={-1} className="mt-2" />
            </div>
          </Draggable>

          {/* cyber-angel — taped, tilted harder, with a real reaction note */}
          <Draggable
            containerRef={deskRef}
            contentBearing
            extraTilt={8}
            className="right-[4%] top-[34%] w-[58%] sm:right-[8%] sm:top-[32%] sm:w-64"
          >
            <div style={{ transform: "rotate(6deg)" }}>
              <Tape rotate={-6} className="-top-2.5 left-6 w-14" />
              <Tape rotate={5} className="-top-2.5 right-6 w-14" />
              <div className="bg-white p-2 shadow-[0_26px_48px_-16px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image src={cyberAngel.coverImageSrc!} alt={cyberAngel.name} fill sizes="260px" className="object-cover"  draggable={false} />
                </div>
              </div>
              <Marginalia rotate={-4} className="mt-2">
                made this at 2am
              </Marginalia>
              <Tag text={cyberAngel.oneLiner} name={cyberAngel.name} status={cyberAngel.status} rotate={2} className="mt-1" />
            </div>
          </Draggable>

          {/* greek-comics — stacked, suggesting a series, not a one-off */}
          <Draggable
            containerRef={deskRef}
            contentBearing
            extraTilt={-4}
            className="left-[5%] top-[64%] w-[62%] sm:left-[4%] sm:top-[62%] sm:w-56"
          >
            <div style={{ transform: "rotate(-3deg)" }}>
              <PaperStack layers={2} sheetClassName="bg-paper" className="w-full">
                <PushPin color="green" size="1.1rem" className="-top-2 left-1/2 -translate-x-1/2" />
                <div className="border-[6px] border-white bg-white shadow-[0_22px_40px_-16px_rgba(0,0,0,0.55)]">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={greekComics.coverImageSrc!}
                      alt={greekComics.name}
                      fill
                      sizes="230px"
                      className="object-cover"
                     draggable={false} />
                  </div>
                </div>
              </PaperStack>
              <Tag text={greekComics.oneLiner} name={greekComics.name} status={greekComics.status} rotate={-1} className="mt-2" />
            </div>
          </Draggable>

          {/* sip-coffee — the honest half-finished one, small and taped, said so out loud */}
          <Draggable
            containerRef={deskRef}
            contentBearing
            extraTilt={-6}
            className="right-[6%] top-[62%] w-[48%] sm:right-[12%] sm:top-[60%] sm:w-48"
          >
            <div style={{ transform: "rotate(3deg)" }}>
              <Tape rotate={-4} className="-top-2 left-1/2 w-12 -translate-x-1/2" />
              <div className="bg-white p-2.5 shadow-[0_18px_34px_-16px_rgba(0,0,0,0.5)]">
                <div className="relative aspect-[8/5] w-full overflow-hidden">
                  <Image
                    src={sipCoffee.coverImageSrc!}
                    alt={sipCoffee.name}
                    fill
                    sizes="200px"
                    className="object-contain p-2"
                   draggable={false} />
                </div>
              </div>
              <Marginalia rotate={3} className="mt-1.5">
                still thinking about this
              </Marginalia>
              <Tag text={sipCoffee.oneLiner} name={sipCoffee.name} status={sipCoffee.status} rotate={-2} className="mt-2" />
            </div>
          </Draggable>

          {/* two open slots — real pieces to come, honestly marked, not invented */}
          <Draggable containerRef={deskRef} extraTilt={5} className="left-[8%] top-[82%] sm:left-[58%] sm:top-[46%]">
            <PendingScrap label="more coming" rotate={5} />
          </Draggable>

          <Draggable containerRef={deskRef} extraTilt={-6} className="right-[6%] top-[89%] sm:left-[64%] sm:top-[68%]">
            <PendingScrap label="more coming" rotate={-6} />
          </Draggable>

          {/* the closing scrap — an honest instruction, not a section header */}
          <Draggable containerRef={deskRef} extraTilt={-4} className="left-[4%] top-[97%] sm:left-[6%] sm:top-[86%]">
            <PaperNote rotate={-3} className="w-40 sm:w-44">
              <p className="font-pen text-base leading-tight">go ahead — move these around.</p>
            </PaperNote>
          </Draggable>

          {/* ── retro-tech corner ── */}
          <Draggable containerRef={deskRef} extraTilt={-4} className="left-[4%] top-[104%] sm:left-[38%] sm:top-[84%]">
            <GameBoy />
          </Draggable>

          <Draggable containerRef={deskRef} extraTilt={-3} className="right-[8%] top-[110%] sm:right-[6%] sm:top-[80%]">
            <CassetteDeck containerRef={deskRef} />
          </Draggable>

          <Draggable containerRef={deskRef} extraTilt={5} className="left-[10%] top-[121%] sm:left-[38%] sm:top-[104%]">
            <FloppyScrap color="var(--floppy-3)" title="misc." />
          </Draggable>

          <Draggable containerRef={deskRef} extraTilt={4} className="right-[12%] top-[124%] sm:right-[26%] sm:top-[106%]">
            <FloppyScrap color="var(--floppy-1)" title="backup — do not lose" />
          </Draggable>

          <Draggable containerRef={deskRef} extraTilt={-7} className="left-[6%] top-[132%] sm:left-[54%] sm:top-[108%]">
            <FloppyScrap color="var(--floppy-4)" title="scrapped ideas" />
          </Draggable>

          <span aria-hidden className="pointer-events-none absolute bottom-3 right-4 font-mono text-[9.5px] text-white/30 sm:bottom-4 sm:right-6">
            EOF
          </span>
        </div>
      </div>
    </div>
  );
}
