"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/data/types";
import { StatusBadge } from "./status-badge";
import { ImagePlaceholder } from "./image-placeholder";
import { WindowFrame } from "./window-frame";

export type FeaturedVariant = "type-dominant" | "full-bleed" | "split-float";

export function FeaturedProject({
  project,
  variant,
}: {
  project: Project;
  variant: FeaturedVariant;
}) {
  const reduce = useReducedMotion();
  const fadeUp = {
    initial: reduce ? undefined : { opacity: 0, y: 24 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };

  if (variant === "type-dominant") {
    return (
      <motion.div {...fadeUp} className="relative">
        <Link href={`/work/${project.slug}`} className="focus-ring group block">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[16vw] font-bold leading-none tracking-tighter text-fg opacity-[0.05] sm:-top-16 sm:text-[9rem]"
          >
            {project.name}
          </span>
          <div className="relative grid grid-cols-1 items-end gap-8 pt-16 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5 md:pb-6">
              <div className="flex items-center gap-3">
                <StatusBadge status={project.status} />
                {project.organisation && (
                  <span className="font-mono text-[11px] text-fg-dim">{project.organisation}</span>
                )}
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">
                {project.name}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{project.oneLiner}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent">
                View case study
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
            <div className="md:col-span-7 md:translate-x-6">
              <WindowFrame
                label={project.slug}
                className="rotate-[-1.5deg] transition-transform duration-500 group-hover:rotate-0 group-hover:scale-[1.01]"
              >
                <ImagePlaceholder label={project.coverAssetRef ?? "cover pending"} aspect="aspect-[16/10]" className="rounded-none border-0" />
              </WindowFrame>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "full-bleed") {
    return (
      <motion.div {...fadeUp} className="relative">
        <Link href={`/work/${project.slug}`} className="focus-ring group block">
          <WindowFrame label={project.slug} className="transition-transform duration-500 group-hover:scale-[1.008]">
            <div className="relative">
              <ImagePlaceholder label={project.coverAssetRef ?? "cover pending"} aspect="aspect-[21/9]" className="rounded-none border-0" />
              <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-5 sm:p-7">
                <div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={project.status} className="border-white/30 text-white" />
                    {project.year && <span className="font-mono text-[11px] text-white/60">{project.year}</span>}
                  </div>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
                    {project.name}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent">
                  View case study
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </div>
          </WindowFrame>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-fg-muted">{project.oneLiner}</p>
        </Link>
      </motion.div>
    );
  }

  // split-float
  return (
    <motion.div {...fadeUp} className="relative overflow-visible">
      <Link href={`/work/${project.slug}`} className="focus-ring group grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="order-2 md:order-1 md:col-span-5">
          <StatusBadge status={project.status} />
          <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">{project.name}</h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">{project.oneLiner}</p>
          {project.tags && (
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-fg-dim">
              {project.tags.slice(0, 4).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent">
            View case study
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
        <div className="order-1 md:order-2 md:col-span-7 md:-mr-10 lg:-mr-16">
          <WindowFrame
            label={project.slug}
            className="rotate-[1.5deg] transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-1"
          >
            <ImagePlaceholder label={project.coverAssetRef ?? "cover pending"} aspect="aspect-[16/11]" className="rounded-none border-0" />
          </WindowFrame>
        </div>
      </Link>
    </motion.div>
  );
}
