"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/types";
import { StatusBadge } from "./status-badge";

const PREVIEW_WIDTH = 240;

/**
 * A row in the Archive's year-folder list. Case studies link internally;
 * projects with no internal page but a real live site link out to it;
 * projects that are neither (pure graphic/archive pieces) show a hover
 * preview of their real cover image instead of being a dead row. Anything
 * with none of the three stays a plain, honest, non-interactive row.
 */
export function IndexRow({ project }: { project: Project }) {
  const [preview, setPreview] = useState<{ top: number; left: number } | null>(null);

  const inner = (
    <>
      <span className="w-14 shrink-0 font-mono text-[11px] text-fg-dim">
        {project.year ?? "—"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[15px] font-medium text-fg group-hover:text-accent">
          {project.name}
        </span>
        <span className="block truncate text-[12px] text-fg-dim">{project.oneLiner}</span>
      </span>
      <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-wide text-fg-dim sm:block">
        {project.category.replace("-", " ")}
      </span>
      <StatusBadge status={project.status} className="hidden shrink-0 sm:inline-flex" />
    </>
  );

  const rowClass =
    "group flex items-center gap-4 border-b border-line py-3.5 transition-colors hover:bg-bg-raised/60 px-2 -mx-2 rounded-sm";

  if (project.caseStudy) {
    return (
      <Link href={`/work/${project.slug}`} className={`focus-ring ${rowClass}`}>
        {inner}
      </Link>
    );
  }

  if (project.liveUrl) {
    return (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`focus-ring ${rowClass}`}>
        {inner}
      </a>
    );
  }

  if (project.coverImageSrc) {
    const showPreview = (target: HTMLElement) => {
      const rect = target.getBoundingClientRect();
      const gap = 20;
      const spaceLeft = rect.left;
      const left =
        spaceLeft > PREVIEW_WIDTH + gap + 20
          ? rect.left - PREVIEW_WIDTH - gap
          : Math.max(20, rect.left + rect.width / 2 - PREVIEW_WIDTH / 2);
      setPreview({ top: rect.top + rect.height / 2, left });
    };

    return (
      <div
        className={rowClass}
        onMouseEnter={(e) => showPreview(e.currentTarget)}
        onMouseLeave={() => setPreview(null)}
        onFocus={(e) => showPreview(e.currentTarget)}
        onBlur={() => setPreview(null)}
        tabIndex={0}
      >
        {inner}
        {preview &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              aria-hidden
              className="pointer-events-none fixed z-[150] hidden -translate-y-1/2 flex-col overflow-hidden rounded-sm border-4 border-white bg-white shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)] sm:flex"
              style={{ top: preview.top, left: preview.left, width: PREVIEW_WIDTH }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-raised">
                <Image src={project.coverImageSrc} alt={project.name} fill sizes={`${PREVIEW_WIDTH}px`} className="object-cover" />
              </div>
              <p className="px-2 py-1.5 text-center font-mono text-[10px] uppercase tracking-wide text-bg/60">
                {project.name}
              </p>
            </div>,
            document.body
          )}
      </div>
    );
  }

  return <div className={rowClass}>{inner}</div>;
}
