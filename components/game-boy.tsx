"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The deferred Game Boy interaction, finally built — an actual small Snake
 * game, not a fictional project. Own colour identity (lavender shell,
 * classic DMG-green screen), scoped locally, no global tokens touched.
 */

const GRID = 10;
const CELL = 9;
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
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "focus-ring flex items-center justify-center rounded-full bg-[#3a3752] font-mono text-[9px] font-bold text-white/70 shadow-[0_2px_0_0_#232238] transition-transform active:translate-y-[1px] active:shadow-none",
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
        "grain-card w-40 select-none rounded-[18px] border border-line-strong p-4 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
      style={{ background: "#8a86ab" }}
    >
      {/* Screen */}
      <div className="flex justify-center rounded-md border-4 p-2" style={{ background: "#4a4763", borderColor: "#3a3752" }}>
        <div
          aria-live="polite"
          className="relative flex items-center justify-center overflow-hidden rounded-[2px]"
          style={{ background: "#9bbc0f", width: GRID * CELL, height: GRID * CELL }}
        >
          {status !== "playing" && (
            <div className="px-1 text-center font-mono" style={{ color: "#0f1a08" }}>
              {status === "idle" ? (
                <>
                  <p className="text-[8px] font-bold uppercase tracking-widest">Snake</p>
                  <p className="mt-1 animate-pulse text-[8px] uppercase">▸ Press A</p>
                </>
              ) : (
                <>
                  <p className="text-[8px] font-bold uppercase tracking-widest">Game over</p>
                  <p className="text-[8px]">Score {score}</p>
                  <p className="mt-1 animate-pulse text-[7px] uppercase">▸ A to retry</p>
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

      {/* Controls */}
      <div className="mt-3 flex items-center justify-between">
        <div className="grid grid-cols-3 gap-1">
          <span aria-hidden />
          <ControlButton label="Up" onClick={() => turn(0, -1)} className="h-6 w-6">
            ▴
          </ControlButton>
          <span aria-hidden />
          <ControlButton label="Left" onClick={() => turn(-1, 0)} className="h-6 w-6">
            ◂
          </ControlButton>
          <span aria-hidden />
          <ControlButton label="Right" onClick={() => turn(1, 0)} className="h-6 w-6">
            ▸
          </ControlButton>
          <span aria-hidden />
          <ControlButton label="Down" onClick={() => turn(0, 1)} className="h-6 w-6">
            ▾
          </ControlButton>
          <span aria-hidden />
        </div>
        <div className="flex items-center gap-2">
          <ControlButton label="Back to start" onClick={reset} className="h-7 w-7">
            B
          </ControlButton>
          <ControlButton
            label={status === "playing" ? "Restart" : "Start"}
            onClick={start}
            className="h-8 w-8 bg-ember text-black shadow-[0_2px_0_0_var(--ember-dim)]"
          >
            A
          </ControlButton>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-widest text-white/40">
        {status === "playing" ? `Score — ${score}` : "Snake"}
      </p>
    </div>
  );
}
