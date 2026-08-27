import { cn } from "@/lib/utils";

/**
 * A real paperclip, drawn as SVG (a stroked loop, not an icon-font glyph) —
 * clipped to a corner of a card to sell the "this is a physical stack of
 * paper" read alongside PaperStack.
 */
export function PaperClip({
  rotate = -8,
  className,
}: {
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("pointer-events-none absolute h-11 w-11", className)}
      style={{ transform: `rotate(${90 + rotate}deg)` }}
    >
      <path
        d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
        fill="none"
        stroke="rgba(150,148,138,0.85)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
