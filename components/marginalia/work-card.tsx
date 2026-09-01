"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/data/types";
import { revealImage } from "@/lib/motion";

/**
 * The Work index's own image treatment — deliberately different from the
 * homepage's frame-line hover: here the caption is hidden until hover,
 * revealed with a highlighter-style sweep, because this page's job is
 * browsing at speed, not lingering on three spreads. Same underlying
 * settle-in entrance as everywhere else.
 */
export function WorkCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  if (!project.coverImageSrc) return null;

  return (
    <motion.div {...(reduce ? {} : revealImage((index % 6) * 0.05))}>
      <Link href={`/work/${project.slug}`} className="focus-ring group block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-mg-bg-raised">
          <Image
            src={project.coverImageSrc}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="relative mt-3 overflow-hidden">
          <span
            className="absolute inset-y-0 left-0 -z-10 w-0 bg-mg-accent/15 transition-[width] duration-300 ease-out group-hover:w-full"
            aria-hidden
          />
          <p className="font-marginalia-serif text-[16px] text-mg-ink">{project.name}</p>
          <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">
            {project.category.replace("-", " ")}
            {project.year ? ` · ${project.year}` : ""}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
