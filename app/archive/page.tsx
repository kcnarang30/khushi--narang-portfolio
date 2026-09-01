import type { Metadata } from "next";
import { ArchiveExplorer } from "@/components/archive-explorer";
import { Reveal } from "@/components/marginalia/reveal";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <div className="bg-mg-bg">
      <div className="mx-auto max-w-4xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
        <Reveal className="flex items-start justify-between gap-6">
          <div>
            <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">/khushi/archive</p>
            <h1 className="mt-2 max-w-lg font-marginalia-serif text-[32px] leading-tight text-mg-ink sm:text-[38px]">
              Every real project, filed by year.
            </h1>
            <p className="mt-4 max-w-md font-marginalia-sans text-[14.5px] leading-relaxed text-mg-ink-muted">
              The complete index &mdash; current product work, event sites, college projects, and personal
              experiments, all in one place instead of scattered across pages.
            </p>
          </div>
          <span className="mt-1 inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-mg-accent px-3 py-1.5 font-marginalia-sans text-[11.5px] font-semibold uppercase text-mg-accent" style={{ transform: "rotate(4deg)" }}>
            {projects.length} filed
          </span>
        </Reveal>
      </div>

      <div className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <ArchiveExplorer />
      </div>
    </div>
  );
}
