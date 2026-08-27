import { cn } from "@/lib/utils";

/**
 * A strip of tape holding something down — extracted from the one-off strip
 * that used to live inline in hero-cover.tsx so every taped object on the
 * site shares the same piece of "material." Semi-transparent with a faint
 * sheen, the way real tape catches light unevenly rather than sitting flat.
 */
export function Tape({
  rotate = -2,
  width = "w-12",
  className,
}: {
  rotate?: number;
  width?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute h-5", width, className)}
      style={{
        transform: `rotate(${rotate}deg)`,
        background:
          "linear-gradient(105deg, rgba(240,233,216,0.55) 0%, rgba(240,233,216,0.72) 35%, rgba(240,233,216,0.5) 60%, rgba(240,233,216,0.68) 100%)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
      }}
    />
  );
}
