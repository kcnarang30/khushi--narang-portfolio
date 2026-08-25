import { cn } from "@/lib/utils";
import { ProjectStatus } from "@/data/types";

const labels: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  shipped: "Shipped",
  designed: "Designed",
  concept: "Concept",
};

const dotColor: Record<ProjectStatus, string> = {
  live: "bg-live",
  beta: "bg-beta",
  shipped: "bg-fg-muted",
  designed: "bg-fg-muted",
  concept: "bg-fg-dim",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border border-line-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-fg-muted",
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[status])} aria-hidden />
      {labels[status]}
    </span>
  );
}
