import { inputClass, smallButton, statusClass, PageHeader } from "./ui";

const enquiries = [
  {
    name: "Rahul Sharma",
    company: "Sharma Steel Rolling Mills",
    email: "rahul@sharmasteel.in",
    phone: "+91 98100 11111",
    need: "Mill automation",
    message: "We want to upgrade the finishing stand drives and loop control.",
    date: "18 Oct 2026",
    status: "New",
  },
  {
    name: "Anita Verma",
    company: "Verma Cement Works",
    email: "anita@vermacement.in",
    phone: "+91 98100 22222",
    need: "SCADA or reporting",
    message: "Need production reports and trending on our existing WinCC system.",
    date: "16 Oct 2026",
    status: "Replied",
  },
  {
    name: "Mohit Gupta",
    company: "Gupta Metals",
    email: "mohit@guptametals.in",
    phone: "+91 98100 33333",
    need: "PLC or drive modernization",
    message: "Our S7-300 line is old. Can you study it without replacing hardware?",
    date: "14 Oct 2026",
    status: "New",
  },
  {
    name: "Deepak Singh",
    company: "Singh Power Systems",
    email: "deepak@singhpower.in",
    phone: "+91 98100 44444",
    need: "Support or AMC",
    message: "Looking for an annual maintenance contract for two plants.",
    date: "11 Oct 2026",
    status: "Closed",
  },
];

const filters = ["All", "New", "Replied", "Closed"];

const countFor = (filter) =>
  filter === "All"
    ? enquiries.length
    : enquiries.filter((enquiry) => enquiry.status === filter).length;

function Enquiries() {
  // CHANGED: filter buttons show a count for each status
  return (
    <>
      <PageHeader
        title="Enquiries"
        text="Messages sent from the contact form on the website."
      />

      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={`flex items-center gap-2 px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
                index === 0
                  ? "bg-(--accent) border-(--accent) text-white"
                  : "border-(--border) text-(--text) hover:border-(--accent-text)"
              }`}
            >
              {filter}
              <span className="text-xs opacity-70">{countFor(filter)}</span>
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="Search by name or company"
          aria-label="Search enquiries"
          className={`${inputClass} lg:max-w-xs`}
        />
      </div>

      <div className="w-full overflow-x-auto rounded-md border border-(--border) bg-(--card)">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-(--border)">
              <th className="p-3">Name</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Need</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map(
              ({ name, company, email, phone, need, message, date, status }) => (
                <tr
                  key={email}
                  className="border-b border-(--border) last:border-b-0 align-top"
                >
                  <td className="p-3">
                    <p className="!text-(--text) font-medium">{name}</p>
                    <p className="text-sm">{company}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-sm !text-(--text) break-all">{email}</p>
                    <p className="text-sm">{phone}</p>
                  </td>
                  <td className="p-3 text-(--text)">{need}</td>
                  <td className="p-3 max-w-xs">
                    <p className="text-sm line-clamp-2">{message}</p>
                  </td>
                  <td className="p-3 text-(--muted) whitespace-nowrap">{date}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-md border ${statusClass[status]}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <button type="button" className={smallButton}>
                        View
                      </button>
                      <button type="button" className={smallButton}>
                        Mark replied
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Enquiries;