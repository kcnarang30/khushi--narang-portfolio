/**
 * Shared motion vocabulary for the Marginalia system. Every component reaches
 * for these instead of inventing its own easing curve or duration — the
 * point isn't variety, it's one physical world behaving consistently.
 */

// Entrance: something settling into place. Slower, decelerating hard at the end.
export const EASE_SETTLE = [0.16, 1, 0.3, 1] as const;
// Hover / UI response: quick, responsive, no bounce.
export const EASE_RESPONSE = [0.4, 0, 0.2, 1] as const;
// Ink drawing itself — starts slow (pen touching down), accelerates through the stroke.
export const EASE_INK = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  hover: 0.25,
  enter: 0.6,
  ink: 0.45,
  settle: 0.8,
} as const;

export const STAGGER = 0.06;

/** Standard scroll-triggered entrance: fade + rise, once, with margin so it fires slightly before the element is fully in view. */
export const revealUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: DURATION.enter, delay, ease: EASE_SETTLE },
});

/** For images: a slightly larger settle — starts a touch zoomed, relaxes to rest. */
export const revealImage = (delay = 0) => ({
  initial: { opacity: 0, scale: 1.035 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-100px" } as const,
  transition: { duration: DURATION.settle, delay, ease: EASE_SETTLE },
});
