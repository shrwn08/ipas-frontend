import ServiceGroup from "./ServiceGroup";
import { serviceGroups } from "./servicesData";

function Services() {
  return (
    <section className="w-full flex flex-col justify-center items-center py-4">
      <div className="w-full flex flex-col justify-center items-start gap-4 border-b border-(--border) px-4 lg:px-20 py-4">
        <h2 className="text-2xl font-bold text-left">What we deliver</h2>
        <p className="text-left">
          Six areas of work, each covered from design drawings to site support.
        </p>
      </div>

      <div className="w-full px-4 lg:px-20">
        {serviceGroups.map((group) => (
          <ServiceGroup key={group.title} {...group} />
        ))}
      </div>
    </section>
  );
}

export default Services;
