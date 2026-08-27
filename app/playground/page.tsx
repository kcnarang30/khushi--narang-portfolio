import type { Metadata } from "next";
import Image from "next/image";
import { getPlayground } from "@/data/projects";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";
import { ConsolePing } from "@/components/console-ping";
import { PlaygroundDesk, DeskFloppy } from "@/components/playground-desk";
import { PaperClip } from "@/components/paper-clip";
import { PushPin } from "@/components/push-pin";
import { Sticker } from "@/components/sticker";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Playground" };

const SIZE_BY_SLUG: Record<string, "lg" | "md" | "sm"> = {
  knwn: "lg",
  "cyber-angel": "md",
  "greek-comics": "lg",
  "internet-magazine": "sm",
  "sip-coffee": "sm",
};

const sizeClasses = {
  lg: { wrap: "col-span-2 sm:col-span-4 md:col-span-6", aspect: "aspect-[4/5] sm:aspect-[16/11]" },
  md: { wrap: "col-span-1 sm:col-span-2 md:col-span-3", aspect: "aspect-square" },
  sm: { wrap: "col-span-1 sm:col-span-2 md:col-span-3", aspect: "aspect-square" },
};

const ROTATE = [-4, 3, -2, 5, -3, 2];
const PIN_COLOR = ["pink", "green", "yellow", "blue", "pink", "green"] as const;

export default function PlaygroundPage() {
  const items = getPlayground();

  return (
    <div className="wood-frame relative m-3 sm:m-6">
    <div className="corkboard relative overflow-hidden py-16 sm:py-20">
      <Sticker variant="star" color="var(--hot-pink)" rotate={-12} size="2.5rem" className="left-6 top-24 sm:left-10" />
      <Sticker variant="smiley" color="var(--bright-blue)" rotate={9} size="2.25rem" className="right-8 top-40 sm:right-14" />
      <Sticker variant="star" color="var(--bright-green)" rotate={16} size="2rem" className="bottom-24 left-10 hidden sm:block" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal settle>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="grain-paper shadow-physical-lg relative inline-block bg-paper p-6 sm:p-9" style={{ transform: "rotate(1deg)" }}>
              <PaperClip rotate={11} className="-right-3 -top-4 h-10 w-10" />
              <PushPin color="pink" size="1.3rem" className="-top-2 left-6" />
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-bg/55">Playground</p>
              <h1 className="mt-2 max-w-xl font-poster uppercase leading-[0.88] text-bg [font-size:clamp(1.9rem,5.6vw,3.25rem)]">
                Things I made because I wanted to.
              </h1>
              <Handwritten rotate={-2} className="mt-1 text-xl text-bg/70 sm:text-2xl">
                no case study required
              </Handwritten>
            </div>
            <ConsolePing />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <PlaygroundDesk />
        </Reveal>

        {/* the pinned wall — every real piece as a poster on the board, plus
            a few loose retro-tech objects scattered in among them. Fixed
            rotation + a small, calm hover-straighten — no mouse-tracked
            tilt here, that read as chaotic once several were on screen
            at once. */}
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-14 sm:grid-cols-6 sm:gap-x-6 sm:gap-y-20 md:grid-cols-9">
          {items.map((p, i) => {
            const size = SIZE_BY_SLUG[p.slug] ?? "sm";
            const cls = sizeClasses[size];
            const rotate = ROTATE[i % ROTATE.length];
            return (
              <Reveal key={p.slug} delay={(i % 6) * 0.04} className={cls.wrap} settle>
                <div
                  className="relative transition-transform duration-300 ease-out hover:!rotate-0 hover:!-translate-y-1"
                  style={{ transform: `rotate(${rotate}deg)` }}
                >
                  <PushPin color={PIN_COLOR[i % PIN_COLOR.length]} size="1.15rem" className="-top-2 left-1/2 -translate-x-1/2" />
                  {p.coverImageSrc ? (
                    <div className="border-4 border-white bg-white shadow-[0_18px_34px_-14px_rgba(0,0,0,0.55)]">
                      <div className={cn("relative w-full overflow-hidden", cls.aspect)}>
                        <Image
                          src={p.coverImageSrc}
                          alt={p.name}
                          fill
                          sizes="(max-width: 640px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <ImagePlaceholder label={p.coverAssetRef ?? "asset pending"} aspect={cls.aspect} />
                  )}
                  <p className="mt-2.5 font-display text-sm font-medium text-white">{p.name}</p>
                  <p className="text-xs leading-snug text-white/60">{p.oneLiner}</p>
                </div>
              </Reveal>
            );
          })}

          {/* loose retro clutter pinned in among the real work */}
          <div className="col-span-1 flex items-start justify-center pt-4">
            <div className="rotate-[-8deg] transition-transform duration-300 ease-out hover:rotate-0">
              <DeskFloppy color="var(--floppy-4)" title="scrapped ideas" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
