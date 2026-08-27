/**
 * TechSparks has no real screenshot yet, but it has real numbers — those
 * are the asset. Oversized, plain, no icons or boxes pretending to be more.
 */
export function TechSparksStats() {
  const stats = [
    { n: "10,000+", label: "attendees" },
    { n: "500+", label: "speakers" },
    { n: "300+", label: "investors" },
    { n: "200+", label: "startups" },
  ];
  const verbs = ["Learn", "Create", "Experience", "Connect"];

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-x-10 gap-y-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-3xl font-extrabold leading-none text-bg sm:text-4xl">{s.n}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-bg/55">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 font-serif text-[15px] italic text-bg/70">
        {verbs.join(" · ")} — three days, one theme.
      </p>
    </div>
  );
}
