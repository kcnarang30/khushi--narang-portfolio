import type { Metadata } from "next";
import { getFeatured, getSpotlight, getLive } from "@/data/projects";
import { FeaturedCard } from "@/components/featured-card";
import { FloppyCard } from "@/components/floppy-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  const featured = getFeatured();
  const spotlight = getSpotlight();
  const live = getLive();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Work</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          Featured case studies, and the spotlight work sitting right behind them.
        </h1>
      </Reveal>

      <div className="mt-14 flex flex-col gap-6">
        {featured.map((p, i) => (
          <FeaturedCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      <div className="mt-20">
        <Reveal>
          <h2 className="font-display text-2xl font-bold">Spotlight</h2>
          <p className="mt-1 max-w-lg text-sm text-fg-muted">
            Strong work that doesn&rsquo;t need a full case study — a name, a role, a visual, a reason it matters.
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {spotlight.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.05}>
              <FloppyCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Reveal>
          <h2 className="font-display text-2xl font-bold">Live</h2>
          <p className="mt-1 max-w-lg text-sm text-fg-muted">
            Only projects with a confirmed public URL appear here.
          </p>
        </Reveal>
        <ul className="mt-6 divide-y divide-line border-t border-line">
          {live.map((p) => (
            <li key={p.slug} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <span className="font-display text-[15px] font-medium">{p.name}</span>
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded font-mono text-[11px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                Visit site ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
