import { cn } from "@/lib/utils";

/**
 * Physical "object" chrome — a browser/app window used to make project
 * previews read as artefacts sitting in space, not cards in a grid.
 */
export function WindowFrame({
  label,
  children,
  className,
}: {
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-line-strong bg-bg-raised shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-fg-dim/40" />
        <span className="h-2 w-2 rounded-full bg-fg-dim/40" />
        <span className="h-2 w-2 rounded-full bg-fg-dim/40" />
        {label && (
          <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-widest text-fg-dim">
            {label}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
