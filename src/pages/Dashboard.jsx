const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Enquiries", href: "#" },
  { label: "Milestones", href: "#" },
  { label: "Industries", href: "#industries" },
  { label: "Admins", href: "#" },
  { label: "Settings", href: "#" },
];

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
  { title: "Rolling mill modernization completed", date: "20 Sept 2026", published: true },
  { title: "New panel workshop line commissioned", date: "02 Sept 2026", published: true },
  { title: "SCADA upgrade at cement plant", date: "Draft", published: false },
];

const industries = ["Steel", "Metals", "Power", "Cement", "Process"];

const companies = [
  { name: "Sharma Steel Rolling Mills", industry: "Steel", location: "Raipur", work: "TMT mill automation" },
  { name: "Bharat TMT Bars", industry: "Steel", location: "Jaipur", work: "Siemens S7-400 modernization" },
  { name: "Gupta Metals", industry: "Metals", location: "Faridabad", work: "Strip line drives" },
  { name: "Singh Power Systems", industry: "Power", location: "Kota", work: "Plant monitoring" },
  { name: "Verma Cement Works", industry: "Cement", location: "Chittorgarh", work: "Motor control centres" },
];

const quickActions = ["Add milestone", "Add company", "View enquiries", "Add admin"];

const statusClass = {
  New: "border-(--accent-text) text-(--accent-text)",
  Replied: "border-(--green) text-(--green)",
  Closed: "border-(--border) text-(--muted)",
};

const inputClass =
  "w-full px-3 py-2 rounded-md border border-(--border) bg-(--bg) text-(--text) focus:outline-none focus:border-(--accent-text)";

function Dashboard() {
  // CHANGED: added Industries to the sidebar and an Industries section with an add-company form and grouped list
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr] bg-(--bg)">
      <aside className="w-full border-b lg:border-b-0 lg:border-r border-(--border) bg-(--card) lg:min-h-screen">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <span className="eyebrow">Admin</span>
            <h2 className="text-lg">IPAS Dashboard</h2>
          </div>

          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map(({ label, href }, index) => (
              <a
                key={label}
                href={href}
                className={`shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-md border transition-colors duration-200 ${
                  index === 0
                    ? "bg-(--accent) border-(--accent) text-white"
                    : "border-transparent text-(--text) hover:bg-(--bg-alt)"
                }`}
              >
                {label}
              </a>
            ))}
            <button
              type="button"
              className="shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) lg:mt-6 transition-colors duration-200"
            >
              Log out
            </button>
          </nav>
        </div>
      </aside>

      <main className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div
          id="overview"
          className="scroll-mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl sm:text-3xl text-left">Overview</h1>
            <p className="text-left">Enquiries and updates for the IPAS website.</p>
          </div>
          <button
            type="button"
            className="w-full sm:w-auto bg-(--accent) text-white hover:bg-(--accent-hover) px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Add milestone
          </button>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(({ label, value, note }) => (
            <div
              key={label}
              className="flex flex-col gap-1 p-4 rounded-md border border-(--border) bg-(--card)"
            >
              <span className="eyebrow">{label}</span>
              <p className="text-3xl font-bold !text-(--text)">{value}</p>
              <p className="text-sm">{note}</p>
            </div>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-4 items-start">
          <div className="flex flex-col gap-3 p-4 rounded-md border border-(--border) bg-(--card)">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg">Recent enquiries</h3>
              <button
                type="button"
                className="text-sm font-semibold text-(--accent-text) hover:underline"
              >
                View all
              </button>
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
                      <td className="py-3 pr-3 text-(--muted) whitespace-nowrap">{date}</td>
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
            <div className="flex flex-col gap-3 p-4 rounded-md border border-(--border) bg-(--card)">
              <h3 className="text-lg">Milestones</h3>
              <ul className="flex flex-col gap-3">
                {milestones.map(({ title, date, published }) => (
                  <li
                    key={title}
                    className="flex items-start justify-between gap-3 pb-3 border-b border-(--border) last:border-b-0 last:pb-0"
                  >
                    <div className="flex flex-col">
                      <p className="!text-(--text) font-medium">{title}</p>
                      <p className="text-sm">{date}</p>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 text-xs rounded-md border ${
                        published
                          ? "border-(--green) text-(--green)"
                          : "border-(--border) text-(--muted)"
                      }`}
                    >
                      {published ? "Live" : "Draft"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 p-4 rounded-md border border-(--border) bg-(--card)">
              <h3 className="text-lg">Quick actions</h3>
              <div className="flex flex-col gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="w-full text-left px-3 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) hover:text-(--accent-text) transition-colors duration-200"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        
      </main>
    </div>
  );
}

export default Dashboard;