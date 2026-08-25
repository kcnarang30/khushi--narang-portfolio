"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motion, useMotionValue, animate as fmAnimate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Drag the cassette onto the player and it docks in and plays — a short,
 * original chiptune synthesized live via Web Audio (square-wave oscillator),
 * not a real/licensed track. Drag it back off, or hit Eject, to stop.
 */

const NOTES = [392, 440, 494, 523, 494, 440, 392, 330];
const NOTE_MS = 220;

function useChiptune() {
  const ctxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);

  const play = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctxRef.current = new AudioCtx();
    }
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const tick = () => {
      const freq = NOTES[stepRef.current % NOTES.length];
      stepRef.current++;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + NOTE_MS / 1000);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + NOTE_MS / 1000);
    };
    tick();
    timerRef.current = window.setInterval(tick, NOTE_MS);
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => stop, [stop]);

  return { play, stop };
}

export function CassetteDeck({
  containerRef,
  className,
}: {
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const [docked, setDocked] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);
  const cassetteRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduce = useReducedMotion();
  const { play, stop } = useChiptune();

  function overlapsSlot() {
    if (!slotRef.current || !cassetteRef.current) return false;
    const slot = slotRef.current.getBoundingClientRect();
    const cass = cassetteRef.current.getBoundingClientRect();
    const cx = cass.left + cass.width / 2;
    const cy = cass.top + cass.height / 2;
    return cx > slot.left && cx < slot.right && cy > slot.top && cy < slot.bottom;
  }

  function handleDragEnd() {
    const overlapping = overlapsSlot();
    if (overlapping && !docked) {
      if (slotRef.current && cassetteRef.current) {
        const slot = slotRef.current.getBoundingClientRect();
        const cass = cassetteRef.current.getBoundingClientRect();
        const dx = slot.left + slot.width / 2 - (cass.left + cass.width / 2);
        const dy = slot.top + slot.height / 2 - (cass.top + cass.height / 2);
        if (reduce) {
          x.set(x.get() + dx);
          y.set(y.get() + dy);
        } else {
          fmAnimate(x, x.get() + dx, { type: "spring", stiffness: 400, damping: 30 });
          fmAnimate(y, y.get() + dy, { type: "spring", stiffness: 400, damping: 30 });
        }
      }
      setDocked(true);
      play();
    } else if (!overlapping && docked) {
      setDocked(false);
      stop();
    }
  }

  function eject() {
    setDocked(false);
    stop();
    if (!reduce) {
      fmAnimate(y, y.get() - 44, { type: "spring", stiffness: 300, damping: 22 });
    } else {
      y.set(y.get() - 44);
    }
  }

  return (
    <div className={cn("absolute", className)}>
      <div className="relative">
      {/* Player */}
      <div className="grain-card w-28 rounded-md border border-line-strong p-3" style={{ background: "#5a4a3a" }}>
        <p className="mb-2 text-center font-mono text-[7px] uppercase tracking-widest text-white/40">
          desk deck
        </p>
        <div
          ref={slotRef}
          className="flex h-10 items-center justify-center rounded-sm border-2 border-dashed"
          style={{
            borderColor: docked ? "transparent" : "rgba(255,255,255,0.25)",
            background: "#241c14",
          }}
        >
          <span
            className={cn(
              "font-mono text-[7.5px] uppercase tracking-widest text-white/50",
              docked && !reduce && "animate-pulse"
            )}
          >
            {docked ? "♪ playing" : "insert cassette"}
          </span>
        </div>
        {docked && (
          <button
            type="button"
            onClick={eject}
            className="focus-ring mt-2 w-full rounded-sm bg-[#3a2f24] py-1 font-mono text-[8px] uppercase tracking-widest text-white/50 transition-colors hover:text-white/80"
          >
            Eject
          </button>
        )}
      </div>

      {/* Cassette — draggable, snaps onto the slot */}
      <motion.div
        ref={cassetteRef}
        aria-hidden
        drag
        dragConstraints={containerRef}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        whileDrag={reduce ? undefined : { scale: 1.08, zIndex: 40 }}
        whileHover={reduce ? undefined : { scale: 1.02 }}
        style={{ x, y, touchAction: "none" }}
        className="absolute -bottom-14 left-1/2 w-20 -translate-x-1/2 cursor-grab touch-none select-none active:cursor-grabbing"
      >
        <div className="rounded-[3px] bg-[#2a2a2a] p-1.5 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between rounded-sm bg-[#e8dcc0] px-2.5 py-3">
            <span className="h-4 w-4 rounded-full border-2 border-black/50" />
            <span className="h-4 w-4 rounded-full border-2 border-black/50" />
          </div>
          <p className="mt-1 text-center font-pen text-[11px] leading-none text-white/70">mixtape</p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
