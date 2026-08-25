import { cn } from "@/lib/utils";

/**
 * Belongs-to-the-portfolio loading/missing-asset state.
 * Shows the required asset key (see ASSET_MAP.md) instead of a broken image icon,
 * so the site stays legible while real exports are dropped into /public/projects/.
 */
export function ImagePlaceholder({
  label,
  aspect = "aspect-[4/3]",
  className,
}: {
  label?: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-sm border border-dashed border-line-strong bg-bg-raised",
        aspect,
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)",
        }}
        aria-hidden
      />
      <span className="relative px-4 text-center font-mono text-[10px] uppercase tracking-widest text-fg-dim">
        {label ?? "asset pending"}
      </span>
    </div>
  );
}
