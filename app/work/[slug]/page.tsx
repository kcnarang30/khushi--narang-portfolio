import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getBySlug } from "@/data/projects";
import { CaseHeader } from "@/components/marginalia/case-header";
import { CaseSection } from "@/components/marginalia/case-section";
import { CaseReflection } from "@/components/marginalia/case-reflection";
import { Reveal } from "@/components/marginalia/reveal";
import { CityChain, TechSparksStatRow } from "@/components/marginalia/case-extras";
import { ShuruKarDossier } from "@/components/shurukar-dossier";
import { TechSparksExhibit } from "@/components/techsparks-exhibit";
import { DevSparksExhibit } from "@/components/devsparks-exhibit";

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

  const extra =
    project.slug === "devsparks" && cs.hero.sub?.includes(" → ") ? (
      <CityChain sub={cs.hero.sub} />
    ) : project.slug === "techsparks" ? (
      <TechSparksStatRow />
    ) : undefined;

  return (
    <article className="bg-mg-bg">
      <CaseHeader project={project} extra={extra} />

      {project.slug === "shurukar" ? (
        <ShuruKarDossier sections={cs.sections} reflection={cs.reflection} />
      ) : project.slug === "techsparks" ? (
        <TechSparksExhibit sections={cs.sections} />
      ) : project.slug === "devsparks" ? (
        <DevSparksExhibit sections={cs.sections} />
      ) : (
        <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
          <div className="flex flex-col gap-16">
            {cs.sections.map((s, i) => (
              <CaseSection key={s.heading} section={s} reverse={i % 2 === 1} />
            ))}
          </div>
          {cs.reflection && (
            <div className="mt-16">
              <CaseReflection text={cs.reflection} />
            </div>
          )}
        </div>
      )}

      {project.todo && project.todo.length > 0 && (
        <div className="mx-auto max-w-3xl px-5 pb-20 sm:px-8">
          <Reveal className="border-t border-dashed border-mg-line pt-6">
            <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">
              Open items before this goes fully live
            </p>
            <ul className="mt-2 flex flex-col gap-1 font-marginalia-sans text-[12.5px] text-mg-ink-faint">
              {project.todo.map((t) => (
                <li key={t}>&mdash; {t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      )}
    </article>
  );
}
