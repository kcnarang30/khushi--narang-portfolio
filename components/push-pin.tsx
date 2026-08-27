import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = {
  green: "#5fd67a",
  pink: "#ff2f92",
  yellow: "#ffd23f",
  blue: "#2f6fed",
  red: "#ff3b30",
};

/**
 * A real corkboard pushpin — a glossy round head with a highlight and a
 * cast shadow, not a flat dot. This is the primary "pinned to the board"
 * fastener for the retro/corkboard sections; PaperClip and Tape are for
 * paper-on-paper (desk) scenes instead.
 */
export function PushPin({
  color = "pink",
  size = "1.1rem",
  className,
}: {
  color?: keyof typeof COLORS;
  size?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute z-10 rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 32% 28%, #fff 0%, ${COLORS[color]} 38%, ${COLORS[color]} 70%, rgba(0,0,0,0.35) 100%)`,
        boxShadow: "0 3px 5px rgba(0,0,0,0.5)",
      }}
    />
  );
}
