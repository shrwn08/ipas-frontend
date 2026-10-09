const disciplines = [
  "Automation",
  "PLC programming",
  "SCADA development",
  "Electrical design",
  "Instrumentation",
  "Drive engineering",
  "Control philosophy",
  "Industrial networking",
  "Project management",
  "Site commissioning",
];

const documents = [
  "GA drawings",
  "Electrical schematics",
  "I/O lists",
  "Cable schedules",
  "Functional design specifications",
  "PLC logic documentation",
  "SCADA graphics",
  "FAT and SAT reports",
  "O&M manuals",
];

function EngineeringTeam() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full flex flex-col gap-8 px-4 lg:px-20">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
            Engineering team
          </h2>
          <p className="text-left">
            Ten disciplines under one project manager, so your plant has one
            point of contact.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8 items-start">
          <ol className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {disciplines.map((discipline, index) => (
              <li
                key={discipline}
                className="flex items-center gap-3 p-4 rounded-md border border-(--border) bg-(--card) hover:scale-105"
              >
                <span className="eyebrow">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-(--text)">{discipline}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-3 p-4 sm:p-6 rounded-md border border-(--border) bg-(--card)">
            <h3 className="text-xl">Documents you receive</h3>
            <ul className="list-['=>'] marker:text-(--accent-text) pl-5 flex flex-col gap-2">
              {documents.map((doc) => (
                <li key={doc} className="pl-2 text-(--text)">
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EngineeringTeam;