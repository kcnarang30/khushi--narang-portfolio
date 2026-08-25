import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/data/about";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">About</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          I like asking questions until the problem starts making sense.
        </h1>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-5">
        <div className="md:col-span-3">
          <Reveal>
            <p className="text-lg leading-relaxed">{about.bio[0]}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">{about.bio[1]}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">Education</p>
                <p className="mt-1 text-sm text-fg-muted">{about.education}</p>
                <p className="text-xs text-fg-dim">{about.educationYears} · {about.gpa}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">Exploring</p>
                <p className="mt-1 text-sm text-fg-muted">{about.exploring.join(" · ")}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">Interests</p>
                <p className="mt-1 text-sm text-fg-muted">{about.interests.join(" · ")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 border-t border-line pt-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">Currently</p>
              <ul className="mt-3 flex flex-col gap-3">
                {about.currentRoles.map((r) => (
                  <li key={r.org} className="flex items-baseline justify-between gap-3 text-sm">
                    <span>
                      <span className="text-fg">{r.title}</span>{" "}
                      <span className="text-fg-dim">— {r.org}</span>
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-fg-dim">{r.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-8 font-mono text-sm text-fg-muted">
              <span>{about.statsProjects}</span>
              <span>{about.statsLive} live</span>
              <span>{about.location}</span>
              <Link
                href="/certificates"
                className="focus-ring rounded text-[13px] uppercase tracking-wide text-fg-dim underline decoration-fg-dim/40 underline-offset-4 hover:text-accent"
              >
                Certificates →
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="relative md:col-span-2">
          <Reveal delay={0.1}>
            <div className="relative mx-auto max-w-[15rem]">
              <div className="rotate-[-3deg]">
                <ImagePlaceholder label="polaroid — 'yep that's me'" aspect="aspect-[3/4]" />
              </div>
              <div className="absolute -bottom-10 -right-8 w-28 rotate-[6deg] sm:-right-12 sm:w-32">
                <ImagePlaceholder label="polaroid — 'meet cat the cat'" aspect="aspect-[3/4]" />
              </div>
              <div className="absolute -left-10 top-16 w-24 -rotate-[8deg] sm:-left-14 sm:w-28">
                <ImagePlaceholder label="cooking" aspect="aspect-square" />
              </div>
              <Handwritten className="absolute -top-8 right-0 text-lg sm:text-xl" rotate={4}>
                not in Figma —
              </Handwritten>
            </div>
            <div className="mt-24 sm:mt-16">
              <ImagePlaceholder label="desk / working" aspect="aspect-[16/10]" className="rotate-[1deg]" />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
