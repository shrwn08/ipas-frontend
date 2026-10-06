import scadaImage from "../../assets/SCADA.png"

const lists = [
  {
    title: "Reports and history",
    items: [
      "Production and batch reports",
      "Historical trending and data logging",
      "Recipes",
      "Energy monitoring",
    ],
  },
  {
    title: "Access",
    items: [
      "Multi-user client/server",
      "Web-based monitoring",
      "Remote diagnostics",
      "Dashboards",
    ],
  },
];

function SCADAHMI() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full flex flex-col gap-6 px-4 lg:px-20">
        <div className="flex flex-col items-start gap-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
            SCADA and HMI
          </h2>
          <p className="text-left">
            Built on Siemens WinCC (Professional, Unified, Flexible), with
            FactoryTalk integration.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col overflow-hidden  ">
            
              <img
                src={scadaImage}
                alt="Process mimics and alarms"
                className="w-full h-48 object-cover"
              />
            
            <div className="flex flex-col gap-2 p-4">
              <h3 className="text-lg">Process mimics and alarms</h3>
              <p>Live line views with alarm and event lists.</p>
            </div>
          </div>

          {lists.map(({ title, items }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-4 rounded-md border border-(--border) bg-(--card)"
            >
              <h3 className="text-lg">{title}</h3>
              <ul className="list-['=>'] marker:text-(--accent) marker:font-bold pl-5 text-left flex flex-col gap-2 text-(--text)">
                {items.map((item) => (
                  <li key={item} className="pl-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SCADAHMI;