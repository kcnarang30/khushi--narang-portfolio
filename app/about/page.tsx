import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/data/about";
import { Reveal } from "@/components/reveal";
import { Polaroid } from "@/components/polaroid";
import { PaperClip } from "@/components/paper-clip";
import { Tape } from "@/components/tape";
import { Stamp } from "@/components/stamp";
import { DeskScene } from "@/components/desk-scene";
import { EmailDispatchLink } from "@/components/email-dispatch-link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div>
      {/* The personal file — found inside the archive */}
      <section className="desk-environment relative overflow-hidden py-20 sm:py-28">
        <span className="desk-crosshair" style={{ top: 22, left: 22 }} aria-hidden />
        <span className="desk-crosshair" style={{ top: 22, right: 22 }} aria-hidden />
        <span className="desk-crosshair" style={{ bottom: 22, left: 22 }} aria-hidden />
        <span className="desk-crosshair" style={{ bottom: 22, right: 22 }} aria-hidden />

        <DeskScene className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="relative">
            <div
              aria-hidden
              className="grain-paper absolute inset-0 bg-paper-dark"
              style={{ transform: "translateZ(-50px) rotate(2deg) translate(8px, 12px)" }}
            />
            <div className="grain-paper shadow-physical-lg relative bg-paper p-7 sm:p-12" style={{ transform: "rotate(1deg)" }}>
              <PaperClip rotate={-12} className="-left-4 -top-5 h-11 w-11 sm:-left-6 sm:-top-6" />
              <Tape rotate={-3} className="-top-3 right-10 w-16" />

              <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[10.5px] uppercase tracking-widest text-bg/55">
                <span>Khushi Narang</span>
                <span>Personal file</span>
              </div>

              <h1 className="mt-8 font-poster uppercase leading-[0.86] text-bg [font-size:clamp(2rem,6.4vw,3.6rem)]">
                I like asking questions until the problem starts making sense.
              </h1>

              <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-bg/75">{about.bio[0]}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {about.outsideOfWork.map((label) => (
                  <span
                    key={label}
                    className="border border-bg/25 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wide text-bg/65"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap justify-between gap-2 border-t border-bg/15 pt-4 font-mono text-[9.5px] uppercase tracking-wide text-bg/40">
                <span>{about.location}</span>
                <span>{about.education}</span>
              </div>
            </div>

            <Stamp tone="accent" rotate={7} size="4.5rem" className="absolute -top-8 -right-3 sm:-right-8">
              Still
              <br />
              figuring it out
            </Stamp>

            <div
              className="absolute -bottom-9 -left-5 w-24 sm:-left-10 sm:w-28"
              style={{ transform: "translateZ(70px) rotate(-7deg)" }}
            >
              <Polaroid src="/about/ribbon-night.jpg" alt="Out and about, Bengaluru" rotate={-7} sizes="112px" />
            </div>

            <div
              className="absolute -bottom-10 right-4 hidden w-20 sm:block sm:right-16"
              style={{ transform: "translateZ(60px) rotate(8deg)" }}
            >
              <Polaroid src="/about/yep-thats-me.jpg" alt="Yep, that's me" rotate={8} sizes="80px" />
            </div>
          </div>
        </DeskScene>
      </section>

      <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          <div className="md:col-span-3">
            <Reveal>
              {about.bio.slice(1).map((p, i) => (
                <p key={i} className="max-w-md font-serif text-[15px] leading-relaxed text-fg-muted first:mt-0 [&:not(:first-child)]:mt-4">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal delay={0.05}>
              <div className="mt-10 border-t border-line pt-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">Education</p>
                <p className="mt-1 text-sm text-fg-muted">{about.education}</p>
                <p className="text-xs text-fg-dim">
                  {about.educationYears} · {about.gpa}
                </p>
              </div>

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
                  Tools &amp; specialties
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {[...about.exploring, ...about.interests].map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-fg-muted"
                    >
                      {t}
                    </span>
                  ))}
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

            <Reveal delay={0.18}>
              <div className="mt-10 border-t border-line pt-8">
                <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">What I want next</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-fg-muted">
                  Something worth the questions I&rsquo;d ask about it.
                </p>
                <EmailDispatchLink className="focus-ring mt-3 inline-block rounded font-mono text-[13px] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" />
              </div>
            </Reveal>
          </div>

          <div className="relative md:col-span-2">
            <Reveal delay={0.1}>
              <div className="mx-auto max-w-[13rem]">
                <Polaroid src="/about/meet-cat.jpg" alt="Meet the cat" rotate={6} sizes="208px" />
              </div>
              <div className="mx-auto mt-10 max-w-[13rem]">
                <Polaroid src="/about/hard-at-work.jpg" alt="Hard at work" rotate={-1} sizes="208px" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
