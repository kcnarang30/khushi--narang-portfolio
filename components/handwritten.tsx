import { cn } from "@/lib/utils";

export function Handwritten({
  children,
  className,
  rotate = -2,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={cn("inline-block font-hand text-accent", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
