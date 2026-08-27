import { testimonials } from "@/data/testimonials";
import { Reveal } from "./reveal";

/**
 * Off until Khushi supplies real testimonials — flip this once the copy in
 * data/testimonials.ts is real. Placeholder text must never ship live.
 */
const SHOW_TESTIMONIALS = false;

const ROTATE = [-2, 1.5, -1];

export function TestimonialsSection() {
  if (!SHOW_TESTIMONIALS) return null;

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">What people say</p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Not just from me</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name + i} delay={i * 0.05}>
            <div
              className="grain-paper relative h-full bg-paper px-5 py-6 text-bg shadow-[0_18px_32px_-16px_rgba(0,0,0,0.5)]"
              style={{ transform: `rotate(${ROTATE[i % ROTATE.length]}deg)` }}
            >
              <p className="font-serif text-[15px] italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-wide text-bg/60">
                {t.name} — {t.role}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
