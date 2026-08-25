import Link from "next/link";
import { getFeatured, getSpotlight } from "@/data/projects";
import { about } from "@/data/about";
import { FeaturedCard } from "@/components/featured-card";
import { FloppyCard } from "@/components/floppy-card";
import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";
import { ImagePlaceholder } from "@/components/image-placeholder";

export default function Home() {
  const featured = getFeatured();
  const spotlight = getSpotlight().slice(0, 6);

  return (
    <div>
      {/* 01 — HERO */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-fg-dim">
          Product Designer — Bengaluru
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Turning messy problems into{" "}
          <span className="relative inline-block">
            intuitive
            <Handwritten className="absolute -right-2 -top-6 text-lg sm:-top-8 sm:text-2xl" rotate={-6}>
              (obvious, actually)
            </Handwritten>
          </span>{" "}
          experiences.
        </h1>
        <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-fg-muted">
          I like asking annoying questions until the problem starts making sense.
          Currently designing at YourStory — product work, event experiences, and
          the occasional AI tool that has no business being this fun to build.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/work"
            className="focus-ring rounded-sm bg-accent px-5 py-3 font-mono text-[12px] uppercase tracking-widest text-black transition-opacity hover:opacity-90"
          >
            See the work
          </Link>
          <Link
            href="/about"
            className="focus-ring rounded-sm border border-line-strong px-5 py-3 font-mono text-[12px] uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
          >
            About me
          </Link>
        </div>
      </section>

      {/* 03 — SELECTED WORK */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Selected work</p>
              <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                A few things I&rsquo;d actually want to talk about
              </h2>
            </div>
            <Link
              href="/work"
              className="focus-ring hidden shrink-0 rounded font-mono text-[12px] uppercase tracking-widest text-fg-muted hover:text-accent sm:block"
            >
              View all →
            </Link>
          </div>
        </Reveal>
        <div className="flex flex-col gap-6">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* 04 — SPOTLIGHT */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Spotlight</p>
              <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">Hey, I did this too</h2>
            </div>
            <Link
              href="/archive"
              className="focus-ring hidden shrink-0 rounded font-mono text-[12px] uppercase tracking-widest text-fg-muted hover:text-accent sm:block"
            >
              More in Archive →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-6">
          {spotlight.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <FloppyCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* 05 — ABOUT PREVIEW + 06 — HUMAN SECTION */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="relative grid grid-cols-1 gap-10 rounded-md border border-line bg-bg-raised p-6 sm:p-10 md:grid-cols-5">
            <Handwritten
              className="absolute -top-4 left-8 text-lg sm:text-xl"
              rotate={-4}
            >
              currently thinking about —
            </Handwritten>
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">About</p>
              <p className="mt-3 text-lg leading-relaxed text-fg">{about.bio[0]}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{about.bio[1]}</p>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] text-fg-muted">
                <span>{about.statsProjects}</span>
                <span>{about.statsLive} live</span>
                <span>{about.location}</span>
              </div>
              <Link
                href="/about"
                className="focus-ring mt-6 inline-block rounded font-mono text-[12px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                More about me →
              </Link>
            </div>
            <div className="md:col-span-2">
              <ImagePlaceholder label="polaroid — 'yep that's me'" aspect="aspect-[3/4]" className="rotate-1" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 07 — CONTACT CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 pt-4 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-md border border-line px-6 py-16 sm:px-12">
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">
              status: open to work
            </p>
            <p className="mt-4 max-w-xl font-display text-2xl font-bold leading-tight sm:text-4xl">
              Internships, freelance, full-time —{" "}
              <span className="text-accent">if it's a good problem, I&rsquo;m in.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="focus-ring rounded-sm bg-accent px-6 py-3 font-mono text-[12px] uppercase tracking-widest text-black transition-opacity hover:opacity-90"
              >
                Contact me
              </Link>
              <a
                href="mailto:kcnarang3@gmail.com"
                className="focus-ring rounded font-mono text-[12px] uppercase tracking-widest text-fg-muted underline decoration-fg-dim/40 underline-offset-4 hover:text-fg"
              >
                kcnarang3@gmail.com
              </a>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-6 select-none font-display text-[9rem] font-bold leading-none text-fg opacity-[0.03] sm:text-[13rem]"
            >
              hi
            </span>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
