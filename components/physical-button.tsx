import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "focus-ring inline-flex items-center justify-center gap-1.5 rounded-sm font-mono text-[12px] uppercase tracking-widest transition-all duration-150 active:translate-y-[2px]";

const variants = {
  solid: "bg-accent px-5 py-3 text-black shadow-[0_3px_0_0_var(--accent-dim)] hover:brightness-105 active:shadow-[0_1px_0_0_var(--accent-dim)]",
  outline:
    "border border-line-strong px-5 py-3 text-fg-muted shadow-[0_3px_0_0_var(--line)] hover:text-fg hover:border-fg-dim active:shadow-[0_1px_0_0_var(--line)]",
  paper:
    "grain-paper bg-paper px-5 py-3 text-bg shadow-[0_3px_0_0_var(--paper-dark)] hover:brightness-95 active:shadow-[0_1px_0_0_var(--paper-dark)]",
} as const;

type Variant = keyof typeof variants;

export function PhysicalButton({
  href,
  variant = "solid",
  external,
  className,
  children,
  onClick,
  type = "button",
}: {
  href?: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const cls = cn(base, variants[variant], className);

  if (!href) {
    return (
      <button type={type} onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
