"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The deferred Game Boy interaction, finally built — an actual small Snake
 * game, not a fictional project. Own colour identity (lavender shell,
 * classic DMG-green screen), scoped locally, no global tokens touched.
 */

const GRID = 10;
const CELL = 11;
const TICK_MS = 480;

type Point = { x: number; y: number };

const START_SNAKE: Point[] = [
  { x: 4, y: 5 },
  { x: 3, y: 5 },
  { x: 2, y: 5 },
];

function randomFood(occupied: Point[]): Point {
  let p: Point;
  do {
    p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (occupied.some((s) => s.x === p.x && s.y === p.y));
  return p;
}

function ControlButton({
  label,
  onClick,
  children,
  className,
  style,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={style}
      className={cn(
        "focus-ring flex items-center justify-center rounded-full bg-[#3a3752] font-mono text-[10px] font-bold text-white/70 shadow-[0_2px_0_0_#232238] transition-transform active:translate-y-[1px] active:shadow-none",
        className
      )}
    >
      {children}
    </button>
  );
}

export function GameBoy({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "playing" | "over">("idle");
  const [snake, setSnake] = useState<Point[]>(START_SNAKE);
  const [food, setFood] = useState<Point>(() => randomFood(START_SNAKE));
  const [score, setScore] = useState(0);
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const nextDirRef = useRef<Point>({ x: 1, y: 0 });

  const start = useCallback(() => {
    setSnake(START_SNAKE);
    setFood(randomFood(START_SNAKE));
    setScore(0);
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    setStatus("playing");
  }, []);

  const reset = useCallback(() => setStatus("idle"), []);

  const turn = useCallback(
    (dx: number, dy: number) => {
      if (status !== "playing") {
        start();
        return;
      }
      if (dirRef.current.x === -dx && dirRef.current.y === -dy) return;
      nextDirRef.current = { x: dx, y: dy };
    },
    [status, start]
  );

  // Game loop
  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => {
      dirRef.current = nextDirRef.current;
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + dirRef.current.x, y: head.y + dirRef.current.y };
        const hitWall = newHead.x < 0 || newHead.x >= GRID || newHead.y < 0 || newHead.y >= GRID;
        const hitSelf = prev.some((s) => s.x === newHead.x && s.y === newHead.y);
        if (hitWall || hitSelf) {
          setStatus("over");
          return prev;
        }
        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const nextSnake = [newHead, ...prev];
        if (ateFood) {
          setScore((s) => s + 1);
          setFood(randomFood(nextSnake));
        } else {
          nextSnake.pop();
        }
        return nextSnake;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, [status, food]);

  // Keyboard controls while playing
  useEffect(() => {
    if (status !== "playing") return;
    const map: Record<string, [number, number]> = {
      ArrowUp: [0, -1],
      w: [0, -1],
      ArrowDown: [0, 1],
      s: [0, 1],
      ArrowLeft: [-1, 0],
      a: [-1, 0],
      ArrowRight: [1, 0],
      d: [1, 0],
    };
    function onKey(e: KeyboardEvent) {
      const dir = map[e.key];
      if (!dir) return;
      e.preventDefault();
      turn(dir[0], dir[1]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, turn]);

  return (
    <div
      className={cn(
        "grain-card w-52 select-none rounded-[20px] border border-line-strong p-5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
      style={{ background: "#8a86ab", transform: "scale(1.4)" }}
    >
      {/* Power LED + brand row */}
      <div className="mb-1.5 flex items-center gap-1.5 pl-1">
        <span
          aria-hidden
          className="h-[5px] w-[5px] shrink-0 rounded-full"
          style={{ background: "#ff5a5a", boxShadow: "0 0 3px 1px rgba(255,90,90,0.7)" }}
        />
        <span className="font-mono text-[6.5px] uppercase tracking-[0.15em] text-black/40">Power</span>
      </div>

      {/* Screen */}
      <div className="rounded-t-md rounded-b-[26px] border-4 p-3 pb-4" style={{ background: "#4a4763", borderColor: "#3a3752" }}>
        <div className="flex items-center justify-between px-0.5 pb-1.5">
          <span className="font-mono text-[6.5px] uppercase tracking-wide text-white/35">Dot Matrix</span>
        </div>
        <div className="flex justify-center rounded-sm p-1" style={{ background: "#3a3752" }}>
        <div
          aria-live="polite"
          className="relative flex items-center justify-center overflow-hidden rounded-[2px]"
          style={{ background: "#9bbc0f", width: GRID * CELL, height: GRID * CELL }}
        >
          {status !== "playing" && (
            <div className="px-2 text-center font-mono" style={{ color: "#0f1a08" }}>
              {status === "idle" ? (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Snake</p>
                  <p className="mt-1.5 animate-pulse text-[9px] uppercase">▸ Press A</p>
                </>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-widest">Game over</p>
                  <p className="mt-1 text-[9px]">Score {score}</p>
                  <p className="mt-1.5 animate-pulse text-[8px] uppercase">▸ A to retry</p>
                </>
              )}
            </div>
          )}
          {status === "playing" && (
            <>
              <div
                aria-hidden
                className="absolute rounded-[2px]"
                style={{ left: food.x * CELL, top: food.y * CELL, width: CELL - 1, height: CELL - 1, background: "#4a5d0a" }}
              />
              {snake.map((s, i) => (
                <div
                  key={i}
                  aria-hidden
                  className="absolute rounded-[1px]"
                  style={{ left: s.x * CELL, top: s.y * CELL, width: CELL - 1, height: CELL - 1, background: "#0f1a08" }}
                />
              ))}
            </>
          )}
        </div>
        </div>
        <p
          className="mt-2 text-right font-pen text-[13px] italic leading-none tracking-tight text-white/70"
          style={{ fontFamily: "Georgia, serif" }}
        >
          GAME BOY <span style={{ color: "#e05a8a" }}>▸▸</span> <span style={{ color: "#3fa8e0" }}>color</span>
        </p>
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="grid grid-cols-3 gap-1.5">
          <span aria-hidden />
          <ControlButton label="Up" onClick={() => turn(0, -1)} className="h-7 w-7">
            ▴
          </ControlButton>
          <span aria-hidden />
          <ControlButton label="Left" onClick={() => turn(-1, 0)} className="h-7 w-7">
            ◂
          </ControlButton>
          <span aria-hidden />
          <ControlButton label="Right" onClick={() => turn(1, 0)} className="h-7 w-7">
            ▸
          </ControlButton>
          <span aria-hidden />
          <ControlButton label="Down" onClick={() => turn(0, 1)} className="h-7 w-7">
            ▾
          </ControlButton>
          <span aria-hidden />
        </div>
        <div className="flex items-end gap-2.5">
          <ControlButton
            label="Back to start"
            onClick={reset}
            className="h-8 w-8 text-white/90 shadow-[0_2px_0_0_#5a2230]"
            style={{ background: "#8a3348" }}
          >
            B
          </ControlButton>
          <ControlButton
            label={status === "playing" ? "Restart" : "Start"}
            onClick={start}
            className="h-9 w-9 text-white/90 shadow-[0_2px_0_0_#5a2230]"
            style={{ background: "#a53a52" }}
          >
            A
          </ControlButton>
        </div>
      </div>

      {/* Start / Select + speaker grille */}
      <div className="mt-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col items-center gap-0.5">
            <span className="h-[5px] w-6 rotate-[-20deg] rounded-full bg-[#3a3752] shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" />
            <span className="font-mono text-[5.5px] uppercase tracking-wide text-black/35">Select</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="h-[5px] w-6 rotate-[-20deg] rounded-full bg-[#3a3752] shadow-[0_1px_0_0_rgba(255,255,255,0.08)]" />
            <span className="font-mono text-[5.5px] uppercase tracking-wide text-black/35">Start</span>
          </div>
        </div>
        <div aria-hidden className="grid grid-cols-4 gap-[3px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-[3px] w-[3px] rounded-full bg-black/20" />
          ))}
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-widest text-white/40">
        {status === "playing" ? `Score — ${score}` : "Snake"}
      </p>
    </div>
  );
}
