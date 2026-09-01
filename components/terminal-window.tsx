import { cn } from "@/lib/utils";

export function TerminalWindow({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grain-card overflow-hidden rounded-sm border border-line-strong bg-[#0a0c09] shadow-[0_20px_40px_-16px_rgba(36,31,24,0.35)]", className)}>
      <div className="flex items-center gap-1.5 border-b border-line-strong px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#e2643c]/70" />
        <span className="h-2 w-2 rounded-full bg-[#e0a94a]/70" />
        <span className="h-2 w-2 rounded-full bg-[#7ec17a]/70" />
        <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-widest text-fg-dim">
          {label}
        </span>
      </div>
      <div className="p-4 font-mono text-[12.5px] leading-relaxed text-[#8fd68a]">{children}</div>
    </div>
  );
}
