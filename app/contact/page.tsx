import type { Metadata } from "next";
import { links } from "@/data/links";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";
import { NokiaPhone } from "@/components/nokia-phone";
import { PhysicalButton } from "@/components/physical-button";

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
          <form
            id="dispatch-form"
            action={`mailto:${links.email}`}
            method="post"
            encType="text/plain"
            className="scroll-mt-24 rounded-md border border-line-strong bg-paper p-6 text-bg shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-bg/10 pb-4">
              <p className="font-display text-lg font-bold">Dispatch Messenger</p>
              <span className="rounded-sm border border-ember px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-ember">
                Dispatch
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-5">
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-widest text-bg/60">
                  Your name / team
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  title="At least 2 characters"
                  placeholder="Enter your full name…"
                  className="focus-ring mt-1.5 w-full rounded-sm border border-bg/15 bg-paper-dark/30 px-3 py-2.5 text-[14px] text-bg placeholder:text-bg/40"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-widest text-bg/60">
                  Email address
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={100}
                  autoComplete="email"
                  title="A valid email address, like you@example.com"
                  placeholder="you@example.com"
                  className="focus-ring mt-1.5 w-full rounded-sm border border-bg/15 bg-paper-dark/30 px-3 py-2.5 text-[14px] text-bg placeholder:text-bg/40"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-widest text-bg/60">
                  What are we building together?
                </span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={2000}
                  rows={4}
                  title="At least 10 characters — enough to say what you have in mind"
                  placeholder="Tell me about it…"
                  className="focus-ring mt-1.5 w-full resize-none rounded-sm border border-bg/15 bg-paper-dark/30 px-3 py-2.5 text-[14px] text-bg placeholder:text-bg/40"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Handwritten rotate={-2} className="text-lg">
                P.S. I reply fast
              </Handwritten>
              <PhysicalButton
                type="submit"
                className="bg-ember text-black shadow-[0_3px_0_0_var(--ember-dim)] active:shadow-[0_1px_0_0_var(--ember-dim)]"
              >
                Send Dispatch
              </PhysicalButton>
            </div>
            <p className="mt-4 font-mono text-[10px] text-bg/40">
              Opens your email client with this pre-filled — there&rsquo;s no backend wired up yet,
              so nothing is silently lost.
            </p>
          </form>
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
