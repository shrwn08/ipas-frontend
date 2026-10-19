import { useState } from "react";
import {
  cardClass,
  inputClass,
  primaryButton,
  smallButton,
  Field,
  PageHeader,
} from "./ui";

const industries = ["Steel", "Metals", "Power", "Cement", "Process"];
const filters = ["All", ...industries];

const emptyForm = { name: "", industry: "", location: "", work: "" };

const initialCompanies = [
  { id: 1, name: "Sharma Steel Rolling Mills", industry: "Steel", location: "Raipur", work: "TMT mill automation" },
  { id: 2, name: "Bharat TMT Bars", industry: "Steel", location: "Jaipur", work: "Siemens S7-400 modernization" },
  { id: 3, name: "Gupta Metals", industry: "Metals", location: "Faridabad", work: "Strip line drives" },
  { id: 4, name: "Singh Power Systems", industry: "Power", location: "Kota", work: "Plant monitoring" },
  { id: 5, name: "Verma Cement Works", industry: "Cement", location: "Chittorgarh", work: "Motor control centres" },
];

function DashboardIndustries() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setEditingId(null);
  };

  const validate = () => {
    const next = {};
    const name = form.name.trim();

    if (!name) next.name = "Enter the company name.";
    if (!form.industry) next.industry = "Choose an industry.";
    if (!form.location.trim()) next.location = "Enter the location.";
    if (!form.work.trim()) next.work = "Describe the work done.";

    if (name && form.industry) {
      const duplicate = companies.some(
        (company) =>
          company.id !== editingId &&
          company.industry === form.industry &&
          company.name.toLowerCase() === name.toLowerCase()
      );
      if (duplicate) next.name = `${name} is already listed under ${form.industry}.`;
    }
    return next;
  };

  const handleSave = () => {
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      name: form.name.trim(),
      industry: form.industry,
      location: form.location.trim(),
      work: form.work.trim(),
    };

    if (editingId) {
      setCompanies((prev) =>
        prev.map((company) => (company.id === editingId ? { ...company, ...data } : company))
      );
      setMessage(`${data.name} updated.`);
    } else {
      setCompanies((prev) => [{ id: Date.now(), ...data }, ...prev]);
      setMessage(`${data.name} added under ${data.industry}.`);
    }
    resetForm();
  };

  const startEdit = (company) => {
    setEditingId(company.id);
    setForm({
      name: company.name,
      industry: company.industry,
      location: company.location,
      work: company.work,
    });
    setErrors({});
    setMessage("");
    setDeleteId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id) => {
    const removed = companies.find((company) => company.id === id);
    setCompanies((prev) => prev.filter((company) => company.id !== id));
    if (editingId === id) resetForm();
    setDeleteId(null);
    setMessage(`${removed.name} removed.`);
  };

  const countFor = (filter) =>
    filter === "All"
      ? companies.length
      : companies.filter((company) => company.industry === filter).length;

  const query = search.trim().toLowerCase();

  const matchesSearch = (company) =>
    !query ||
    [company.name, company.location, company.work].some((value) =>
      value.toLowerCase().includes(query)
    );

  const groups = industries
    .filter((industry) => activeFilter === "All" || industry === activeFilter)
    .map((industry) => ({
      industry,
      list: companies.filter(
        (company) => company.industry === industry && matchesSearch(company)
      ),
    }))
    .filter(({ list }) => !query || list.length > 0);

  const errorClass = (hasError) => (hasError ? "!border-(--red)" : "");
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <>
      <PageHeader
        title="Industries"
        text="Add a company when you start working with a new one. It is listed under its industry."
      />

      {message && (
        <div
          role="status"
          className="px-3 py-2 rounded-md border border-(--green) text-sm text-(--green)"
        >
          {message}
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 items-start">
        <form onSubmit={(e) => e.preventDefault()} noValidate className={cardClass}>
          <h3 className="text-lg">{editingId ? "Edit company" : "Add company"}</h3>

          <Field id="company-name" label="Company name">
            <input
              id="company-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              className={`${inputClass} ${errorClass(errors.name)}`}
            />
            {errors.name && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.name}
              </p>
            )}
          </Field>

          <Field id="company-industry" label="Industry">
            <select
              id="company-industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              aria-invalid={!!errors.industry}
              className={`${inputClass} ${errorClass(errors.industry)}`}
            >
              <option value="">Select an industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.industry}
              </p>
            )}
          </Field>

          <Field id="company-location" label="Location">
            <input
              id="company-location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              aria-invalid={!!errors.location}
              className={`${inputClass} ${errorClass(errors.location)}`}
            />
            {errors.location && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.location}
              </p>
            )}
          </Field>

          <Field id="company-work" label="Work done">
            <textarea
              id="company-work"
              name="work"
              rows={3}
              value={form.work}
              onChange={handleChange}
              aria-invalid={!!errors.work}
              className={`${inputClass} resize-y ${errorClass(errors.work)}`}
            />
            {errors.work && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.work}
              </p>
            )}
          </Field>

          {errorCount > 0 && (
            <div
              role="alert"
              className="px-3 py-2 rounded-md border border-(--red) text-sm text-(--red)"
            >
              Fix the fields marked above and try again.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <button type="button" onClick={handleSave} className={primaryButton}>
              {editingId ? "Save changes" : "Add company"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) transition-colors duration-200"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
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
              placeholder="Search company, location or work"
              aria-label="Search companies"
              className={`${inputClass} xl:max-w-xs`}
            />
          </div>

          {groups.length === 0 ? (
            <div className={`${cardClass} items-center py-8`}>
              <p className="!text-(--text) font-medium">No companies match your search.</p>
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-sm font-semibold text-(--accent-text) hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {groups.map(({ industry, list }) => (
                <div key={industry} className={cardClass}>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg">{industry}</h3>
                    <span className="px-2 py-0.5 text-xs rounded-md border border-(--border) text-(--muted)">
                      {list.length} {list.length === 1 ? "company" : "companies"}
                    </span>
                  </div>

                  {list.length === 0 ? (
                    <p className="text-sm">No companies added yet.</p>
                  ) : (
                    <ul className="flex flex-col">
                      {list.map((company) => (
                        <li
                          key={company.id}
                          className="flex flex-col gap-2 py-3 border-b border-(--border) last:border-b-0"
                        >
                          <div className="flex flex-col">
                            <p className="!text-(--text) font-medium">{company.name}</p>
                            <p className="text-sm">
                              {company.location} · {company.work}
                            </p>
                          </div>

                          {deleteId === company.id ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm !text-(--text)">Remove this company?</p>
                              <button
                                type="button"
                                onClick={() => confirmDelete(company.id)}
                                className="px-3 py-1 text-sm rounded-md border border-(--red) text-(--red) hover:bg-(--red) hover:text-white transition-colors duration-200"
                              >
                                Yes, remove
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteId(null)}
                                className={smallButton}
                              >
                                Keep
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              <button
                                type="button"
                                onClick={() => startEdit(company)}
                                className={smallButton}
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteId(company.id)}
                                className={smallButton}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashboardIndustries;