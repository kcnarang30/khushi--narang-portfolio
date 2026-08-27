import { cn } from "@/lib/utils";

const BURST_CLIP =
  "polygon(50% 0%, 61% 12%, 75% 4%, 79% 19%, 95% 18%, 92% 34%, 100% 45%, 88% 55%, 95% 68%, 80% 71%, 79% 87%, 64% 82%, 55% 96%, 45% 84%, 30% 94%, 25% 79%, 9% 82%, 12% 66%, 0% 56%, 10% 43%, 3% 28%, 19% 25%, 20% 9%, 36% 15%, 45% 2%)";

/**
 * A small rotated stamp/sticker sitting on or overlapping a paper sheet —
 * the reference's "BRUTAL BUT HONEST" circle / "PAIN > POLISH" starburst.
 * Fixed square footprint so text stays centered regardless of shape.
 */
export function Stamp({
  children,
  variant = "circle",
  tone = "accent",
  rotate = -6,
  size = "5.5rem",
  className,
}: {
  children: React.ReactNode;
  variant?: "circle" | "burst";
  tone?: "accent" | "ember" | "ink" | "pink" | "red" | "blue" | "green";
  rotate?: number;
  size?: string;
  className?: string;
}) {
  const toneClass =
    {
      accent: "bg-accent text-black",
      ember: "bg-ember text-black",
      ink: "bg-bg text-fg",
      pink: "bg-hot-pink text-white",
      red: "bg-signal-red text-white",
      blue: "bg-bright-blue text-white",
      green: "bg-bright-green text-black",
    }[tone];

  return (
    <div
      aria-hidden={typeof children === "string" ? undefined : true}
      className={cn(
        "flex shrink-0 items-center justify-center text-center shadow-[0_14px_26px_-12px_rgba(0,0,0,0.6)]",
        variant === "circle" ? "rounded-full" : "",
        toneClass,
        className
      )}
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        clipPath: variant === "burst" ? BURST_CLIP : undefined,
      }}
    >
      <span className="px-2 font-mono text-[9.5px] font-bold uppercase leading-tight tracking-wide">
        {children}
      </span>
    </div>
  );
}
