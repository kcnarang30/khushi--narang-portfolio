import { cn } from "@/lib/utils";

/**
 * A printed credential/ticket stub — TechSparks' "real scale, made
 * concrete" treatment. Circular notches punched in the left/right edges
 * (matched to the surrounding background color) read as a real ticket, not
 * a rounded rectangle. bgClassName must match whatever this sits on.
 */
export function Receipt({
  children,
  className,
  bgClassName = "before:bg-bg after:bg-bg",
  rotate = -1,
}: {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  rotate?: number;
}) {
  return (
    <div
      className={cn(
        "grain-paper shadow-physical relative bg-paper px-6 py-5 text-bg",
        "before:absolute before:left-[-7px] before:top-1/2 before:h-3.5 before:w-3.5 before:-translate-y-1/2 before:rounded-full",
        "after:absolute after:right-[-7px] after:top-1/2 after:h-3.5 after:w-3.5 after:-translate-y-1/2 after:rounded-full",
        bgClassName,
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </div>
  );
}
