import type { Metadata } from "next";
import { links } from "@/data/links";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";
import { ContactDispatch } from "@/components/contact-dispatch";
import { PhysicalButton } from "@/components/physical-button";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Contact</p>
        <h1 className="mt-2 font-poster uppercase leading-[0.9] tracking-tight text-fg [font-size:clamp(2.75rem,8vw,5.25rem)]">
          Let&rsquo;s talk.{" "}
          <Handwritten rotate={-3} className="font-pen text-2xl normal-case sm:text-3xl">
            seriously, say hi
          </Handwritten>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
          Open to internships, freelance work, and full-time roles. Email is the fastest way to
          reach me.
        </p>
      </Reveal>

      <Reveal>
        <div className="relative mt-14">
          <ContactDispatch />
        </div>
      </Reveal>

      <Reveal delay={0.08}>
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
