"use client";

import { useState, type FormEvent } from "react";
import { Handwritten } from "./handwritten";
import { PhysicalButton } from "./physical-button";

/**
 * Real submissions via Web3Forms — no backend to build, but a real inbox on
 * the other end. The access key below is meant to be public (Web3Forms'
 * own docs: "You can use it in client side code") — it's tied to where
 * submissions land, not a secret that grants access to anything.
 */
const WEB3FORMS_ACCESS_KEY = "cf83921f-fb6f-4e1d-a152-2c733b33e3ea";

type Status = "idle" | "sending" | "success" | "error";

export function DispatchForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_ACCESS_KEY);
    data.append("subject", `New dispatch from ${data.get("name")}`);
    data.append("from_name", "Portfolio Dispatch Messenger");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grain-card w-full rounded-[24px] border border-line-strong bg-bg-raised p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8"
    >
      <div className="flex items-center justify-between border-b border-line pb-4">
        <p className="font-display text-lg font-bold text-fg">Dispatch Messenger</p>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-fg-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-live-signal" aria-hidden />
          Dispatch
        </span>
      </div>

      {/* Honeypot — real form fields only below; bots tend to fill this in, humans never see it */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mt-6 flex flex-col gap-5">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
            Your name / team
          </span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            title="At least 2 characters"
            placeholder="Enter your full name…"
            disabled={status === "sending"}
            className="focus-ring mt-1.5 w-full rounded-sm border border-line-strong bg-bg-raised-2 px-3 py-2.5 text-[14px] text-fg placeholder:text-fg-dim disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
            Email address
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={100}
            autoComplete="email"
            title="A valid email address, like you@example.com"
            placeholder="you@example.com"
            disabled={status === "sending"}
            className="focus-ring mt-1.5 w-full rounded-sm border border-line-strong bg-bg-raised-2 px-3 py-2.5 text-[14px] text-fg placeholder:text-fg-dim disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
            What are we building together?
          </span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            title="At least 10 characters — enough to say what you have in mind"
            placeholder="Tell me about it…"
            disabled={status === "sending"}
            className="focus-ring mt-1.5 w-full resize-none rounded-sm border border-line-strong bg-bg-raised-2 px-3 py-2.5 text-[14px] text-fg placeholder:text-fg-dim disabled:opacity-60"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <Handwritten rotate={-2} className="text-lg">
          P.S. I reply fast
        </Handwritten>
        <PhysicalButton
          type="submit"
          className="bg-live-signal text-black shadow-[0_3px_0_0_#8a6423] active:shadow-[0_1px_0_0_#8a6423] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send Dispatch"}
        </PhysicalButton>
      </div>

      <div aria-live="polite" className="mt-4">
        {status === "success" && (
          <p className="font-mono text-[10.5px] text-accent">
            Sent — landed straight in my inbox. I&rsquo;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="font-mono text-[10.5px] text-ember">
            That didn&rsquo;t go through — email me directly instead:{" "}
            <a href="mailto:kcnarang3@gmail.com" className="underline">
              kcnarang3@gmail.com
            </a>
          </p>
        )}
        {status === "idle" && (
          <p className="font-mono text-[10px] text-fg-dim">
            Sends straight to my inbox — no email client popup, no backend to babysit.
          </p>
        )}
      </div>
    </form>
  );
}
