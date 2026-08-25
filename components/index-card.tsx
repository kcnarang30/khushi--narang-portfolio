import Link from "next/link";
import { Project } from "@/data/types";
import { StatusBadge } from "./status-badge";

export function IndexRow({ project }: { project: Project }) {
  const inner = (
    <>
      <span className="w-14 shrink-0 font-mono text-[11px] text-fg-dim">
        {project.year ?? "—"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-display text-[15px] font-medium text-fg group-hover:text-accent">
          {project.name}
        </span>
        <span className="block truncate text-[12px] text-fg-dim">{project.oneLiner}</span>
      </span>
      <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-wide text-fg-dim sm:block">
        {project.category.replace("-", " ")}
      </span>
      <StatusBadge status={project.status} className="hidden shrink-0 sm:inline-flex" />
    </>
  );

  const rowClass =
    "group flex items-center gap-4 border-b border-line py-3.5 transition-colors hover:bg-bg-raised/60 px-2 -mx-2 rounded-sm";

  return project.caseStudy ? (
    <Link href={`/work/${project.slug}`} className={`focus-ring ${rowClass}`}>
      {inner}
    </Link>
  ) : (
    <div className={rowClass}>{inner}</div>
  );
}
