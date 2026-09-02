"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { getPlayground } from "@/data/projects";
import { about } from "@/data/about";
import { revealImage } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { GameBoy } from "./game-boy";
import { CassetteDeck } from "./cassette-deck";
import { ConsolePing } from "./console-ping";
import { DeskTerminal } from "./desk-terminal";
import { DoNotOpen } from "./do-not-open";
import { InkMark } from "./marginalia/ink-mark";
import { Reveal } from "./marginalia/reveal";

/**
 * The one page where the real things do the talking. No cards, no frames —
 * each piece is the actual exported artwork, at its own real aspect ratio,
 * scaled and rotated the way things end up when you empty a folder onto a
 * desk. The interactive experiments (Snake, the synth) get the same rule:
 * the real thing IS the object, annotated in the margin, not built a shell.
 */

type ArtifactProps = {
  src: string;
  width: number;
  height: number;
  name: string;
  oneLiner: string;
  tags?: string[];
  rotate?: number;
  tierWidth: number;
  index: number;
  note?: string;
  noteOnHover?: boolean;
  tiltable?: boolean;
  onExpand?: () => void;
  priority?: boolean;
};

function Artifact({
  src,
  width,
  height,
  name,
  oneLiner,
  tags,
  rotate = 0,
  tierWidth,
  index,
  note,
  noteOnHover = false,
  tiltable = false,
  onExpand,
  priority = false,
}: ArtifactProps) {
  const reduce = useReducedMotion();
  const [tilt, setTilt] = useState<{ x: number; y: number } | null>(null);
  const [hovered, setHovered] = useState(false);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!tiltable || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  }

  return (
    <motion.div {...(reduce ? {} : revealImage(index * 0.07))} style={{ width: tierWidth }}>
      <div
        role={onExpand ? "button" : undefined}
        tabIndex={onExpand ? 0 : undefined}
        onClick={onExpand}
        onKeyDown={(e) => onExpand && e.key === "Enter" && onExpand()}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setTilt(null);
        }}
        className={cn("inline-block", onExpand && "focus-ring cursor-pointer")}
        style={{
          transform: `rotate(${rotate}deg) rotateX(${tilt?.x ?? 0}deg) rotateY(${tilt?.y ?? 0}deg)`,
          transition: tilt ? "transform 0.08s linear" : "transform 0.35s ease-out",
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src={src}
          alt={name}
          width={width}
          height={height}
          priority={priority}
          sizes={`${tierWidth}px`}
          style={{
            width: tierWidth,
            height: "auto",
            filter: "drop-shadow(0 22px 34px rgba(36,31,24,0.32))",
          }}
        />
      </div>
      <div className="mt-2.5" style={{ maxWidth: tierWidth }}>
        <p className="font-marginalia-serif text-[14.5px] text-mg-ink">{name}</p>
        {tags && tags.length > 0 && (
          <p className="mt-0.5 font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">
            {tags.join(" · ")}
          </p>
        )}
        <p className="mt-1 font-marginalia-sans text-[12px] leading-snug text-mg-ink-muted">{oneLiner}</p>
        {note && (
          <p
            className="mt-1.5 font-marginalia-hand text-[14px] text-mg-accent transition-opacity duration-300"
            style={{ transform: "rotate(-1deg)", display: "inline-block", opacity: noteOnHover ? (hovered ? 1 : 0) : 1 }}
          >
            {note}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function Lightbox({ src, width, height, name, onClose }: { src: string; width: number; height: number; name: string; onClose: () => void }) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[200] flex items-center justify-center bg-mg-ink/85 p-6 sm:p-16"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={src}
            alt={name}
            width={width}
            height={height}
            style={{ width: "auto", height: "auto", maxWidth: "min(88vw, 620px)", maxHeight: "86vh" }}
          />
        </motion.div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="focus-ring absolute right-5 top-5 font-marginalia-sans text-[13px] uppercase tracking-wide text-white/70 hover:text-white sm:right-8 sm:top-8"
        >
          Close ✕
        </button>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export function PlaygroundCanvas() {
  const pieces = getPlayground();
  const knwn = pieces.find((p) => p.slug === "knwn")!;
  const cyberAngel = pieces.find((p) => p.slug === "cyber-angel")!;
  const greekComics = pieces.find((p) => p.slug === "greek-comics")!;
  const internetMagazine = pieces.find((p) => p.slug === "internet-magazine")!;
  const sipCoffee = pieces.find((p) => p.slug === "sip-coffee")!;

  const [expanded, setExpanded] = useState<{ src: string; width: number; height: number; name: string } | null>(null);

  return (
    <div className="bg-mg-bg">
      <div className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:px-8 sm:pb-16 sm:pt-24">
        <Reveal>
          <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">Playground</p>
          <h1 className="mt-2 max-w-xl font-marginalia-serif text-[32px] leading-tight text-mg-ink sm:text-[40px]">
            Things I made because I wanted to{" "}
            <span className="relative inline-block whitespace-nowrap">
              see if I could
              <InkMark variant="underline" trigger="view" delay={0.4} strokeWidth={1.75} />
            </span>
            .
          </h1>
          <p className="mt-4 max-w-md font-marginalia-sans text-[14.5px] text-mg-ink-muted">
            The drawer everything else got stuffed into. Some of it plays. Some of it just needed to exist.
          </p>
        </Reveal>
      </div>

      {/* The two things that actually do something — the real artifact is the interaction itself.
          Narrower than the rest of the page on purpose: two small real objects sitting close
          together on a desk, not two widgets stranded across a full-width canvas. */}
      <div className="mx-auto max-w-md px-5 pb-16 sm:px-8">
        <div className="flex flex-col gap-14 sm:flex-row sm:gap-16">
          <Reveal>
            <GameBoy />
          </Reveal>
          <Reveal delay={0.08}>
            <CassetteDeck />
          </Reveal>
        </div>
      </div>

      {/* Prints & publications — an actual pile, not a grid */}
      <div className="mx-auto max-w-5xl px-5 pb-6 pt-6 sm:px-8 sm:pt-10">
        <Reveal>
          <p className="font-marginalia-sans text-[12px] uppercase tracking-wide text-mg-ink-faint">Prints &amp; publications</p>
        </Reveal>
        <div className="relative mt-9 flex flex-wrap items-start gap-x-10 gap-y-14">
          <Artifact
            src={cyberAngel.coverImageSrc!}
            width={961}
            height={1296}
            name={cyberAngel.name}
            oneLiner={cyberAngel.oneLiner}
            tags={cyberAngel.tags}
            rotate={-1.5}
            tierWidth={280}
            index={0}
            tiltable
            priority
            onExpand={() => setExpanded({ src: cyberAngel.coverImageSrc!, width: 961, height: 1296, name: cyberAngel.name })}
          />
          <div className="sm:mt-16">
            <Artifact
              src={greekComics.coverImageSrc!}
              width={3000}
              height={2250}
              name={greekComics.name}
              oneLiner={greekComics.oneLiner}
              tags={greekComics.tags}
              rotate={0.5}
              tierWidth={300}
              index={1}
              onExpand={() => setExpanded({ src: greekComics.coverImageSrc!, width: 3000, height: 2250, name: greekComics.name })}
            />
          </div>
          <div className="sm:mt-4">
            <Artifact
              src={internetMagazine.coverImageSrc!}
              width={2400}
              height={2400}
              name={internetMagazine.name}
              oneLiner={internetMagazine.oneLiner}
              tags={internetMagazine.tags}
              rotate={-0.5}
              tierWidth={220}
              index={2}
              onExpand={() => setExpanded({ src: internetMagazine.coverImageSrc!, width: 2400, height: 2400, name: internetMagazine.name })}
            />
          </div>
        </div>
      </div>

      {/* Identity work — quieter, smaller, a different kind of object entirely */}
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20">
        <Reveal>
          <p className="font-marginalia-sans text-[12px] uppercase tracking-wide text-mg-ink-faint">Identity work</p>
        </Reveal>
        <div className="mt-9 flex flex-wrap items-start gap-x-12 gap-y-10">
          <Artifact
            src={knwn.coverImageSrc!}
            width={580}
            height={332}
            name={knwn.name}
            oneLiner={knwn.oneLiner}
            tags={knwn.tags}
            rotate={0.5}
            tierWidth={190}
            index={0}
            tiltable
            onExpand={() => setExpanded({ src: knwn.coverImageSrc!, width: 580, height: 332, name: knwn.name })}
          />
          <Artifact
            src={sipCoffee.coverImageSrc!}
            width={1551}
            height={1068}
            name={sipCoffee.name}
            oneLiner={sipCoffee.oneLiner}
            tags={sipCoffee.tags}
            rotate={-1}
            tierWidth={210}
            index={1}
            note="still figuring out what this is"
            noteOnHover
            tiltable
            onExpand={() => setExpanded({ src: sipCoffee.coverImageSrc!, width: 1551, height: 1068, name: sipCoffee.name })}
          />
        </div>
      </div>

      {/* The drawer — small, real, worth finding */}
      <div className="mx-auto max-w-5xl border-t border-mg-line px-5 py-16 sm:px-8 sm:py-20">
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

      {expanded && <Lightbox {...expanded} onClose={() => setExpanded(null)} />}
    </div>
  );
}
