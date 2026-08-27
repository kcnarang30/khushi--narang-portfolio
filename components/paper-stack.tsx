import { cn } from "@/lib/utils";

const OFFSETS = [
  { x: 7, y: -5, rotate: -3 },
  { x: -6, y: 6, rotate: 2 },
  { x: 4, y: 8, rotate: -1.5 },
];

/**
 * Real physical thickness — 2-3 sheets peeking out from behind the top
 * layer with their own offset and shadow, not one drop-shadow pretending
 * to be depth. The content passed in sits on top as the visible sheet.
 */
export function PaperStack({
  layers = 2,
  className,
  sheetClassName,
  children,
}: {
  layers?: number;
  className?: string;
  sheetClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, i) => {
        const o = OFFSETS[i % OFFSETS.length];
        return (
          <div
            key={i}
            aria-hidden
            className={cn(
              "grain-paper shadow-physical absolute inset-0 bg-paper",
              sheetClassName
            )}
            style={{
              transform: `translate(${o.x}px, ${o.y}px) rotate(${o.rotate}deg)`,
              zIndex: i,
            }}
          />
        );
      })}
      <div className="relative" style={{ zIndex: layers }}>
        {children}
      </div>
    </div>
  );
}
