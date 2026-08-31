"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * A photograph sitting on the desk, not a card in a grid. Rests at a slight
 * tilt; on hover it lifts and straightens toward upright, like picking it up.
 */
export function Polaroid({
  src,
  alt,
  caption,
  rotate = -3,
  href,
  className,
  sizes = "220px",
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  href?: string;
  className?: string;
  sizes?: string;
}) {
  const content = (
    <div className={cn("group/polaroid relative", className)}>
      {/* ambient contact shadow — soft and close, separate from the cast shadow below, so the print reads as sitting ON the desk, not floating above it */}
      <div
        aria-hidden
        className="absolute inset-x-2 bottom-1 top-3 -z-10 rounded-[2px] bg-black/35 blur-md transition-all duration-300 ease-out group-hover/polaroid:inset-x-1 group-hover/polaroid:bottom-[-6px] group-hover/polaroid:blur-lg group-hover/polaroid:opacity-70"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
      <div
        className="grain-paper block bg-paper p-2.5 pb-8 shadow-[0_18px_32px_-16px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:!rotate-0 hover:shadow-[0_28px_46px_-16px_rgba(0,0,0,0.6)]"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-raised">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" draggable={false} />
        </div>
        {caption && (
          <p className="mt-2.5 text-center font-pen text-base leading-none text-bg/70">{caption}</p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus-ring block rounded-sm" aria-label={alt}>
        {content}
      </Link>
    );
  }

  return content;
}
