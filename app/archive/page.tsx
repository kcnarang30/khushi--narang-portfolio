import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ArchiveExplorer } from "@/components/archive-explorer";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">/khushi/archive</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          Every real project, filed by year.
        </h1>
        <p className="mt-4 max-w-lg text-sm text-fg-muted">
          The complete index — current product work, event sites, college projects, and personal
          experiments, all in one place instead of scattered across pages.
        </p>
      </Reveal>

      <div className="mt-14">
        <ArchiveExplorer />
      </div>
    </div>
  );
}
