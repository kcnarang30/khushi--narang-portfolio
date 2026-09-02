import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getBySlug } from "@/data/projects";
import { CaseHeader } from "@/components/marginalia/case-header";
import { CaseSection } from "@/components/marginalia/case-section";
import { CaseReflection } from "@/components/marginalia/case-reflection";
import { CityChain, TechSparksStatRow } from "@/components/marginalia/case-extras";
import { NextCaseFile } from "@/components/marginalia/next-case-file";
import { ShuruKarDossier } from "@/components/shurukar-dossier";
import { TechSparksExhibit } from "@/components/techsparks-exhibit";
import { DevSparksExhibit } from "@/components/devsparks-exhibit";

const caseFileOrder = projects.filter((p) => p.caseStudy).sort((a, b) => a.order - b.order);

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
  const currentIndex = caseFileOrder.findIndex((p) => p.slug === project.slug);
  const next = caseFileOrder[(currentIndex + 1) % caseFileOrder.length];

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

      {next && next.slug !== project.slug && <NextCaseFile project={next} />}
    </article>
  );
}
