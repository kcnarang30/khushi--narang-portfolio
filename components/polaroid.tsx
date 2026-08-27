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
    <div
      className={cn(
        "group/polaroid grain-paper block bg-paper p-2.5 pb-8 shadow-[0_18px_32px_-16px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:!rotate-0 hover:shadow-[0_24px_40px_-16px_rgba(0,0,0,0.55)]",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-raised">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      {caption && (
        <p className="mt-2.5 text-center font-pen text-base leading-none text-bg/70">{caption}</p>
      )}
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
