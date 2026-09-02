import type { Metadata } from "next";
import { links } from "@/data/links";
import { Reveal } from "@/components/marginalia/reveal";
import { HandUnderline } from "@/components/marginalia/hand-underline";
import { EmailDispatchLink } from "@/components/email-dispatch-link";
import { SayHelloButton } from "@/components/marginalia/say-hello-button";

export const metadata: Metadata = { title: "Contact" };

const SOCIALS = [
  { label: "LinkedIn", href: links.linkedin },
  { label: "Behance", href: links.behance },
  { label: "Instagram", href: links.instagram },
  { label: "GitHub", href: links.github },
];

export default function ContactPage() {
  return (
    <div className="bg-mg-bg">
      <div className="mx-auto max-w-2xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">Dispatch</p>
          <h1 className="mt-2 font-marginalia-serif text-[42px] leading-tight text-mg-ink sm:text-[52px]">
            Let&rsquo;s talk.{" "}
            <span className="inline-block font-marginalia-hand text-[0.6em] text-mg-accent" style={{ transform: "rotate(-2deg)" }}>
              seriously, say hi
            </span>
          </h1>
          <p className="mt-5 max-w-md font-marginalia-sans text-[15.5px] leading-relaxed text-mg-ink-muted">
            Open to internships, freelance work, and full-time roles. Email is the fastest way to reach me.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 flex flex-col gap-6 rounded-[2px] border border-mg-line bg-mg-bg-raised p-7 sm:p-9">
          <EmailDispatchLink className="focus-ring group relative inline-block w-fit rounded font-marginalia-serif text-[20px] text-mg-ink hover:text-mg-accent">
            {links.email}
            <HandUnderline />
          </EmailDispatchLink>
          <SayHelloButton />
        </Reveal>

        <Reveal delay={0.14} className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-mg-line pt-8">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus-ring relative rounded font-marginalia-sans text-[14px] text-mg-ink-muted hover:text-mg-ink"
            >
              {s.label}
              <HandUnderline />
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.18} className="mt-10 font-marginalia-sans text-[12px] text-mg-ink-faint">
          That&rsquo;s the whole file.
        </Reveal>
      </div>
    </div>
  );
}
