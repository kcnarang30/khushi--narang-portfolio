"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Handwritten } from "./handwritten";
import { PaperNote } from "./paper-note";
import { about } from "@/data/about";

/**
 * The homepage's one real "poke around and find something" moment — not a
 * decoration, an actual click. The trigger label was already sitting next
 * to the photo doing nothing; this makes it open into real interests from
 * data/about.ts (never invented), the same way ConsolePing does elsewhere.
 */
export function DeskThought({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const items = about.outsideOfWork.slice(0, 5);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="focus-ring rounded"
      >
        <Handwritten rotate={-6} className="text-lg sm:text-xl">
          currently thinking about —
        </Handwritten>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, y: -6, scale: 0.92 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -6, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-20 mt-2 w-44"
          >
            <PaperNote rotate={-2} className="text-left">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="focus-ring absolute right-2 top-1.5 font-mono text-[10px] uppercase tracking-widest text-bg/40 hover:text-bg/70"
              >
                ✕
              </button>
              <p className="pr-4 font-mono text-[9px] uppercase tracking-widest text-bg/45">
                the usual suspects
              </p>
              <ul className="mt-2 flex flex-col gap-1">
                {items.map((item) => (
                  <li key={item} className="font-pen text-[15px] leading-tight text-bg/80">
                    {item}
                  </li>
                ))}
              </ul>
            </PaperNote>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
