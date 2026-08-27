import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, getBySlug } from "@/data/projects";
import { StatusBadge } from "@/components/status-badge";
import { Reveal } from "@/components/reveal";
import { ShuruKarDossier } from "@/components/shurukar-dossier";
import { TechSparksExhibit } from "@/components/techsparks-exhibit";
import { DevSparksExhibit } from "@/components/devsparks-exhibit";
import { TechSparksStats } from "@/components/techsparks-stats";
import { PendingAsset } from "@/components/pending-asset";
import { RealShot } from "@/components/real-shot";
import { PaperClip } from "@/components/paper-clip";
import { Stamp } from "@/components/stamp";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getBySlug(slug);
  if (!project) return {};
  return { title: project.name, description: project.oneLiner };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getBySlug(slug);
  if (!project || !project.caseStudy || !project.caseStudyContent) notFound();

  const cs = project.caseStudyContent;

  return (
    <article>
      {/* Hero — a real case file pulled from the archive, not a page banner */}
      <header className="cardboard-texture relative overflow-hidden py-14 sm:py-20">
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Link
            href="/work"
            className="focus-ring rounded font-mono text-[11px] uppercase tracking-widest text-white/60 hover:text-white"
          >
            ← Work
          </Link>

          <div className="relative mt-8">
            <div className="grain-paper shadow-physical-lg relative bg-paper p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} />
                {project.year && <span className="font-mono text-[11px] text-bg/55">{project.year}</span>}
                {project.organisation && (
                  <span className="font-mono text-[11px] text-bg/55">{project.organisation}</span>
                )}
              </div>
              <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] text-bg sm:text-6xl">
                {cs.hero.statement}
              </h1>
              {cs.hero.sub && !project.caseStudyContent?.hero.sub?.includes(" → ") && (
                <p className="mt-4 max-w-xl font-serif text-[16px] italic text-bg/70">{cs.hero.sub}</p>
              )}

              {project.slug === "devsparks" && cs.hero.sub?.includes(" → ") && (
                <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2 font-display text-lg font-bold text-bg sm:text-2xl">
                  {cs.hero.sub.replace(".", "").split(" → ").map((city, i, arr) => (
                    <span key={city} className="flex items-center gap-2.5">
                      <span>{city}</span>
                      {i < arr.length - 1 && <span className="text-accent" aria-hidden>/</span>}
                    </span>
                  ))}
                </div>
              )}

              {project.slug === "techsparks" && <TechSparksStats />}

              <p className="mt-7 border-t border-bg/15 pt-4 font-mono text-[12px] text-bg/55">
                {project.role ?? "Product Designer"}
                {project.collaborators && ` · ${project.collaborators}`}
                {project.liveUrl && (
                  <>
                    {" · "}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
                    >
                      visit site ↗
                    </a>
                  </>
                )}
              </p>
            </div>

            <PaperClip rotate={-15} className="-left-4 -top-5 h-11 w-11 sm:-left-6 sm:-top-6" />
            <Stamp
              tone={project.status === "live" || project.status === "beta" || project.status === "shipped" ? "green" : "ink"}
              rotate={7}
              size="5.75rem"
              className="absolute -right-2 -top-6 sm:-right-6"
            >
              {project.status}
            </Stamp>
          </div>
        </div>
      </header>

      {/* My contribution */}
      {project.myContribution && project.myContribution.length > 0 && (
        <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">My contribution</p>
            <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-1.5 text-sm text-fg-muted sm:grid-cols-2">
              {project.myContribution.map((c) => (
                <li key={c} className="flex gap-2">
                  <span className="text-accent" aria-hidden>—</span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}

      {/* Sections */}
      {project.slug === "shurukar" ? (
        <ShuruKarDossier sections={cs.sections} reflection={cs.reflection} />
      ) : project.slug === "techsparks" ? (
        <TechSparksExhibit sections={cs.sections} />
      ) : project.slug === "devsparks" ? (
        <DevSparksExhibit sections={cs.sections} />
      ) : (
        <div className="mx-auto max-w-4xl px-5 pb-16 pt-6 sm:px-8">
          <div className="flex flex-col gap-14">
            {cs.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.03}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                  <div className="md:col-span-2">
                    <h2 className="font-display text-xl font-bold sm:text-2xl">{s.heading}</h2>
                  </div>
                  <div className="md:col-span-3">
                    {s.body && <p className="font-serif text-[15.5px] leading-relaxed text-fg-muted">{s.body}</p>}
                    {s.list && (
                      <ul className="mt-3 flex flex-col gap-1.5 text-sm text-fg-muted">
                        {s.list.map((l) => (
                          <li key={l} className="flex gap-2">
                            <span className="text-accent" aria-hidden>—</span>
                            {l}
                          </li>
                        ))}
                      </ul>
                    )}
                    {!s.imageSrc && s.imageRef && <PendingAsset assetKey={s.imageRef} caption={s.imageCaption} />}
                  </div>
                </div>
                {s.imageSrc && s.imageWidth && s.imageHeight && (
                  <div className="mx-auto mt-6 max-w-xl md:-mr-16 lg:-mr-32">
                    <RealShot
                      src={s.imageSrc}
                      width={s.imageWidth}
                      height={s.imageHeight}
                      alt={s.imageCaption ?? s.heading}
                      caption={s.imageCaption}
                    />
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          {cs.reflection && (
            <Reveal delay={0.1}>
              <div className="mt-16 border-l-2 border-accent pl-6 sm:pl-8">
                <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Reflection</p>
                <p className="mt-3 max-w-2xl font-serif text-lg italic leading-relaxed text-fg sm:text-xl">
                  {cs.reflection}
                </p>
              </div>
            </Reveal>
          )}
        </div>
      )}

      {project.todo && project.todo.length > 0 && (
        <div className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
          <div className="border-t border-dashed border-line-strong pt-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
              Open items before this goes fully live
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-fg-dim">
              {project.todo.map((t) => (
                <li key={t}>TODO — {t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
