import type { Metadata } from "next";
import Image from "next/image";
import { getPlayground } from "@/data/projects";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Reveal } from "@/components/reveal";
import { Handwritten } from "@/components/handwritten";
import { DoNotOpen } from "@/components/do-not-open";
import { ConsolePing } from "@/components/console-ping";
import { PlaygroundDesk } from "@/components/playground-desk";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Playground" };

const SIZE_BY_SLUG: Record<string, "lg" | "md" | "sm"> = {
  knwn: "lg",
  "cyber-angel": "md",
  "greek-comics": "lg",
  "internet-magazine": "sm",
};

const sizeClasses = {
  lg: { wrap: "col-span-2 sm:col-span-4 md:col-span-6", aspect: "aspect-[4/5] sm:aspect-[16/11]" },
  md: { wrap: "col-span-1 sm:col-span-2 md:col-span-3", aspect: "aspect-square" },
  sm: { wrap: "col-span-1 sm:col-span-2 md:col-span-3", aspect: "aspect-square" },
};

const ROTATE = ["sm:-rotate-2", "sm:rotate-1", "sm:-rotate-1", "sm:rotate-2", "sm:-rotate-1"];
const OFFSET = ["sm:translate-y-2", "", "sm:-translate-y-3", "sm:translate-y-1", ""];

export default function PlaygroundPage() {
  const items = getPlayground().filter((p) => p.slug !== "sip-coffee");
  const unfinished = getPlayground().find((p) => p.slug === "sip-coffee");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">Playground</p>
            <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-5xl">
              Things I made because I wanted to.{" "}
              <Handwritten rotate={2} className="text-xl sm:text-2xl">
                no case study required
              </Handwritten>
            </h1>
          </div>
          <ConsolePing />
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <PlaygroundDesk />
      </Reveal>

      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-6 sm:gap-6 md:grid-cols-9">
        {items.map((p, i) => {
          const size = SIZE_BY_SLUG[p.slug] ?? "sm";
          const cls = sizeClasses[size];
          return (
            <Reveal key={p.slug} delay={(i % 6) * 0.04} className={cls.wrap}>
              <div
                className={cn(
                  "transition-transform duration-300 hover:translate-y-0 hover:rotate-0",
                  ROTATE[i % ROTATE.length],
                  OFFSET[i % OFFSET.length]
                )}
              >
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

      {unfinished && (
        <Reveal delay={0.1} className="mt-14 max-w-md">
          <DoNotOpen label="Unfinished">
            <p className="font-display text-lg font-bold">{unfinished.name}</p>
            <p className="mt-2 font-serif text-sm leading-relaxed text-fg-muted">{unfinished.oneLiner}</p>
            {unfinished.todo?.[0] && (
              <p className="mt-3 font-mono text-[11px] text-fg-dim">TODO — {unfinished.todo[0]}</p>
            )}
          </DoNotOpen>
        </Reveal>
      )}
    </div>
  );
}
