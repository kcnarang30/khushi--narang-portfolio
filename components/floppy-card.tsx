"use client";

import Link from "next/link";
import { Project } from "@/data/types";
import { cn } from "@/lib/utils";

const palette = ["var(--floppy-1)", "var(--floppy-2)", "var(--floppy-3)", "var(--floppy-4)"];

export function FloppyCard({ project, index }: { project: Project; index: number }) {
  const color = palette[index % palette.length];
  const isExternal = Boolean(project.liveUrl);

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    project.caseStudy ? (
      <Link href={`/work/${project.slug}`} className="focus-ring group block rounded-sm">
        {children}
      </Link>
    ) : (
      <div className="group block rounded-sm">{children}</div>
    );

  return (
    <Wrapper>
      <div
        className="relative flex aspect-[1/1] flex-col justify-between rounded-[3px] p-3.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:-translate-y-1"
        style={{ background: color }}
      >
        <div className="h-2.5 w-9 rounded-b-[2px] bg-black/25" />
        <div className="rounded-sm bg-[#f4f1ea] p-2.5 shadow-sm">
          <p className="font-mono text-[9px] uppercase tracking-wide text-black/50">
            {project.category.replace("-", " ")}
          </p>
          <p className="mt-0.5 font-display text-[13px] font-bold leading-tight text-black">
            {project.name}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-widest text-black/60">
            {project.organisation ?? project.origin}
          </span>
          {project.live && <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />}
        </div>
      </div>
      <div className="mt-2.5 flex items-start justify-between gap-2">
        <p className="text-[13px] leading-snug text-fg-muted">{project.oneLiner}</p>
      </div>
      {isExternal && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "focus-ring mt-1.5 inline-block rounded font-mono text-[10px] uppercase tracking-wide text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          Visit site ↗
        </a>
      )}
    </Wrapper>
  );
}
