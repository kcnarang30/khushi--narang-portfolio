import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ArchiveExplorer } from "@/components/archive-explorer";
import { PaperClip } from "@/components/paper-clip";
import { Stamp } from "@/components/stamp";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Archive" };

export default function ArchivePage() {
  return (
    <div>
      {/* A file drawer label pinned to the desk — the rest is a working tool, not a poster */}
      <section className="desk-environment relative overflow-hidden py-16 sm:py-20">
        <span className="desk-crosshair" style={{ top: 20, left: 20 }} aria-hidden />
        <span className="desk-crosshair" style={{ top: 20, right: 20 }} aria-hidden />
        <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal settle>
            <div className="grain-paper shadow-physical-lg relative inline-block bg-paper p-6 sm:p-9" style={{ transform: "rotate(-1deg)" }}>
              <PaperClip rotate={-13} className="-left-3 -top-4 h-10 w-10" />
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-bg/55">/khushi/archive</p>
              <h1 className="mt-2 max-w-xl font-poster uppercase leading-[0.88] text-bg [font-size:clamp(1.9rem,5.6vw,3.25rem)]">
                Every real project, filed by year.
              </h1>
              <p className="mt-4 max-w-md font-serif text-[14.5px] leading-relaxed text-bg/65">
                The complete index — current product work, event sites, college projects, and personal
                experiments, all in one place instead of scattered across pages.
              </p>
            </div>
            <Stamp tone="ember" rotate={-8} size="4.75rem" className="absolute -top-6 -right-2 sm:-right-6">
              {projects.length}
              <br />
              filed
            </Stamp>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <ArchiveExplorer />
      </div>
    </div>
  );
}
