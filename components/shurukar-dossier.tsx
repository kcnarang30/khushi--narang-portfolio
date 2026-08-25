"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CaseStudySection } from "@/data/types";
import { RealShot } from "./real-shot";
import { PendingAsset } from "./pending-asset";
import { RedactedPanel } from "./redacted-panel";
import { Marginalia } from "./marginalia";

/**
 * The flagship treatment, built only for ShuruKar — the project with enough
 * real material to actually show a product changing shape over time. Every
 * word here comes from data/projects.ts; this only changes how it's read.
 */

type Exhibit = {
  id: string;
  tag: string;
  title: string;
  status?: string;
  sections: CaseStudySection[];
  redacted?: boolean;
};

export function ShuruKarDossier({ sections, reflection }: { sections: CaseStudySection[]; reflection?: string }) {
  const exhibits: Exhibit[] = [
    { id: "A", tag: "Exhibit A", title: "Origin", sections: [sections[0], sections[1]] },
    { id: "B", tag: "Exhibit B", title: "V1", status: "2025", sections: [sections[2]] },
    { id: "C", tag: "Exhibit C", title: "The pause", redacted: true, sections: [sections[3]] },
    { id: "D", tag: "Exhibit D", title: "Reset — V2", status: "2025", sections: [sections[4]] },
    { id: "E", tag: "Exhibit E", title: "V3 / Beta", status: "Current", sections: [sections[5], sections[6]] },
  ];

  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = exhibits[active];

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
      <div className="mb-10 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-sm border-2 border-accent px-3 py-1 font-display text-sm font-extrabold uppercase tracking-wide text-accent">
          Case file — open
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-fg-dim">
          5 exhibits — origin to beta
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
        {/* Exhibit rail — a branching version tree, not just tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 lg:pr-2">
          {exhibits.map((ex, i) => (
            <div key={ex.id} className="relative shrink-0 lg:flex lg:gap-3">
              <div className="hidden shrink-0 flex-col items-center lg:flex">
                <span
                  className={`mt-3 h-2.5 w-2.5 rounded-full border-2 ${
                    i === active
                      ? "border-accent bg-accent"
                      : ex.redacted
                      ? "border-inst bg-inst/40"
                      : "border-line-strong bg-bg"
                  }`}
                  aria-hidden
                />
                {i < exhibits.length - 1 && <span className="w-px flex-1 bg-line-strong" aria-hidden />}
              </div>
              <button
                onClick={() => setActive(i)}
                className={`focus-ring w-full rounded-sm px-3 py-2.5 pb-5 text-left transition-colors lg:w-56 ${
                  i === active ? "bg-bg-raised" : "hover:bg-bg-raised/50"
                }`}
                aria-current={i === active}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest ${
                    i === active ? "text-accent" : "text-fg-dim"
                  }`}
                >
                  {ex.tag}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className={`font-display text-base font-bold leading-tight ${
                      i === active ? "text-fg" : "text-fg-muted"
                    }`}
                  >
                    {ex.title}
                  </span>
                  {ex.redacted && <span className="redacted-stripe h-2.5 w-6 rounded-[2px]" aria-hidden />}
                </span>
                {ex.status && (
                  <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] text-fg-dim">
                    {ex.status === "Current" && <span className="h-1 w-1 rounded-full bg-live-signal" aria-hidden />}
                    {ex.status}
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Exhibit reader */}
        <div className="min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {current.redacted ? (
                <RedactedExhibit sections={current.sections} />
              ) : (
                <div className="flex flex-col gap-10">
                  {current.sections.map((s) => (
                    <div key={s.heading} className="relative">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
                        {current.tag}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                        {s.heading}
                        {current.id === "D" && s.heading === "Reset — V2" && (
                          <Marginalia className="ml-3 hidden align-middle text-base sm:inline-flex" rotate={-4}>
                            could&rsquo;ve faked it here. didn&rsquo;t.
                          </Marginalia>
                        )}
                      </h3>
                      {s.body && (
                        <p className="mt-3 max-w-2xl font-serif text-[15.5px] leading-relaxed text-fg-muted">
                          {s.body}
                        </p>
                      )}
                      {s.imageSrc && s.imageWidth && s.imageHeight ? (
                        <RealShot
                          className="mt-5 max-w-xl"
                          src={s.imageSrc}
                          width={s.imageWidth}
                          height={s.imageHeight}
                          alt={s.imageCaption ?? s.heading}
                          caption={s.imageCaption}
                        />
                      ) : (
                        s.imageRef && <PendingAsset assetKey={s.imageRef} caption={s.imageCaption} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {reflection && (
        <div className="mt-16 border-l-2 border-accent pl-6 sm:pl-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Reflection</p>
          <p className="mt-3 max-w-2xl font-serif text-lg italic leading-relaxed text-fg sm:text-xl">
            {reflection}
          </p>
        </div>
      )}
    </div>
  );
}

function RedactedExhibit({ sections }: { sections: CaseStudySection[] }) {
  const s = sections[0];
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">Exhibit C</p>
      <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{s.heading}</h3>
      <p className="mt-3 max-w-2xl font-serif text-[15.5px] leading-relaxed text-fg-muted">
        The project paused for roughly six months.
      </p>
      <RedactedPanel
        className="mt-5 max-w-lg"
        label="Redacted — six months unaccounted for"
        note={s.body ?? ""}
      />
    </div>
  );
}
