"use client";

import type { ReactNode } from "react";
import { useDispatch } from "./dispatch-provider";
import { links } from "@/data/links";

/**
 * Drop-in replacement for a `mailto:` link — opens the Dispatch Messenger
 * popup instead, so the email address is legible (per the "email as
 * visible text" rule) without depending on a configured mail client.
 */
export function EmailDispatchLink({ className, children }: { className?: string; children?: ReactNode }) {
  const openDispatch = useDispatch();
  return (
    <button type="button" onClick={openDispatch} className={className}>
      {children ?? links.email}
    </button>
  );
}
