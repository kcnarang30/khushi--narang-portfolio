"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The contact page's Nokia 3310-style object. Every action here is real:
 * DIAL opens a real mailto, SEND jumps to the real dispatch form, EXIT goes
 * home. Nothing here pretends to do something it doesn't.
 */
export function NokiaPhone({
  email,
  formAnchorId,
  className,
}: {
  email: string;
  formAnchorId?: string;
  className?: string;
}) {
  const [pressed, setPressed] = useState<string | null>(null);

  const press = (key: string) => {
    setPressed(key);
    window.setTimeout(() => setPressed(null), 160);
  };

  return (
    <div className={className}>
      <div className="rounded-[20px] border border-line-strong bg-bg-raised p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
        <div className="relative flex flex-col justify-between rounded-md bg-accent p-4" style={{ aspectRatio: "4/3" }}>
          <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-wide text-black/70">
            <span>2G Signal</span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden className="flex items-end gap-[1.5px]">
                {[3, 5, 7, 9].map((h) => (
                  <span key={h} className="w-[3px] bg-black/70" style={{ height: h }} />
                ))}
              </span>
              <span aria-hidden className="h-2 w-4 rounded-[1px] border border-black/70" />
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
          </div>
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-black/60">Email dispatch</p>
            <p className="mt-1 break-all font-mono text-[15px] font-bold text-black sm:text-base">{email}</p>
          </div>
          <p className="font-mono text-[9px] uppercase tracking-wide text-black/50">Nokia 3310 emulator</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href={formAnchorId ? `#${formAnchorId}` : "#"}
            onClick={() => press("send")}
            className={`focus-ring rounded-sm bg-bg-raised-2 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-fg-muted transition-transform hover:text-fg ${
              pressed === "send" ? "translate-y-[2px]" : ""
            }`}
          >
            Send
          </Link>
          <Link
            href="/"
            onClick={() => press("exit")}
            className={`focus-ring rounded-sm bg-bg-raised-2 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-fg-muted transition-transform hover:text-fg ${
              pressed === "exit" ? "translate-y-[2px]" : ""
            }`}
          >
            Exit
          </Link>
          <a
            href={`mailto:${email}`}
            onClick={() => press("dial")}
            className={`focus-ring rounded-sm bg-ember px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-black transition-transform hover:brightness-105 ${
              pressed === "dial" ? "translate-y-[2px]" : ""
            }`}
          >
            Dial
          </a>
        </div>
      </div>
    </div>
  );
}
