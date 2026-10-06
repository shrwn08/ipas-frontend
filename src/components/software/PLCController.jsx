const platforms = [
  {
    platform: "Siemens S7-300 / S7-400",
    work: "New programs and modernization of running systems",
  },
  {
    platform: "Siemens S7-1200 / S7-1500",
    work: "New projects in TIA Portals",
  },
  {
    platform: "ABB PLC systems",
    work: "Programming and integration",
  },
  {
    platform: "Networks",
    work: "PROFIBUS, PROFINET, Ethernet/IP, Modbus TCP/IP, Modbus RTU",
  },
];

function PLCController() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-start gap-6 md:gap-8 px-4 lg:px-20">
        <div className="w-full flex flex-col items-start gap-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-left font-extrabold">
            PLC and control software
          </h2>
          <p className="text-left">
            Programs written in Siemens TIA Portal and STEP 7, plus ABB PLC
            systems. Architectures include distributed I/O and redundant
            controllers, with high-speed motion and process control logic.
            Recipe and alarm management are built in from the start.
          </p>
        </div>

        <div className="w-full overflow-x-auto rounded-md border border-(--border)">
          <table className="w-full border-collapse text-left">
            <thead className="bg-(--bg-alt)">
              <tr className="border-b border-(--border)">
                <th className="w-2/5 px-3 py-2 font-sans text-sm font-semibold normal-case tracking-normal text-(--text)">
                  Platform
                </th>
                <th className="w-3/5 px-3 py-2 font-sans text-sm font-semibold normal-case tracking-normal text-(--text)">
                  What we do
                </th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(({ platform, work }) => (
                <tr
                  key={platform}
                  className="border-b border-(--border) last:border-b-0 align-top"
                >
                  <td className="px-3 py-3 text-(--text)">{platform}</td>
                  <td className="px-3 py-3 text-(--muted)">{work}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default PLCController;