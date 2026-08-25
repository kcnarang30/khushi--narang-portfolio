import type { Metadata } from "next";
import Link from "next/link";
import { certificates } from "@/data/certificates";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Certificates" };

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Reveal>
        <Link
          href="/archive"
          className="focus-ring rounded font-mono text-[11px] uppercase tracking-widest text-fg-dim hover:text-fg-muted"
        >
          ← /khushi/archive
        </Link>
        <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Learning, in progress.</h1>
        <p className="mt-3 max-w-md text-sm text-fg-muted">
          Kept small and secondary on purpose — the work above should do the talking.
        </p>
      </Reveal>

      <ul className="mt-12 flex flex-col divide-y divide-line border-t border-line font-mono">
        {certificates.map((c) => (
          <li key={c.name} className="flex items-center justify-between gap-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-[13px] text-fg">{c.name}</p>
              <p className="text-[11px] text-fg-dim">{c.issuer}</p>
            </div>
            {c.status === "in-progress" ? (
              <span className="shrink-0 rounded-sm border border-beta/50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-beta">
                In progress{c.progressNote ? ` — ${c.progressNote}` : ""}
              </span>
            ) : (
              <span className="shrink-0 text-[10px] uppercase tracking-wide text-fg-dim">Completed</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
