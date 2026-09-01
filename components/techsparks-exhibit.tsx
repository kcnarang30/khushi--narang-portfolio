import { CaseStudySection } from "@/data/types";
import { EditorialImage } from "./marginalia/editorial-image";
import { Reveal } from "./marginalia/reveal";

/**
 * TechSparks reads on the same paper as the rest of the site now — the
 * event's own red/purple energy comes through in the ticket-stub and
 * printed-program details, not a whole-section dark background, so it stays
 * one document instead of a jarring cutaway. Every fact here traces to the
 * real TechSparks Figma boards or data/projects.ts; nothing invented.
 */
export function TechSparksExhibit({ sections }: { sections: CaseStudySection[] }) {
  const byHeading = (h: string) => sections.find((s) => s.heading === h);

  const event = byHeading("The event");
  const brief = byHeading("The brief");
  const whatsInStore = byHeading("What's in store");
  const day1 = byHeading("Day 1: Power, Control & The New Tech Order");
  const day2 = byHeading("Day 2: The Builder — Systems, DeepTech & Execution");
  const visual = byHeading("Visual system");
  const reach = byHeading("Real reach");

  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
      {event && (
        <Reveal className="grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
          <div>
            <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{event.heading}</p>
            <p className="mt-3 max-w-md font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">{event.body}</p>
            <div
              className="mt-6 inline-flex -rotate-2 items-center gap-3 rounded-[1px] border border-dashed border-mg-line bg-mg-bg-raised px-4 py-2.5 font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint"
              aria-hidden
            >
              <span>16th Edition</span>
              <span className="h-1 w-1 rounded-full bg-mg-accent" />
              <span>Bengaluru</span>
              <span className="h-1 w-1 rounded-full bg-mg-accent" />
              <span>Oct 13&ndash;15</span>
            </div>
          </div>
          <div>
            {event.imageSrc && (
              <EditorialImage src={event.imageSrc} alt={event.imageCaption ?? event.heading} aspect="aspect-[400/640]" sizes="(max-width:768px) 90vw, 420px" />
            )}
            {event.imageCaption && <p className="mt-2.5 font-marginalia-sans text-[12px] italic text-mg-ink-faint">{event.imageCaption}</p>}
          </div>
        </Reveal>
      )}

      {brief && (
        <Reveal delay={0.1} className="mt-16 max-w-2xl sm:mt-20">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{brief.heading}</p>
          <p className="mt-3 font-marginalia-sans text-[15.5px] leading-relaxed text-mg-ink-muted">{brief.body}</p>
        </Reveal>
      )}

      {whatsInStore && (
        <Reveal className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-12">
            <div>
              <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{whatsInStore.heading}</p>
              <p className="mt-3 max-w-md font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">{whatsInStore.body}</p>
            </div>
            {whatsInStore.imageSrc && (
              <div>
                <EditorialImage src={whatsInStore.imageSrc} alt={whatsInStore.imageCaption ?? whatsInStore.heading} aspect="aspect-[4/3]" sizes="(min-width:768px) 460px, 100vw" />
                {whatsInStore.imageCaption && <p className="mt-2 font-marginalia-sans text-[12px] italic text-mg-ink-faint">{whatsInStore.imageCaption}</p>}
              </div>
            )}
          </div>
        </Reveal>
      )}

      {(day1 || day2) && (
        <Reveal className="mt-16 grid grid-cols-1 gap-5 sm:mt-20 sm:grid-cols-2">
          {[day1, day2].filter(Boolean).map((day, i) => (
            <div
              key={day!.heading}
              className={`rounded-[1px] border border-mg-line bg-mg-bg-raised p-6 ${i === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"}`}
            >
              <span className="inline-block rounded-[1px] border border-mg-accent/40 px-2 py-0.5 font-marginalia-sans text-[10.5px] uppercase tracking-wide text-mg-accent">
                Day {i + 1}
              </span>
              <h3 className="mt-3 font-marginalia-serif text-[19px] text-mg-ink">{day!.heading.replace(/^Day \d: /, "")}</h3>
              <p className="mt-2 font-marginalia-sans text-[14px] leading-relaxed text-mg-ink-muted">{day!.body}</p>
            </div>
          ))}
        </Reveal>
      )}

      {visual && (
        <Reveal className="mt-16 max-w-2xl sm:mt-20">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{visual.heading}</p>
          <p className="mt-3 font-marginalia-sans text-[15.5px] leading-relaxed text-mg-ink-muted">{visual.body}</p>
        </Reveal>
      )}

      {reach && (
        <Reveal className="mt-16 sm:mt-20">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{reach.heading}</p>
          <p className="mt-3 max-w-md font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">{reach.body}</p>
          {reach.imageSrc && (
            <div className="mt-5 max-w-lg">
              <EditorialImage src={reach.imageSrc} alt={reach.imageCaption ?? reach.heading} aspect="aspect-[400/155]" sizes="500px" />
              {reach.imageCaption && <p className="mt-2 font-marginalia-sans text-[12px] italic text-mg-ink-faint">{reach.imageCaption}</p>}
            </div>
          )}
        </Reveal>
      )}
    </div>
  );
}
