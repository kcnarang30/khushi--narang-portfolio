import type { Metadata } from "next";
import { links } from "@/data/links";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-6xl">Let&rsquo;s talk.</h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
          Open to internships, freelance work, and full-time roles. Email is the fastest way to
          reach me.
        </p>

        <a
          href={`mailto:${links.email}`}
          className="focus-ring mt-8 inline-block rounded-sm bg-accent px-6 py-3 font-mono text-[13px] uppercase tracking-widest text-black transition-opacity hover:opacity-90"
        >
          {links.email}
        </a>

        <div className="mt-14 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
          {[
            { label: "LinkedIn", href: links.linkedin },
            { label: "Behance", href: links.behance },
            { label: "Instagram", href: links.instagram },
            { label: "GitHub", href: links.github },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded font-mono text-xs uppercase tracking-widest text-fg-muted hover:text-accent"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
