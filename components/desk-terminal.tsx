"use client";

import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import Link from "next/link";
import { TerminalWindow } from "./terminal-window";
import { getFeatured, getPlayground } from "@/data/projects";
import { about } from "@/data/about";
import { cn } from "@/lib/utils";

const ROUTES = [
  { n: "01", label: "work", href: "/work" },
  { n: "02", label: "about", href: "/about" },
  { n: "03", label: "archive", href: "/archive" },
  { n: "04", label: "contact", href: "/contact" },
];

const COMMANDS = ["help", "about", "work", "experiments", "ls", "clear"] as const;

type Line = { id: number; kind: "input" | "output"; content: ReactNode };

let lineId = 0;
const nextId = () => ++lineId;

function LinkRow({ n, label, href }: { n: string; label: string; href: string }) {
  return (
    <Link href={href} className="focus-ring group flex items-center gap-2 rounded-sm px-1 -mx-1 hover:bg-[#8fd68a]/10">
      <span className="text-[#8fd68a]/50">[{n}]</span>
      <span className="group-hover:text-white">{label}</span>
      <span aria-hidden className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">
        &rarr;
      </span>
    </Link>
  );
}

/**
 * A real doorway out of Playground — every response here reads directly
 * from data/projects.ts and data/about.ts. No invented commands, no fake
 * technical claims, no output that isn't backed by something real on the
 * site.
 */
export function DeskTerminal({ className }: { className?: string }) {
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Line[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (booted) inputRef.current?.focus();
  }, [booted]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  function push(kind: Line["kind"], content: ReactNode) {
    setHistory((h) => [...h, { id: nextId(), kind, content }]);
  }

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    push("input", raw);
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    if (cmd === "help") {
      push(
        "output",
        <div className="flex flex-col gap-0.5">
          {COMMANDS.map((c) => (
            <p key={c}>
              <span className="text-[#8fd68a]/50">$</span> {c}
            </p>
          ))}
        </div>
      );
      return;
    }
    if (cmd === "about") {
      push(
        "output",
        <div>
          <p className="text-white/80">{about.bio[0]}</p>
          <p className="mt-1.5 text-[#8fd68a]/60">
            currently: {about.currentRoles[0].title} at {about.currentRoles[0].org}
          </p>
        </div>
      );
      return;
    }
    if (cmd === "work") {
      push(
        "output",
        <div className="flex flex-col gap-0.5">
          {getFeatured().map((p, i) => (
            <LinkRow key={p.slug} n={String(i + 1).padStart(2, "0")} label={`${p.name} — ${p.year ?? ""}`} href={`/work/${p.slug}`} />
          ))}
        </div>
      );
      return;
    }
    if (cmd === "experiments") {
      push(
        "output",
        <div className="flex flex-col gap-0.5">
          {getPlayground().map((p, i) => (
            <p key={p.slug}>
              <span className="text-[#8fd68a]/50">[{String(i + 1).padStart(2, "0")}]</span> {p.name} &mdash;{" "}
              <span className="text-white/50">{p.status}</span>
            </p>
          ))}
        </div>
      );
      return;
    }
    if (cmd === "ls") {
      push(
        "output",
        <div className="flex flex-col gap-0.5">
          {ROUTES.map((r) => (
            <LinkRow key={r.href} {...r} />
          ))}
        </div>
      );
      return;
    }
    push("output", <p className="text-white/40">command not found: {cmd} — try &lsquo;help&rsquo;</p>);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    run(value);
    setValue("");
  }

  return (
    <TerminalWindow label="khushi.sh" className={cn("w-56 sm:w-64", className)}>
      {!booted ? (
        <button type="button" onClick={() => setBooted(true)} className="focus-ring block w-full text-left">
          <span>khushi@playground $ </span>
          <span aria-hidden className="inline-block w-[6px] animate-pulse bg-[#8fd68a]">
            &nbsp;
          </span>
        </button>
      ) : (
        <div>
          <div ref={scrollRef} className="max-h-40 overflow-y-auto">
            <p>
              <span className="text-[#8fd68a]/50">khushi@playground $</span> help
            </p>
            <div className="mt-1 flex flex-col gap-0.5 text-white/40">
              {COMMANDS.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {history.map((line) => (
              <div key={line.id} className="mt-2">
                {line.kind === "input" ? (
                  <p>
                    <span className="text-[#8fd68a]/50">$</span> {line.content}
                  </p>
                ) : (
                  line.content
                )}
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="mt-2 flex items-center gap-1.5 border-t border-white/10 pt-2">
            <span className="text-[#8fd68a]/50">$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command"
              className="w-full bg-transparent text-[#8fd68a] caret-[#8fd68a] outline-none placeholder:text-white/25"
              placeholder="type a command…"
            />
          </form>
        </div>
      )}
    </TerminalWindow>
  );
}
