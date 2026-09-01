"use client";

import { useState, type FormEvent } from "react";

/**
 * Real submissions via Web3Forms — no backend to build, but a real inbox on
 * the other end. The access key below is meant to be public (Web3Forms'
 * own docs: "You can use it in client side code") — it's tied to where
 * submissions land, not a secret that grants access to anything.
 */
const WEB3FORMS_ACCESS_KEY = "70b091c7-9183-4ed0-954a-e2a48bf7715f";

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
      className="w-full rounded-[2px] border border-mg-line bg-mg-bg p-6 shadow-[0_30px_60px_-24px_rgba(36,31,24,0.35)] sm:p-8"
    >
      <div className="flex items-center justify-between border-b border-mg-line pb-4">
        <p className="font-marginalia-serif text-[19px] text-mg-ink">Dispatch</p>
        <span className="inline-flex items-center gap-1.5 font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-mg-accent" aria-hidden />
          Open
        </span>
      </div>

      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="mt-6 flex flex-col gap-5">
        <label className="block">
          <span className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">Your name / team</span>
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
            className="focus-ring mt-1.5 w-full rounded-[1px] border border-mg-line bg-mg-bg-raised px-3 py-2.5 font-marginalia-sans text-[14px] text-mg-ink placeholder:text-mg-ink-faint disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">Email address</span>
          <input
            type="email"
            name="email"
            required
            maxLength={100}
            autoComplete="email"
            title="A valid email address, like you@example.com"
            placeholder="you@example.com"
            disabled={status === "sending"}
            className="focus-ring mt-1.5 w-full rounded-[1px] border border-mg-line bg-mg-bg-raised px-3 py-2.5 font-marginalia-sans text-[14px] text-mg-ink placeholder:text-mg-ink-faint disabled:opacity-60"
          />
        </label>
        <label className="block">
          <span className="font-marginalia-sans text-[11px] uppercase tracking-wide text-mg-ink-faint">What are we building together?</span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            title="At least 10 characters — enough to say what you have in mind"
            placeholder="Tell me about it…"
            disabled={status === "sending"}
            className="focus-ring mt-1.5 w-full resize-none rounded-[1px] border border-mg-line bg-mg-bg-raised px-3 py-2.5 font-marginalia-sans text-[14px] text-mg-ink placeholder:text-mg-ink-faint disabled:opacity-60"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <span className="font-marginalia-hand text-[18px] text-mg-accent" style={{ transform: "rotate(-2deg)", display: "inline-block" }}>
          P.S. I reply fast
        </span>
        <button
          type="submit"
          disabled={status === "sending"}
          className="focus-ring rounded-full bg-mg-accent px-6 py-2.5 font-marginalia-sans text-[13.5px] font-medium text-white transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send"}
        </button>
      </div>

      <div aria-live="polite" className="mt-4">
        {status === "success" && (
          <p className="font-marginalia-sans text-[12px] text-mg-accent">
            Sent &mdash; landed straight in my inbox. I&rsquo;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="font-marginalia-sans text-[12px] text-mg-accent">
            That didn&rsquo;t go through &mdash; email me directly instead:{" "}
            <a href="mailto:khushi.c.narang@gmail.com" className="underline">
              khushi.c.narang@gmail.com
            </a>
          </p>
        )}
        {status === "idle" && (
          <p className="font-marginalia-sans text-[11.5px] text-mg-ink-faint">
            Sends straight to my inbox &mdash; no email client popup, no backend to babysit.
          </p>
        )}
      </div>
    </form>
  );
}
