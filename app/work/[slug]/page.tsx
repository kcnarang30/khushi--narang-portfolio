import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { projects, getBySlug } from "@/data/projects";
import { StatusBadge } from "@/components/status-badge";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { WindowFrame } from "@/components/window-frame";
import { Reveal } from "@/components/reveal";

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
      {/* Hero */}
      <header className="mx-auto max-w-4xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <Link
          href="/work"
          className="focus-ring rounded font-mono text-[11px] uppercase tracking-widest text-fg-dim hover:text-fg-muted"
        >
          ← Work
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          {project.year && <span className="font-mono text-[11px] text-fg-dim">{project.year}</span>}
          {project.organisation && (
            <span className="font-mono text-[11px] text-fg-dim">{project.organisation}</span>
          )}
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.02] sm:text-6xl">
          {cs.hero.statement}
        </h1>
        {cs.hero.sub && <p className="mt-4 max-w-xl text-[15px] text-fg-muted">{cs.hero.sub}</p>}

        <div className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 sm:grid-cols-4">
          <Meta label="Role" value={project.role ?? "TBD"} />
          <Meta label="Category" value={project.category.replace("-", " ")} />
          {project.collaborators && <Meta label="Collaborators" value={project.collaborators} />}
          {project.liveUrl && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">Live</p>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-1 inline-block rounded font-mono text-xs text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
              >
                Visit site ↗
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Cover */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <WindowFrame label={project.slug}>
          <ImagePlaceholder label={project.coverAssetRef ?? "cover pending"} aspect="aspect-[16/9]" className="rounded-none border-0" />
        </WindowFrame>
      </div>

      {/* My contribution */}
      {project.myContribution && project.myContribution.length > 0 && (
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
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
      <div className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <div className="flex flex-col gap-16">
          {cs.sections.map((s, i) => (
            <Reveal key={s.heading} delay={i * 0.03}>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                <div className="md:col-span-2">
                  <h2 className="font-display text-xl font-bold sm:text-2xl">{s.heading}</h2>
                </div>
                <div className="md:col-span-3">
                  {s.body && <p className="text-[15px] leading-relaxed text-fg-muted">{s.body}</p>}
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
                  {s.imageRef && (
                    <div className="mt-5">
                      <WindowFrame label={s.imageRef}>
                        <ImagePlaceholder label={s.imageRef} aspect="aspect-[4/3]" className="rounded-none border-0" />
                      </WindowFrame>
                      {s.imageCaption && (
                        <p className="mt-2 font-mono text-[11px] text-fg-dim">{s.imageCaption}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {cs.reflection && (
          <Reveal delay={0.1}>
            <div className="mt-16 border-l-2 border-accent pl-6 sm:pl-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Reflection</p>
              <p className="mt-3 max-w-2xl font-display text-lg leading-relaxed text-fg sm:text-xl">
                {cs.reflection}
              </p>
            </div>
          </Reveal>
        )}

        {project.todo && project.todo.length > 0 && (
          <div className="mt-10 border-t border-dashed border-line-strong pt-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
              Open items before this goes fully live
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-xs text-fg-dim">
              {project.todo.map((t) => (
                <li key={t}>TODO — {t}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">{label}</p>
      <p className="mt-1 text-xs text-fg-muted">{value}</p>
    </div>
  );
}
