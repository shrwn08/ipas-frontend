import { useState } from "react";
import {
  cardClass,
  inputClass,
  primaryButton,
  smallButton,
  statusClass,
  Field,
  PageHeader,
} from "./ui";

const categories = ["Project", "News", "Update"];
const filters = ["All", "Live", "Draft"];

const emptyForm = { title: "", category: "", date: "", description: "" };

const initialMilestones = [
  {
    id: 1,
    title: "Rolling mill modernization completed",
    category: "Project",
    date: "2026-09-20",
    description:
      "We upgraded the logic on an existing Siemens S7-400 system, retuned the speed cascade and loop control, and handed over the documentation with FAT and SAT reports without replacing any hardware.",
    image: null,
    status: "Live",
  },
  {
    id: 2,
    title: "New panel workshop line commissioned",
    category: "News",
    date: "2026-09-02",
    description: "A new line for PLC and drive panels is running at our Faridabad works.",
    image: null,
    status: "Live",
  },
  {
    id: 3,
    title: "SCADA upgrade at cement plant",
    category: "Project",
    date: "",
    description: "WinCC upgrade with production reports and trending.",
    image: null,
    status: "Draft",
  },
];

const getToday = () => {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "No date";

function Milestones() {
  // CHANGED: future dates blocked with max on the input and a check on save
  const [milestones, setMilestones] = useState(initialMilestones);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [message, setMessage] = useState("");

  const today = getToday();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Choose an image file." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: "Image must be under 5 MB." }));
      return;
    }

    setImage(URL.createObjectURL(file));
    setImageName(file.name);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const removeImage = () => {
    setImage(null);
    setImageName("");
  };

  const resetForm = () => {
    setForm(emptyForm);
    setImage(null);
    setImageName("");
    setErrors({});
    setEditingId(null);
  };

  const validate = (status) => {
    const next = {};
    if (!form.title.trim()) next.title = "Enter a title.";
    if (!form.category) next.category = "Choose a category.";
    if (!form.description.trim()) next.description = "Write a short description.";
    if (form.date && form.date > today) {
      next.date = "The date can't be in the future. Choose today or an earlier date.";
    } else if (status === "Live" && !form.date) {
      next.date = "Choose a date to publish.";
    }
    return next;
  };

  const handleSave = (status) => {
    const found = validate(status);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const data = {
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
      image,
      status,
    };

    if (editingId) {
      setMilestones((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...data } : item))
      );
      setMessage(status === "Live" ? "Milestone updated and published." : "Milestone saved as draft.");
    } else {
      setMilestones((prev) => [{ id: Date.now(), ...data }, ...prev]);
      setMessage(status === "Live" ? "Milestone published." : "Milestone saved as draft.");
    }
    resetForm();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      category: item.category,
      date: item.date,
      description: item.description,
    });
    setImage(item.image);
    setImageName(item.image ? "Current image" : "");
    setErrors({});
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleStatus = (id) => {
    const item = milestones.find((m) => m.id === id);
    if (item.status === "Draft" && !item.date) {
      setErrors({ list: `"${item.title}" needs a date before it can be published. Edit it and choose a date.` });
      return;
    }
    setErrors({});
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === "Live" ? "Draft" : "Live" } : m
      )
    );
    setMessage(item.status === "Live" ? "Milestone moved to drafts." : "Milestone published.");
  };

  const confirmDelete = (id) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    if (editingId === id) resetForm();
    setDeleteId(null);
    setMessage("Milestone deleted.");
  };

  const countFor = (filter) =>
    filter === "All"
      ? milestones.length
      : milestones.filter((m) => m.status === filter).length;

  const visible = milestones
    .filter((m) => activeFilter === "All" || m.status === activeFilter)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const errorClass = (hasError) => (hasError ? "!border-(--red)" : "");

  return (
    <>
      <PageHeader
        title="Milestones"
        text="News and project milestones shown on the website."
      />

      {message && (
        <div
          role="status"
          className="px-3 py-2 rounded-md border border-(--green) text-sm text-(--green)"
        >
          {message}
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4 items-start">
        <form
          onSubmit={(e) => e.preventDefault()}
          noValidate
          className={cardClass}
        >
          <h3 className="text-lg">
            {editingId ? "Edit milestone" : "Add milestone"}
          </h3>

          <Field id="milestone-title" label="Title">
            <input
              id="milestone-title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              aria-invalid={!!errors.title}
              className={`${inputClass} ${errorClass(errors.title)}`}
            />
            {errors.title && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.title}
              </p>
            )}
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field id="milestone-category" label="Category">
              <select
                id="milestone-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                aria-invalid={!!errors.category}
                className={`${inputClass} ${errorClass(errors.category)}`}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p role="alert" className="text-sm !text-(--red)">
                  {errors.category}
                </p>
              )}
            </Field>

            <Field id="milestone-date" label="Date">
              <input
                id="milestone-date"
                name="date"
                type="date"
                max={today}
                value={form.date}
                onChange={handleChange}
                aria-invalid={!!errors.date}
                className={`${inputClass} ${errorClass(errors.date)}`}
              />
              {errors.date && (
                <p role="alert" className="text-sm !text-(--red)">
                  {errors.date}
                </p>
              )}
            </Field>
          </div>

          <Field id="milestone-description" label="Description">
            <textarea
              id="milestone-description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              aria-invalid={!!errors.description}
              className={`${inputClass} resize-y ${errorClass(errors.description)}`}
            />
            {errors.description && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.description}
              </p>
            )}
          </Field>

          <Field id="milestone-image" label="Image">
            {image && (
              <div className="flex items-center gap-3">
                <img
                  src={image}
                  alt="Milestone preview"
                  className="h-16 w-24 rounded-md object-cover border border-(--border)"
                />
                <div className="flex flex-col items-start">
                  <p className="text-sm break-all">{imageName}</p>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="text-sm font-semibold text-(--accent-text) hover:underline"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            )}
            <input
              id="milestone-image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-(--bg-alt) file:px-3 file:py-1 file:text-(--text)`}
            />
            {errors.image && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.image}
              </p>
            )}
          </Field>

          {Object.values(errors).filter(Boolean).length > 0 && !errors.list && (
            <div
              role="alert"
              className="px-3 py-2 rounded-md border border-(--red) text-sm text-(--red)"
            >
              Fix the fields marked above and try again.
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => handleSave("Live")}
              className={primaryButton}
            >
              {editingId ? "Save and publish" : "Publish"}
            </button>
            <button
              type="button"
              onClick={() => handleSave("Draft")}
              className="px-4 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) transition-colors duration-200"
            >
              Save as draft
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

        <div className={cardClass}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-lg">All milestones</h3>
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
          </div>

          {errors.list && (
            <div
              role="alert"
              className="px-3 py-2 rounded-md border border-(--red) text-sm text-(--red)"
            >
              {errors.list}
            </div>
          )}

          {visible.length === 0 ? (
            <p className="py-6 text-center !text-(--text) font-medium">
              No milestones here yet.
            </p>
          ) : (
            <ul className="flex flex-col">
              {visible.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col gap-3 py-4 border-b border-(--border) last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-16 w-24 shrink-0 rounded-md object-cover border border-(--border)"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="h-16 w-24 shrink-0 rounded-md border border-(--border) bg-(--bg-alt)"
                      />
                    )}
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="!text-(--text) font-medium">{item.title}</p>
                        <span
                          className={`shrink-0 px-2 py-0.5 text-xs rounded-md border ${statusClass[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="text-sm">
                        {item.category} · {formatDate(item.date)}
                      </p>
                      <p className="text-sm line-clamp-2">{item.description}</p>
                    </div>
                  </div>

                  {deleteId === item.id ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm !text-(--text)">Delete this milestone?</p>
                      <button
                        type="button"
                        onClick={() => confirmDelete(item.id)}
                        className="px-3 py-1 text-sm rounded-md border border-(--red) text-(--red) hover:bg-(--red) hover:text-white transition-colors duration-200"
                      >
                        Yes, delete
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
                        onClick={() => startEdit(item)}
                        className={smallButton}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(item.id)}
                        className={smallButton}
                      >
                        {item.status === "Live" ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(item.id)}
                        className={smallButton}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Milestones;