export const inputClass =
  "w-full px-3 py-2 rounded-md border border-(--border) bg-(--bg) text-(--text) focus:outline-none focus:border-(--accent-text)";

export const cardClass =
  "flex flex-col gap-3 p-4 rounded-md border border-(--border) bg-(--card)";

export const primaryButton =
  "bg-(--accent) text-white hover:bg-(--accent-hover) px-4 py-2 rounded-md transition-colors duration-300 ease-in-out";

export const smallButton =
  "px-3 py-1 text-sm rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) hover:text-(--accent-text) transition-colors duration-200";

export const statusClass = {
  New: "border-(--accent-text) text-(--accent-text)",
  Replied: "border-(--green) text-(--green)",
  Closed: "border-(--border) text-(--muted)",
  Live: "border-(--green) text-(--green)",
  Draft: "border-(--border) text-(--muted)",
  Active: "border-(--green) text-(--green)",
};

export function Field({ id, label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-(--text)">
        {label}
      </label>
      {children}
    </div>
  );
}

export function PageHeader({ title, text, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl text-left">{title}</h1>
        <p className="text-left">{text}</p>
      </div>
      {children}
    </div>
  );
}