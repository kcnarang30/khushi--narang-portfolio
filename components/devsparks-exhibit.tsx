"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CaseStudySection } from "@/data/types";
import { WindowFrame } from "./window-frame";
import { TerminalWindow } from "./terminal-window";
import { RealShot } from "./real-shot";
import { PendingAsset } from "./pending-asset";

/**
 * DevSparks gets its own dark/purple-orange identity instead of the
 * portfolio's moss/coral palette — a nod to the real site's own gradient-
 * orb visual system. The devsparks/&gt; wordmark uses code-bracket
 * typography, so one section leans into that with a real terminal-style
 * listing — content only, no invented facts.
 */
export function DevSparksExhibit({ sections }: { sections: CaseStudySection[] }) {
  const reduce = useReducedMotion();
  const byHeading = (h: string) => sections.find((s) => s.heading === h);

  const problem = byHeading("The problem with six microsites");
  const hub = byHeading("One hub, one template");
  const sessions = byHeading("Session architecture");
  const whyAttend = byHeading("Why attend");
  const cities = byHeading("Across the cities");
  const room = byHeading("In the room");
  const visual = byHeading("Visual system");

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
          "radial-gradient(ellipse 75% 45% at 15% 0%, rgba(140,60,220,0.22), transparent), radial-gradient(ellipse 65% 55% at 95% 25%, rgba(230,110,50,0.16), transparent), #0a0810",
      }}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* DOCUMENTED — the design problem, plain editorial text */}
        {problem && (
          <motion.div {...fadeUp} className="max-w-2xl">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{problem.heading}</p>
            <p className="mt-3 font-serif text-[16px] leading-relaxed text-white/80">{problem.body}</p>
          </motion.div>
        )}

        {/* EXHIBITED — the real hub, in browser chrome */}
        {hub && (
          <motion.div {...fadeUp} className="mt-16 grid grid-cols-1 items-start gap-8 sm:mt-20 md:grid-cols-[1.1fr_1fr] md:gap-12">
            <div className="order-2 md:order-1">
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{hub.heading}</p>
              <p className="mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-white/75">{hub.body}</p>
            </div>
            <div className="group order-1 md:order-2">
              {hub.imageSrc && hub.imageWidth && hub.imageHeight ? (
                <WindowFrame label="devsparks.yourstory.com" className="mx-auto max-w-[220px] transition-transform duration-500 group-hover:-translate-y-1">
                  <RealShot
                    src={hub.imageSrc}
                    width={hub.imageWidth}
                    height={hub.imageHeight}
                    alt={hub.imageCaption ?? hub.heading}
                    className="[&_img]:rounded-none [&_img]:border-0"
                  />
                </WindowFrame>
              ) : (
                hub.imageRef && <PendingAsset assetKey={hub.imageRef} caption={hub.imageCaption} />
              )}
              {hub.imageCaption && (
                <p className="mt-2.5 text-center font-mono text-[10px] text-white/35">{hub.imageCaption}</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Session architecture — real terminal listing, fitting the devsparks/> mark */}
        {sessions && (
          <motion.div {...fadeUp} className="mt-16 sm:mt-20">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{sessions.heading}</p>
            <p className="mt-3 max-w-xl font-serif text-[15.5px] leading-relaxed text-white/75">{sessions.body}</p>
            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
              <TerminalWindow label="~/devsparks/2026 — themes.md" className="max-w-md">
                <p>
                  <span className="text-fg-dim">$</span> cat themes.md
                </p>
                <p className="mt-2 text-[#e8a9f5]"># GenAI to Agentic AI</p>
                <p className="text-white/50">The next wave of intelligence</p>
                <p className="mt-2 text-[#f5c98a]"># AI in Action</p>
                <p className="text-white/50">Integrating &amp; scaling use cases</p>
                <p className="mt-2 text-[#8fd68a]"># Infra, Cloud &amp; Data</p>
                <p className="text-white/50">Powering AI at scale</p>
                <p className="mt-2 text-[#8ab8f5]"># The Developer Edge</p>
                <p className="text-white/50">GCCs &amp; frontier tech</p>
                <p className="mt-2 animate-pulse">▊</p>
              </TerminalWindow>
              {sessions.imageSrc && sessions.imageWidth && sessions.imageHeight && (
                <div className="overflow-hidden rounded-sm transition-transform duration-500 hover:scale-[1.015]">
                  <RealShot
                    src={sessions.imageSrc}
                    width={sessions.imageWidth}
                    height={sessions.imageHeight}
                    alt={sessions.imageCaption ?? sessions.heading}
                    caption={sessions.imageCaption}
                    className="[&_img]:rounded-sm [&_img]:border-white/10 [&>p]:text-white/35"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ARCHIVED — why attend, full-bleed editorial crop */}
        {whyAttend && (
          <motion.div {...fadeUp} className="mt-16 sm:mt-20">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{whyAttend.heading}</p>
                <p className="mt-3 max-w-sm font-serif text-[15.5px] leading-relaxed text-white/75">{whyAttend.body}</p>
              </div>
              {whyAttend.imageSrc && whyAttend.imageWidth && whyAttend.imageHeight && (
                <div className="overflow-hidden rounded-sm transition-transform duration-500 hover:scale-[1.015]">
                  <RealShot
                    src={whyAttend.imageSrc}
                    width={whyAttend.imageWidth}
                    height={whyAttend.imageHeight}
                    alt={whyAttend.imageCaption ?? whyAttend.heading}
                    caption={whyAttend.imageCaption}
                    className="[&_img]:rounded-sm [&_img]:border-white/10 [&>p]:text-white/35"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Flat printed-sheet — partner wall, matching the vocabulary from TechSparks */}
        {cities && (
          <motion.div {...fadeUp} className="mt-16 sm:mt-20">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{cities.heading}</p>
            <p className="mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-white/75">{cities.body}</p>
            {cities.imageSrc && cities.imageWidth && cities.imageHeight && (
              <div className="mt-5 rounded-sm border border-white/10 bg-white/[0.02] p-3">
                <RealShot
                  src={cities.imageSrc}
                  width={cities.imageWidth}
                  height={cities.imageHeight}
                  alt={cities.imageCaption ?? cities.heading}
                  caption={cities.imageCaption}
                  className="[&_img]:rounded-[2px] [&_img]:border-0 [&>p]:text-white/35"
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Contact-sheet — event photography, small grid with thin borders */}
        {room && (
          <motion.div {...fadeUp} className="mt-16 sm:mt-20">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{room.heading}</p>
            <p className="mt-3 max-w-md font-serif text-[15.5px] leading-relaxed text-white/75">{room.body}</p>
            {room.imageSrc && room.imageWidth && room.imageHeight && (
              <div className="mt-5 max-w-md rounded-sm border-4 border-white bg-white transition-transform duration-500 hover:-rotate-1">
                <RealShot
                  src={room.imageSrc}
                  width={room.imageWidth}
                  height={room.imageHeight}
                  alt={room.imageCaption ?? room.heading}
                  caption={room.imageCaption}
                  className="[&_img]:rounded-none [&_img]:border-0 [&>p]:px-1 [&>p]:pb-1 [&>p]:text-bg/50"
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Visual system — text only */}
        {visual && (
          <motion.div {...fadeUp} className="mt-16 max-w-2xl sm:mt-20">
            <p className="font-mono text-[10.5px] uppercase tracking-widest text-white/40">{visual.heading}</p>
            <p className="mt-3 font-serif text-[16px] leading-relaxed text-white/80">{visual.body}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
