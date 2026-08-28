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
      <div
        className="grain-card w-36 rounded-lg border border-line-strong p-3.5 shadow-[0_20px_36px_-16px_rgba(0,0,0,0.55)]"
        style={{ background: "linear-gradient(160deg, #4a4038 0%, #2e2822 100%)" }}
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[7px] uppercase tracking-widest text-white/40">Desk Deck</p>
          <span
            aria-hidden
            className="h-[5px] w-[5px] rounded-full"
            style={{
              background: docked ? "#ff5a5a" : "#3a332c",
              boxShadow: docked ? "0 0 4px 1px rgba(255,90,90,0.7)" : "none",
            }}
          />
        </div>

        {/* Window — reels visible even empty, glassy inset look */}
        <div
          ref={slotRef}
          className="relative flex h-11 items-center justify-center overflow-hidden rounded-[3px]"
          style={{
            background: "#151210",
            boxShadow: "inset 0 2px 5px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          <span
            aria-hidden
            className="absolute left-3 h-4 w-4 rounded-full border-2"
            style={{ borderColor: docked ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)" }}
          />
          <span
            aria-hidden
            className="absolute right-3 h-4 w-4 rounded-full border-2"
            style={{ borderColor: docked ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.12)" }}
          />
          <span
            className={cn(
              "relative font-mono text-[6.5px] uppercase tracking-widest text-white/45",
              docked && !reduce && "animate-pulse"
            )}
          >
            {docked ? "♪ playing" : "insert cassette"}
          </span>
        </div>

        {/* Transport row — Eject is real, the rest are decorative texture */}
        <div className="mt-2.5 flex items-center gap-1">
          <span aria-hidden className="flex h-5 flex-1 items-center justify-center rounded-sm bg-black/25 font-mono text-[8px] text-white/35">
            ◂◂
          </span>
          <span aria-hidden className="flex h-5 flex-1 items-center justify-center rounded-sm bg-black/25 font-mono text-[8px] text-white/35">
            {docked ? "❚❚" : "▸"}
          </span>
          <span aria-hidden className="flex h-5 flex-1 items-center justify-center rounded-sm bg-black/25 font-mono text-[8px] text-white/35">
            ▸▸
          </span>
          <button
            type="button"
            onClick={eject}
            disabled={!docked}
            className="focus-ring flex h-5 flex-1 items-center justify-center rounded-sm bg-[#3a2f24] font-mono text-[7.5px] uppercase tracking-wide text-white/50 transition-colors enabled:hover:text-white/85 disabled:opacity-40"
          >
            Eject
          </button>
        </div>

        {/* Speaker grille */}
        <div aria-hidden className="mt-2.5 grid grid-cols-8 gap-[2.5px]">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="h-[2.5px] w-[2.5px] rounded-full bg-black/40" />
          ))}
        </div>
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
        className="absolute -bottom-16 left-1/2 -ml-12 w-24 cursor-grab touch-none select-none active:cursor-grabbing"
      >
        <div className="rounded-[3px] bg-[#242424] p-1.5 shadow-[0_10px_20px_-8px_rgba(0,0,0,0.55)]">
          <div className="rounded-sm bg-[#e8dcc0] px-2 py-2">
            <div className="flex items-center justify-between">
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-black/50">
                <span className="h-[3px] w-[3px] rounded-full bg-black/50" />
              </span>
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-black/50">
                <span className="h-[3px] w-[3px] rounded-full bg-black/50" />
              </span>
            </div>
            <div className="mx-auto mt-1 h-[2px] w-10 bg-black/30" />
          </div>
          <p className="mt-1 text-center font-pen text-[11px] leading-none text-white/70">mixtape — side b</p>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
