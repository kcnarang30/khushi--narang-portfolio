import type { Metadata } from "next";
import Link from "next/link";
import { getFeatured, getSpotlight, getPlayground, getArchive } from "@/data/projects";
import { FeaturedProject } from "@/components/featured-project";
import { FloppyCard } from "@/components/floppy-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  const featured = getFeatured();
  const spotlight = getSpotlight();
  const playground = getPlayground();
  const archive = getArchive();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Work</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          Featured case studies, and the spotlight work sitting right behind them.
        </h1>
      </Reveal>

      {/* FEATURED */}
      <div className="mt-20 flex flex-col gap-24 sm:gap-32">
        {featured.map((p) => (
          <FeaturedProject key={p.slug} project={p} />
        ))}
      </div>

      {/* SPOTLIGHT */}
      <div className="mt-28">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Spotlight</p>
          <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
            Strong work that didn&rsquo;t need a full case study
          </h2>
          <p className="mt-2 max-w-lg text-sm text-fg-muted">
            A name, a role, a visual, a reason it matters.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-4">
          {spotlight.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.05}>
              <FloppyCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* PLAYGROUND + ARCHIVE — teasers, not duplicate grids */}
      <div className="mt-28 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Reveal>
          <Link
            href="/playground"
            className="focus-ring group block h-full rounded-md border border-line p-8 transition-colors hover:border-line-strong"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">
              {String(playground.length).padStart(2, "0")} things
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold">Playground</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
              Posters, branding explorations, and ideas that only needed to exist — no case study required.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent">
              Open the drawer
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <Link
            href="/archive"
            className="focus-ring group block h-full rounded-md border border-line p-8 transition-colors hover:border-line-strong"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">
              {String(archive.length).padStart(2, "0")} things
            </p>
            <h3 className="mt-3 font-display text-3xl font-bold">Archive</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">
              College work and earlier experiments — kept to show range, not competing with current work.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent">
              /KHUSHI/ARCHIVE
              <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
