const heroImage = null;

function HeroSolutions() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 px-4 lg:px-20">
        <div className="w-full flex flex-col items-start gap-4">
          <p className="text-6xl sm:text-6xl lg:text-7xl text-left font-extrabold">
            Solutions for the whole mill line
          </p>
          <p className="text-left">
            From the furnace to the cooling bed, each function is engineered for your mill, tested on-site, and fully commissioned before our engineers depart..
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

export default HeroSolutions;