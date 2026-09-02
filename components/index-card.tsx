"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/types";
import { Stamp } from "./marginalia/stamp";
import { HandUnderline } from "./marginalia/hand-underline";

const PREVIEW_WIDTH = 220;

/**
 * A row in the Archive's year-folder list. Case studies link internally;
 * projects with no internal page but a real live site link out to it;
 * anything with neither stays a plain, honest, non-interactive row. A real
 * cover image gets a hover preview regardless of which of those three the
 * row is — a case-study project with real artwork shouldn't hide it just
 * because it also happens to link somewhere.
 */
export function IndexRow({ project }: { project: Project }) {
  const [preview, setPreview] = useState<{ top: number; left: number } | null>(null);

  const inner = (
    <>
      <span className="w-14 shrink-0 border-r border-mg-line pr-2 text-right font-marginalia-sans text-[11.5px] tabular-nums text-mg-ink-faint">
        {project.year ?? "—"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="group relative inline-block truncate font-marginalia-serif text-[18px] text-mg-ink">
          {project.name}
          <HandUnderline />
        </span>
        <span className="mt-0.5 block truncate font-marginalia-sans text-[12.5px] text-mg-ink-faint">{project.oneLiner}</span>
      </span>
      <span className="hidden shrink-0 font-marginalia-sans text-[11.5px] text-mg-ink-faint sm:block">
        {project.category.replace("-", " ")}
      </span>
      <Stamp status={project.status} size="sm" className="hidden shrink-0 sm:inline-flex" />
    </>
  );

  const rowClass =
    "group relative flex items-center gap-4 border-b border-mg-line py-4 px-2 -mx-2 rounded-[1px] transition-colors hover:bg-mg-bg";

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

  const previewHandlers = project.coverImageSrc
    ? {
        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => showPreview(e.currentTarget),
        onMouseLeave: () => setPreview(null),
        onFocus: (e: React.FocusEvent<HTMLElement>) => showPreview(e.currentTarget),
        onBlur: () => setPreview(null),
      }
    : {};

  const previewOverlay = project.coverImageSrc && preview && typeof document !== "undefined"
    ? createPortal(
        <div
          aria-hidden
          className="pointer-events-none fixed z-[150] hidden -translate-y-1/2 flex-col overflow-hidden rounded-[1px] border-4 border-white bg-white shadow-[0_24px_48px_-16px_rgba(36,31,24,0.5)] sm:flex"
          style={{ top: preview.top, left: preview.left, width: PREVIEW_WIDTH }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-mg-bg-raised">
            <Image src={project.coverImageSrc} alt={project.name} fill sizes={`${PREVIEW_WIDTH}px`} className="object-cover" />
          </div>
          <p className="px-2 py-1.5 text-center font-marginalia-sans text-[10.5px] uppercase tracking-wide text-mg-ink/60">
            {project.name}
          </p>
        </div>,
        document.body
      )
    : null;

  if (project.caseStudy) {
    return (
      <Link href={`/work/${project.slug}`} className={`focus-ring ${rowClass}`} {...previewHandlers}>
        {inner}
        {previewOverlay}
      </Link>
    );
  }

  if (project.liveUrl) {
    return (
      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={`focus-ring ${rowClass}`} {...previewHandlers}>
        {inner}
        {previewOverlay}
      </a>
    );
  }

  if (project.coverImageSrc) {
    return (
      <div className={rowClass} tabIndex={0} {...previewHandlers}>
        {inner}
        {previewOverlay}
      </div>
    );
  }

  return <div className={rowClass}>{inner}</div>;
}
