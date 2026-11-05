

const GROUPS = [
  {
    key: "drives",
    label: "Drives",
    title: "Control motor speed and torque",
    blurb: "AC and DC drives to start, run and protect the motors on your line.",
    items: [
      { name: "AC drives", text: "Variable-frequency drives for AC motor speed and torque control." },
      { name: "DC drives", text: "Speed and torque control for DC motors." },
    ],
  },
  {
    key: "power",
    label: "Power electronics",
    title: "Power devices and boards for drives",
    blurb: "The switching devices and circuit boards inside drives and rectifiers.",
    items: [
      { name: "Thyristors", text: "SCR power devices for rectifiers and DC drives." },
      { name: "IGBT modules", text: "Power modules for inverters and AC drives." },
      { name: "PCBs", text: "Drive and control circuit boards." },
    ],
  },
  {
    key: "protection",
    label: "Protection",
    title: "Stop a short circuit before it spreads",
    blurb: "Fuses sized for general circuits and for semiconductor devices.",
    items: [
      { name: "HRC fuses", text: "High rupturing capacity fuses for short-circuit protection." },
      { name: "SCR fuses", text: "Fast-acting fuses that protect thyristors and drives." },
    ],
  },
  {
    key: "sensing",
    label: "Sensing and feedback",
    title: "Tell the controller what the machine is doing",
    blurb: "Sensors and encoders that feed position, speed and material data to the PLC and drive.",
    items: [
      { name: "Proximity sensors", text: "Inductive sensors that detect metal without contact." },
      { name: "HMD", text: "Hot metal detectors that sense hot material on the line." },
      { name: "Encoders", text: "Speed and position feedback for motors and drives." },
    ],
  },
  {
    key: "control",
    label: "Control and monitoring",
    title: "Control the process and watch the plant",
    blurb: "Controllers, operator screens and supervisory software.",
    items: [
      { name: "PLC", text: "Programmable logic controllers for machine and process control." },
      { name: "HMI", text: "Operator touch panels to monitor and control machines." },
      { name: "SCADA systems", text: "Supervisory software that shows the whole plant on one screen." },
    ],
  },
];

const PANELS = [
  "Drive panels for AC and DC drives",
  "PLC and automation panels",
  "Motor control centre (MCC) panels",
  "Control and power distribution panels",
];

const SECTORS = ["Steel & TMT", "Foundry", "Cement", "Power generation"];

const total = GROUPS.reduce((n, g) => n + g.items.length, 0);

const SECTION = "px-4 py-14 lg:px-20 lg:py-20";
const INNER = "mx-auto w-full max-w-7xl";
const BORDER = "border-(color:--border)";
const CARD = `rounded-md border ${BORDER} bg-(--card)`;
const MUTED = "text-(color:--muted)";
const RED = "text-(color:--accent-text)";

const GRID_BG = {
  backgroundImage:
    "linear-gradient(color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--text) 8%, transparent) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
  WebkitMaskImage: "radial-gradient(ellipse 60% 75% at 30% 40%, #000 20%, transparent 75%)",
  maskImage: "radial-gradient(ellipse 60% 75% at 30% 40%, #000 20%, transparent 75%)",
};

function ProductsNpanels() {
  const stats = [
    [total, "Product lines"],
    [GROUPS.length, "Product groups"],
    [SECTORS.length, "Sectors served"],
  ];

  return (
    <main className="bg-(--bg) text-(--text)">
      {/* Hero */}
      <section className={`relative isolate pt-16 ${SECTION}`}>
        <div className="pointer-events-none absolute inset-0 -z-10" style={GRID_BG} />
        <div className={INNER}>
          <div className="eyebrow">Products and panels</div>
          <h1 className="mt-4 max-w-[20ch] text-4xl! text-balance md:text-6xl!">
            Drives, power parts, controls and panels from one supplier
          </h1>
          <p className="mt-5 max-w-[62ch] text-base">
            We sell AC and DC drives, thyristors, IGBTs, fuses, sensors, encoders, PCBs, PLCs, HMIs
            and SCADA systems. We also supply all kinds of electrical panels for the industries we
            work with.
          </p>

          <div
            className={`mt-10 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-md border ${BORDER} bg-(--border)`}
          >
            {stats.map(([value, label]) => (
              <div className="min-w-0 bg-(--card) px-5 py-4" key={label}>
                <b className="block font-[Plus_Jakarta_Sans] text-3xl font-extrabold leading-none tracking-tight tabular-nums">
                  {value}
                </b>
                <span className="eyebrow mt-2 block">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product groups */}
      <section className="px-4 lg:px-20">
        <div className={INNER}>
          {GROUPS.map((g, i) => (
            <div
              key={g.key}
              className={`grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14 ${
                i === 0 ? "" : `border-t ${BORDER}`
              }`}
            >
              <div className="grid content-start gap-3">
                <div className="eyebrow">{g.label}</div>
                <h2 className="max-w-[22ch] text-2xl! text-balance md:text-3xl!">{g.title}</h2>
                <p className="max-w-[44ch] text-sm">{g.blurb}</p>
              </div>

              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                {g.items.map((p) => (
                  <article key={p.name} className={`${CARD} min-w-0 p-5`}>
                    <h3 className="text-lg!">{p.name}</h3>
                    <p className="mt-2 text-sm">{p.text}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Panels */}
      <section className={`border-t ${BORDER} ${SECTION}`} id="panels">
        <div className={INNER}>
          <div className="mb-8 grid max-w-[70ch] gap-3">
            <div className="eyebrow">Electrical panels</div>
            <h2 className="text-2xl! text-balance md:text-4xl!">
              We supply all kinds of electrical panels for plant use
            </h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className={`${CARD} p-6`}>
              <h3 className="text-xl!">Panel types</h3>
              <ul className="mt-4 grid gap-3">
                {PANELS.map((p) => (
                  <li
                    key={p}
                    className="relative pl-7 text-sm font-medium before:absolute before:left-0 before:top-[0.1em] before:font-mono before:text-xs before:font-bold before:text-(--accent-text) before:content-['=>']"
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm">
                Tell us the load, the drives and the controls. We will quote the panel to match.
              </p>
            </div>

            <div className={`${CARD} p-6`}>
              <h3 className="text-xl!">Used in these industries</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SECTORS.map((s) => (
                  <span
                    key={s}
                    className={`rounded-sm border ${BORDER} px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest`}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <a
                href="/industries"
                className={`mt-5 inline-block text-sm font-semibold underline underline-offset-4 ${RED}`}
              >
                See the plants we work with
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className={`border-t ${BORDER} ${SECTION}`}>
        <div className={`${INNER} grid justify-items-start gap-5`}>
          <h2 className="max-w-[26ch] text-2xl! md:text-3xl!">Need a drive, a part or a panel?</h2>
          <p className={MUTED}>Send us the model or the application and we will reply with a quote.</p>
          <a href="/contact" className="btn-primary inline-block no-underline">
            Request a quote
          </a>
        </div>
      </section>
    </main>
  );
}
export default ProductsNpanels