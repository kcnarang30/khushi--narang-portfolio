import Link from "next/link";
import { getFeatured, getSpotlight } from "@/data/projects";
import { about } from "@/data/about";
import { HeroCover } from "@/components/hero-cover";
import { FeaturedProject } from "@/components/featured-project";
import { FloppyCard } from "@/components/floppy-card";
import { Polaroid } from "@/components/polaroid";
import { Handwritten } from "@/components/handwritten";
import { PhysicalButton } from "@/components/physical-button";
import { Reveal } from "@/components/reveal";
import { ImagePlaceholder } from "@/components/image-placeholder";

export default function Home() {
  const featured = getFeatured();
  const spotlight = getSpotlight().slice(0, 6);

  return (
    <div>
      <HeroCover />

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <div className="mb-14 flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Case files</p>
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
        <div className="flex flex-col gap-24 sm:gap-32">
          {featured.map((p, i) => (
            <div key={p.slug}>
              <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-fg-dim">
                <span className="tnum text-accent">{String(i + 1).padStart(2, "0")}</span>
                {" / "}
                {p.category.replace("-", " ")}
                {p.year ? ` · ${p.year}` : ""}
              </p>
              <FeaturedProject project={p} />
            </div>
          ))}
        </div>
      </section>

      {/* SPOTLIGHT */}
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
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 md:grid-cols-6">
          {spotlight.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <FloppyCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">About</p>
              <p className="mt-4 font-serif text-xl italic leading-snug text-fg sm:text-2xl">{about.bio[0]}</p>
              <p className="mt-4 max-w-md font-serif text-[15px] leading-relaxed text-fg-muted">{about.bio[1]}</p>
              <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] text-fg-muted">
                <span>{about.statsProjects}</span>
                <span>{about.statsLive} live</span>
                <span>{about.location}</span>
              </div>
              <Link
                href="/about"
                className="focus-ring mt-7 inline-block rounded font-mono text-[12px] uppercase tracking-widest text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                More about me →
              </Link>
            </div>
            <div className="relative md:col-span-2">
              <div className="relative mx-auto w-full max-w-[16rem]">
                <div className="rotate-[-4deg]">
                  <ImagePlaceholder label="polaroid — 'yep that's me'" aspect="aspect-[3/4]" />
                </div>
                <div className="absolute -bottom-8 -right-6 w-32 sm:-right-10">
                  <Polaroid src="/about/ribbon-night.jpg" alt="Out and about, Bengaluru" rotate={7} sizes="128px" />
                </div>
                <Handwritten className="absolute -top-6 -left-8 text-lg sm:text-xl" rotate={-6}>
                  currently thinking about —
                </Handwritten>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-6xl px-5 pb-28 pt-4 sm:px-8">
        <Reveal>
          <div className="relative border-t border-line pt-14">
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">status: open to work</p>
            <h2 className="mt-4 max-w-3xl font-display text-[12vw] font-bold uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl">
              Got a good <span className="text-accent">problem?</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-fg-muted">
              Internships, freelance, full-time — if it&rsquo;s a good problem, I&rsquo;m in.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <PhysicalButton href="/contact" className="px-6">
                Contact me
              </PhysicalButton>
              <a
                href="mailto:kcnarang3@gmail.com"
                className="focus-ring rounded font-mono text-[12px] uppercase tracking-widest text-fg-muted underline decoration-fg-dim/40 underline-offset-4 hover:text-fg"
              >
                kcnarang3@gmail.com
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
