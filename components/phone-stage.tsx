"use client";

import { useRef } from "react";
import { NokiaPhone } from "./nokia-phone";
import { cn } from "@/lib/utils";

const MARQUEE_TEXT = "Contact me • ".repeat(10);

/**
 * The black stage the Nokia phone floats on — matches the reference site's
 * footer treatment: a giant, slow-looping "Contact me" marquee bleeding off
 * both edges behind a real physical object you can grab and toss around, on
 * near-pure black so the LCD green and gold CTA are the only saturated
 * color in the frame. Full-bleed and near-viewport-tall so it dominates the
 * screen the way the reference's footer does, rather than sitting as a
 * card inside the page's normal content column.
 */
export function PhoneStage({
  formAnchorId,
  className,
}: {
  formAnchorId?: string;
  className?: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={stageRef}
      className={cn(
        "relative isolate left-1/2 right-1/2 -mx-[50vw] flex w-screen min-h-[80vh] items-center justify-center overflow-hidden border-y border-line-strong bg-[#0a0a08] px-4 py-20 sm:min-h-[85vh]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center"
      >
        <div className="marquee-track flex w-max shrink-0">
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="flex shrink-0 items-center font-display text-8xl font-extrabold uppercase leading-none tracking-tight text-fg/[0.9] sm:text-[9rem]"
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      <NokiaPhone
        formAnchorId={formAnchorId}
        containerRef={stageRef}
        className="w-full max-w-[380px] shrink-0 sm:max-w-[440px]"
      />
    </div>
  );
}
