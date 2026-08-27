"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { DispatchModal } from "./dispatch-modal";

/**
 * One Dispatch Messenger modal, mounted once at the root, so every "email
 * me" moment on the site — footer, hero CTA, About, the Nokia phone's
 * screen — opens the same popup instead of handing off to a mailto link
 * nobody's local client is actually configured for.
 */
const DispatchContext = createContext<(() => void) | null>(null);

export function DispatchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <DispatchContext.Provider value={() => setOpen(true)}>
      {children}
      <DispatchModal open={open} onClose={() => setOpen(false)} />
    </DispatchContext.Provider>
  );
}

export function useDispatch() {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error("useDispatch must be used within DispatchProvider");
  return ctx;
}
