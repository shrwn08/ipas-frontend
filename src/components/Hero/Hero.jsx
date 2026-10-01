import React from "react";
import heroImage from "../../assets/hero.png";

function Hero() {
  return (
    <div className="hero h-full w-full pt-20 lg:pt-40 flex flex-col justify-center items-center gap-4 px-4 lg:px-20  ">
      <div className="h-auto  w-full pb-8  flex flex-col lg:flex-row justify-center items-center gap-4 ">
        <div className="h-full w-full lg:w-2/3 flex flex-col justify-center items-center gap-4 px-4 lg:px-20 border-b border-(--border) ">
          <h1 className="w-full lg:w-[150%] ">Automation that keeps your mill rolling</h1>

          <h3 className=" font-semibold  text-left w-full  lg:w-[150%] tracking-wide">
            PLC, SCADA and drive systems for rolling mills, steel, cement, power
            and process plants. One team in Jaipur to engineer, build, test,
            install and support them, so you can modernize performance without
            replacing hardware you don't need.
          </h3>
          <div className="mb-4 flex justify-start items-center  gap-4 w-full lg:w-[150%]">
            <button
              type="button"
              className="bg-accent text-(--text) hover:bg-(--accent) hover:text-white px-4 py-2 rounded-md hover:bg-accent-dark transition-colors duration-300 ease-in-out"
            >
              Request Plant Audit
            </button>
            <button
              type="button"
              className="text-(--text) px-4 py-2 rounded-md hover:bg-(--accent) hover:text-white transition-colors duration-300 ease-in-out ml-4">
                See Mills Solutions
              </button>
          </div>
          
        </div>
        <div className="flex justify-center items-center gap-4">
          <img
            src={heroImage}
            alt="hero"
            className="h-full w-full object-cover lg:[mask-image:linear-gradient(to_right,transparent_0%,black_45%)]"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
