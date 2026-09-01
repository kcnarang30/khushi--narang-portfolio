import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/data/about";
import { Reveal } from "@/components/marginalia/reveal";
import { TapedPhoto } from "@/components/marginalia/taped-photo";
import { InkMark } from "@/components/marginalia/ink-mark";
import { EmailDispatchLink } from "@/components/email-dispatch-link";

export const metadata: Metadata = { title: "About" };

const TAG_ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5, 2, -1, 1, -1.5];

export default function AboutPage() {
  return (
    <div className="bg-mg-bg">
      <div className="mx-auto max-w-3xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <Reveal>
          <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">Personal file</p>
          <h1 className="relative mt-3 max-w-xl font-marginalia-serif text-[32px] leading-[1.15] text-mg-ink sm:text-[38px]">
            I like asking{" "}
            <span className="relative inline-block">
              questions
              <InkMark variant="circle" trigger="view" delay={0.5} className="scale-x-125" />
            </span>{" "}
            until the problem starts making sense.
          </h1>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <Reveal delay={0.05}>
              {about.bio.map((p, i) => (
                <p
                  key={i}
                  className="max-w-md font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted first:mt-0 [&:not(:first-child)]:mt-4"
                >
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
          <div className="flex flex-col items-center gap-10 sm:col-span-5 sm:pt-2 lg:flex-row lg:items-start lg:justify-center">
            <Reveal delay={0.15}>
              <TapedPhoto src="/about/ribbon-night.jpg" alt="Out and about, Bengaluru" rotate={-3} width={170} height={215} delay={0.1} />
            </Reveal>
            <Reveal delay={0.2} className="lg:mt-8">
              <TapedPhoto src="/about/yep-thats-me.jpg" alt="Yep, that's me" rotate={3} tapeSide="right" width={150} height={190} delay={0.15} />
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-14 border-t border-mg-line pt-8">
          <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">Outside of work</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {about.outsideOfWork.map((label, i) => (
              <span
                key={label}
                className="inline-block rounded-full border border-mg-line bg-mg-bg-raised px-3 py-1 font-marginalia-sans text-[12.5px] text-mg-ink-muted"
                style={{ transform: `rotate(${TAG_ROTATIONS[i % TAG_ROTATIONS.length]}deg)` }}
              >
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-12">
          <div className="sm:col-span-7">
            <Reveal>
              <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">Education</p>
              <p className="mt-1.5 font-marginalia-sans text-[15px] text-mg-ink">{about.education}</p>
              <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">
                {about.educationYears} &middot; {about.gpa}
              </p>
            </Reveal>

            <Reveal delay={0.05} className="mt-10">
              <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">Tools &amp; specialties</p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {[...about.exploring, ...about.interests].map((t) => (
                  <span
                    key={t}
                    className="rounded-[1px] border border-mg-line px-2.5 py-1 font-marginalia-sans text-[12.5px] text-mg-ink-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">Currently</p>
              <ul className="mt-3 flex flex-col gap-2.5">
                {about.currentRoles.map((r) => (
                  <li key={r.org} className="flex items-baseline justify-between gap-4 font-marginalia-sans text-[14.5px]">
                    <span>
                      <span className="text-mg-ink">{r.title}</span>{" "}
                      <span className="text-mg-ink-faint">&mdash; {r.org}</span>
                    </span>
                    <span className="shrink-0 text-[13px] text-mg-ink-faint">{r.period}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15} className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-marginalia-sans text-[14px] text-mg-ink-muted">
              <span>{about.statsProjects}</span>
              <span>{about.statsLive} live</span>
              <span>{about.location}</span>
              <Link href="/certificates" className="group focus-ring relative rounded text-mg-ink-faint hover:text-mg-ink-muted">
                Certificates &rarr;
              </Link>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 border-t border-mg-line pt-8">
              <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">What I want next</p>
              <p className="mt-2 max-w-md font-marginalia-sans text-[14.5px] leading-relaxed text-mg-ink-muted">
                Something worth the questions I&rsquo;d ask about it.
              </p>
              <EmailDispatchLink className="focus-ring mt-3 inline-block rounded font-marginalia-sans text-[13.5px] text-mg-accent underline decoration-mg-accent/40 underline-offset-4 hover:decoration-mg-accent" />
            </Reveal>
          </div>

          <div className="flex flex-col items-center gap-14 sm:col-span-5 sm:items-end">
            <Reveal delay={0.2}>
              <TapedPhoto src="/about/meet-cat.jpg" alt="Meet the cat" rotate={4} tapeSide="left" width={175} height={215} delay={0.1} />
            </Reveal>
            <Reveal delay={0.25}>
              <TapedPhoto src="/about/hard-at-work.jpg" alt="Hard at work" rotate={-3} tapeSide="right" width={175} height={215} delay={0.15} />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
