import Link from "next/link";
import { Project } from "@/data/types";
import { StatusBadge } from "./status-badge";
import { ImagePlaceholder } from "./image-placeholder";
import { Reveal } from "./reveal";

export function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <Reveal>
      <Link
        href={`/work/${project.slug}`}
        className="focus-ring group grid grid-cols-1 gap-6 rounded-md border border-line bg-bg-raised p-5 transition-colors hover:border-line-strong md:grid-cols-5 md:gap-10 md:p-8"
      >
        <div className={`md:col-span-3 ${flip ? "md:order-2" : ""}`}>
          <ImagePlaceholder
            label={project.coverAssetRef ?? "cover pending"}
            aspect="aspect-[16/10]"
            className="transition-transform duration-500 group-hover:scale-[1.015]"
          />
        </div>
        <div className={`flex flex-col justify-center md:col-span-2 ${flip ? "md:order-1" : ""}`}>
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-[11px] text-fg-dim">{String(index + 1).padStart(2, "0")}</span>
            <StatusBadge status={project.status} />
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{project.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-muted">{project.oneLiner}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags?.slice(0, 3).map((t) => (
              <span key={t} className="rounded-sm border border-line-strong px-2 py-0.5 font-mono text-[10px] text-fg-dim">
                {t}
              </span>
            ))}
          </div>
          <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-accent">
            View case study <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
