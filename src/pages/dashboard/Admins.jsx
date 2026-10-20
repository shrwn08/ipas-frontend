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

const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\-\[\]{};:'"\\,.<>\/|?]).{8,}$/;

const passwordRule =
  "At least 8 characters, with an uppercase letter, a lowercase letter, a number and a special character.";

const emptyForm = { fullname: "", email: "", password: "", confirm: "" };
const emptyReset = { password: "", confirm: "" };

const CURRENT_ADMIN_ID = 1;

const initialAdmins = [
  { id: 1, name: "Admin One", email: "admin1@ipasautomation.com", lastLogin: "19 Oct 2026, 10:12" },
  { id: 2, name: "Admin Two", email: "admin2@ipasautomation.com", lastLogin: "18 Oct 2026, 16:40" },
  { id: 3, name: "Admin Three", email: "admin3@ipasautomation.com", lastLogin: "15 Oct 2026, 09:05" },
];

const validatePasswords = (password, confirm) => {
  const next = {};
  if (!password) next.password = "Enter a password.";
  else if (!passwordRegex.test(password)) next.password = passwordRule;
  if (!confirm) next.confirm = "Confirm the password.";
  else if (password && confirm !== password) next.confirm = "The passwords don't match.";
  return next;
};

function Admins() {
  // CHANGED: working admins page with add, reset password and remove with last-admin and self protection
  const [admins, setAdmins] = useState(initialAdmins);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [resetId, setResetId] = useState(null);
  const [resetForm, setResetForm] = useState(emptyReset);
  const [resetErrors, setResetErrors] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [pageError, setPageError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setMessage("");
  };

  const handleAdd = () => {
    const next = {};
    const fullname = form.fullname.trim();
    const email = form.email.trim().toLowerCase();

    if (!fullname) next.fullname = "Enter the full name.";
    if (!email) next.email = "Enter the email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    else if (admins.some((admin) => admin.email === email))
      next.email = "An admin with this email already exists.";

    Object.assign(next, validatePasswords(form.password, form.confirm));

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setAdmins((prev) => [
      ...prev,
      { id: Date.now(), name: fullname, email, lastLogin: "Never" },
    ]);
    setForm(emptyForm);
    setMessage(`${fullname} was added as an admin.`);
    setPageError("");
  };

  const openReset = (id) => {
    setResetId(id);
    setResetForm(emptyReset);
    setResetErrors({});
    setDeleteId(null);
    setMessage("");
    setPageError("");
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));
    setResetErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const saveReset = (admin) => {
    const next = validatePasswords(resetForm.password, resetForm.confirm);
    setResetErrors(next);
    if (Object.keys(next).length > 0) return;

    setResetId(null);
    setResetForm(emptyReset);
    setMessage(`Password updated for ${admin.name}.`);
  };

  const confirmDelete = (admin) => {
    if (admin.id === CURRENT_ADMIN_ID) {
      setPageError("You can't remove your own account while you're logged in.");
      setDeleteId(null);
      return;
    }
    if (admins.length <= 1) {
      setPageError("The last admin can't be removed.");
      setDeleteId(null);
      return;
    }
    setAdmins((prev) => prev.filter((item) => item.id !== admin.id));
    setDeleteId(null);
    setPageError("");
    setMessage(`${admin.name} was removed.`);
  };

  const errorClass = (hasError) => (hasError ? "!border-(--red)" : "");
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <>
      <PageHeader title="Admins" text="People who can log in to this dashboard." />

      {message && (
        <div
          role="status"
          className="px-3 py-2 rounded-md border border-(--green) text-sm text-(--green)"
        >
          {message}
        </div>
      )}

      {pageError && (
        <div
          role="alert"
          className="px-3 py-2 rounded-md border border-(--red) text-sm text-(--red)"
        >
          {pageError}
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4 items-start">
        <div className={cardClass}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg">All admins</h3>
            <span className="px-2 py-0.5 text-xs rounded-md border border-(--border) text-(--muted)">
              {admins.length} {admins.length === 1 ? "admin" : "admins"}
            </span>
          </div>

          <ul className="flex flex-col">
            {admins.map((admin) => {
              const isYou = admin.id === CURRENT_ADMIN_ID;
              return (
                <li
                  key={admin.id}
                  className="flex flex-col gap-3 py-4 border-b border-(--border) last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="!text-(--text) font-medium">{admin.name}</p>
                        {isYou && (
                          <span className="px-2 py-0.5 text-xs rounded-md border border-(--border) text-(--muted)">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm break-all">{admin.email}</p>
                      <p className="text-sm">Last login: {admin.lastLogin}</p>
                    </div>
                    <span
                      className={`shrink-0 px-2 py-0.5 text-xs rounded-md border ${statusClass.Active}`}
                    >
                      Active
                    </span>
                  </div>

                  {resetId === admin.id && (
                    <div className="flex flex-col gap-3 p-3 rounded-md border border-(--border) bg-(--bg)">
                      <p className="text-sm font-medium !text-(--text)">
                        New password for {admin.name}
                      </p>

                      <Field id={`reset-password-${admin.id}`} label="New password">
                        <input
                          id={`reset-password-${admin.id}`}
                          name="password"
                          type="password"
                          autoComplete="new-password"
                          value={resetForm.password}
                          onChange={handleResetChange}
                          aria-invalid={!!resetErrors.password}
                          className={`${inputClass} ${errorClass(resetErrors.password)}`}
                        />
                        {resetErrors.password && (
                          <p role="alert" className="text-sm !text-(--red)">
                            {resetErrors.password}
                          </p>
                        )}
                      </Field>

                      <Field id={`reset-confirm-${admin.id}`} label="Confirm new password">
                        <input
                          id={`reset-confirm-${admin.id}`}
                          name="confirm"
                          type="password"
                          autoComplete="new-password"
                          value={resetForm.confirm}
                          onChange={handleResetChange}
                          aria-invalid={!!resetErrors.confirm}
                          className={`${inputClass} ${errorClass(resetErrors.confirm)}`}
                        />
                        {resetErrors.confirm && (
                          <p role="alert" className="text-sm !text-(--red)">
                            {resetErrors.confirm}
                          </p>
                        )}
                      </Field>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => saveReset(admin)}
                          className={primaryButton}
                        >
                          Update password
                        </button>
                        <button
                          type="button"
                          onClick={() => setResetId(null)}
                          className="px-4 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {deleteId === admin.id ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm !text-(--text)">Remove this admin?</p>
                      <button
                        type="button"
                        onClick={() => confirmDelete(admin)}
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
                        onClick={() => openReset(admin.id)}
                        className={smallButton}
                      >
                        Reset password
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDeleteId(admin.id);
                          setResetId(null);
                          setPageError("");
                          setMessage("");
                        }}
                        className={smallButton}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <form onSubmit={(e) => e.preventDefault()} noValidate className={cardClass}>
          <h3 className="text-lg">Add admin</h3>

          <Field id="admin-name" label="Full name">
            <input
              id="admin-name"
              name="fullname"
              type="text"
              value={form.fullname}
              onChange={handleChange}
              aria-invalid={!!errors.fullname}
              className={`${inputClass} ${errorClass(errors.fullname)}`}
            />
            {errors.fullname && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.fullname}
              </p>
            )}
          </Field>

          <Field id="admin-email" label="Email">
            <input
              id="admin-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              className={`${inputClass} ${errorClass(errors.email)}`}
            />
            {errors.email && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.email}
              </p>
            )}
          </Field>

          <Field id="admin-password" label="Password">
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              className={`${inputClass} ${errorClass(errors.password)}`}
            />
            {errors.password && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.password}
              </p>
            )}
          </Field>

          <Field id="admin-confirm" label="Confirm password">
            <input
              id="admin-confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={handleChange}
              aria-invalid={!!errors.confirm}
              className={`${inputClass} ${errorClass(errors.confirm)}`}
            />
            {errors.confirm && (
              <p role="alert" className="text-sm !text-(--red)">
                {errors.confirm}
              </p>
            )}
          </Field>

          <p className="text-sm">{passwordRule}</p>

          {errorCount > 0 && (
            <div
              role="alert"
              className="px-3 py-2 rounded-md border border-(--red) text-sm text-(--red)"
            >
              Fix the fields marked above and try again.
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            className={`${primaryButton} w-full sm:w-auto sm:self-start`}
          >
            Add admin
          </button>
        </form>
      </div>
    </>
  );
}

export default Admins;