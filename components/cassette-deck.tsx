"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { HandUnderline } from "./marginalia/hand-underline";

/**
 * Two short loops, synthesized live via Web Audio (square-wave oscillator) —
 * not a real recording, and not represented as one. Instead of drawing a
 * cassette deck, the visible object is the actual sound: real frequency
 * data from the oscillator's own analyser, drawn as bars while it plays.
 * That's the artifact — not a picture of a tape.
 */

const NOTE_MS = 220;
const BAR_COUNT = 28;

const TRACKS = [
  { id: "a", label: "side a", notes: [392, 440, 494, 523, 494, 440, 392, 330] },
  { id: "b", label: "side b", notes: [330, 370, 415, 440, 494, 440, 415, 370] },
];

function useChiptune() {
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  // A worn deck's motor never runs at exactly one speed — this is that,
  // read live on every note so dragging the knob bends pitch as it plays.
  const speedRef = useRef(1);

  const play = useCallback((notes: number[]) => {
    if (typeof window === "undefined") return;
    if (!ctxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
    }
    const ctx = ctxRef.current;
    const analyser = analyserRef.current!;
    if (ctx.state === "suspended") ctx.resume();
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    stepRef.current = 0;

    const tick = () => {
      const freq = notes[stepRef.current % notes.length] * speedRef.current;
      stepRef.current++;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + NOTE_MS / 1000);
      osc.connect(gain).connect(analyser);
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

  return { play, stop, analyserRef, speedRef };
}

const SPEED_MIN = -50;
const SPEED_MAX = 50;

/**
 * A real pitch-bend control, not decoration — dragging it changes
 * `speedRef` mid-playback, so you can hear the loop warp exactly like a
 * cassette motor being nudged. Drag vertically; the notch rotates to match.
 */
function SpeedKnob({ speedRef }: { speedRef: React.RefObject<number> }) {
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(0);

  function setValue(deg: number) {
    const clamped = Math.max(SPEED_MIN, Math.min(SPEED_MAX, deg));
    angleRef.current = clamped;
    setAngle(clamped);
    speedRef.current = 1 + clamped / 200;
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    const startY = e.clientY;
    const startAngle = angleRef.current;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    function onMove(ev: PointerEvent) {
      setValue(startAngle + (startY - ev.clientY) * 1.2);
    }
    function onUp() {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        onPointerDown={onPointerDown}
        role="slider"
        aria-label="Pitch"
        aria-valuemin={SPEED_MIN}
        aria-valuemax={SPEED_MAX}
        aria-valuenow={Math.round(angle)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp" || e.key === "ArrowRight") setValue(angleRef.current + 8);
          if (e.key === "ArrowDown" || e.key === "ArrowLeft") setValue(angleRef.current - 8);
        }}
        className="focus-ring relative flex h-8 w-8 shrink-0 cursor-ns-resize touch-none items-center justify-center rounded-full border border-mg-line bg-mg-bg-raised"
      >
        <span
          aria-hidden
          className="absolute h-3 w-[1.5px] rounded-full bg-mg-accent"
          style={{ top: 4, transformOrigin: "50% 12px", transform: `rotate(${angle * 1.4}deg)` }}
        />
      </div>
      <span className="font-marginalia-sans text-[9px] uppercase tracking-wide text-mg-ink-faint">Pitch</span>
    </div>
  );
}

const RESTING_LEVELS = Array(BAR_COUNT).fill(2);

function Waveform({ analyserRef, active }: { analyserRef: React.RefObject<AnalyserNode | null>; active: boolean }) {
  const [levels, setLevels] = useState<number[]>(RESTING_LEVELS);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      return;
    }
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteFrequencyData(data);
      const bars: number[] = [];
      for (let i = 0; i < BAR_COUNT; i++) {
        const v = data[i % data.length] ?? 0;
        bars.push(Math.max(2, (v / 255) * 32));
      }
      setLevels(bars);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, analyserRef]);

  const display = active ? levels : RESTING_LEVELS;

  return (
    <div className="flex h-8 items-end gap-[3px]" aria-hidden>
      {display.map((h, i) => (
        <span
          key={i}
          className="w-[2.5px] shrink-0 rounded-[1px] bg-mg-accent transition-[height,opacity] duration-100"
          style={{ height: h, opacity: active ? 0.85 : 0.25 }}
        />
      ))}
    </div>
  );
}

export function CassetteDeck({ className }: { className?: string }) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { play, stop, analyserRef, speedRef } = useChiptune();

  function toggle(id: string) {
    const track = TRACKS.find((t) => t.id === id);
    if (!track) return;
    if (playingId === id) {
      stop();
      setPlayingId(null);
    } else {
      play(track.notes);
      setPlayingId(id);
    }
  }

  return (
    <div className={cn("w-fit", className)}>
      <p className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">A mixtape</p>
      <div className="mt-2 flex items-baseline gap-5">
        {TRACKS.map((track) => (
          <button
            key={track.id}
            type="button"
            onClick={() => toggle(track.id)}
            aria-pressed={playingId === track.id}
            className={cn(
              "group focus-ring relative font-marginalia-serif text-[16px] transition-colors",
              playingId === track.id ? "text-mg-accent" : "text-mg-ink hover:text-mg-ink"
            )}
          >
            {track.label}
            <HandUnderline active={playingId === track.id} />
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-end gap-4">
        <Waveform analyserRef={analyserRef} active={playingId !== null} />
        <SpeedKnob speedRef={speedRef} />
      </div>
      <p className="mt-2 max-w-[13rem] font-marginalia-sans text-[12px] leading-snug text-mg-ink-muted">
        Two loops I synthesized live, not a real recording &mdash; drag the knob to warp the pitch while it plays.
      </p>
    </div>
  );
}
