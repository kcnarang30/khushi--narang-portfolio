import type { Metadata } from "next";
import { links } from "@/data/links";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";
import { NokiaPhone } from "@/components/nokia-phone";
import { PhysicalButton } from "@/components/physical-button";
import { DispatchForm } from "@/components/dispatch-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">
          Let&rsquo;s talk.{" "}
          <Handwritten rotate={-3} className="text-2xl sm:text-3xl">
            seriously, say hi
          </Handwritten>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
          Open to internships, freelance work, and full-time roles. Email is the fastest way to
          reach me.
        </p>
      </Reveal>

      <div className="relative mt-14 overflow-hidden">
        <p
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none whitespace-nowrap font-display text-[15vw] font-extrabold uppercase leading-none tracking-tight text-fg-dim/[0.07] sm:text-8xl md:text-9xl"
        >
          Contact me · Contact me ·
        </p>
        <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[19rem_1fr] lg:gap-14">
          <Reveal>
            <NokiaPhone formAnchorId="dispatch-form" />
            <p className="mt-5 flex items-center gap-2 rounded-sm border border-line px-3 py-2.5 font-mono text-[11px] text-fg-muted">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live-signal" aria-hidden />
              Currently open to freelance contracts and full-time roles.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <DispatchForm />
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.12}>
        <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-line pt-8">
          <PhysicalButton href={links.behance} external variant="paper">
            Behance
          </PhysicalButton>
          <PhysicalButton href={links.instagram} external variant="paper">
            Instagram
          </PhysicalButton>
          <PhysicalButton href={links.linkedin} external variant="paper">
            LinkedIn
          </PhysicalButton>
          <PhysicalButton href={links.github} external variant="paper">
            GitHub
          </PhysicalButton>
        </div>
      </Reveal>
    </div>
  );
}
