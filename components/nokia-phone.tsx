"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { links } from "@/data/links";

/**
 * Matches the real Nokia-phone contact object from Khushi's live Framer
 * site — 2G + clock, real email as the screen's content, "N404
 * Communications" caption, Be/Instagram/Contact Me as the three buttons.
 * Every action is real: mailto, external social links, and a scroll to the
 * real dispatch form.
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
      <div className="grain-card rounded-[20px] border border-line-strong bg-bg-raised p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="relative flex flex-col justify-between rounded-md bg-accent p-4" style={{ aspectRatio: "4/3" }}>
          <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wide text-black/70">
            <span>2G</span>
            <span className="tnum">{time ?? "—:—"}</span>
          </div>
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/60">Contact me via email</p>
            <a
              href={`mailto:${links.email}`}
              className="focus-ring mt-1 inline-block break-all rounded-sm font-mono text-[15px] font-bold text-black underline decoration-black/30 underline-offset-2 hover:decoration-black sm:text-base"
            >
              {links.email}
            </a>
          </div>
          <p className="text-center font-mono text-[9px] font-bold uppercase tracking-wide text-black/50">
            N404 Communications
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2.5">
          <a
            href={links.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 font-mono text-[10px] uppercase text-fg-muted transition-all hover:text-fg active:scale-90"
          >
            Be
          </a>
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex h-10 shrink-0 items-center justify-center rounded-full bg-bg-raised-2 px-3.5 font-mono text-[10px] uppercase text-fg-muted transition-all hover:text-fg active:scale-90"
          >
            Instagram
          </a>
          <Link
            href={formAnchorId ? `#${formAnchorId}` : "#"}
            className="focus-ring ml-auto flex h-10 items-center justify-center rounded-full bg-ember px-4 font-mono text-[10px] font-bold uppercase tracking-widest text-black transition-transform hover:brightness-105 active:translate-y-[2px]"
          >
            Contact me
          </Link>
        </div>
      </div>
    </div>
  );
}
