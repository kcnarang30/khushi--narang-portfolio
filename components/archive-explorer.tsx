"use client";

import { useState } from "react";
import Link from "next/link";
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

function YearFolder({ year, items, defaultOpen }: { year: string; items: typeof sorted; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
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
      <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <div className={cn("-mx-2 rounded-b-[2px] px-2 pb-1 pt-2", open && "bg-mg-bg/50")}>
            {items.map((p) => (
              <IndexRow key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ArchiveExplorer() {
  const [year, setYear] = useState<string>("All");
  const [type, setType] = useState<string>("All");

  const filtered = sorted.filter((p) => {
    if (year !== "All" && yearGroup(p.year) !== year) return false;
    if (type !== "All" && p.category !== type) return false;
    return true;
  });

  const groups = new Map<string, typeof filtered>();
  for (const p of filtered) {
    const g = yearGroup(p.year);
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(p);
  }

  return (
    <div>
      <FolderTabs
        options={[{ value: "All", label: "All years" }, ...years.map((y) => ({ value: y, label: y }))]}
        active={year}
        onChange={setYear}
      />

      <div className="rounded-b-[2px] rounded-tr-[2px] bg-mg-bg-raised px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-mg-line pb-5">
          <span className="mr-2 font-marginalia-sans text-[11.5px] text-mg-ink-faint">Filter by type:</span>
          <button
            onClick={() => setType("All")}
            className={cn(
              "rounded-full px-2.5 py-1 font-marginalia-sans text-[12px] transition-colors",
              type === "All" ? "bg-mg-accent/15 text-mg-accent" : "text-mg-ink-faint hover:text-mg-ink-muted"
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setType(c)}
              className={cn(
                "rounded-full px-2.5 py-1 font-marginalia-sans text-[12px] transition-colors",
                type === c ? "bg-mg-accent/15 text-mg-accent" : "text-mg-ink-faint hover:text-mg-ink-muted"
              )}
            >
              {CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {Array.from(groups.entries()).map(([g, items], i) => (
            <Reveal key={`${g}-${year}`} delay={i * 0.04}>
              <YearFolder year={g} items={items} defaultOpen={year !== "All" || i === 0} />
            </Reveal>
          ))}
          {filtered.length === 0 && <p className="font-marginalia-sans text-[13px] text-mg-ink-faint">Nothing filed under that combination.</p>}
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
