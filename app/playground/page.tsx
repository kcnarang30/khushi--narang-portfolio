import type { Metadata } from "next";
import Image from "next/image";
import { getPlayground } from "@/data/projects";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Playground" };

const SIZE_BY_CATEGORY: Record<string, "lg" | "md" | "sm"> = {
  poster: "lg",
  branding: "md",
  editorial: "md",
};

const sizeClasses = {
  lg: { wrap: "col-span-2 sm:col-span-4 md:col-span-6", aspect: "aspect-[4/5] sm:aspect-[16/11]" },
  md: { wrap: "col-span-1 sm:col-span-2 md:col-span-3", aspect: "aspect-square" },
  sm: { wrap: "col-span-1 sm:col-span-2 md:col-span-3", aspect: "aspect-square" },
};

export default function PlaygroundPage() {
  const items = getPlayground();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Playground</p>
        <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          Things I made because I wanted to.{" "}
          <Handwritten rotate={2} className="text-xl sm:text-2xl">no case study required</Handwritten>
        </h1>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-6 sm:gap-6 md:grid-cols-9">
        {items.map((p, i) => {
          const size = SIZE_BY_CATEGORY[p.category] ?? "sm";
          const cls = sizeClasses[size];
          const rotate = i % 3 === 0 ? "sm:-rotate-1" : i % 3 === 1 ? "sm:rotate-1" : "";
          return (
            <Reveal key={p.slug} delay={(i % 6) * 0.04} className={cls.wrap}>
              <div className={cn("transition-transform duration-300 hover:rotate-0", rotate)}>
                {p.coverImageSrc ? (
                  <div className={cn("relative w-full overflow-hidden rounded-sm border border-line bg-bg-raised", cls.aspect)}>
                    <Image
                      src={p.coverImageSrc}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder label={p.coverAssetRef ?? "asset pending"} aspect={cls.aspect} />
                )}
                <p className="mt-2.5 font-display text-sm font-medium">{p.name}</p>
                <p className="text-xs leading-snug text-fg-dim">{p.oneLiner}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
