"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { CaseStudySection } from "@/data/types";
import { RealShot } from "./real-shot";
import { PendingAsset } from "./pending-asset";
import { RedactedPanel } from "./redacted-panel";
import { Marginalia } from "./marginalia";
import { ShuruKarFlowExhibit } from "./shurukar-flow-exhibit";

/**
 * The flagship treatment, built only for ShuruKar — the project with enough
 * real material to actually show a product changing shape over time. Every
 * word here comes from data/projects.ts; this only changes how it's read.
 * Exhibits read top-to-bottom like a real case file. The left rail is a
 * jump-to index, not a switcher — every exhibit is always on the page.
 */

type Exhibit = {
  id: string;
  tag: string;
  title: string;
  status?: string;
  sections: CaseStudySection[];
  redacted?: boolean;
  flow?: boolean;
};

function ExhibitReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function ShuruKarDossier({ sections, reflection }: { sections: CaseStudySection[]; reflection?: string }) {
  const exhibits: Exhibit[] = [
    { id: "A", tag: "Exhibit A", title: "Origin", sections: [sections[0], sections[1]] },
    { id: "B", tag: "Exhibit B", title: "V1", status: "2025", sections: [sections[2]] },
    { id: "C", tag: "Exhibit C", title: "The pause", redacted: true, sections: [sections[3]] },
    { id: "D", tag: "Exhibit D", title: "The onboarding flow", flow: true, sections: [sections[4]] },
    { id: "E", tag: "Exhibit E", title: "Reset — V2", status: "2025", sections: [sections[5]] },
    { id: "F", tag: "Exhibit F", title: "V3 / Beta", status: "Current", sections: [sections[6], sections[7]] },
  ];

  const [active, setActive] = useState(exhibits[0].id);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.exhibit;
            if (id) setActive(id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    Object.values(nodeRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-sm border-2 border-accent px-3 py-1 font-display text-sm font-extrabold uppercase tracking-wide text-accent">
          Case file — open
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-fg-dim">
          6 exhibits — origin to beta
        </span>
      </div>

      {reflection && (
        <p className="mb-14 max-w-2xl border-l-2 border-accent pl-4 font-serif text-[15px] italic leading-relaxed text-fg-muted sm:pl-5">
          {reflection}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr] lg:gap-12">
        {/* Jump-to index — every exhibit is already on the page; this just scrolls to it */}
        <nav aria-label="Jump to exhibit" className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
          <ul className="flex flex-col">
            {exhibits.map((ex, i) => (
              <li key={ex.id} className="relative flex gap-3">
                <div className="flex shrink-0 flex-col items-center">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 ${
                      active === ex.id
                        ? "border-accent bg-accent"
                        : ex.redacted
                        ? "border-inst bg-inst/40"
                        : "border-line-strong bg-bg"
                    }`}
                    aria-hidden
                  />
                  {i < exhibits.length - 1 && <span className="w-px flex-1 bg-line-strong" aria-hidden />}
                </div>
                <a
                  href={`#exhibit-${ex.id}`}
                  className={`focus-ring block w-full rounded-sm px-2 py-1.5 pb-4 text-left transition-colors ${
                    active === ex.id ? "bg-bg-raised" : "hover:bg-bg-raised/50"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest ${
                      active === ex.id ? "text-accent" : "text-fg-dim"
                    }`}
                  >
                    {ex.tag}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 font-display text-sm font-bold leading-tight ${
                      active === ex.id ? "text-fg" : "text-fg-muted"
                    }`}
                  >
                    {ex.title}
                    {ex.redacted && <span className="redacted-stripe h-2 w-4 shrink-0 rounded-[2px]" aria-hidden />}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-16">
          {exhibits.map((ex) => (
            <div
              key={ex.id}
              id={`exhibit-${ex.id}`}
              data-exhibit={ex.id}
              ref={(el) => {
                nodeRefs.current[ex.id] = el;
              }}
              className="scroll-mt-28"
            >
              <ExhibitReveal>
                <div className="border-t border-dashed border-line-strong pt-6">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{ex.tag}</span>
                    {ex.status && (
                      <span className="flex items-center gap-1.5 font-mono text-[10px] text-fg-dim">
                        {ex.status === "Current" && (
                          <span className="h-1 w-1 rounded-full bg-live-signal" aria-hidden />
                        )}
                        {ex.status}
                      </span>
                    )}
                    {ex.redacted && <span className="redacted-stripe h-2.5 w-6 rounded-[2px]" aria-hidden />}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{ex.title}</h3>

                  {ex.redacted ? (
                    <RedactedExhibit sections={ex.sections} />
                  ) : (
                    <div className="mt-6 flex flex-col gap-10">
                      {ex.sections.map((s) => (
                        <div key={s.heading}>
                          <h4 className="font-display text-lg font-bold text-fg-muted sm:text-xl">
                            {s.heading}
                            {ex.id === "E" && s.heading === "Reset — V2" && (
                              <Marginalia className="ml-3 hidden align-middle text-base sm:inline-flex" rotate={-4}>
                                could&rsquo;ve faked it here. didn&rsquo;t.
                              </Marginalia>
                            )}
                          </h4>
                          {s.body && (
                            <p className="mt-3 max-w-2xl font-serif text-[15.5px] leading-relaxed text-fg-muted">
                              {s.body}
                            </p>
                          )}
                          {ex.flow ? (
                            <div className="mt-6 flex flex-col gap-6">
                              <ShuruKarFlowExhibit />
                              <RealShot
                                className="max-w-xs"
                                src="/projects/shurukar/shurukar-onboarding.png"
                                width={910}
                                height={220}
                                alt="ShuruKar's branching onboarding screen"
                                caption="One of the real onboarding screens this flow maps."
                              />
                            </div>
                          ) : s.imageSrc && s.imageWidth && s.imageHeight ? (
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
                </div>
              </ExhibitReveal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RedactedExhibit({ sections }: { sections: CaseStudySection[] }) {
  const s = sections[0];
  return (
    <div className="mt-3">
      <p className="max-w-2xl font-serif text-[15.5px] leading-relaxed text-fg-muted">
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
