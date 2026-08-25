import { cn } from "@/lib/utils";

/**
 * A taped scrap of paper — used for handwritten asides and honest "still
 * figuring this out" moments. Replaces the old neon redaction motif with
 * something that reads as a real note, not a UI effect.
 */
export function PaperNote({
  children,
  rotate = -2,
  tape = true,
  className,
}: {
  children: React.ReactNode;
  rotate?: number;
  tape?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grain-paper relative bg-paper px-4 py-3 text-bg shadow-[0_14px_24px_-14px_rgba(0,0,0,0.45)]",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape && (
        <span
          aria-hidden
          className="absolute -top-2.5 left-1/2 h-5 w-14 -translate-x-1/2 rotate-[-2deg] bg-paper-dark/70"
        />
      )}
      {children}
    </div>
  );
}
