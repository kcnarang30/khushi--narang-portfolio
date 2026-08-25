"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Project } from "@/data/types";
import { cn } from "@/lib/utils";

const palette = ["var(--floppy-1)", "var(--floppy-2)", "var(--floppy-3)", "var(--floppy-4)"];
const baseRotate = [-3, 2, -1.5, 3, -2, 1.5];

export function FloppyCard({ project, index }: { project: Project; index: number }) {
  const color = palette[index % palette.length];
  const rest = baseRotate[index % baseRotate.length];
  const isExternal = Boolean(project.liveUrl);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const lift = useSpring(useMotionValue(0), { stiffness: 300, damping: 22 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const px = (e.clientX - bounds.left) / bounds.width - 0.5;
    const py = (e.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(px * 16);
    rotateX.set(py * -16);
    lift.set(-6);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  const content = (
    <>
      <div style={{ perspective: 700 }}>
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          initial={false}
          animate={reduce ? undefined : { rotate: rest }}
          style={reduce ? undefined : { rotateX, rotateY, y: lift, transformStyle: "preserve-3d" }}
          className="relative flex aspect-[1/1] flex-col justify-between rounded-[3px] p-3.5 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.25)]"
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-[3px]"
            style={{ background: color }}
          />
          <div className="relative h-2.5 w-9 rounded-b-[2px] bg-black/25" />
          <div className="relative rounded-sm bg-[#f4f1ea] p-2.5 shadow-sm">
            <p className="font-mono text-[9px] uppercase tracking-wide text-black/50">
              {project.category.replace("-", " ")}
            </p>
            <p className="mt-0.5 font-body text-[12.5px] font-semibold leading-tight text-black">
              {project.name}
            </p>
          </div>
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest text-black/60">
              {project.organisation ?? project.origin}
            </span>
            {project.live && <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden />}
          </div>
        </motion.div>
      </div>
      <div className="mt-2.5 flex items-start justify-between gap-2">
        <p className="text-[13px] leading-snug text-fg-muted">{project.oneLiner}</p>
      </div>
      {isExternal && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "focus-ring mt-1.5 inline-block rounded font-mono text-[10px] uppercase tracking-wide text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          Visit site ↗
        </a>
      )}
    </>
  );

  return project.caseStudy ? (
    <Link href={`/work/${project.slug}`} className="focus-ring group block rounded-sm">
      {content}
    </Link>
  ) : (
    <div className="group block rounded-sm">{content}</div>
  );
}
