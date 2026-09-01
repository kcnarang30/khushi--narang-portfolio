"use client";

import Link from "next/link";
import { Project } from "@/data/types";
import { HandUnderline } from "./hand-underline";
import { EditorialImage } from "./editorial-image";
import { Reveal } from "./reveal";

type Variant = "image-left" | "image-right" | "inset";

/**
 * Three genuinely different shapes for the three featured projects — not
 * one template reused three times. Each pairs an image column and a text
 * column at different proportions and vertical offsets, the way a real
 * magazine spread varies from page to page.
 */
export function FeatureRow({ project, variant }: { project: Project; variant: Variant }) {
  if (!project.coverImageSrc) return null;

  const image = (
    <Link href={`/work/${project.slug}`} className="focus-ring block">
      <EditorialImage
        src={project.coverImageSrc}
        alt={project.name}
        sizes="(min-width: 1024px) 62vw, 100vw"
        aspect="aspect-[4/3]"
      />
    </Link>
  );

  const text = (delay: number) => (
    <Reveal delay={delay}>
      <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">
        {project.organisation ?? project.origin} &middot; {project.status}
        {project.year ? ` ${project.year}` : ""}
      </p>
      <Link href={`/work/${project.slug}`} className="focus-ring group mt-3 inline-block">
        <span className="relative font-marginalia-serif text-[26px] leading-[1.1] text-mg-ink sm:text-[30px]">
          {project.name}
          <HandUnderline />
        </span>
      </Link>
      <p className="mt-3 max-w-sm font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted">
        {project.oneLiner}
      </p>
    </Reveal>
  );

  if (variant === "image-left") {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">{image}</div>
        <div className="lg:col-span-4 lg:pt-14">{text(0.15)}</div>
      </div>
    );
  }

  if (variant === "image-right") {
    return (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="order-2 lg:order-1 lg:col-span-4 lg:pt-6">{text(0.15)}</div>
        <div className="order-1 lg:order-2 lg:col-span-8">{image}</div>
      </div>
    );
  }

  // inset — smaller, breathing room on both sides; the "quiet" beat
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-3 lg:pt-2">{text(0.15)}</div>
      <div className="lg:col-span-7 lg:col-start-6">{image}</div>
    </div>
  );
}
