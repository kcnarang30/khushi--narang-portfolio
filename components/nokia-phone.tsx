"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";
import { motion, useAnimation, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { links } from "@/data/links";

/**
 * Matches the real Nokia-phone contact object from Khushi's live Framer
 * site pixel-for-pixel where it matters: VT323 for the screen (the real
 * site's actual font, not a generic mono), normal-case Plex Sans on the
 * buttons at real size (not tiny tracked-out caption text), amber for the
 * CTA (matching the real site's gold, not the portfolio's coral). Every
 * action is real: external social links, and both the screen's email text
 * and Contact Me open the real Dispatch Messenger form as a popup — no
 * mailto link, since it depends on a mail client nobody has configured.
 *
 * Draggable within its stage (containerRef) the same way the reference
 * site's phone is — a real physical object, not a static card. Three
 * composed transform layers, each independent so they never fight over
 * the same motion value: an outer drag layer (toss it, with momentum and
 * a bounce off the stage edges), a middle idle-float layer (a slow bob
 * loop when left alone), and an inner hover layer (nudges toward the
 * cursor while it's over the phone). Hover/idle stay off when
 * prefers-reduced-motion is set. Unlike the decorative Draggable wrapper
 * used elsewhere, this one stays in the accessibility tree: the phone's
 * content is the primary contact block, not a fidget.
 */
function useClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(format());
    const id = setInterval(tick, 15000);
    const first = setTimeout(tick, 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, []);
  return time;
}

export function NokiaPhone({
  onContactClick,
  className,
  containerRef,
}: {
  onContactClick?: () => void;
  className?: string;
  containerRef?: RefObject<HTMLElement | null>;
}) {
  const time = useClock();
  const reduce = useReducedMotion();
  const floatControls = useAnimation();
  const isHovering = useRef(false);
  const isDragging = useRef(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const hoverX = useSpring(rawX, { stiffness: 150, damping: 14, mass: 0.4 });
  const hoverY = useSpring(rawY, { stiffness: 150, damping: 14, mass: 0.4 });

  const startFloat = useCallback(() => {
    if (reduce || !containerRef) return;
    floatControls.start({
      y: [0, -14, 0, 10, 0],
      rotate: [0, -1.3, 0, 1.1, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    });
  }, [reduce, containerRef, floatControls]);

  useEffect(() => {
    startFloat();
  }, [startFloat]);

  function handlePointerMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !containerRef || isDragging.current) return;
    if (!isHovering.current) {
      isHovering.current = true;
      floatControls.stop();
      floatControls.set({ y: 0, rotate: 0 });
    }
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - rect.left) / rect.width - 0.5) * 26);
    rawY.set(((e.clientY - rect.top) / rect.height - 0.5) * 26);
  }

  function handlePointerLeave() {
    isHovering.current = false;
    rawX.set(0);
    rawY.set(0);
    if (!isDragging.current) startFloat();
  }

  return (
    <motion.div
      className={className}
      drag={!!containerRef}
      dragConstraints={containerRef}
      dragElastic={reduce ? 0 : 0.2}
      dragMomentum={!reduce && !!containerRef}
      dragTransition={{ power: 0.35, timeConstant: 200, bounceStiffness: 500, bounceDamping: 11 }}
      whileDrag={reduce ? undefined : { scale: 1.12, rotate: -6, zIndex: 30 }}
      whileHover={containerRef && !reduce ? { scale: 1.02 } : undefined}
      onDragStart={() => {
        isDragging.current = true;
        isHovering.current = false;
        floatControls.stop();
        floatControls.set({ y: 0, rotate: 0 });
        rawX.set(0);
        rawY.set(0);
      }}
      onDragEnd={() => {
        isDragging.current = false;
        startFloat();
      }}
      style={containerRef ? { touchAction: "none" } : undefined}
    >
      <motion.div animate={floatControls}>
        <motion.div
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          style={containerRef ? { x: hoverX, y: hoverY } : undefined}
          className={`grain-card rounded-[24px] border border-line-strong bg-bg-raised p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-6 ${containerRef ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
          <div
            className="relative flex flex-col rounded-lg bg-accent px-5 py-4"
            style={{ aspectRatio: "4/3", fontFamily: "var(--font-vt323)" }}
          >
            <div className="flex items-center justify-between text-[20px] leading-none text-black/70 sm:text-[22px]">
              <span>2G</span>
              <span className="tnum">{time ?? "—:—"}</span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="text-[18px] leading-none text-black/60 sm:text-[20px]">Contact me via email</p>
              <button
                type="button"
                onClick={onContactClick}
                onPointerDown={(e) => e.stopPropagation()}
                className="focus-ring mt-2 inline-block break-all rounded-sm text-[26px] leading-none text-black underline decoration-black/30 underline-offset-4 hover:decoration-black sm:text-[32px]"
              >
                {links.email}
              </button>
            </div>
          </div>

          <p className="mt-3 text-center font-body text-[13px] font-black text-fg-dim sm:text-[14px]">
            N404 Communications
          </p>

          <div className="mt-4 flex items-center gap-2.5">
            <span aria-hidden className="mr-0.5 flex shrink-0 gap-[3px]">
              {[0, 1, 2].map((i) => (
                <span key={i} className="h-6 w-[3px] -skew-x-12 bg-fg-dim/40" />
              ))}
            </span>
            <a
              href={links.behance}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 font-body text-[14px] font-medium text-fg-muted transition-all hover:text-fg active:scale-90"
            >
              Be
            </a>
            <a
              href={links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={(e) => e.stopPropagation()}
              className="focus-ring flex h-11 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 px-4 font-body text-[14px] font-medium text-fg-muted transition-all hover:text-fg active:scale-90"
            >
              Instagram
            </a>
            <button
              type="button"
              onClick={onContactClick}
              onPointerDown={(e) => e.stopPropagation()}
              className="focus-ring ml-auto flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-live-signal px-5 font-body text-[13px] font-semibold text-black transition-transform hover:brightness-105 active:translate-y-[2px] sm:text-[14px]"
            >
              Contact Me
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
