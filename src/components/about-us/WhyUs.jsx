const leftPoints = [
  "Customized engineering, with panels and systems designed to IEC and IS standards",
  "Expertise in high-speed TMT and bar mill automation",
  "Modernization of Siemens S7-300 and S7-400 systems without unnecessary hardware replacement",
];

const rightPoints = [
  "In-house software development, FAT, commissioning and lifecycle support",
  "Local engineering support with rapid response",
  "Maintenance contracts and dedicated after-sales service",
];

function WhyUs() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full flex flex-col gap-6 px-4 lg:px-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
          Why plants work with us
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {[leftPoints, rightPoints].map((points, index) => (
            <div
              key={index}
              className="flex flex-col p-4 sm:p-6 rounded-md border border-(--border) bg-(--card)"
            >
              <ul className="list-['=>'] marker:text-(--accent-text) pl-5 flex flex-col gap-4">
                {points.map((point) => (
                  <li key={point} className="pl-2 text-(--text)">
                    {point}
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

export default WhyUs;