"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/data/types";
import { revealImage } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { HandUnderline } from "./hand-underline";

/**
 * The real cover image, at its real aspect ratio — no forced crop, no card
 * frame. A drop-shadow follows the actual artwork instead of a box-shadow
 * sitting around a container, so what you see is the artifact itself, not
 * a rectangle standing in for one.
 *
 * A tall/narrow real screenshot (a phone flow, a portrait poster) gets
 * capped by height rather than stretched to full container width — which
 * leaves real width unclaimed beside it. Rather than let that sit empty,
 * a portrait hero pairs the image with its caption beside it, the way the
 * homepage's feature rows do; a wide hero (already fills the width) keeps
 * its caption below.
 *
 * Only projects with a real case-study page link internally — the rest
 * (spotlight-only work) point straight at the live site.
 *
 * `size="hero"` gives a case-file project its own full moment — one project
 * at a time, at real scale, the way a single artifact gets a whole gallery
 * wall rather than a shelf slot. `size="compact"` is the honest quieter
 * treatment for spotlight-only work (no case study behind it).
 */
export function WorkCard({ project, index, size = "hero" }: { project: Project; index: number; size?: "hero" | "compact" }) {
  const reduce = useReducedMotion();
  const [shift, setShift] = useState({ x: 0, y: 0 });
  if (!project.coverImageSrc || !project.coverImageWidth || !project.coverImageHeight) return null;

  const href = project.caseStudy ? `/work/${project.slug}` : project.liveUrl;
  const external = !project.caseStudy;
  const compact = size === "compact";

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (compact || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setShift({ x: px * -8, y: py * -6 });
  }

  // Real aspect ratio, capped by height so a tall/narrow real screenshot
  // can't stretch to full container width and blow up into a
  // multi-viewport-tall column — bounded by whichever of width or height
  // binds first, same as a photo fit inside a mat.
  const ratio = project.coverImageWidth / project.coverImageHeight;
  const capHeight = compact ? 260 : 620;
  const capWidth = Math.round(capHeight * ratio);
  const portraitHero = !compact && ratio < 0.85;

  const image = (
    <motion.div
      whileHover={reduce ? undefined : { y: compact ? -2 : -4 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={() => setShift({ x: 0, y: 0 })}
      className="shrink-0"
    >
      <Image
        src={project.coverImageSrc}
        alt={project.name}
        width={project.coverImageWidth}
        height={project.coverImageHeight}
        priority={index < 3}
        loading={index < 3 ? undefined : "lazy"}
        sizes={compact ? "(min-width: 640px) 30vw, 45vw" : "(min-width: 1024px) 860px, 92vw"}
        style={{
          width: `min(100%, ${capWidth}px)`,
          height: "auto",
          filter: compact ? "drop-shadow(0 8px 16px rgba(36,31,24,0.2))" : "drop-shadow(0 24px 40px rgba(36,31,24,0.3))",
          transform: compact ? undefined : `translate(${shift.x}px, ${shift.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />
    </motion.div>
  );

  const caption = (
    <div className={cn("relative overflow-hidden", portraitHero ? "max-w-xs" : "mt-3")}>
      <span className={`relative inline-block font-marginalia-serif text-mg-ink ${compact ? "text-[14px]" : portraitHero ? "text-[26px] leading-[1.15]" : "text-[21px]"}`}>
        {project.name}
        <HandUnderline />
      </span>
      <p className={`font-marginalia-sans text-mg-ink-faint ${compact ? "text-[11.5px]" : "mt-1 text-[12.5px] uppercase tracking-wide"}`}>
        {compact ? (project.organisation ?? project.origin) : `${project.category.replace("-", " ")} · ${project.status}`}
        {project.year ? ` · ${project.year}` : ""}
      </p>
      {portraitHero && (
        <p className="mt-3 font-marginalia-sans text-[14.5px] leading-relaxed text-mg-ink-muted">{project.oneLiner}</p>
      )}
    </div>
  );

  const inner = portraitHero ? (
    <div className="flex flex-col items-start gap-8 sm:flex-row sm:gap-10">
      {image}
      <div className="sm:pt-4">{caption}</div>
    </div>
  ) : (
    <>
      {image}
      {caption}
    </>
  );

  return (
    <motion.div {...(reduce ? {} : revealImage((index % 6) * 0.05))}>
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="focus-ring group block">
            {inner}
          </a>
        ) : (
          <Link href={href} className="focus-ring group block">
            {inner}
          </Link>
        )
      ) : (
        <div className="group block">{inner}</div>
      )}
    </motion.div>
  );
}
