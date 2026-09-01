import type { Metadata } from "next";
import Link from "next/link";
import { certificates } from "@/data/certificates";
import { Reveal } from "@/components/marginalia/reveal";

export const metadata: Metadata = { title: "Certificates" };

export default function CertificatesPage() {
  return (
    <div className="bg-mg-bg">
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <Link href="/archive" className="focus-ring rounded font-marginalia-sans text-[12.5px] text-mg-ink-faint hover:text-mg-ink-muted">
            &larr; /khushi/archive
          </Link>
          <h1 className="mt-4 font-marginalia-serif text-[28px] text-mg-ink sm:text-[32px]">Learning, in progress.</h1>
          <p className="mt-3 max-w-md font-marginalia-sans text-[14px] text-mg-ink-muted">
            Kept small and secondary on purpose &mdash; the work above should do the talking.
          </p>
        </Reveal>

        <ul className="mt-10 flex flex-col divide-y divide-mg-line border-t border-mg-line font-marginalia-sans">
          {certificates.map((c) => (
            <li key={c.name} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="truncate text-[13.5px] text-mg-ink">{c.name}</p>
                <p className="text-[12px] text-mg-ink-faint">{c.issuer}</p>
              </div>
              {c.status === "in-progress" ? (
                <span className="shrink-0 rounded-full border border-mg-accent/50 px-2.5 py-0.5 text-[10.5px] uppercase tracking-wide text-mg-accent">
                  In progress{c.progressNote ? ` — ${c.progressNote}` : ""}
                </span>
              ) : (
                <span className="shrink-0 text-[10.5px] uppercase tracking-wide text-mg-ink-faint">Completed</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
