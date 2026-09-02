"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Project } from "@/data/types";
import { HandUnderline } from "./hand-underline";

const PREVIEW_WIDTH = 260;

/**
 * The index rows stay exactly where they are — hovering one doesn't scale
 * or lift it. Instead a real preview sheet appears beside the list, at a
 * slight physical offset, and swaps smoothly as you move between rows —
 * closer to sliding a finger down a filing-cabinet index and pulling the
 * one you land on halfway out, than a hover effect on a web card.
 */
export function WorkIndexList({ caseFiles }: { caseFiles: Project[] }) {
  const [active, setActive] = useState<{ project: Project; top: number; left: number } | null>(null);
  // The preview portal only exists client-side — mounting it unconditionally
  // on `typeof document` diverges from the server's render and breaks
  // hydration. Gate on a mount flag instead, set after the client attaches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  function showPreview(target: HTMLElement, p: Project) {
    const rect = target.getBoundingClientRect();
    setActive({ project: p, top: rect.top + rect.height / 2, left: rect.right + 32 });
  }

  return (
    <div onMouseLeave={() => setActive(null)}>
      <ol className="mt-4 flex flex-col gap-1.5 border-y border-mg-line py-4">
        {caseFiles.map((p, i) => (
          <li key={p.slug}>
            <a
              href={`#${p.slug}`}
              onMouseEnter={(e) => showPreview(e.currentTarget, p)}
              onFocus={(e) => showPreview(e.currentTarget, p)}
              className="group focus-ring -mx-2 flex items-baseline gap-3 rounded px-2 py-0.5 font-marginalia-sans text-[14px] text-mg-ink-muted transition-[color,transform] duration-200 ease-out hover:translate-x-1 hover:text-mg-ink active:scale-[0.98]"
            >
              <span className="w-5 shrink-0 tabular-nums text-mg-ink-faint transition-colors duration-200 group-hover:text-mg-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="relative">
                {p.name}
                <HandUnderline />
              </span>
              <span className="text-mg-ink-faint">&mdash; {p.category.replace("-", " ")}</span>
            </a>
          </li>
        ))}
      </ol>

      {mounted &&
        createPortal(
          <div
            aria-hidden
            className="pointer-events-none fixed z-[150] hidden -translate-y-1/2 lg:block"
            style={{ top: active?.top ?? 0, left: active?.left ?? 0, opacity: active ? 1 : 0, transition: "opacity 0.15s ease-out" }}
          >
            <AnimatePresence mode="wait">
              {active && active.project.coverImageSrc && active.project.coverImageWidth && active.project.coverImageHeight && (
                <motion.div
                  key={active.project.slug}
                  initial={{ opacity: 0, x: -12, rotate: -2 }}
                  animate={{ opacity: 1, x: 0, rotate: 1.5 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: PREVIEW_WIDTH }}
                >
                  <Image
                    src={active.project.coverImageSrc}
                    alt=""
                    width={active.project.coverImageWidth}
                    height={active.project.coverImageHeight}
                    style={{ width: "100%", height: "auto", maxHeight: 220, objectFit: "cover", filter: "drop-shadow(0 20px 30px rgba(36,31,24,0.35))" }}
                  />
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08, duration: 0.2 }}
                    className="mt-2 font-marginalia-serif text-[15px] text-mg-ink"
                  >
                    {active.project.name}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14, duration: 0.2 }}
                    className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint"
                  >
                    {active.project.category.replace("-", " ")} &middot; {active.project.status}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </div>
  );
}
