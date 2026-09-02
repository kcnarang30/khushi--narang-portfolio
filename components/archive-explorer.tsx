"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/data/types";
import { IndexRow } from "@/components/index-card";
import { Reveal } from "@/components/marginalia/reveal";
import { FolderTabs } from "@/components/marginalia/folder-tabs";
import { HandUnderline } from "@/components/marginalia/hand-underline";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  product: "Product",
  web: "Web",
  campaign: "Campaign",
  branding: "Branding",
  editorial: "Editorial",
  "ai-tool": "AI / Experiments",
  "event-experience": "Event Experience",
  presentation: "Presentation",
  poster: "Poster",
  writing: "Writing",
};

function yearGroup(year?: string) {
  const match = year?.match(/\d{4}/);
  return match ? match[0] : "Undated";
}

const sorted = [...projects].sort((a, b) => {
  const ga = yearGroup(a.year);
  const gb = yearGroup(b.year);
  if (ga !== gb) {
    if (ga === "Undated") return 1;
    if (gb === "Undated") return -1;
    return gb.localeCompare(ga);
  }
  return a.order - b.order;
});

const years = Array.from(new Set(sorted.map((p) => yearGroup(p.year))));
const categories = Array.from(new Set(projects.map((p) => p.category))) as ProjectCategory[];
const liveCount = projects.filter((p) => p.live).length;

/**
 * A folder that's actually opened, not swapped in already-open — the tab
 * selection changes an `open` prop on a folder that stays mounted the whole
 * time, so picking a year plays the real accordion animation instead of a
 * fade-in of pre-expanded content.
 */
function YearFolder({ year, items, open, onToggle }: { year: string; items: typeof sorted; open: boolean; onToggle: () => void }) {
  const reduce = useReducedMotion();

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "focus-ring -mx-2 flex w-full items-center gap-2 rounded-t-[2px] px-2 py-1.5 text-left transition-colors",
          open ? "bg-mg-bg" : "hover:bg-mg-bg/60"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "inline-block font-marginalia-sans text-[11px] text-mg-accent transition-transform duration-200",
            open && "rotate-90"
          )}
        >
          &#9656;
        </span>
        <span className="font-marginalia-sans text-[12px] text-mg-ink-faint">
          {year}/<span className="ml-2 text-mg-ink-faint/70">{items.length} {items.length === 1 ? "item" : "items"}</span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? undefined : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="-mx-2 rounded-b-[2px] bg-mg-bg/50 px-2 pb-1 pt-2">
              {items.map((p, i) => (
                <motion.div
                  key={p.slug}
                  initial={reduce ? undefined : { opacity: 0, y: -6 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.025, ease: [0.22, 1, 0.36, 1] }}
                >
                  <IndexRow project={p} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ArchiveExplorer() {
  const [year, setYear] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  // Independent of the year tab — lets someone open a second folder while
  // browsing "All years" without the tab selection fighting their click.
  const [manuallyOpen, setManuallyOpen] = useState<Set<string>>(() => new Set([years[0]]));

  const byType = type === "All" ? sorted : sorted.filter((p) => p.category === type);

  const groups = new Map<string, typeof sorted>();
  for (const p of byType) {
    const g = yearGroup(p.year);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(p);
  }

  function isOpen(g: string) {
    if (year !== "All") return g === year;
    return manuallyOpen.has(g);
  }

  function toggle(g: string) {
    if (year !== "All") {
      // A folder was opened by hand while a specific year tab is active —
      // hand control back to manual mode instead of fighting the tab state.
      setYear("All");
      setManuallyOpen(new Set([g]));
      return;
    }
    setManuallyOpen((prev) => {
      const next = new Set(prev);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next;
    });
  }

  const hasAnyResults = groups.size > 0;

  return (
    <div>
      <FolderTabs
        options={[{ value: "All", label: "All years" }, ...years.map((y) => ({ value: y, label: y }))]}
        active={year}
        onChange={setYear}
      />

      <div className="relative">
        {/* Paper depth — two sheets filed underneath the panel actually being read */}
        <div aria-hidden className="absolute inset-x-3 -bottom-1.5 h-full rounded-b-[2px] rounded-tr-[2px] bg-mg-bg-raised opacity-60" style={{ transform: "rotate(-0.4deg)" }} />
        <div aria-hidden className="absolute inset-x-1.5 -bottom-0.5 h-full rounded-b-[2px] rounded-tr-[2px] bg-mg-bg-raised opacity-80" style={{ transform: "rotate(0.3deg)" }} />
        <div className="relative rounded-b-[2px] rounded-tr-[2px] bg-mg-bg-raised px-4 py-6 shadow-[0_1px_2px_rgba(36,31,24,0.06)] sm:px-6">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 border-b border-mg-line pb-5">
          <span className="mr-2 font-marginalia-sans text-[11.5px] text-mg-ink-faint">Filter by type:</span>
          <button
            onClick={() => setType("All")}
            className={cn(
              "border-b-2 px-2 py-1 font-marginalia-sans text-[12px] transition-colors",
              type === "All" ? "border-mg-accent text-mg-accent" : "border-transparent text-mg-ink-faint hover:text-mg-ink-muted"
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setType(c)}
              className={cn(
                "border-b-2 px-2 py-1 font-marginalia-sans text-[12px] transition-colors",
                type === c ? "border-mg-accent text-mg-accent" : "border-transparent text-mg-ink-faint hover:text-mg-ink-muted"
              )}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {years.map((g, i) => {
            const items = groups.get(g);
            if (!items) return null;
            return (
              <Reveal key={g} delay={i * 0.04}>
                <YearFolder year={g} items={items} open={isOpen(g)} onToggle={() => toggle(g)} />
              </Reveal>
            );
          })}
          {!hasAnyResults && <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">Nothing filed under that combination.</p>}
        </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-mg-line pt-8">
        <p className="font-marginalia-sans text-[12px] text-mg-ink-faint">
          {projects.length} projects catalogued &middot; {liveCount} live now
        </p>
        <Link href="/certificates" className="group focus-ring relative inline-flex items-center gap-1.5 rounded font-marginalia-sans text-[12.5px] text-mg-ink-muted hover:text-mg-ink">
          Certificates
          <HandUnderline />
          <span aria-hidden>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
