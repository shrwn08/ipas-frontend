import { useMemo, useState } from "react";

/*
  Requires the @theme block from the message (maps your CSS variables to
  Tailwind colors: bg-page, bg-card, border-line, text-ink, text-muted,
  bg-accent, text-accent-text, text-on-accent, text-support).
  Uses your global classes: .eyebrow, .btn-primary.
*/

const SECTORS = {
  steel: {
    name: "Steel & TMT",
    blurb:
      "Steel, ispat and TMT plants. The largest group on our list, from Bagru near Jaipur to Rabigh in Saudi Arabia.",
  },
  foundry: { name: "Foundry", blurb: "A foundry reference outside India." },
  cement: { name: "Cement", blurb: "A cement plant in the Dhanbad region." },
  power: {
    name: "Power generation",
    blurb: "A power generation unit in Odisha.",
  },
};

// [company, location, state/country, isIndia, sector, tag]
const RAW = [
  [
    "Gagan Resources Pvt Ltd",
    "Siltara Industrial Area, Sondra",
    "Chhattisgarh",
    true,
    "steel",
    "",
  ],
  ["Mascom Steel Pvt Ltd", "Edathala, Aluva", "Kerala", true, "steel", ""],
  ["Rabigh Solb Factory Company", "Rabigh", "Saudi Arabia", false, "steel", ""],
  ["Seashore Steel WLL", "New Industrial Area 11", "Qatar", false, "steel", ""],
  ["DSR", "Laksar", "Uttarakhand", true, "steel", ""],
  ["SKA Ispat Pvt Ltd", "Sondra", "Chhattisgarh", true, "steel", ""],
  ["Shri Langtababa Steel Pvt Ltd", "Giridih", "Jharkhand", true, "steel", ""],
  ["Shailputri Iron Steel Pvt Ltd", "Giridih", "Jharkhand", true, "steel", ""],
  ["Saluja Gold, Unit II", "Giridih", "Jharkhand", true, "steel", ""],
  ["Lal Steel Pvt Ltd", "Giridih", "Jharkhand", true, "steel", "Service"],
  ["African Foundry", "Nigeria", "Nigeria", false, "foundry", ""],
  ["Shri Khatu Cement", "Dhanbad", "Jharkhand", true, "cement", ""],
  ["Jay TMT", "Dhanbad", "Jharkhand", true, "steel", ""],
  [
    "Nirman Infra Steel Pvt Ltd",
    "Bagru, Jaipur",
    "Rajasthan",
    true,
    "steel",
    "",
  ],
  [
    "Premier Bar Steel Pvt Ltd",
    "Bagru, Jaipur",
    "Rajasthan",
    true,
    "steel",
    "",
  ],
  [
    "Shambhawi Ispat Pvt Ltd",
    "Gerwani, Raigarh",
    "Chhattisgarh",
    true,
    "steel",
    "Service",
  ],
  [
    "SMC Power Generation Ltd, Unit 2",
    "Kukurjangha",
    "Odisha",
    true,
    "power",
    "",
  ],
  ["Purliya Ispat Pvt Ltd", "Asansol", "West Bengal", true, "steel", ""],
  [
    "Nirman TMT Steel Pvt Ltd",
    "RIICO Bagru, Jaipur",
    "Rajasthan",
    true,
    "steel",
    "",
  ],
];

const DATA = RAW.map(([name, loc, reg, india, sec, tag], i) => ({
  id: i + 1,
  name,
  loc,
  reg,
  india,
  sec,
  tag,
}));

const uniq = (arr) => [...new Set(arr)];

const GRID_BG = {
  backgroundImage:
    "linear-gradient(color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
  WebkitMaskImage:
    "radial-gradient(ellipse 60% 75% at 30% 40%, #000 20%, transparent 75%)",
  maskImage:
    "radial-gradient(ellipse 60% 75% at 30% 40%, #000 20%, transparent 75%)",
};

