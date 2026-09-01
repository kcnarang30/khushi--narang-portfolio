import { CaseStudySection } from "@/data/types";
import { EditorialImage } from "./marginalia/editorial-image";
import { Reveal } from "./marginalia/reveal";
import { TerminalWindow } from "./terminal-window";

/**
 * DevSparks reads on the same paper as everything else — the real terminal
 * listing is the one deliberate dark object on the page (fitting for the
 * devsparks/&gt; wordmark), not a whole-section palette shift. Content only,
 * no invented facts.
 */
export function DevSparksExhibit({ sections }: { sections: CaseStudySection[] }) {
  const byHeading = (h: string) => sections.find((s) => s.heading === h);

  const problem = byHeading("The problem with six microsites");
  const hub = byHeading("One hub, one template");
  const sessions = byHeading("Session architecture");
  const whyAttend = byHeading("Why attend");
  const cities = byHeading("Across the cities");
  const room = byHeading("In the room");
  const visual = byHeading("Visual system");

  return (
    <div className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
      {problem && (
        <Reveal className="max-w-2xl">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{problem.heading}</p>
          <p className="mt-3 font-marginalia-sans text-[15.5px] leading-relaxed text-mg-ink-muted">{problem.body}</p>
        </Reveal>
      )}

      {hub && (
        <Reveal className="mt-16 grid grid-cols-1 items-start gap-8 sm:mt-20 md:grid-cols-[1.1fr_1fr] md:gap-12">
          <div className="order-2 md:order-1">
            <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{hub.heading}</p>
            <p className="mt-3 max-w-md font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">{hub.body}</p>
          </div>
          <div className="order-1 md:order-2">
            {hub.imageSrc && (
              <div className="mx-auto max-w-[240px]">
                <EditorialImage src={hub.imageSrc} alt={hub.imageCaption ?? hub.heading} aspect="aspect-[265/429]" sizes="240px" />
              </div>
            )}
            {hub.imageCaption && <p className="mt-2.5 text-center font-marginalia-sans text-[12px] italic text-mg-ink-faint">{hub.imageCaption}</p>}
          </div>
        </Reveal>
      )}

      {sessions && (
        <Reveal className="mt-16 sm:mt-20">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{sessions.heading}</p>
          <p className="mt-3 max-w-xl font-marginalia-sans text-[15.5px] leading-relaxed text-mg-ink-muted">{sessions.body}</p>
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
            {sessions.imageSrc && (
              <EditorialImage src={sessions.imageSrc} alt={sessions.imageCaption ?? sessions.heading} aspect="aspect-[265/267]" sizes="(min-width:768px) 380px, 100vw" />
            )}
          </div>
        </Reveal>
      )}

      {whyAttend && (
        <Reveal className="mt-16 sm:mt-20">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
            <div>
              <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{whyAttend.heading}</p>
              <p className="mt-3 max-w-sm font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">{whyAttend.body}</p>
            </div>
            {whyAttend.imageSrc && (
              <EditorialImage src={whyAttend.imageSrc} alt={whyAttend.imageCaption ?? whyAttend.heading} aspect="aspect-[265/210]" sizes="(min-width:768px) 460px, 100vw" />
            )}
          </div>
        </Reveal>
      )}

      {cities && (
        <Reveal className="mt-16 sm:mt-20">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{cities.heading}</p>
          <p className="mt-3 max-w-md font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">{cities.body}</p>
          {cities.imageSrc && (
            <div className="mt-5 max-w-lg">
              <EditorialImage src={cities.imageSrc} alt={cities.imageCaption ?? cities.heading} aspect="aspect-[265/106]" sizes="500px" />
            </div>
          )}
        </Reveal>
      )}

      {room && (
        <Reveal className="mt-16 sm:mt-20">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{room.heading}</p>
          <p className="mt-3 max-w-md font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">{room.body}</p>
          {room.imageSrc && (
            <div className="mt-5 max-w-md rounded-[1px] border-4 border-white bg-white shadow-[0_20px_40px_-16px_rgba(36,31,24,0.35)] transition-transform duration-500 hover:-rotate-1">
              <EditorialImage src={room.imageSrc} alt={room.imageCaption ?? room.heading} aspect="aspect-[265/134]" sizes="400px" frame={false} />
            </div>
          )}
        </Reveal>
      )}

      {visual && (
        <Reveal className="mt-16 max-w-2xl sm:mt-20">
          <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">{visual.heading}</p>
          <p className="mt-3 font-marginalia-sans text-[15.5px] leading-relaxed text-mg-ink-muted">{visual.body}</p>
        </Reveal>
      )}
    </div>
  );
}
