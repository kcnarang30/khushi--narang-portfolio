"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { revealImage } from "@/lib/motion";

/**
 * The one image treatment for real screenshots/photography across the site:
 * settles in on scroll, a soft frame-line fades in on hover (the image is
 * being looked at), a small consistent scale. No browser chrome, ever —
 * screenshots are placed directly, not framed as "a picture of a website."
 */
export function EditorialImage({
  src,
  alt,
  sizes = "100vw",
  aspect = "aspect-[4/3]",
  objectPosition = "object-top",
  delay = 0,
  priority = false,
  frame = true,
}: {
  src: string;
  alt: string;
  sizes?: string;
  aspect?: string;
  objectPosition?: string;
  delay?: number;
  priority?: boolean;
  frame?: boolean;
}) {
  const reduce = useReducedMotion();
  const motionProps = reduce ? {} : revealImage(delay);

  return (
    <motion.div {...motionProps} className="group relative">
      <div className={`relative w-full overflow-hidden bg-mg-bg-raised ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${objectPosition} transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
        />
        {frame && (
          <div className="pointer-events-none absolute inset-3 border border-mg-bg opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-40" />
        )}
      </div>
    </motion.div>
  );
}
