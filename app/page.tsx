import { getFeatured, getSpotlight } from "@/data/projects";
import { about } from "@/data/about";
import { HeroCorrection } from "@/components/marginalia/hero-correction";
import { FeatureRow } from "@/components/marginalia/feature-row";
import { CompactRow } from "@/components/marginalia/compact-row";
import { DoNotOpen } from "@/components/do-not-open";

export default function Home() {
  const featured = getFeatured();
  const rest = getSpotlight().filter((p) => p.coverImageSrc);
  const variants = ["image-left", "image-right", "inset"] as const;

  return (
    <div className="bg-mg-bg">
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12">
          <p className="font-marginalia-sans text-[14.5px] text-mg-ink-muted lg:col-span-6">
            Product designer, Bengaluru &mdash; currently at YourStory.
          </p>
          <div className="lg:col-span-10">
            <HeroCorrection />
          </div>
          <p className="font-marginalia-sans text-[15px] leading-relaxed text-mg-ink-muted lg:col-span-5 lg:col-start-5 lg:mt-2">
            I&rsquo;ll probably ask too many questions. TechSparks 2026&rsquo;s site is live now, ahead of 10,000+ people this October.
          </p>
          <div className="lg:col-span-4 lg:col-start-5 lg:mt-8">
            <DoNotOpen label="Curious?" className="max-w-xs">
              <p className="font-marginalia-sans text-[13px] leading-relaxed text-mg-ink-muted">
                Lately: {about.interests.join(", ").toLowerCase()}. Off-screen, usually {about.outsideOfWork[3].toLowerCase()} or {about.outsideOfWork[9].toLowerCase()}.
              </p>
            </DoNotOpen>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-28 sm:px-8 sm:pb-36">
        <div className="flex flex-col gap-24 sm:gap-32">
          {featured.map((p, i) => (
            <FeatureRow key={p.slug} project={p} variant={variants[i % variants.length]} priority={i === 0} />
          ))}
        </div>
      </section>

      {rest.length > 0 && (
        <section className="mx-auto max-w-3xl px-5 pb-28 sm:px-8 sm:pb-36">
          <p className="mb-6 font-marginalia-sans text-[13px] text-mg-ink-faint">A few more</p>
          <div>
            {rest.map((p, i) => (
              <CompactRow key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
