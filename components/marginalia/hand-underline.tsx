/**
 * A hover affordance, not a personality flourish: an underline drawn with a
 * real hand-tremor path (imperfect, not a straight CSS border) that draws
 * itself in on hover via stroke-dashoffset. Reused on every interactive
 * title — a designed interaction primitive, distinct from the one-time
 * correction mark in the hero. Requires `group` on the hoverable ancestor;
 * draw behaviour is defined in globals.css (.hand-underline-path).
 */
export function HandUnderline({ className = "", active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      aria-hidden
      className={`pointer-events-none absolute -bottom-1 left-0 w-full ${className}`}
      style={{ height: 10, overflow: "visible" }}
    >
      <path
        d="M2 6.5 C 40 3, 80 8.5, 118 5 S 170 3.5, 198 6"
        fill="none"
        stroke="var(--mg-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={1}
        className="hand-underline-path"
        style={active ? { strokeDashoffset: 0 } : undefined}
      />
    </svg>
  );
}
