"use client";

import { useState } from "react";
import { PhoneStage } from "./phone-stage";
import { DispatchModal } from "./dispatch-modal";

/**
 * Owns the open/closed state shared between the phone (deep inside
 * PhoneStage) and the Dispatch Messenger popup it triggers — the two
 * live far apart in the tree, so the state has to live above both.
 */
export function ContactDispatch() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PhoneStage onContactClick={() => setOpen(true)} />
      <p className="mt-5 flex items-center gap-2 rounded-sm border border-line px-3 py-2.5 font-mono text-[11px] text-fg-muted">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live-signal" aria-hidden />
        Currently open to freelance contracts and full-time roles.
      </p>
      <DispatchModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
