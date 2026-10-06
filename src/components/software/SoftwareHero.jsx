import heroImage from "../../assets/softwareHero.png"

function SoftwareHero() {
  return (
    <section className="relative isolate w-full py-8 md:py-12 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "75px 75px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 100%)",
        }}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 px-4 lg:px-20">
        <div className="w-full flex flex-col items-start gap-4">
          <p className="text-6xl sm:text-6xl lg:text-7xl text-left font-extrabold">
            Software that runs and reports on your plant
          </p>
          <p className="text-left">
            PLC logic, SCADA and Level-2 tools developed in-house and tested before delivery.
          </p>
        </div>

        <div className="w-full">
          {heroImage ? (
            <img
              src={heroImage}
              alt="Mill line solutions"
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-md"
            />
          ) : (
            <div
              role="img"
              aria-label="Mill line solutions"
              className="w-full h-48 sm:h-64 lg:h-80 rounded-md border border-(--border) bg-(--card)"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default SoftwareHero;