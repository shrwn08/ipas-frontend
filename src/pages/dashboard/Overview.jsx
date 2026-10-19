import { Link } from "react-router";
// import { cardClass, primaryButton, statusClass, PageHeader } from "./ui";

const stats = [
  { label: "Total enquiries", value: "128", note: "+12 this week" },
  { label: "New enquiries", value: "9", note: "Not replied yet" },
  { label: "Milestones published", value: "14", note: "2 drafts" },
  { label: "Admins", value: "3", note: "All active" },
];

const enquiries = [
  {
    name: "Rahul Sharma",
    company: "Sharma Steel Rolling Mills",
    need: "Mill automation",
    date: "18 Oct 2026",
    status: "New",
  },
  {
    name: "Anita Verma",
    company: "Verma Cement Works",
    need: "SCADA or reporting",
    date: "16 Oct 2026",
    status: "Replied",
  },
  {
    name: "Mohit Gupta",
    company: "Gupta Metals",
    need: "PLC or drive modernization",
    date: "14 Oct 2026",
    status: "New",
  },
  {
    name: "Deepak Singh",
    company: "Singh Power Systems",
    need: "Support or AMC",
    date: "11 Oct 2026",
    status: "Closed",
  },
];

const milestones = [
  { title: "Rolling mill modernization completed", date: "20 Sept 2026", status: "Live" },
  { title: "New panel workshop line commissioned", date: "02 Sept 2026", status: "Live" },
  { title: "SCADA upgrade at cement plant", date: "Not set", status: "Draft" },
];

const quickActions = [
  { label: "Add milestone", to: "/dashboard/milestones" },
  { label: "Add company", to: "/dashboard/industries" },
  { label: "View enquiries", to: "/dashboard/enquiries" },
  { label: "Add admin", to: "/dashboard/admins" },
];

function Overview() {
  return (
    <>
      <PageHeader
        title="Overview"
        text="Enquiries and updates for the IPAS website."
      >
        <Link
          to="/dashboard/milestones"
          className={`${primaryButton} w-full sm:w-auto text-center hover:text-white`}
        >
          Add milestone
        </Link>
      </PageHeader>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, note }) => (
          <div key={label} className={`${cardClass} gap-1`}>
            <span className="eyebrow">{label}</span>
            <p className="text-3xl font-bold !text-(--text)">{value}</p>
            <p className="text-sm">{note}</p>
          </div>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 items-start">
        <div className={cardClass}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg">Recent enquiries</h3>
            <Link
              to="/dashboard/enquiries"
              className="text-sm font-semibold hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-(--border)">
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Need</th>
                  <th className="py-2 pr-3">Date</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map(({ name, company, need, date, status }) => (
                  <tr
                    key={name}
                    className="border-b border-(--border) last:border-b-0 align-top"
                  >
                    <td className="py-3 pr-3">
                      <p className="!text-(--text) font-medium">{name}</p>
                      <p className="text-sm">{company}</p>
                    </td>
                    <td className="py-3 pr-3 text-(--text)">{need}</td>
                    <td className="py-3 pr-3 text-(--muted) whitespace-nowrap">
                      {date}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-md border ${statusClass[status]}`}
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className={cardClass}>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg">Milestones</h3>
              <Link
                to="/dashboard/milestones"
                className="text-sm font-semibold hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="flex flex-col gap-3">
              {milestones.map(({ title, date, status }) => (
                <li
                  key={title}
                  className="flex items-start justify-between gap-3 pb-3 border-b border-(--border) last:border-b-0 last:pb-0"
                >
                  <div className="flex flex-col">
                    <p className="!text-(--text) font-medium">{title}</p>
                    <p className="text-sm">{date}</p>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 text-xs rounded-md border ${statusClass[status]}`}
                  >
                    {status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className={cardClass}>
            <h3 className="text-lg">Quick actions</h3>
            <div className="flex flex-col gap-2">
              {quickActions.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="w-full text-left px-3 py-2 rounded-md border border-(--border) !text-(--text) hover:border-(--accent-text) hover:!text-(--accent-text) transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Overview;