"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { links } from "@/data/links";

/**
 * Matches the real Nokia-phone contact object from Khushi's live Framer
 * site pixel-for-pixel where it matters: VT323 for the screen (the real
 * site's actual font, not a generic mono), normal-case Plex Sans on the
 * buttons at real size (not tiny tracked-out caption text), amber for the
 * CTA (matching the real site's gold, not the portfolio's coral). Every
 * action is real: mailto, external social links, and a scroll to the real
 * dispatch form.
 */
function useClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () => new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    const tick = () => setTime(format());
    const id = setInterval(tick, 15000);
    const first = setTimeout(tick, 0);
    return () => {
      clearInterval(id);
      clearTimeout(first);
    };
  }, []);
  return time;
}

export function NokiaPhone({ formAnchorId, className }: { formAnchorId?: string; className?: string }) {
  const time = useClock();

  return (
    <div className={className}>
      <div className="grain-card rounded-[24px] border border-line-strong bg-bg-raised p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-6">
        <div
          className="relative flex flex-col rounded-lg bg-accent px-5 py-4"
          style={{ aspectRatio: "4/3", fontFamily: "var(--font-vt323)" }}
        >
          <div className="flex items-center justify-between text-[20px] leading-none text-black/70 sm:text-[22px]">
            <span>2G</span>
            <span className="tnum">{time ?? "—:—"}</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="text-[18px] leading-none text-black/60 sm:text-[20px]">Contact me via email</p>
            <a
              href={`mailto:${links.email}`}
              className="focus-ring mt-2 inline-block break-all rounded-sm text-[26px] leading-none text-black underline decoration-black/30 underline-offset-4 hover:decoration-black sm:text-[32px]"
            >
              {links.email}
            </a>
          </div>
        </div>

        <p className="mt-3 text-center font-body text-[13px] font-black text-fg-dim sm:text-[14px]">
          N404 Communications
        </p>

        <div className="mt-4 flex items-center gap-2.5">
          <span aria-hidden className="mr-0.5 flex shrink-0 gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-6 w-[3px] -skew-x-12 bg-fg-dim/40" />
            ))}
          </span>
          <a
            href={links.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 font-body text-[14px] font-medium text-fg-muted transition-all hover:text-fg active:scale-90"
          >
            Be
          </a>
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex h-11 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 px-4 font-body text-[14px] font-medium text-fg-muted transition-all hover:text-fg active:scale-90"
          >
            Instagram
          </a>
          <Link
            href={formAnchorId ? `#${formAnchorId}` : "#"}
            className="focus-ring ml-auto flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-live-signal px-5 font-body text-[13px] font-semibold text-black transition-transform hover:brightness-105 active:translate-y-[2px] sm:text-[14px]"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}
