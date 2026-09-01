import type { Metadata } from "next";
import Link from "next/link";
import { getFeatured, getSpotlight, getPlayground, getArchive } from "@/data/projects";
import { WorkCard } from "@/components/marginalia/work-card";
import { HandUnderline } from "@/components/marginalia/hand-underline";
import { Reveal } from "@/components/marginalia/reveal";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  const browsable = [...getFeatured(), ...getSpotlight()];
  const withImages = browsable.filter((p) => p.coverImageSrc);
  const withoutImages = browsable.filter((p) => !p.coverImageSrc);
  const playground = getPlayground();
  const archive = getArchive();

  return (
    <div className="bg-mg-bg">
      <div className="mx-auto max-w-5xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">Work</p>
          <h1 className="mt-2 max-w-xl font-marginalia-serif text-[32px] leading-tight text-mg-ink sm:text-[40px]">
            Everything currently shipped, live, or in beta.
          </h1>
        </Reveal>
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-8 sm:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {withImages.map((p, i) => (
            <WorkCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        {withoutImages.length > 0 && (
          <Reveal className="mt-16 border-t border-mg-line pt-8">
            <p className="mb-4 font-marginalia-sans text-[12px] text-mg-ink-faint">Not yet photographed</p>
            <div className="flex flex-col">
              {withoutImages.map((p) => (
                <div key={p.slug} className="flex items-baseline justify-between gap-4 border-b border-mg-line py-3">
                  <span className="font-marginalia-sans text-[14.5px] text-mg-ink-muted">{p.name}</span>
                  <span className="font-marginalia-sans text-[12px] text-mg-ink-faint">{p.category.replace("-", " ")}</span>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-5 px-5 pb-24 sm:grid-cols-2 sm:px-8">
        <Reveal>
          <Link href="/playground" className="focus-ring group block h-full rounded-[1px] border border-mg-line p-8 transition-colors hover:border-mg-ink/25">
            <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">{String(playground.length).padStart(2, "0")} things</p>
            <span className="relative mt-3 inline-block font-marginalia-serif text-[24px] text-mg-ink">
              Playground
              <HandUnderline />
            </span>
            <p className="mt-3 max-w-xs font-marginalia-sans text-[14px] leading-relaxed text-mg-ink-muted">
              Posters, branding explorations, and ideas that only needed to exist &mdash; no case study required.
            </p>
          </Link>
        </Reveal>
        <Reveal delay={0.06}>
          <Link href="/archive" className="focus-ring group block h-full rounded-[1px] border border-mg-line p-8 transition-colors hover:border-mg-ink/25">
            <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">{String(archive.length).padStart(2, "0")} things</p>
            <span className="relative mt-3 inline-block font-marginalia-serif text-[24px] text-mg-ink">
              Archive
              <HandUnderline />
            </span>
            <p className="mt-3 max-w-xs font-marginalia-sans text-[14px] leading-relaxed text-mg-ink-muted">
              College work and earlier experiments &mdash; kept to show range, filed by year.
            </p>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
