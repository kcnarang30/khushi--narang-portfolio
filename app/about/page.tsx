import type { Metadata } from "next";
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
            <div className="mt-10 flex gap-8 border-t border-line pt-8 font-mono text-sm text-fg-muted">
              <span>{about.statsProjects}</span>
              <span>{about.statsLive} live</span>
              <span>{about.location}</span>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-2">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-3">
              <ImagePlaceholder label="polaroid — 'yep that's me'" aspect="aspect-[3/4]" />
              <div className="mt-6">
                <ImagePlaceholder label="polaroid — 'meet cat the cat'" aspect="aspect-[3/4]" />
              </div>
              <ImagePlaceholder label="cooking" aspect="aspect-square" />
              <ImagePlaceholder label="desk / working" aspect="aspect-square" />
            </div>
            <Handwritten className="mt-4 block text-lg" rotate={-3}>
              things I do when I&rsquo;m not in Figma
            </Handwritten>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
