import type { Metadata } from "next";
import { getArchive } from "@/data/projects";
import { IndexRow } from "@/components/index-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  const items = getArchive();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Archive</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          College work, early experiments, and things worth keeping.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-fg-muted">
          Not lesser work — earlier work. Kept here to show range and progression rather than compete
          for space with current product work.
        </p>
      </Reveal>

      <div className="mt-12">
        {items.map((p) => (
          <IndexRow key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
