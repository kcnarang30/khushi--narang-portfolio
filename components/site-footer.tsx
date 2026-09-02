"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { EmailDispatchLink } from "./email-dispatch-link";
import { cn } from "@/lib/utils";

const liveCount = projects.filter((p) => p.live).length;

export function SiteFooter() {
  const [revealed, setRevealed] = useState(false);
  // Contact already says all of this — repeating "Say hi" + email + socials
  // right below it read as generated, not authored. Just close the file there.
  const onContactPage = usePathname() === "/contact";

  return (
    <footer className="border-t border-mg-line">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8">
        {!onContactPage && (
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-marginalia-serif text-2xl italic text-mg-ink">Say hi.</p>
              <EmailDispatchLink className="focus-ring mt-2 inline-block rounded font-marginalia-sans text-sm text-mg-accent underline decoration-mg-accent/40 underline-offset-4 hover:decoration-mg-accent" />
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-marginalia-sans text-[13px] text-mg-ink-muted">
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
                LinkedIn
              </a>
              <a href={links.behance} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
                Behance
              </a>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
                Instagram
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="focus-ring rounded hover:text-mg-ink">
                GitHub
              </a>
            </div>
          </div>
        )}
        <div
          className={cn(
            "flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center",
            onContactPage ? "" : "mt-10 border-t border-mg-line pt-6"
          )}
        >
          <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">
            <button
              type="button"
              onClick={() => setRevealed((r) => !r)}
              aria-expanded={revealed}
              className="focus-ring rounded hover:text-mg-ink-muted"
            >
              &copy; {new Date().getFullYear()}
            </button>{" "}
            Khushi Narang. Built by hand, one project at a time.
            {revealed && (
              <span className="ml-2 font-marginalia-hand text-[14px] text-mg-accent" style={{ display: "inline-block", transform: "rotate(-1deg)" }}>
                ({projects.length} things filed, {liveCount} still live)
              </span>
            )}
          </p>
          <div className="flex gap-4 font-marginalia-sans text-[12px] text-mg-ink-faint">
            <Link href="/work" className="focus-ring rounded hover:text-mg-ink-muted">
              Work
            </Link>
            <Link href="/archive" className="focus-ring rounded hover:text-mg-ink-muted">
              Archive
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
