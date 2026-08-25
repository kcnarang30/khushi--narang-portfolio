import type { Metadata } from "next";
import Image from "next/image";
import { getPlayground } from "@/data/projects";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";

export const metadata: Metadata = { title: "Playground" };

export default function PlaygroundPage() {
  const items = getPlayground();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Playground</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          Branding, posters, and ideas that didn&rsquo;t need a case study.{" "}
          <Handwritten rotate={2} className="text-xl sm:text-2xl">just needed to exist</Handwritten>
        </h1>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.05}>
            <div>
              {p.coverImageSrc ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-line bg-bg-raised">
                  <Image
                    src={p.coverImageSrc}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ) : (
                <ImagePlaceholder label={p.coverAssetRef ?? "asset pending"} aspect="aspect-square" />
              )}
              <p className="mt-2.5 font-display text-sm font-medium">{p.name}</p>
              <p className="text-xs leading-snug text-fg-dim">{p.oneLiner}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
