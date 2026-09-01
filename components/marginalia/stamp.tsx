import { ProjectStatus } from "@/data/types";

const LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  beta: "Beta",
  shipped: "Shipped",
  designed: "Designed",
  concept: "Concept",
};

// A tight, deterministic spread so repeated stamps in a list don't all sit
// at the same angle — real ink stamps never land perfectly identically twice.
const ROTATIONS = [-7, 5, -4, 8, -9, 3];

/**
 * A status as a real stamp, not a coloured pill — the one recurring "official
 * mark" device across case studies, Archive rows, and Work. Rotation is
 * derived from the label so the same status always lands the same way
 * (deterministic, not random per render).
 */
export function Stamp({
  status,
  size = "md",
  className = "",
}: {
  status: ProjectStatus;
  size?: "sm" | "md";
  className?: string;
}) {
  const seed = LABEL[status].charCodeAt(0) + LABEL[status].length;
  const rotate = ROTATIONS[seed % ROTATIONS.length];
  const dims = size === "sm" ? "h-11 w-11 text-[8px]" : "h-16 w-16 text-[10px]";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border-[1.5px] font-marginalia-sans font-semibold uppercase tracking-wide ${dims} ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        borderColor: "var(--mg-accent)",
        color: "var(--mg-accent)",
        mixBlendMode: "multiply",
      }}
    >
      {LABEL[status]}
    </span>
  );
}