// Headings use "!" because your global h1/h2/h3 rules are unlayered and
// would otherwise beat Tailwind's layered font-size utilities.
const SECTION = "px-4 py-14 lg:px-20 lg:py-20";
const INNER = "mx-auto w-full max-w-7xl";

export default function Industries() {
  const [filter, setFilter] = useState("all");

  const { stats, regions, maxCount } = useMemo(() => {
    const states = uniq(DATA.filter((d) => d.india).map((d) => d.reg));
    const countries = uniq(DATA.map((d) => (d.india ? "India" : d.reg)));

    const counts = {};
    DATA.forEach((d) => {
      counts[d.reg] = counts[d.reg] || { n: 0, india: d.india };
      counts[d.reg].n += 1;
    });
    const regions = Object.entries(counts)
      .map(([name, c]) => ({ name, ...c }))
      .sort((a, b) => b.n - a.n || a.name.localeCompare(b.name));

    return {
      stats: [
        [DATA.length, "Reference sites"],
        [Object.keys(SECTORS).length, "Sectors"],
        [states.length, "Indian states"],
        [countries.length, "Countries"],
      ],
      regions,
      maxCount: regions[0].n,
    };
  }, []);

  const rows = DATA.filter((d) => filter === "all" || d.sec === filter);
  const filterOptions = [
    ["all", `All (${DATA.length})`],
    ...Object.entries(SECTORS).map(([key, s]) => [
      key,
      `${s.name} (${DATA.filter((d) => d.sec === key).length})`,
    ]),
  ];

  return (
    <main className="bg-page text-ink">
      {/* Hero */}
      <section className={`relative isolate pt-16 ${SECTION}`}>
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={GRID_BG}
        />
        <div className={INNER}>
          <div className="eyebrow">Industries we work with</div>
          <h1 className="mt-4 max-w-[18ch] text-4xl! text-balance md:text-6xl!">
            Steel, foundry, cement and power plants, in India and abroad
          </h1>
          <p className="mt-5 max-w-[62ch] text-base">
            Steel and TMT plants make up most of our reference list. We also
            work with a foundry, a cement plant and a power station. Every site
            below is a plant we have worked with.
          </p>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-4">
            {stats.map(([value, label]) => (
              <div className="min-w-0 bg-card px-5 py-4" key={label}>
                <b className="block font-[Plus_Jakarta_Sans] text-3xl font-extrabold leading-none tracking-tight tabular-nums">
                  {value}
                </b>
                <span className="eyebrow mt-2 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className={SECTION}>
        <div className={INNER}>
          <div className="mb-8 grid max-w-[70ch] gap-3">
            <div className="eyebrow">Sectors</div>
            <h2 className="text-2xl! md:text-4xl!">
              Where our references sit, by sector
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            {Object.entries(SECTORS).map(([key, sector]) => {
              const items = DATA.filter((d) => d.sec === key);
              return (
                <article
                  key={key}
                  className={`flex min-w-0 flex-col gap-3.5 rounded-md border border-line bg-card p-6 ${
                    key === "steel" ? "lg:row-span-3" : ""
                  }`}
                >
                  <header className="flex items-start justify-between gap-4">
                    <h3 className="text-xl!">{sector.name}</h3>
                    <div className="font-[Plus_Jakarta_Sans] text-4xl font-extrabold leading-none tracking-tighter text-accent-text tabular-nums">
                      {items.length}
                    </div>
                  </header>
                  <p className="text-sm">{sector.blurb}</p>
                  <ul
                    className={`mt-1 grid gap-x-6 gap-y-2 ${
                      key === "steel" ? "sm:grid-cols-2" : ""
                    }`}
                  >
                    {items.map((d) => (
                      <li
                        key={d.id}
                        className="relative pl-7 text-sm font-medium wrap-anywhere before:absolute before:left-0 before:top-[0.1em] before:font-mono before:text-xs before:font-bold before:text-accent-text before:content-['=>']"
                      >
                        {d.name}
                        <small className="block text-xs font-normal text-muted">
                          {d.loc === d.reg ? d.loc : `${d.loc}, ${d.reg}`}
                        </small>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className={SECTION}>
        <div className={INNER}>
          <div className="mb-8 grid max-w-[70ch] gap-3">
            <div className="eyebrow">Locations</div>
            <h2 className="text-2xl! md:text-4xl!">
              Jharkhand and Chhattisgarh hold the most sites
            </h2>
            <p>Number of reference plants by Indian state or country.</p>
          </div>

          <div className="grid max-w-3xl gap-2.5">
            {regions.map((r) => (
              <div
                key={r.name}
                className="grid grid-cols-[minmax(96px,150px)_minmax(0,1fr)_28px] items-center gap-3.5"
              >
                <span className="label font-mono text-xs uppercase tracking-widest text-muted wrap-anywhere">
                  {r.name}
                </span>
                <div
                  className="h-3.5 overflow-hidden rounded-xs border"
                  style={{
                    borderColor: "var(--border)",
                    background: "var(--card)",
                  }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${(r.n / maxCount) * 100}%`,
                      background: r.india ? "var(--accent)" : "var(--muted)",
                    }}
                  />
                </div>
                <span className="text-right font-mono text-sm font-bold tabular-nums">
                  {r.n}
                </span>
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest"
            style={{ color: "var(--muted)" }}
          >
            <span className="inline-flex items-center">
              <i
                className="mr-2 inline-block size-3 rounded-xs"
                style={{ background: "var(--accent)" }}
              />
              India
            </span>
            <span className="inline-flex items-center">
              <i
                className="mr-2 inline-block size-3 rounded-xs"
                style={{ background: "var(--muted)" }}
              />
              International
            </span>
          </div>
        </div>
      </section>

      {/* Reference table */}
      <section className={SECTION} id="references">
        <div className={INNER}>
          <div className="mb-8 grid max-w-[70ch] gap-3">
            <div className="eyebrow">Reference list</div>
            <h2 className="text-2xl! md:text-4xl!">
              All {DATA.length} reference sites
            </h2>
          </div>

          <div
            className="mb-4 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter by sector"
          >
            {filterOptions.map(([key, label]) => (
              <button
                type="button"
                key={key}
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
                className="rounded-sm border border-line bg-card px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-ink transition-colors hover:border-accent-text aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-md border border-line bg-card">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  {[
                    "#",
                    "Company",
                    "Location",
                    "State / country",
                    "Sector",
                  ].map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-4 py-3.5 font-bold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-line last:border-b-0"
                  >
                    <td className="w-12 px-4 py-3.5 align-top font-mono text-xs text-muted tabular-nums">
                      {String(d.id).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-3.5 align-top text-sm font-semibold">
                      {d.name}
                      {d.tag && (
                        <span className="ml-2 rounded-sm border border-support px-1.5 py-0.5 align-[2px] font-mono text-[10px] uppercase tracking-widest text-support">
                          {d.tag}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 align-top text-sm text-muted">
                      {d.loc}
                    </td>
                    <td className="px-4 py-3.5 align-top text-sm text-muted">
                      {d.reg}
                    </td>
                    <td className="px-4 py-3.5 align-top">
                      <span className="whitespace-nowrap rounded-sm border border-line px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest">
                        {SECTORS[d.sec].name}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className={`border-t border-line ${SECTION}`}>
        <div className={`${INNER} grid justify-items-start gap-5`}>
          <h2 className="max-w-[26ch] text-2xl! md:text-3xl!">
            Have a plant in one of these sectors?
          </h2>
          <p>Tell us about your site and what you need done.</p>
          <a href="/contact" className="btn-primary inline-block no-underline">
            Talk to our engineers
          </a>
        </div>
      </section>
    </main>
  );
}
