import modernization from "../../../assets/modernization.png";

function Modernization() {
  
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 px-4 lg:px-20 py-6 md:py-10">
      <div className="w-full flex flex-col items-start gap-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-left">
          Upgrade the software before you replace the hardware
        </h2>
        <p className="text-left">
          Many Siemens S7-300 and S7-400 plants can improve cutting accuracy,
          roll stress and sequence control through better logic alone. We study
          what you have installed first and replace only what has to go.
        </p>
        <button
          type="button"
          className="w-full sm:w-auto mt-2 bg-(--accent) text-white hover:bg-(--accent-hover) px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
        >
          Request Plant Audit
        </button>
      </div>

      <div className="w-full flex flex-col items-start gap-4">
        <img
          src={modernization}
          alt="Modernization"
          className="w-full h-48 sm:h-64 md:h-56 lg:h-80 object-cover rounded-md"
        />
        <ul className="list-['=>'] pl-5 text-left flex flex-col gap-2 text-(--text)">
          <li>Existing PLC, I/O and network kept in service</li>
          <li>
            Minimum tension, speed cascade and loop control tuned to your mill
          </li>
          <li>Logic documented and handed over with FAT and SAT reports</li>
          <li>Remote monitoring added where the network allows</li>
        </ul>
      </div>
    </section>
  );
}

export default Modernization;