"use client";

import { useDispatch } from "../dispatch-provider";

export function SayHelloButton() {
  const openDispatch = useDispatch();
  return (
    <button
      type="button"
      onClick={openDispatch}
      className="focus-ring w-fit rounded-full bg-mg-accent px-6 py-2.5 font-marginalia-sans text-[13.5px] font-medium text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
    >
      Say hello
    </button>
  );
}
