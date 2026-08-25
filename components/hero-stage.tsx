"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/data/types";
import { StatusBadge } from "./status-badge";
import { ImagePlaceholder } from "./image-placeholder";
import { WindowFrame } from "./window-frame";
import { Handwritten } from "./handwritten";

export function HeroStage({ anchor, second }: { anchor: Project; second: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yFar = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const rotFar = useTransform(scrollYProgress, [0, 1], [-4, reduce ? -4 : -8]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-10 pt-16 sm:pb-32 sm:pt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[12px] uppercase tracking-[0.25em] text-fg-dim"
        >
          Product Designer — Bengaluru
        </motion.p>

        <div className="relative mt-5 max-w-3xl">
          <motion.h1
            initial={reduce ? undefined : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
          >
            Turning messy problems into{" "}
            <span className="relative inline-block">
              intuitive
              <Handwritten className="absolute -right-2 -top-6 text-lg sm:-top-8 sm:text-2xl" rotate={-6}>
                (obvious, actually)
              </Handwritten>
            </span>{" "}
            experiences.
          </motion.h1>
        </div>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative z-10 mt-7 max-w-xl text-[15px] leading-relaxed text-fg-muted"
        >
          I like asking annoying questions until the problem starts making sense.
          Currently designing at YourStory — product work, event experiences, and
          the occasional AI tool that has no business being this fun to build.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="relative z-10 mt-9 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/work"
            className="focus-ring rounded-sm bg-accent px-5 py-3 font-mono text-[12px] uppercase tracking-widest text-black transition-opacity hover:opacity-90"
          >
            See the work
          </Link>
          <Link
            href="/about"
            className="focus-ring rounded-sm border border-line-strong px-5 py-3 font-mono text-[12px] uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
          >
            About me
          </Link>
        </motion.div>

        {/* Compact inline object for mobile through small-laptop widths — the large
            bleeding-off-edge pieces only appear at xl, where there's guaranteed
            clearance from the headline. Below that, overlap would obscure text. */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 max-w-xs rotate-[-1.5deg] xl:hidden"
        >
          <Link href={`/work/${anchor.slug}`} className="focus-ring block">
            <WindowFrame label={anchor.slug}>
              <div className="relative">
                <ImagePlaceholder label={anchor.coverAssetRef ?? "cover pending"} aspect="aspect-[16/10]" className="rounded-none border-0" />
                <div className="absolute bottom-2 left-2">
                  <StatusBadge status={anchor.status} className="bg-bg/80 backdrop-blur-sm" />
                </div>
              </div>
            </WindowFrame>
          </Link>
        </motion.div>
      </div>

      {/* Floating object A — the anchor case study, bleeding off the right edge */}
      <motion.div
        style={{ y: yFar, rotate: rotFar }}
        initial={reduce ? undefined : { opacity: 0, x: 60, rotate: -2 }}
        animate={reduce ? undefined : { opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[-6rem] top-[6rem] hidden w-[26rem] xl:block"
      >
        <div className="pointer-events-auto">
          <Link href={`/work/${anchor.slug}`} className="focus-ring block rounded-md">
            <WindowFrame label={anchor.slug}>
              <div className="relative">
                <ImagePlaceholder label={anchor.coverAssetRef ?? "cover pending"} aspect="aspect-[16/10]" className="rounded-none border-0" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <StatusBadge status={anchor.status} className="bg-bg/80 backdrop-blur-sm" />
                </div>
              </div>
            </WindowFrame>
          </Link>
        </div>
      </motion.div>

      {/* Floating object B — a second project, catalogued like an index card */}
      <motion.div
        style={{ y: yNear }}
        initial={reduce ? undefined : { opacity: 0, y: 40, rotate: 6 }}
        animate={reduce ? undefined : { opacity: 1, y: 0, rotate: 4 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-[-3rem] left-[6rem] hidden w-56 rotate-[4deg] xl:block"
      >
        <div className="pointer-events-auto rounded-sm border border-line-strong bg-paper px-4 py-3 text-black shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]">
          <p className="font-mono text-[9px] uppercase tracking-widest text-black/50">{second.category.replace("-", " ")}</p>
          <p className="mt-1 font-display text-sm font-bold leading-tight">{second.name}</p>
          <p className="mt-1 font-mono text-[10px] text-black/50">{second.year ?? second.organisation}</p>
        </div>
      </motion.div>
    </section>
  );
}
