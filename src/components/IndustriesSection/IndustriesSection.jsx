const industries = [
  {
    title: "Steel",
    description:
      "Rolling mills, billet and bloom lines, TMT quenching, finishing.",
  },
  {
    title: "Metals",
    description: "Strip, plate, tube, pipe, alloy and stainless lines.",
  },
  {
    title: "Power",
    description: "Plant control, drives and monitoring.",
  },
  {
    title: "Cement",
    description: "Process control and motor control centres.",
  },
  {
    title: "Process",
    description: "Batch, recipe and alarm management",
  },
];

function IndustriesSection() {
  return (
    <section className="w-full flex flex-col items-center py-8">
      {/* CHANGED: removed max-w-7xl to match Modernization width */}
      <div className="w-full flex flex-col gap-6 px-4 lg:px-20">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-left">
          Industries we work in
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map(({ title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-2 p-4 rounded-md border border-(--border) bg-(--card)"
            >
              <h3 className="text-lg">{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>

        <a
          href="/industries"
          className="self-start text-sm font-semibold hover:underline"
        >
          All industries and mill types →
        </a>
      </div>
    </section>
  );
}

export default IndustriesSection;