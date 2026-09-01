import Link from "next/link";
import { Project } from "@/data/types";
import { Stamp } from "./stamp";
import { Reveal } from "./reveal";

/**
 * The opening page of a case study — "editorial document" as a personality,
 * distinct from the homepage's "introduction." A stamp instead of a colour
 * pill, the project name as a real title (not a browser tab), a byline row
 * instead of a stats grid.
 */
export function CaseHeader({ project, extra }: { project: Project; extra?: React.ReactNode }) {
  const cs = project.caseStudyContent;
  if (!cs) return null;
  const plainSub = cs.hero.sub && !cs.hero.sub.includes(" → ");

  return (
    <header className="mx-auto max-w-3xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20">
      <Reveal>
        <Link
          href="/work"
          className="focus-ring mb-8 inline-block font-marginalia-sans text-[13px] text-mg-ink-faint hover:text-mg-ink-muted"
        >
          &larr; Work
        </Link>
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-marginalia-sans text-[13px] uppercase tracking-wide text-mg-ink-faint">
              {[project.organisation ?? project.origin, project.year].filter(Boolean).join(" · ")}
            </p>
            <h1 className="mt-3 max-w-2xl font-marginalia-serif text-[34px] leading-[1.1] text-mg-ink sm:text-[44px]">
              {cs.hero.statement}
            </h1>
            {plainSub && (
              <p className="mt-4 max-w-lg font-marginalia-sans text-[16px] leading-relaxed text-mg-ink-muted">
                {cs.hero.sub}
              </p>
            )}
            {extra}
          </div>
          <Stamp status={project.status} className="mt-1 shrink-0" />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-mg-line pt-6 font-marginalia-sans text-[13.5px] text-mg-ink-muted">
          {project.role && <span>{project.role}</span>}
          {project.collaborators && <span>{project.collaborators}</span>}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus-ring relative rounded text-mg-accent"
            >
              Visit the live site
              <span className="pointer-events-none absolute -bottom-1 left-0 h-[10px] w-full overflow-visible">
                <svg viewBox="0 0 120 10" preserveAspectRatio="none" aria-hidden className="h-full w-full">
                  <path
                    d="M1 5.5 C 25 3, 60 8, 90 5 S 115 3.5, 119 5.5"
                    fill="none"
                    stroke="var(--mg-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="hand-underline-path"
                  />
                </svg>
              </span>
            </a>
          )}
        </div>

        {project.myContribution && project.myContribution.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-1.5 font-marginalia-sans text-[13.5px] text-mg-ink-muted">
            {project.myContribution.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mg-ink-faint" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </header>
  );
}
