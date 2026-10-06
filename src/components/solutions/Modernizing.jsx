const modernizingImage = null;

function Modernizing() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 px-4 lg:px-20">
        <div className="w-full flex flex-col items-start gap-4">
          <p className="text-3xl sm:text-5xl lg:text-5xl font-bold text-left">
            Modernizing Siemens S7-300 and S7-400 systems
          </p>
          <p className="text-left">
            We keep the PLC, ET200M I/O and network you already own whenever
            they can do the job. The improvement comes from new logic: tighter
            cutting accuracy, less stress on pinch rolls and tail breakers, and
            synchronized sequence control.
          </p>
          <ul className="list-['=>'] pl-5 text-left flex flex-col gap-2 text-(--text)">
            <li className="pl-2">Study of existing programs and hardware</li>
            <li className="pl-2">
              Software changes tested in FAT before site work
            </li>
            <li className="pl-2">
              Hardware replaced only where it limits performance
            </li>
          </ul>
        </div>

        <div className="w-full">
          {modernizingImage ? (
            <img
              src={modernizingImage}
              alt="Siemens S7-300 and S7-400 modernization"
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-md"
            />
          ) : (
            <div
              role="img"
              aria-label="Siemens S7-300 and S7-400 modernization"
              className="w-full h-48 sm:h-64 lg:h-80 rounded-md border border-(--border) bg-(--card)"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Modernizing;