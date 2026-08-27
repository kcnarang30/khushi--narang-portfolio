import { cn } from "@/lib/utils";

const STAR_PATH =
  "M50 4 L61 36 L96 36 L67 57 L78 90 L50 70 L22 90 L33 57 L4 36 L39 36 Z";

/**
 * A real sticker — star or smiley — for the scrapbook/Y2K main sections.
 * Not a decorative flourish repeated everywhere: one or two per section,
 * placed with intent, the way an actual sticker gets pressed onto a page.
 */
export function Sticker({
  variant = "star",
  color = "var(--hot-pink)",
  rotate = -8,
  size = "2.75rem",
  className,
}: {
  variant?: "star" | "smiley";
  color?: string;
  rotate?: number;
  size?: string;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className={cn("pointer-events-none absolute drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]", className)}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      {variant === "star" ? (
        <path d={STAR_PATH} fill={color} stroke="rgba(14,15,13,0.85)" strokeWidth="2.5" strokeLinejoin="round" />
      ) : (
        <>
          <circle cx="50" cy="50" r="46" fill={color} stroke="rgba(14,15,13,0.85)" strokeWidth="2.5" />
          <circle cx="34" cy="42" r="6" fill="#0e0f0d" />
          <circle cx="66" cy="42" r="6" fill="#0e0f0d" />
          <path
            d="M28 60 Q50 82 72 60"
            fill="none"
            stroke="#0e0f0d"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
}
