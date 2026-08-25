"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const primary = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  { href: "/archive", label: "Archive" },
];

const cta = { href: "/contact", label: "Let's talk" };

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/92 backdrop-blur-sm">
      <div className="mx-auto hidden max-w-6xl items-center justify-between px-5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim sm:flex sm:px-8">
        <span>Case files — product design</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-live-signal" aria-hidden />
          Status: open to work
        </span>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-line px-5 py-4 sm:border-t-0 sm:px-8 sm:py-3.5">
        <Link
          href="/"
          className="focus-ring rounded font-display text-xl font-bold uppercase tracking-tight sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          Khushi Narang<span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "focus-ring rounded font-mono text-[12px] uppercase tracking-wide transition-colors",
                pathname?.startsWith(item.href) ? "text-accent" : "text-fg-muted hover:text-fg"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="focus-ring rounded-sm border border-line-strong px-4 py-1.5 font-mono text-[12px] uppercase tracking-wide text-fg-muted transition-colors hover:border-accent hover:text-fg"
          >
            {cta.label}
          </Link>
        </nav>

        <button
          className="focus-ring rounded p-2 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="block h-px w-6 bg-fg" />
          <span className="mt-1.5 block h-px w-6 bg-fg" />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-5 py-4 md:hidden">
          {[...primary, cta].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="focus-ring rounded py-2 font-mono text-sm uppercase tracking-wide text-fg-muted hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
