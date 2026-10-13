const officeImage = null;

function OfficeLocation() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-8 px-4 lg:px-20">
        <div className="w-full flex flex-col items-start gap-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
            Works and registered office
          </h2>
          <p className="text-left">
            Plot No-659, Badoli, Sector-80
            <br />
            Opposite Gov. High School
            <br />
            Faridabad-121004, Haryana, India
          </p>
        </div>

        <div className="w-full">
          {officeImage ? (
            <img
              src={officeImage}
              alt="IPAS Automation works and registered office"
              className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-md"
            />
          ) : (
            <div
              role="img"
              aria-label="IPAS Automation works and registered office"
              className="w-full h-48 sm:h-64 lg:h-80 rounded-md border border-(--border) bg-(--card)"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default OfficeLocation;