"use client";

import { useEffect, useRef, useState } from "react";
import { CaseStudySection } from "@/data/types";
import { EditorialImage } from "./marginalia/editorial-image";
import { Reveal } from "./marginalia/reveal";
import { RedactedPanel } from "./redacted-panel";
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
    <div className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-[1px] border-[1.5px] border-mg-accent px-3 py-1 font-marginalia-sans text-[13px] font-semibold uppercase tracking-wide text-mg-accent">
          Case file &mdash; open
        </span>
        <span className="font-marginalia-sans text-[11.5px] uppercase tracking-wide text-mg-ink-faint">
          6 exhibits &mdash; origin to beta
        </span>
      </div>

      {reflection && (
        <p className="mb-14 max-w-2xl border-l-2 border-mg-accent pl-4 font-marginalia-serif text-[16px] italic leading-relaxed text-mg-ink-muted sm:pl-5">
          {reflection}
        </p>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[190px_1fr] lg:gap-12">
        {/* Jump-to index — every exhibit is already on the page; this just scrolls to it */}
        <nav aria-label="Jump to exhibit" className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
          <ul className="flex flex-col">
            {exhibits.map((ex, i) => (
              <li key={ex.id} className="relative flex gap-3">
                <div className="flex shrink-0 flex-col items-center">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-colors duration-300 ${
                      active === ex.id
                        ? "border-mg-accent bg-mg-accent"
                        : ex.redacted
                          ? "border-mg-ink/40 bg-mg-ink/15"
                          : "border-mg-line bg-mg-bg"
                    }`}
                    aria-hidden
                  />
                  {i < exhibits.length - 1 && <span className="w-px flex-1 bg-mg-line" aria-hidden />}
                </div>
                <a
                  href={`#exhibit-${ex.id}`}
                  className={`focus-ring block w-full rounded-[1px] px-2 py-1.5 pb-4 text-left transition-colors ${
                    active === ex.id ? "bg-mg-bg-raised" : "hover:bg-mg-bg-raised/60"
                  }`}
                >
                  <span
                    className={`font-marginalia-sans text-[10.5px] uppercase tracking-wide ${
                      active === ex.id ? "text-mg-accent" : "text-mg-ink-faint"
                    }`}
                  >
                    {ex.tag}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 font-marginalia-serif text-[15px] leading-tight ${
                      active === ex.id ? "text-mg-ink" : "text-mg-ink-muted"
                    }`}
                  >
                    {ex.title}
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
              <Reveal>
                <div className="border-t border-dashed border-mg-line pt-6">
                  <div className="flex items-center gap-2.5">
                    <span className="font-marginalia-sans text-[10.5px] uppercase tracking-wide text-mg-accent">
                      {ex.tag}
                    </span>
                    {ex.status && (
                      <span className="flex items-center gap-1.5 font-marginalia-sans text-[10.5px] text-mg-ink-faint">
                        {ex.status === "Current" && <span className="h-1 w-1 rounded-full bg-mg-accent" aria-hidden />}
                        {ex.status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-1 font-marginalia-serif text-[24px] text-mg-ink sm:text-[28px]">{ex.title}</h3>

                  {ex.redacted ? (
                    <RedactedExhibit sections={ex.sections} />
                  ) : (
                    <div className="mt-6 flex flex-col gap-10">
                      {ex.sections.map((s) => (
                        <div key={s.heading}>
                          <h4 className="flex flex-wrap items-baseline gap-x-3 font-marginalia-sans text-[13.5px] font-semibold uppercase tracking-wide text-mg-ink-muted">
                            {s.heading}
                            {ex.id === "E" && s.heading === "Reset — V2" && (
                              <span className="font-marginalia-hand text-[16px] font-normal normal-case tracking-normal text-mg-accent" style={{ transform: "rotate(-2deg)" }}>
                                could&rsquo;ve faked it here. didn&rsquo;t.
                              </span>
                            )}
                          </h4>
                          {s.body && (
                            <p className="mt-3 max-w-2xl font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">
                              {s.body}
                            </p>
                          )}
                          {ex.flow ? (
                            <div className="mt-6 flex flex-col gap-6">
                              <ShuruKarFlowExhibit />
                              <div className="max-w-xs">
                                <EditorialImage
                                  src="/projects/shurukar/shurukar-onboarding.png"
                                  alt="ShuruKar's branching onboarding screen"
                                  aspect="aspect-[910/220]"
                                  sizes="320px"
                                />
                                <p className="mt-2 font-marginalia-sans text-[12.5px] italic text-mg-ink-faint">
                                  One of the real onboarding screens this flow maps.
                                </p>
                              </div>
                            </div>
                          ) : (
                            s.imageSrc && (
                              <div className="mt-5 max-w-xl">
                                <EditorialImage
                                  src={s.imageSrc}
                                  alt={s.imageCaption ?? s.heading}
                                  aspect="aspect-[4/3]"
                                  sizes="(min-width: 1024px) 620px, 100vw"
                                />
                                {s.imageCaption && (
                                  <p className="mt-2 font-marginalia-sans text-[12.5px] italic text-mg-ink-faint">
                                    {s.imageCaption}
                                  </p>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
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
      <p className="max-w-2xl font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">
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
