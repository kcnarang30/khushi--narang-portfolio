"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getPlayground } from "@/data/projects";
import { about } from "@/data/about";
import { revealImage } from "@/lib/motion";
import { GameBoy } from "./game-boy";
import { CassetteDeck } from "./cassette-deck";
import { ConsolePing } from "./console-ping";
import { DeskTerminal } from "./desk-terminal";
import { DoNotOpen } from "./do-not-open";
import { InkMark } from "./marginalia/ink-mark";
import { Reveal } from "./marginalia/reveal";

/**
 * The workbench, not a corkboard — real hierarchy and real breathing room
 * instead of a dense free-for-all. Five real pieces, presented once each,
 * with one honest handwritten reaction where there's something worth
 * saying, not a note on every card. The two working devices (Snake, the
 * cassette synth) get their own quiet section instead of being scraps
 * fighting for space with everything else.
 */

const ROTATIONS = [-1.5, 1, -0.5, 1.5, -1];

function PieceCard({
  src,
  name,
  oneLiner,
  status,
  note,
  index,
}: {
  src: string;
  name: string;
  oneLiner: string;
  status: string;
  note?: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  const rotate = ROTATIONS[index % ROTATIONS.length];

  return (
    <motion.div {...(reduce ? {} : revealImage(index * 0.06))}>
      <div className="group relative" style={{ transform: `rotate(${rotate}deg)` }}>
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-mg-bg-raised shadow-[0_16px_32px_-16px_rgba(36,31,24,0.3)]">
          <Image
            src={src}
            alt={name}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        {note && (
          <p
            className="mt-2 font-marginalia-hand text-[17px] text-mg-accent"
            style={{ transform: `rotate(${-rotate * 1.4}deg)` }}
          >
            {note}
          </p>
        )}
        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <p className="font-marginalia-serif text-[16px] text-mg-ink">{name}</p>
          <p className="shrink-0 font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{status}</p>
        </div>
        <p className="font-marginalia-sans text-[12.5px] leading-snug text-mg-ink-muted">{oneLiner}</p>
      </div>
    </motion.div>
  );
}

function PendingSlot({ index }: { index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div {...(reduce ? {} : revealImage(index * 0.06))}>
      <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 border border-dashed border-mg-line bg-mg-bg text-center">
        <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">More coming</p>
      </div>
    </motion.div>
  );
}

export function PlaygroundCanvas() {
  const deskRef = useRef<HTMLDivElement>(null);
  const pieces = getPlayground();
  const knwn = pieces.find((p) => p.slug === "knwn")!;
  const cyberAngel = pieces.find((p) => p.slug === "cyber-angel")!;
  const greekComics = pieces.find((p) => p.slug === "greek-comics")!;
  const internetMagazine = pieces.find((p) => p.slug === "internet-magazine")!;
  const sipCoffee = pieces.find((p) => p.slug === "sip-coffee")!;

  return (
    <div className="bg-mg-bg">
      <div className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <Reveal>
          <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">Playground</p>
          <h1 className="mt-2 max-w-xl font-marginalia-serif text-[32px] leading-tight text-mg-ink sm:text-[40px]">
            Things I made because I wanted to{" "}
            <span className="relative inline-block">
              see if I could
              <InkMark variant="underline" trigger="view" delay={0.4} />
            </span>
            .
          </h1>
          <p className="mt-4 max-w-md font-marginalia-sans text-[14.5px] text-mg-ink-muted">
            The drawer everything else got stuffed into. Some of it is finished. Some of it just needed to exist.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <PieceCard src={knwn.coverImageSrc!} name={knwn.name} oneLiner={knwn.oneLiner} status={knwn.status} index={0} />
          <PieceCard
            src={cyberAngel.coverImageSrc!}
            name={cyberAngel.name}
            oneLiner={cyberAngel.oneLiner}
            status={cyberAngel.status}
            note="made this at 2am"
            index={1}
          />
          <PieceCard src={greekComics.coverImageSrc!} name={greekComics.name} oneLiner={greekComics.oneLiner} status={greekComics.status} index={2} />
          <PieceCard
            src={internetMagazine.coverImageSrc!}
            name={internetMagazine.name}
            oneLiner={internetMagazine.oneLiner}
            status={internetMagazine.status}
            index={3}
          />
          <PieceCard
            src={sipCoffee.coverImageSrc!}
            name={sipCoffee.name}
            oneLiner={sipCoffee.oneLiner}
            status={sipCoffee.status}
            note="still thinking about this"
            index={4}
          />
          <PendingSlot index={5} />
        </div>
      </div>

      {/* The workbench — the two things on this page that actually do something */}
      <div ref={deskRef} className="border-t border-mg-line bg-mg-bg-raised">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="font-marginalia-sans text-[12px] uppercase tracking-wide text-mg-ink-faint">
              The workbench &mdash; a couple of these actually do something
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col items-start gap-16 sm:flex-row sm:flex-wrap sm:gap-20">
            <Reveal delay={0.05}>
              <GameBoy />
            </Reveal>
            <Reveal delay={0.1}>
              <CassetteDeck containerRef={deskRef} />
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <Reveal>
            <ConsolePing />
          </Reveal>
          <Reveal delay={0.05}>
            <DeskTerminal />
          </Reveal>
          <Reveal delay={0.1}>
            <DoNotOpen label="do not open">
              <p className="font-marginalia-sans text-[13px] leading-relaxed text-mg-ink-muted">
                since you opened it &mdash; {about.outsideOfWork.find((i) => i.includes("screenshots"))?.toLowerCase()}.
                that&rsquo;s it. that&rsquo;s the secret.
              </p>
            </DoNotOpen>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
