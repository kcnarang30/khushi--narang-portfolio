"use client";

import { useState } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectCategory } from "@/data/types";
import { IndexRow } from "@/components/index-card";
import { Reveal } from "@/components/reveal";
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

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "focus-ring rounded-sm border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide transition-colors",
        active
          ? "border-accent text-accent"
          : "border-line text-fg-muted hover:border-line-strong hover:text-fg"
      )}
    >
      {children}
    </button>
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
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-fg-dim">Year</span>
          {["All", ...years].map((y) => (
            <FilterChip key={y} active={year === y} onClick={() => setYear(y)}>
              {y}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-widest text-fg-dim">Type</span>
          <FilterChip active={type === "All"} onClick={() => setType("All")}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c} active={type === c} onClick={() => setType(c)}>
              {CATEGORY_LABELS[c]}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-12">
        {Array.from(groups.entries()).map(([g, items], i) => (
          <Reveal key={g} delay={i * 0.04}>
            <p className="font-mono text-[11px] uppercase tracking-widest text-fg-dim">
              <span aria-hidden className="text-accent">▸ </span>
              {g}/
              <span className="ml-2 text-fg-dim/60">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            </p>
            <div className="mt-3">
              {items.map((p) => (
                <IndexRow key={p.slug} project={p} />
              ))}
            </div>
          </Reveal>
        ))}
        {filtered.length === 0 && (
          <p className="font-mono text-[12px] text-fg-dim">Nothing filed under that combination.</p>
        )}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-line pt-8">
        <p className="font-mono text-[11px] text-fg-dim">
          {projects.length} projects catalogued · {liveCount} live now
        </p>
        <Link
          href="/certificates"
          className="focus-ring inline-flex items-center gap-1.5 rounded font-mono text-[11px] uppercase tracking-widest text-fg-muted hover:text-accent"
        >
          <span aria-hidden className="text-fg-dim">▸ </span>
          certificates/
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
