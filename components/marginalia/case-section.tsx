import { CaseStudySection } from "@/data/types";
import { EditorialImage } from "./editorial-image";
import { Reveal } from "./reveal";

/**
 * The default rendering for one case-study section — heading, body copy,
 * an optional real image placed directly on the page (no card, no browser
 * chrome), an optional list. This is what every case study without a
 * bespoke exhibit uses, and what the bespoke ones (ShuruKar, TechSparks,
 * DevSparks) fall back to for their plainer sections.
 */
export function CaseSection({ section, reverse = false }: { section: CaseStudySection; reverse?: boolean }) {
  const hasImage = !!section.imageSrc;

  return (
    <div
      className={`grid grid-cols-1 gap-10 ${hasImage ? "lg:grid-cols-12 lg:gap-8" : ""}`}
    >
      <Reveal className={hasImage ? `lg:col-span-5 ${reverse ? "lg:order-2" : ""}` : "max-w-2xl"}>
        <h3 className="font-marginalia-serif text-[22px] leading-tight text-mg-ink">{section.heading}</h3>
        {section.body && (
          <p className="mt-3 font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">
            {section.body}
          </p>
        )}
        {section.list && section.list.length > 0 && (
          <ul className="mt-4 space-y-2">
            {section.list.map((item) => (
              <li key={item} className="flex items-start gap-2.5 font-marginalia-sans text-[14.5px] text-mg-ink-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mg-ink-faint" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      {hasImage && (
        <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
          <EditorialImage
            src={section.imageSrc!}
            alt={section.imageCaption ?? section.heading}
            sizes="(min-width: 1024px) 58vw, 100vw"
            aspect="aspect-[4/3]"
          />
          {section.imageCaption && (
            <p className="mt-3 font-marginalia-sans text-[13px] italic text-mg-ink-faint">{section.imageCaption}</p>
          )}
        </div>
      )}
    </div>
  );
}
