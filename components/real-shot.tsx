"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * An actual screenshot, shown at real scale — no window chrome, no fake
 * aspect-ratio box pretending to be UI. The image is the design. Click to
 * see it larger — these are often small (270-975px real exports) and the
 * detail is the point.
 */
export function RealShot({
  src,
  width,
  height,
  alt,
  caption,
  className,
  sizes = "(max-width: 768px) 100vw, 700px",
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  className?: string;
  sizes?: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring group block w-full cursor-zoom-in rounded-sm text-left"
        aria-label={`Open a larger view of ${alt}`}
      >
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          className={cn(
            "h-auto w-full rounded-sm border border-line-strong",
            !reduce && "transition-transform duration-300 ease-out group-hover:scale-[1.015]"
          )}
        />
      </button>
      {caption && <p className="mt-2 font-mono text-[10.5px] text-fg-dim">{caption}</p>}

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-bg/96 p-6 backdrop-blur-sm sm:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="focus-ring absolute right-5 top-5 rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
            >
              Close ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element -- full-res lightbox view, next/image's fixed sizing fights max-h/max-w here */}
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[92vw] rounded-sm border border-line-strong object-contain shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
            />
            {caption && (
              <p className="max-w-lg text-center font-mono text-[11px] text-fg-dim">{caption}</p>
            )}
          </div>,
          document.body
        )}
    </div>
  );
}
