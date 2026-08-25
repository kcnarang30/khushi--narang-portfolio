"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/data/types";
import { ImagePlaceholder } from "./image-placeholder";
import { StatusBadge } from "./status-badge";
import { Marginalia } from "./marginalia";

const REAL_IMAGES: Record<string, string> = {
  shurukar: "/projects/shurukar/shurukar-resources.png",
  devsparks: "/projects/devsparks/devsparks-cover-v2.png",
};

export function HeroCover({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);

  const shown = projects[active];

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        {/* Text column */}
        <div className="flex flex-col justify-center px-5 py-14 sm:px-8 sm:py-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            Product designer — Bengaluru
          </p>
          <h1 className="relative mt-4 font-display text-[15vw] font-extrabold uppercase leading-[0.86] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
            Turning messy
            <br />
            problems into
            <br />
            intuitive experiences.
            <Marginalia className="absolute left-0 top-full mt-1 text-sm normal-case sm:text-base" rotate={-3}>
              (obvious, in hindsight)
            </Marginalia>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-fg-muted">
            I like asking annoying questions until the problem starts making sense.
            Currently designing at YourStory — product work, event experiences, and
            the occasional AI tool that has no business being this fun to build.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
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
          </div>
        </div>

        {/* Cover image + interactive contents strip */}
        <div className="relative flex flex-col border-t border-line lg:border-l lg:border-t-0">
          <motion.div style={{ y: reduce ? 0 : imgY }} className="relative min-h-[20rem] flex-1 overflow-hidden bg-bg-raised sm:min-h-[26rem] lg:min-h-0">
            {projects.map((p, i) => (
              <div
                key={p.slug}
                className="absolute inset-0 transition-opacity duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
                style={{ opacity: i === active ? 1 : 0 }}
                aria-hidden={i !== active}
              >
                {REAL_IMAGES[p.slug] ? (
                  <Image
                    src={REAL_IMAGES[p.slug]}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                ) : (
                  <ImagePlaceholder
                    label={p.coverAssetRef ?? "cover pending"}
                    aspect="aspect-[4/3] lg:aspect-auto lg:h-full"
                    className="h-full rounded-none border-0"
                  />
                )}
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <StatusBadge status={shown.status} className="border-white/25 bg-black/40 text-white backdrop-blur-sm" />
            </div>
          </motion.div>

          <nav className="flex divide-x divide-line border-t border-line font-mono text-[11px] uppercase tracking-wide">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`focus-ring flex-1 px-3 py-3 text-center transition-colors ${
                  i === active ? "bg-bg-raised text-accent" : "text-fg-dim hover:text-fg-muted"
                }`}
              >
                <span className="tnum">P.0{i + 2}</span> {p.name.split(" ")[0]}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
