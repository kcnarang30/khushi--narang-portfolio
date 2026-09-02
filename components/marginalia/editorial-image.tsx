"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { revealImage } from "@/lib/motion";

/**
 * The one image treatment for real screenshots/photography across the site:
 * settles in on scroll, a soft frame-line fades in on hover (the image is
 * being looked at), a small consistent scale. No browser chrome, ever —
 * screenshots are placed directly, not framed as "a picture of a website."
 *
 * `interactive` (homepage only) adds a very small cursor-tracked shift —
 * the image drifting a few px opposite the pointer, like it's being tilted
 * to catch the light rather than sitting flat behind glass. Opt-in so case
 * studies keep the plainer, already-settled treatment.
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
  interactive = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  aspect?: string;
  objectPosition?: string;
  delay?: number;
  priority?: boolean;
  frame?: boolean;
  interactive?: boolean;
}) {
  const reduce = useReducedMotion();
  const motionProps = reduce ? {} : revealImage(delay);
  const [shift, setShift] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!interactive || reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setShift({ x: px * -10, y: py * -8 });
  }

  return (
    <motion.div {...motionProps} className="group relative">
      <div
        className={`relative w-full overflow-hidden bg-mg-bg-raised ${aspect}`}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setShift({ x: 0, y: 0 });
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={
            interactive
              ? { transform: `translate(${shift.x}px, ${shift.y}px) scale(${hovered ? 1.05 : 1})`, transition: "transform 0.3s ease-out" }
              : undefined
          }
          className={`object-cover ${objectPosition} ${interactive ? "" : "transition-transform duration-700 ease-out group-hover:scale-[1.02]"}`}
        />
        {frame && (
          <div className="pointer-events-none absolute inset-3 border border-mg-bg opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-40" />
        )}
      </div>
    </motion.div>
  );
}
