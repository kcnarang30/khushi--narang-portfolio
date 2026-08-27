"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DispatchForm } from "./dispatch-form";

/**
 * The Dispatch Messenger form as a popup, opened from the phone's
 * "Contact Me" button — same dialog convention as the RealShot lightbox
 * (portal to body, Escape + backdrop-click to close, body scroll locked
 * while open) rather than a new modal pattern.
 */
export function DispatchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Send a message"
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg/96 p-5 backdrop-blur-sm sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="focus-ring absolute right-5 top-5 rounded-sm border border-line-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
      >
        Close ✕
      </button>
      <div
        ref={panelRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg outline-none"
      >
        <DispatchForm />
      </div>
    </div>,
    document.body
  );
}
