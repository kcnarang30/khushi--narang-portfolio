"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CaseStudySection } from "@/data/types";
import { WindowFrame } from "./window-frame";
import { RealShot } from "./real-shot";
import { PendingAsset } from "./pending-asset";

/**
 * TechSparks gets its own loud identity instead of the portfolio's moss/
 * coral palette — the surrounding shell stays neutral, this section brings
 * its own red/purple event energy. Every fact here traces to the real
 * TechSparks Figma boards or data/projects.ts; nothing invented.
 */
export function TechSparksExhibit({ sections }: { sections: CaseStudySection[] }) {
  const reduce = useReducedMotion();
  const byHeading = (h: string) => sections.find((s) => s.heading === h);

  const event = byHeading("The event");
  const brief = byHeading("The brief");
  const whatsInStore = byHeading("What's in store");
  const day1 = byHeading("Day 1: Power, Control & The New Tech Order");
  const day2 = byHeading("Day 2: The Builder — Systems, DeepTech & Execution");
  const visual = byHeading("Visual system");
  const reach = byHeading("Real reach");

  const fadeUp = {
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div
      className="relative overflow-hidden py-16 sm:py-20"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(180,40,60,0.22), transparent), radial-gradient(ellipse 70% 60% at 90% 30%, rgba(110,50,190,0.18), transparent), #0a0508",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* EXHIBITED — the real hero, in browser chrome, with a ticket-stub detail */}
        {event && (
          <motion.div {...fadeUp} className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">
                {event.heading}
              </p>
              <p className="mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-white/75">
                {event.body}
              </p>
              <div
                className="mt-6 inline-flex -rotate-2 items-center gap-3 rounded-sm border border-dashed border-white/25 bg-white/5 px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-wide text-white/60"
                aria-hidden
              >
                <span>16th Edition</span>
                <span className="h-1 w-1 rounded-full bg-red-400" />
                <span>Bengaluru</span>
                <span className="h-1 w-1 rounded-full bg-red-400" />
                <span>Oct 13&ndash;15</span>
              </div>
            </div>
            <div className="group">
              {event.imageSrc && event.imageWidth && event.imageHeight ? (
                <WindowFrame label="techsparks.yourstory.com/2026" className="transition-transform duration-500 group-hover:-translate-y-1">
                  <RealShot
                    src={event.imageSrc}
                    width={event.imageWidth}
                    height={event.imageHeight}
                    alt={event.imageCaption ?? event.heading}
                    className="[&_img]:rounded-none [&_img]:border-0"
                    sizes="(max-width: 768px) 90vw, 420px"
                  />
                </WindowFrame>
              ) : (
                event.imageRef && <PendingAsset assetKey={event.imageRef} caption={event.imageCaption} />
              )}
              {event.imageCaption && (
                <p className="mt-2.5 font-mono text-[10px] text-white/35">{event.imageCaption}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* DOCUMENTED — the design problem, plain editorial text */}
        {brief && (
          <motion.div {...fadeUp} className="mt-16 max-w-2xl sm:mt-20">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{brief.heading}</p>
            <p className="mt-3 font-serif text-[16px] leading-relaxed text-white/80">{brief.body}</p>
          </motion.div>
        )}

        {/* ARCHIVED — full-bleed editorial crop, no frame, just the work */}
        {whatsInStore && (
          <motion.div {...fadeUp} className="mt-16 sm:mt-20">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{whatsInStore.heading}</p>
                <p className="mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-white/75">{whatsInStore.body}</p>
              </div>
              {whatsInStore.imageSrc && whatsInStore.imageWidth && whatsInStore.imageHeight ? (
                <div className="overflow-hidden rounded-sm transition-transform duration-500 hover:scale-[1.015]">
                  <RealShot
                    src={whatsInStore.imageSrc}
                    width={whatsInStore.imageWidth}
                    height={whatsInStore.imageHeight}
                    alt={whatsInStore.imageCaption ?? whatsInStore.heading}
                    caption={whatsInStore.imageCaption}
                    className="[&_img]:rounded-sm [&_img]:border-white/10 [&>p]:text-white/35"
                  />
                </div>
              ) : (
                whatsInStore.imageRef && <PendingAsset assetKey={whatsInStore.imageRef} caption={whatsInStore.imageCaption} />
              )}
            </div>
          </motion.div>
        )}

        {/* Printed-program index cards — Day 1 / Day 2, side by side */}
        {(day1 || day2) && (
          <motion.div {...fadeUp} className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2">
            {[day1, day2].filter(Boolean).map((day, i) => (
              <div
                key={day!.heading}
                className={`rounded-sm border border-white/15 bg-white/[0.03] p-6 ${i === 0 ? "rotate-[-0.6deg]" : "rotate-[0.6deg]"}`}
              >
                <span className="inline-block rounded-sm border border-red-400/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-red-300">
                  Day {i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-white sm:text-xl">
                  {day!.heading.replace(/^Day \d: /, "")}
                </h3>
                <p className="mt-2 font-serif text-[14px] leading-relaxed text-white/70">{day!.body}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Visual system — text only, deliberately quiet */}
        {visual && (
          <motion.div {...fadeUp} className="mt-16 max-w-2xl sm:mt-20">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{visual.heading}</p>
            <p className="mt-3 font-serif text-[16px] leading-relaxed text-white/80">{visual.body}</p>
          </motion.div>
        )}

        {/* Real reach — flat printed-sheet treatment, not a polaroid */}
        {reach && (
          <motion.div {...fadeUp} className="mt-16 sm:mt-20">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{reach.heading}</p>
            <p className="mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-white/75">{reach.body}</p>
            {reach.imageSrc && reach.imageWidth && reach.imageHeight ? (
              <div className="mt-5 rounded-sm border border-white/10 bg-white/[0.02] p-3">
                <RealShot
                  src={reach.imageSrc}
                  width={reach.imageWidth}
                  height={reach.imageHeight}
                  alt={reach.imageCaption ?? reach.heading}
                  caption={reach.imageCaption}
                  className="[&_img]:rounded-[2px] [&_img]:border-0 [&>p]:text-white/35"
                />
              </div>
            ) : (
              reach.imageRef && <PendingAsset assetKey={reach.imageRef} caption={reach.imageCaption} />
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
