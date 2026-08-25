"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/data/types";
import { StatusBadge } from "./status-badge";
import { TechSparksStats } from "./techsparks-stats";

/**
 * Each featured project gets its own composition, driven by what real
 * material actually exists for it — not a shared template with a skin
 * swapped on. Add a project here only when it has something real to show.
 */

const REAL_IMAGES: Record<string, { src: string; width: number; height: number }> = {
  shurukar: { src: "/projects/shurukar/shurukar-resources.png", width: 975, height: 425 },
  devsparks: { src: "/projects/devsparks/devsparks-cover-v2.png", width: 265, height: 429 },
};

export function FeaturedProject({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const fadeUp = {
    initial: reduce ? undefined : { opacity: 0, y: 24 },
    whileInView: reduce ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  };
  const img = REAL_IMAGES[project.slug];

  if (project.slug === "shurukar") {
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
              <StatusBadge status={project.status} />
              <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">{project.name}</h3>
              <p className="mt-4 max-w-sm font-serif text-[15px] leading-relaxed text-fg-muted">{project.oneLiner}</p>
              <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
                View case study
              </span>
            </div>
            <div className="md:col-span-7">
              {img && (
                <Image
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={project.name}
                  className="h-auto w-full rounded-sm border border-line-strong transition-transform duration-500 group-hover:scale-[1.01]"
                />
              )}
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (project.slug === "techsparks") {
    return (
      <motion.div {...fadeUp} className="relative">
        <Link href={`/work/${project.slug}`} className="focus-ring group block">
          <StatusBadge status={project.status} />
          <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">{project.name}</h3>
          <p className="mt-3 max-w-lg font-serif text-[15px] leading-relaxed text-fg-muted">{project.oneLiner}</p>
          <TechSparksStats />
          <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
            View case study
          </span>
        </Link>
      </motion.div>
    );
  }

  // devsparks — and the fallback shape for any future featured project
  return (
    <motion.div {...fadeUp} className="relative overflow-visible">
      <Link href={`/work/${project.slug}`} className="focus-ring group grid grid-cols-1 items-center gap-10 md:grid-cols-12">
        <div className="order-2 md:order-1 md:col-span-5">
          <StatusBadge status={project.status} />
          <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">{project.name}</h3>
          <p className="mt-4 max-w-sm font-serif text-[15px] leading-relaxed text-fg-muted">{project.oneLiner}</p>
          <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
            View case study
          </span>
        </div>
        <div className="order-1 md:order-2 md:col-span-7">
          {img && (
            <Image
              src={img.src}
              width={img.width}
              height={img.height}
              alt={project.name}
              className="h-auto w-full rounded-sm border border-line-strong transition-transform duration-500 group-hover:-translate-y-1"
            />
          )}
        </div>
      </Link>
    </motion.div>
  );
}
