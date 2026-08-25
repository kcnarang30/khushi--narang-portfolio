"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Marginalia } from "./marginalia";
import { PhysicalButton } from "./physical-button";

/**
 * A small pile of real objects sitting slightly askew on the desk — not a
 * perfectly aligned mockup grid. Each piece has its own independent hover
 * (lift + straighten), no swap mechanic.
 */
export function HeroCover() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);

  return (
    <section ref={ref} className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        {/* Text column */}
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-dim">
            Product designer — Bengaluru
          </p>
          <h1 className="relative mt-4 font-display text-[13vw] font-extrabold leading-[0.98] tracking-tight sm:text-6xl md:text-[4.4rem]">
            Turning messy problems into{" "}
            <span className="text-accent">intuitive</span> experiences.
          </h1>
          <Marginalia className="mt-1 inline-flex text-lg sm:text-xl" rotate={-4}>
            (obvious, in hindsight)
          </Marginalia>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg-muted">
            I like asking annoying questions until the problem starts making sense.
            Currently designing at <span className="font-medium text-fg">YourStory</span> —
            product work, event experiences, and the occasional AI tool that has no
            business being this fun to build.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PhysicalButton href="/work">See the work</PhysicalButton>
            <PhysicalButton href="/about" variant="outline">
              More about me
            </PhysicalButton>
          </div>
        </div>

        {/* The pile */}
        <motion.div style={{ y: reduce ? 0 : y }} className="relative mx-auto h-[22rem] w-full max-w-sm sm:h-[26rem]">
          <span aria-hidden className="absolute right-10 top-2 h-2.5 w-2.5 rounded-full bg-ember" />

          {/* paper sheet, back layer */}
          <div
            className="absolute left-2 top-10 h-64 w-48 rotate-[-9deg] bg-paper shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:rotate-[-6deg]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 21px, var(--paper-dark) 22px)",
            }}
            aria-hidden
          />

          {/* first real screen, taped */}
          <div className="group/tape absolute left-10 top-4 w-44 rotate-[6deg] bg-white p-1.5 pb-6 shadow-[0_24px_44px_-18px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:-translate-y-1 hover:rotate-[3deg]">
            <span
              aria-hidden
              className="absolute -top-2.5 left-1/2 h-5 w-12 -translate-x-1/2 -rotate-3 bg-fg-muted/25"
            />
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-bg-raised">
              <Image
                src="/projects/shurukar/shurukar-onboarding.png"
                alt="ShuruKar onboarding screen"
                fill
                sizes="176px"
                className="object-cover object-left"
              />
            </div>
          </div>

          {/* second real screen, front layer */}
          <div className="absolute bottom-6 right-2 w-48 -rotate-[7deg] rounded-[8px] border-[6px] border-bg-raised-2 bg-bg-raised-2 shadow-[0_30px_50px_-16px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:translate-y-[-4px] hover:-rotate-[4deg]">
            <div className="relative aspect-[9/17] w-full overflow-hidden rounded-[3px]">
              <Image
                src="/projects/shurukar/shurukar-resources.png"
                alt="ShuruKar resources hub screen"
                fill
                sizes="192px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <Link
            href="/work/shurukar"
            className="focus-ring absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-sm bg-bg-raised px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-fg-dim shadow-[0_8px_16px_-8px_rgba(0,0,0,0.5)] transition-colors hover:text-accent"
          >
            ShuruKar, in beta →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
