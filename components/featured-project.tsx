"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/data/types";
import { StatusBadge } from "./status-badge";
import { PaperClip } from "./paper-clip";
import { Tape } from "./tape";
import { Receipt } from "./receipt";
import { TiltSurface } from "./tilt-surface";

/**
 * Each featured project as a physical artifact pinned to the desk, not a
 * website card — a different real object per project (pinned document,
 * printed webpage, photograph), matching what real material exists for
 * each. Real screenshots stay flat inside their frame; only the frame
 * itself tilts, and it tilts on real cursor position via TiltSurface, not
 * a flat CSS hover lift.
 */

const REAL_IMAGES: Record<string, { src: string; width: number; height: number }> = {
  shurukar: { src: "/projects/shurukar/shurukar-resources.png", width: 975, height: 425 },
  devsparks: { src: "/projects/devsparks/devsparks-cover-v2.png", width: 265, height: 429 },
  techsparks: { src: "/projects/techsparks/techsparks-hero.png", width: 400, height: 640 },
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function FeaturedProject({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const motionProps = reduce ? {} : fadeUp;
  const img = REAL_IMAGES[project.slug];

  if (project.slug === "shurukar") {
    return (
      <motion.div {...motionProps} className="relative">
        <Link href={`/work/${project.slug}`} className="focus-ring group block">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
            <div className="relative md:col-span-6">
              <TiltSurface rest={-1.4} intensity={9} lift={-8}>
                <div className="grain-paper shadow-physical relative bg-paper p-4">
                  <PaperClip rotate={-14} className="-left-3 -top-4 h-10 w-10" />
                  <p className="font-mono text-[9.5px] uppercase tracking-widest text-bg/50">
                    shurukar.in — beta build
                  </p>
                  {img && (
                    <div className="mt-2 overflow-hidden border border-bg/15">
                      <Image
                        src={img.src}
                        width={img.width}
                        height={img.height}
                        alt={project.name}
                        className="h-auto w-full"
                      />
                    </div>
                  )}
                </div>
              </TiltSurface>
            </div>
            <div className="md:col-span-6 md:pt-4">
              <StatusBadge status={project.status} />
              <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">{project.name}</h3>
              <p className="mt-4 max-w-sm font-serif text-[15px] leading-relaxed text-fg-muted">{project.oneLiner}</p>
              <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
                View case study
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (project.slug === "techsparks") {
    return (
      <motion.div {...motionProps} className="relative">
        <Link href={`/work/${project.slug}`} className="focus-ring group grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          <div className="order-2 md:order-1 md:col-span-6 md:pt-4">
            <StatusBadge status={project.status} />
            <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">{project.name}</h3>
            <p className="mt-3 max-w-sm font-serif text-[15px] leading-relaxed text-fg-muted">{project.oneLiner}</p>
            <Receipt rotate={-1.5} className="mt-6 max-w-[15rem]">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { n: "10,000+", label: "attendees" },
                  { n: "500+", label: "speakers" },
                  { n: "300+", label: "investors" },
                  { n: "200+", label: "startups" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-lg font-extrabold leading-none">{s.n}</p>
                    <p className="mt-0.5 font-mono text-[8.5px] uppercase tracking-wide text-bg/55">{s.label}</p>
                  </div>
                ))}
              </div>
            </Receipt>
            <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
              View case study
            </span>
          </div>
          <div className="order-1 md:order-2 md:col-span-6">
            <TiltSurface rest={1.1} intensity={9} lift={-8}>
              {/* printed webpage — taped flat, not a floating device mockup */}
              <div className="relative bg-white p-2 pt-6 shadow-[0_36px_64px_-24px_rgba(0,0,0,0.6)]">
                <Tape rotate={-3} className="-top-2.5 left-8 w-16" />
                <Tape rotate={3} className="-top-2.5 right-8 w-16" />
                {img && (
                  <Image
                    src={img.src}
                    width={img.width}
                    height={img.height}
                    alt={project.name}
                    className="h-auto w-full"
                  />
                )}
                <p className="mt-1.5 px-1 pb-1 text-center font-mono text-[8px] uppercase tracking-widest text-bg/45">
                  techsparks.yourstory.com/2026
                </p>
              </div>
            </TiltSurface>
          </div>
        </Link>
      </motion.div>
    );
  }

  // devsparks — and the fallback shape for any future featured project
  return (
    <motion.div {...motionProps} className="relative overflow-visible">
      <Link href={`/work/${project.slug}`} className="focus-ring group grid grid-cols-1 items-start gap-10 md:grid-cols-12">
        <div className="order-2 md:order-1 md:col-span-7 md:pt-4">
          <StatusBadge status={project.status} />
          <h3 className="mt-4 font-display text-3xl font-bold leading-[1.05] sm:text-4xl">{project.name}</h3>
          <p className="mt-4 max-w-sm font-serif text-[15px] leading-relaxed text-fg-muted">{project.oneLiner}</p>
          <span className="mt-6 inline-block font-mono text-[11px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
            View case study
          </span>
        </div>
        <div className="order-1 flex justify-center md:order-2 md:col-span-5 md:justify-end">
          <TiltSurface rest={-2.5} intensity={9} lift={-8} className="w-full max-w-[13rem]">
            {/* photograph — white border, rotated, pinned */}
            <div className="relative w-full bg-white p-2 pb-6 shadow-[0_30px_54px_-20px_rgba(0,0,0,0.55)]">
              <PaperClip rotate={12} className="-right-3 -top-4 h-9 w-9" />
              {img && (
                <Image
                  src={img.src}
                  width={img.width}
                  height={img.height}
                  alt={project.name}
                  className="h-auto w-full"
                />
              )}
              <p className="mt-2 text-center font-pen text-sm leading-none text-bg/60">6 cities, one system</p>
            </div>
          </TiltSurface>
        </div>
      </Link>
    </motion.div>
  );
}
