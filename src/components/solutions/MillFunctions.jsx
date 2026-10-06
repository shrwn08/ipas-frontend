import { useState } from "react";

const functions = [
  {
    title: "Heating and tracking",
    description: "Know where every billet is.",
    items: [
      { name: "Furnace automation", image: null },
      { name: "Material tracking", image: null },
    ],
  },
  {
    title: "Rolling control",
    description:
      "Keep the bar in tension between stands without pulling or looping it.",
    items: [
      { name: "Minimum tension control", image: null },
      { name: "Stand speed cascade", image: null },
      { name: "Loop control", image: null },
      { name: "AC/DC drive synchronization", image: null },
    ],
  },
  {
    title: "Cutting",
    description: "Cut lengths follow the real bar speed.",
    items: [
      { name: "Flying shear synchronization", image: null },
      { name: "Hot saw", image: null },
      { name: "Cold shear", image: null },
    ],
  },
  {
    title: "Cooling and finishing",
    description: "Quench, cool, count and bundle.",
    items: [
      { name: "TMT quenching, water box", image: null },
      { name: "Cooling bed", image: null },
      { name: "Bundling and counting", image: null },
    ],
  },
  {
    title: "Levels 1 and 2",
    description: "Control on the floor and data above it.",
    items: [
      { name: "Level-1 and Level-2 automation", image: null },
      { name: "SCADA and HMI", image: null },
      { name: "Energy monitoring", image: null },
      { name: "Production and quality reporting", image: null },
      { name: "Remote monitoring and IIoT", image: null },
    ],
  },
];

function MillFunctions() {
  const [active, setActive] = useState(0);
  const current = functions[active];

  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full flex flex-col gap-6 px-4 lg:px-20">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-left text-(--text) border-b border-(--border) pb-4">
          Mill automation functions
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_2.5fr] gap-6 md:gap-8">
          <div
            role="tablist"
            aria-label="Mill automation functions"
            className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0"
          >
            {functions.map(({ title }, index) => {
              const isActive = index === active;
              return (
                <button
                  key={title}
                  type="button"
                  role="tab"
                  id={`mill-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="mill-panel"
                  onClick={() => setActive(index)}
                  className={`shrink-0 whitespace-nowrap md:whitespace-normal text-left px-4 py-2 rounded-md border transition-colors duration-200 ${
                    isActive
                      ? "bg-(--accent) border-(--accent) text-white"
                      : "bg-(--card) border-(--border) text-(--text) hover:border-(--accent-text)"
                  }`}
                >
                  <span className="text-xs opacity-70 mr-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {title}
                </button>
              );
            })}
          </div>

          <div
            id="mill-panel"
            role="tabpanel"
            aria-labelledby={`mill-tab-${active}`}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <h3 className="text-xl sm:text-2xl">{current.title}</h3>
              <p>{current.description}</p>
            </div>

            <div
              key={active}
              className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {current.items.map(({ name, image }) => (
                <div
                  key={name}
                  className="group relative w-full border border-(--border) rounded-md overflow-hidden"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="w-full h-40 sm:h-44 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                  ) : (
                    <div
                      role="img"
                      aria-label={name}
                      className="w-full h-40 sm:h-44 bg-(--card) transition-colors duration-300 group-hover:bg-(--bg-alt)"
                    />
                  )}
                  <p className="absolute bottom-0 z-10 w-full px-2 py-1 text-center text-sm text-white bg-black/60">
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MillFunctions;