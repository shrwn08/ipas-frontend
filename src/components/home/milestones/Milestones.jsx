import { useState } from "react";

const DESCRIPTION_LIMIT = 100;

const milestones = [
  {
    id: 1,
    category: "Project",
    date: "28 Sept 2026",
    title: "Name of Milestone",
    description: "Description of milestone",
    image: null,
  },
  {
    id: 2,
    category: "Project",
    date: "20 Sept 2026",
    title: "Rolling mill modernization completed",
    description:
      "We upgraded the logic on an existing Siemens S7-400 system, retuned the speed cascade and loop control, and handed over the documentation with FAT and SAT reports without replacing any hardware.",
    image: null,
  },
];

function MilestoneCard({ category, date, title, description, image }) {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > DESCRIPTION_LIMIT;
  const shownText =
    isLong && !expanded
      ? `${description.slice(0, DESCRIPTION_LIMIT).trimEnd()}…`
      : description;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-md border border-(--border) bg-(--card) ${
        expanded ? "h-auto" : "h-[28rem]"
      }`}
    >
      {image ? (
        <img src={image} alt={title} className="h-48 w-full shrink-0 object-cover" />
      ) : (
        <div
          role="img"
          aria-label={title}
          className="h-48 w-full shrink-0 bg-(--bg-alt)"
        />
      )}

      <div className="info flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="px-2 py-1 text-xs rounded-md bg-(--accent-soft) text-(--accent-text)">
            {category}
          </span>
          <span className="date text-sm">{date}</span>
        </div>
        <h3 className="title text-lg line-clamp-2">{title}</h3>
        <p>{shownText}</p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="mt-auto self-start text-sm font-semibold text-(--accent-text) hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </article>
  );
}

function Milestones() {
  return (
    <section className="w-full flex flex-col items-center py-8">
      {/* CHANGED: removed max-w-7xl to match Modernization width */}
      <div className="w-full flex flex-col gap-6 px-4 lg:px-20">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-left">
            Latest milestones and updates
          </h2>
          <p className="text-left">
            News and project milestones posted by our team.
          </p>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start gap-4">
          {milestones.map(({ id, ...milestone }) => (
            <MilestoneCard key={id} {...milestone} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Milestones;