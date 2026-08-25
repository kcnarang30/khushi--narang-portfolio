import type { Metadata } from "next";
import Link from "next/link";
import { getArchive } from "@/data/projects";
import { IndexRow } from "@/components/index-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Archive" };

const FOLDER_LABELS: Record<string, string> = {
  editorial: "Editorial",
  branding: "Branding",
  "ai-tool": "Experiments",
  presentation: "Presentations",
  writing: "Writing",
  poster: "Posters",
  web: "Web",
};

export default function ArchivePage() {
  const items = getArchive();

  const folders = new Map<string, typeof items>();
  for (const item of items) {
    const key = FOLDER_LABELS[item.category] ?? item.category;
    if (!folders.has(key)) folders.set(key, []);
    folders.get(key)!.push(item);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">/khushi/archive</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          College work, early experiments, and things worth keeping.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-fg-muted">
          Not lesser work — earlier work. Kept here to show range and progression rather than compete
          for space with current product work.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-12">
        {Array.from(folders.entries()).map(([folder, folderItems], i) => (
          <Reveal key={folder} delay={i * 0.04}>
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">
              <span aria-hidden className="text-accent">▸ </span>
              {folder}/
              <span className="ml-2 text-fg-dim/60">{folderItems.length} {folderItems.length === 1 ? "item" : "items"}</span>
            </p>
            <div className="mt-3">
              {folderItems.map((p) => (
                <IndexRow key={p.slug} project={p} />
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-16 border-t border-line pt-8">
          <Link
            href="/certificates"
            className="focus-ring inline-flex items-center gap-1.5 rounded font-mono text-[11px] uppercase tracking-widest text-fg-muted hover:text-accent"
          >
            <span aria-hidden className="text-fg-dim">▸ </span>
            certificates/
            <span aria-hidden>→</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
