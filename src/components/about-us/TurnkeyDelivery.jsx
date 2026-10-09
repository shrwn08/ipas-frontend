

const stages = [
  "Engineering",
  "Panel manufacturing",
  "Software development",
  "Testing",
  "Installation",
  "Commissioning",
  "After-sales service",
];

function TurnkeyDelivery() {
 return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full flex flex-col gap-8 px-4 lg:px-20">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
            Turnkey, from drawing to handover
          </h2>
          <div className="flex flex-col gap-3">
            <p className="text-left">
              We deliver complete automation for steel, metals, power, cement
              and process plants. One team covers the whole job, from
              engineering to after-sales service.
            </p>
            <p className="text-left">
              We modernize plants that are already running and equip new ones,
              with projects executed across India.
            </p>
          </div>
        </div>

        <ol className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage, index) => (
            <li
              key={stage}
              className="flex items-center gap-3 p-4 rounded-md border border-(--border) bg-(--card)"
            >
              <span className="eyebrow">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-(--text)">{stage}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default TurnkeyDelivery