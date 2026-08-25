"use client";

import { useState } from "react";
import { TerminalWindow } from "./terminal-window";
import { about } from "@/data/about";

/**
 * A small hidden interaction — flavor text built from real data
 * (location, current role), never invented stats.
 */
export function ConsolePing() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="focus-ring group inline-flex items-center gap-2 rounded-sm border border-dashed border-line-strong px-3 py-2 font-mono text-[11px] uppercase tracking-wide text-fg-dim transition-colors hover:border-accent hover:text-fg"
      >
        <span className="text-accent">&gt;_</span>
        want to see something weird?
      </button>
    );
  }

  return (
    <TerminalWindow label="~/khushi — zsh" className="max-w-sm">
      <p>
        <span className="text-fg-dim">$</span> whoami
      </p>
      <p className="text-fg-muted">product designer, {about.location.toLowerCase()}</p>
      <p className="mt-2">
        <span className="text-fg-dim">$</span> cat status.txt
      </p>
      <p className="text-fg-muted">
        currently at {about.currentRoles[0].org}. always down to talk about a good problem.
      </p>
      <p className="mt-2 animate-pulse">▊</p>
    </TerminalWindow>
  );
}
