"use client";

import { PhoneStage } from "./phone-stage";
import { useDispatch } from "./dispatch-provider";

/**
 * The phone (deep inside PhoneStage) opens the site's one shared Dispatch
 * Messenger popup, mounted once at the root by DispatchProvider — every
 * other "email me" moment on the site opens the same instance.
 */
export function ContactDispatch() {
  const openDispatch = useDispatch();

  return (
    <>
      <PhoneStage onContactClick={openDispatch} />
      <p className="mt-5 flex items-center gap-2 rounded-sm border border-line px-3 py-2.5 font-mono text-[11px] text-fg-muted">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-live-signal" aria-hidden />
        Currently open to freelance contracts and full-time roles.
      </p>
    </>
  );
}
