"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HandUnderline } from "./marginalia/hand-underline";

const primary = [
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
  { href: "/archive", label: "Archive" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mg-line bg-mg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="focus-ring rounded" onClick={() => setOpen(false)}>
          <span className="font-marginalia-serif text-[19px] italic text-mg-ink">Khushi Narang</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {primary.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring group relative inline-block rounded font-marginalia-sans text-[14.5px] transition-[color,transform] duration-150 active:scale-[0.94]",
                  active ? "text-mg-ink" : "text-mg-ink-muted hover:text-mg-ink"
                )}
              >
                {item.label}
                <HandUnderline active={active} />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="focus-ring flex items-center gap-2 rounded font-marginalia-sans text-[14.5px] text-mg-ink-muted transition-colors hover:text-mg-ink"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-mg-accent" aria-hidden />
            Open to work
          </Link>
        </nav>

        <button
          className="focus-ring relative z-10 rounded p-2 transition-transform duration-150 active:scale-90 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px w-6 origin-center bg-mg-ink"
            animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.span
            className="mt-1.5 block h-px w-6 origin-center bg-mg-ink"
            animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden border-t border-mg-line md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {primary.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring rounded py-2 font-marginalia-sans text-[15px] text-mg-ink-muted transition-transform duration-150 active:scale-[0.97] active:text-mg-ink hover:text-mg-ink"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="focus-ring rounded py-2 font-marginalia-sans text-[15px] text-mg-ink-muted hover:text-mg-ink"
              >
                Contact
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
