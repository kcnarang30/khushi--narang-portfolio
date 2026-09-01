/**
 * Small bespoke header inserts for specific case studies — real content,
 * just not generic enough to belong in CaseHeader itself.
 */
export function CityChain({ sub }: { sub: string }) {
  const cities = sub.replace(".", "").split(" → ");
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 font-marginalia-serif text-[19px] text-mg-ink sm:text-[22px]">
      {cities.map((city, i) => (
        <span key={city} className="flex items-center gap-2">
          <span>{city}</span>
          {i < cities.length - 1 && (
            <span className="text-mg-accent" aria-hidden>
              &rarr;
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

const TECHSPARKS_STATS = [
  { n: "10,000+", label: "Attendees" },
  { n: "500+", label: "Speakers" },
  { n: "300+", label: "Investors" },
  { n: "200+", label: "Startups" },
];

export function TechSparksStatRow() {
  return (
    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
      {TECHSPARKS_STATS.map((s) => (
        <div key={s.label}>
          <p className="font-marginalia-serif text-[22px] leading-none text-mg-ink">{s.n}</p>
          <p className="mt-1 font-marginalia-sans text-[11.5px] uppercase tracking-wide text-mg-ink-faint">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}
