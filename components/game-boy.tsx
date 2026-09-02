"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A real small Snake game — the screen itself IS the artifact, not a device
 * pretending to contain one. No shell, no bezel, no frame: just the actual
 * rendered game sitting on the page with plain typographic annotation next
 * to it, the way you'd label a thing rather than build a display case for it.
 */

const GRID = 10;
const CELL = 13;
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

function ArrowGlyph({ label, glyph, onClick }: { label: string; glyph: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="focus-ring flex h-9 w-9 items-center justify-center font-marginalia-sans text-[16px] text-mg-ink-faint transition-colors hover:text-mg-ink"
    >
      {glyph}
    </button>
  );
}

export function GameBoy({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "playing" | "over">("idle");
  const [snake, setSnake] = useState<Point[]>(START_SNAKE);
  const [food, setFood] = useState<Point>(() => randomFood(START_SNAKE));
  const [score, setScore] = useState(0);
  // A real high score, kept locally — this browser's best, not a fabricated one.
  const [highScore, setHighScore] = useState(0);
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const nextDirRef = useRef<Point>({ x: 1, y: 0 });

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = window.localStorage.getItem("snake-high-score");
        if (saved) setHighScore(Number(saved) || 0);
      } catch {
        // localStorage unavailable — high score just won't persist, that's fine
      }
    });
  }, []);

  const start = useCallback(() => {
    setSnake(START_SNAKE);
    setFood(randomFood(START_SNAKE));
    setScore(0);
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    setStatus("playing");
  }, []);

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

  useEffect(() => {
    if (status !== "over") return;
    queueMicrotask(() => {
      setHighScore((prev) => {
        if (score <= prev) return prev;
        try {
          window.localStorage.setItem("snake-high-score", String(score));
        } catch {
          // no persistence available — the in-memory value still shows for this session
        }
        return score;
      });
    });
  }, [status, score]);

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
    <div className={cn("inline-block w-fit select-none", className)}>
      <div
        aria-live="polite"
        onClick={() => status !== "playing" && start()}
        className="relative overflow-hidden"
        style={{
          background: "#9bbc0f",
          width: GRID * CELL,
          height: GRID * CELL,
          cursor: status === "playing" ? "default" : "pointer",
          boxShadow: "inset 0 0 12px rgba(15,26,8,0.35), inset 0 0 2px rgba(15,26,8,0.5)",
        }}
      >
        {status !== "playing" && (
          <div className="flex h-full items-center justify-center px-1.5 text-center font-mono" style={{ color: "#0f1a08" }}>
            {status === "idle" ? (
              <p className="text-[9px] font-bold uppercase tracking-widest">
                <span className="animate-pulse">Press start</span>
                {highScore > 0 && (
                  <>
                    <br />
                    <span className="text-[7px] font-normal normal-case tracking-normal opacity-70">best: {highScore}</span>
                  </>
                )}
              </p>
            ) : (
              <p className="text-[9px] font-bold uppercase tracking-widest">
                Score {score}
                {score >= highScore && score > 0 ? " — new best!" : ""}
                <br />
                <span className="animate-pulse">retry?</span>
              </p>
            )}
          </div>
        )}
        {status === "playing" && (
          <>
            <div
              aria-hidden
              className="absolute"
              style={{ left: food.x * CELL, top: food.y * CELL, width: CELL - 1, height: CELL - 1, background: "#4a5d0a" }}
            />
            {snake.map((s, i) => (
              <div
                key={i}
                aria-hidden
                className="absolute"
                style={{ left: s.x * CELL, top: s.y * CELL, width: CELL - 1, height: CELL - 1, background: "#0f1a08" }}
              />
            ))}
          </>
        )}
      </div>

      <p className="mt-3 font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">Snake</p>
      <p className="mt-1 max-w-[11rem] font-marginalia-sans text-[12.5px] leading-snug text-mg-ink-muted">
        Built because I wanted to see if I could make a game.
      </p>
      <p className="mt-1.5 font-marginalia-hand text-[14px] text-mg-accent" style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}>
        it works lol
      </p>

      <div className="mt-3 flex items-center gap-4">
        <p className="hidden font-marginalia-sans text-[11.5px] text-mg-ink-faint sm:block">
          {status === "playing" ? `Score — ${score}` : "↑ ↓ ← → / WASD"}
        </p>
        <div className="flex items-center gap-0.5 sm:hidden">
          <ArrowGlyph label="Left" glyph="◂" onClick={() => turn(-1, 0)} />
          <div className="flex flex-col">
            <ArrowGlyph label="Up" glyph="▴" onClick={() => turn(0, -1)} />
            <ArrowGlyph label="Down" glyph="▾" onClick={() => turn(0, 1)} />
          </div>
          <ArrowGlyph label="Right" glyph="▸" onClick={() => turn(1, 0)} />
        </div>
      </div>
    </div>
  );
}
