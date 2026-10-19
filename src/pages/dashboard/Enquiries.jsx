import { useEffect, useState } from "react";
import {
  cardClass,
  inputClass,
  smallButton,
  statusClass,
  PageHeader,
} from "./ui";

const initialEnquiries = [
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

function Enquiries() {
  // CHANGED: enquiries in state, View opens a detail dialog, Mark replied updates the status
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEmail, setSelectedEmail] = useState(null);

  const selected = enquiries.find((enquiry) => enquiry.email === selectedEmail);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEmail(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  const markReplied = (email) => {
    setEnquiries((prev) =>
      prev.map((enquiry) =>
        enquiry.email === email ? { ...enquiry, status: "Replied" } : enquiry
      )
    );
  };

  const countFor = (filter) =>
    filter === "All"
      ? enquiries.length
      : enquiries.filter((enquiry) => enquiry.status === filter).length;

  const query = search.trim().toLowerCase();

  const visible = enquiries.filter((enquiry) => {
    const matchesStatus =
      activeFilter === "All" || enquiry.status === activeFilter;
    const matchesSearch =
      !query ||
      [enquiry.name, enquiry.company, enquiry.email, enquiry.need].some(
        (value) => value.toLowerCase().includes(query)
      );
    return matchesStatus && matchesSearch;
  });

  const hasFilters = activeFilter !== "All" || query;

  const clearFilters = () => {
    setActiveFilter("All");
    setSearch("");
  };

  return (
    <>
      <PageHeader
        title="Enquiries"
        text="Messages sent from the contact form on the website."
      />

      <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={isActive}
                className={`flex items-center gap-2 px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
                  isActive
                    ? "bg-(--accent) border-(--accent) text-white"
                    : "border-(--border) text-(--text) hover:border-(--accent-text)"
                }`}
              >
                {filter}
                <span className="text-xs opacity-70">{countFor(filter)}</span>
              </button>
            );
          })}
        </div>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, company, email or need"
          aria-label="Search enquiries"
          className={`${inputClass} lg:max-w-xs`}
        />
      </div>

      <p className="text-sm">
        Showing {visible.length} of {enquiries.length} enquiries
      </p>

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
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center">
                  <p className="!text-(--text) font-medium">
                    No enquiries match your filters.
                  </p>
                  {hasFilters && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="mt-2 text-sm font-semibold text-(--accent-text) hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              visible.map(
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
                        <button
                          type="button"
                          onClick={() => setSelectedEmail(email)}
                          className={smallButton}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => markReplied(email)}
                          disabled={status === "Replied"}
                          className={`${smallButton} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-(--border) disabled:hover:text-(--text)`}
                        >
                          {status === "Replied" ? "Replied" : "Mark replied"}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedEmail(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            onClick={(e) => e.stopPropagation()}
            className={`${cardClass} w-full max-w-lg max-h-[90vh] overflow-y-auto gap-4 p-5`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col">
                <h3 id="enquiry-title" className="text-xl">
                  {selected.name}
                </h3>
                <p className="text-sm">{selected.company}</p>
              </div>
              <span
                className={`shrink-0 px-2 py-0.5 text-xs rounded-md border ${statusClass[selected.status]}`}
              >
                {selected.status}
              </span>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <dt className="eyebrow">Email</dt>
                <dd className="text-(--text) break-all">{selected.email}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="eyebrow">Phone</dt>
                <dd className="text-(--text)">{selected.phone}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="eyebrow">Need</dt>
                <dd className="text-(--text)">{selected.need}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="eyebrow">Received</dt>
                <dd className="text-(--text)">{selected.date}</dd>
              </div>
            </dl>

            <div className="flex flex-col gap-1">
              <span className="eyebrow">Message</span>
              <p className="!text-(--text) whitespace-pre-line">
                {selected.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2 pt-2 border-t border-(--border)">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent(
                  `Re: ${selected.need}`
                )}`}
                className="px-4 py-2 text-center rounded-md border border-(--border) !text-(--text) hover:border-(--accent-text) transition-colors duration-200"
              >
                Reply by email
              </a>
              <button
                type="button"
                onClick={() => markReplied(selected.email)}
                disabled={selected.status === "Replied"}
                className="px-4 py-2 rounded-md bg-(--accent) text-white hover:bg-(--accent-hover) transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selected.status === "Replied" ? "Replied" : "Mark replied"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedEmail(null)}
                className="px-4 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Enquiries;