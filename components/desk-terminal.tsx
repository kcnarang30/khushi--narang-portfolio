"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { TerminalWindow } from "./terminal-window";
import { cn } from "@/lib/utils";

const ROUTES = [
  { n: "01", label: "work", href: "/work" },
  { n: "02", label: "about", href: "/about" },
  { n: "03", label: "archive", href: "/archive" },
  { n: "04", label: "contact", href: "/contact" },
];

/**
 * A real doorway out of Playground, not a prop. Boots on click, echoes one
 * real command, then lists actual routes — every line is a working <Link>.
 * No invented commands, no fake technical claims.
 */
export function DeskTerminal({ className }: { className?: string }) {
  const [booted, setBooted] = useState(false);
  const reduce = useReducedMotion();

  return (
    <TerminalWindow label="khushi.sh" className={cn("w-56 sm:w-64", className)}>
      {!booted ? (
        <button
          type="button"
          onClick={() => setBooted(true)}
          className="focus-ring block w-full text-left"
        >
          <span>khushi@playground $ </span>
          <span aria-hidden className="inline-block w-[6px] animate-pulse bg-[#8fd68a]">
            &nbsp;
          </span>
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={reduce ? undefined : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <p>
              <span className="text-[#8fd68a]/50">khushi@playground $</span> --explore
            </p>
            <div className="mt-2 flex flex-col gap-0.5">
              {ROUTES.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="focus-ring group flex items-center gap-2 rounded-sm px-1 -mx-1 hover:bg-[#8fd68a]/10"
                >
                  <span className="text-[#8fd68a]/50">[{r.n}]</span>
                  <span className="group-hover:text-white">{r.label}</span>
                  <span aria-hidden className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </TerminalWindow>
  );
}
