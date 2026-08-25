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

const stampBorder: Record<ProjectStatus, string> = {
  live: "border-live/50",
  beta: "border-beta/50",
  shipped: "border-line-strong",
  designed: "border-line-strong",
  concept: "border-line",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[3px] border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest text-fg-muted",
        stampBorder[status],
        className
      )}
      style={{ transform: "rotate(-1deg)" }}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[status])} aria-hidden />
      {labels[status]}
    </span>
  );
}
