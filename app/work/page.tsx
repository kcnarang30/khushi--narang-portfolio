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
    <div>
      <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
        <Reveal>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg-dim">
            <span className="rounded-sm border border-line px-1.5 py-0.5">/work</span>
            <span>Case files</span>
          </div>
          <h1 className="mt-3 max-w-2xl font-display font-bold leading-[0.98] tracking-tight text-fg [font-size:clamp(2.25rem,6.5vw,4.25rem)]">
            Featured case studies, and the spotlight work sitting right behind them.
          </h1>
        </Reveal>
      </div>

      {/* FEATURED — an archive drawer on the desk */}
      <div className="desk-environment relative mt-16 overflow-hidden py-16 sm:py-24">
        <span className="desk-crosshair" style={{ top: 20, left: 20 }} aria-hidden />
        <span className="desk-crosshair" style={{ top: 20, right: 20 }} aria-hidden />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-24 px-5 sm:gap-32 sm:px-8">
          {featured.map((p, i) => (
            <div key={p.slug} className={i % 2 === 1 ? "sm:ml-10" : ""}>
              <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-muted">
                <span className="tnum text-accent">{String(i + 1).padStart(2, "0")}</span>
                {" / "}
                {p.category.replace("-", " ")}
                {p.year ? ` · ${p.year}` : ""}
              </p>
              <FeaturedProject project={p} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-24">
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
    </div>
  );
}
