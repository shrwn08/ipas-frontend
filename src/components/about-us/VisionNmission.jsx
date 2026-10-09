function VisionNmission() {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full flex flex-col gap-6 px-4 lg:px-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-left">
          Vision & Mission
        </h2>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex flex-col gap-3 p-4 sm:p-6 rounded-md border border-(--border) bg-(--card)">
            <h3 className="text-xl">Vision</h3>
            <p>
              To become one of India's most trusted industrial automation
              providers through innovative, reliable, future-ready systems.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-4 sm:p-6 rounded-md border border-(--border) bg-(--card)">
            <h3 className="text-xl">Mission</h3>
            <ul className="list-['=>'] marker:text-(--accent-text) pl-5 flex flex-col gap-2">
              <li className="pl-2 text-(--text)">
                World-class solutions with superior engineering quality
              </li>
              <li className="pl-2 text-(--text)">
                Long-term customer relationships
              </li>
              <li className="pl-2 text-(--text)">
                Latest technologies and smart digital automation
              </li>
              <li className="pl-2 text-(--text)">
                Reliable, energy-efficient, cost-effective systems
              </li>
              <li className="pl-2 text-(--text)">
                The highest standards of safety, quality and professionalism
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionNmission;