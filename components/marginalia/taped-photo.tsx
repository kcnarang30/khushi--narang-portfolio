"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_SETTLE, EASE_RESPONSE, DURATION } from "@/lib/motion";

/**
 * A real personal photograph, held to the page by one strip of tape — used
 * where a photo is a *personal* object (About, Contact), not a project
 * screenshot (those go through EditorialImage instead, no tape). On hover
 * the photo lifts very slightly, like it's loose under the tape, not stuck
 * to the page — the tape stays put, only the photo moves.
 */
export function TapedPhoto({
  src,
  alt,
  rotate = -2,
  tapeSide = "top",
  width = 220,
  height = 270,
  delay = 0,
}: {
  src: string;
  alt: string;
  rotate?: number;
  tapeSide?: "top" | "left" | "right";
  width?: number;
  height?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  const tapePos =
    tapeSide === "top"
      ? "left-1/2 -top-3 -translate-x-1/2 rotate-[-3deg] w-16 h-7"
      : tapeSide === "left"
        ? "-left-3 top-6 -rotate-[92deg] w-16 h-7"
        : "-right-3 top-6 rotate-[92deg] w-16 h-7";

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 16, rotate: 0 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: DURATION.settle, delay, ease: EASE_SETTLE }}
      whileHover={reduce ? undefined : { y: -5, rotate: rotate * 0.6, transition: { duration: DURATION.hover, ease: EASE_RESPONSE } }}
      style={reduce ? { transform: `rotate(${rotate}deg)` } : undefined}
      className="relative inline-block"
    >
      <span className={`absolute z-10 bg-[#e8e2d4]/70 shadow-sm ${tapePos}`} aria-hidden />
      <div className="bg-mg-bg-raised p-2 pb-6 shadow-[0_18px_34px_-14px_rgba(36,31,24,0.35)]">
        <div className="relative overflow-hidden" style={{ width, aspectRatio: `${width}/${height}` }}>
          <Image src={src} alt={alt} fill sizes={`${width}px`} className="object-cover" />
        </div>
      </div>
    </motion.div>
  );
}
