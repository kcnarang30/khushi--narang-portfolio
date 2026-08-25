import { cn } from "@/lib/utils";

/**
 * A margin note in her own hand — used sparingly, and only ever paired with
 * something the data can actually back up. Never a generic UX-copy aside.
 */
export function Marginalia({
  children,
  className,
  rotate = -3,
  arrow,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  arrow?: "down" | "left" | "right";
}) {
  return (
    <span
      className={cn("pointer-events-none inline-flex items-start gap-1 font-pen text-lg leading-none text-accent sm:text-xl", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {arrow === "left" && <span aria-hidden>←</span>}
      {children}
      {arrow === "right" && <span aria-hidden>→</span>}
      {arrow === "down" && <span aria-hidden className="block">↓</span>}
    </span>
  );
}
