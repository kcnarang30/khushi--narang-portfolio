"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PushPin } from "./push-pin";
import { about } from "@/data/about";

/**
 * A small hidden interaction — flavor text built from real data (location,
 * current role), never invented stats. Reads as a pinned, folded scrap of
 * paper that unfolds open on click, not a terminal window.
 */
export function ConsolePing() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <PushPin color="yellow" size="1.1rem" className="-top-2 left-1/2 -translate-x-1/2" />
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.button
            key="folded"
            type="button"
            onClick={() => setOpen(true)}
            initial={reduce ? undefined : { opacity: 0, scaleY: 0.4 }}
            animate={reduce ? undefined : { opacity: 1, scaleY: 1 }}
            exit={reduce ? undefined : { opacity: 0, scaleY: 0.4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: "rotate(-2deg)", transformOrigin: "top center" }}
            className="focus-ring group relative block bg-paper px-4 py-3 text-left shadow-[0_14px_24px_-14px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-0.5"
          >
            <span
              aria-hidden
              className="absolute bottom-0 right-0 h-3.5 w-3.5 bg-paper-dark"
              style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
            />
            <span className="font-mono text-[11px] uppercase tracking-wide text-bg/70">
              Want to see something weird?
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="unfolded"
            initial={reduce ? undefined : { opacity: 0, scaleY: 0.15 }}
            animate={reduce ? undefined : { opacity: 1, scaleY: 1 }}
            exit={reduce ? undefined : { opacity: 0, scaleY: 0.3 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: "rotate(-1deg)", transformOrigin: "top center" }}
            className="grain-paper relative max-w-sm bg-paper px-5 py-4 text-bg shadow-[0_20px_36px_-16px_rgba(0,0,0,0.5)]"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fold back up"
              className="focus-ring absolute right-2.5 top-2.5 font-mono text-[10px] uppercase tracking-widest text-bg/40 hover:text-bg/70"
            >
              fold ✕
            </button>
            <p className="pr-10 font-mono text-[12px] leading-relaxed">
              <span className="text-bg/45">$</span> whoami
              <br />
              <span className="text-bg/70">product designer, {about.location.toLowerCase()}</span>
            </p>
            <p className="mt-3 font-mono text-[12px] leading-relaxed">
              <span className="text-bg/45">$</span> cat status.txt
              <br />
              <span className="text-bg/70">
                currently at {about.currentRoles[0].org}. always down to talk about a good problem.
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
