const aboutImage = null;

function AboutHero() {
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-left">
            Supplied by engineers. Supported on site when you call.
          </h1>
          <p className="text-left">
            IPAS Automation Pvt. Ltd. is an industrial automation and
            electrical engineering company. We design, manufacture, program,
            test, install and support the systems we sell.
          </p>
        </div>

        <div className="w-full">
          {aboutImage ? (
            <img
              src={aboutImage}
              alt="IPAS Automation team at work"
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-md"
            />
          ) : (
            <div
              role="img"
              aria-label="IPAS Automation team at work"
              className="w-full h-48 sm:h-64 lg:h-80 rounded-md border border-(--border) bg-(--card)"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default AboutHero;