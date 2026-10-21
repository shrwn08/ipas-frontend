const inputClass =
  "w-full px-3 py-2 rounded-md border border-(--border) bg-(--bg) text-(--text) focus:outline-none focus:border-(--accent-text)";

function ChangePasswordDialog() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        className="w-full max-w-md max-h-[90vh] overflow-y-auto flex flex-col gap-4 p-5 sm:p-6 rounded-md border border-(--border) bg-(--card)"
      >
        <div className="flex flex-col gap-1">
          <h2 id="change-password-title" className="text-xl">
            Set your own password
          </h2>
          <p className="text-sm">
            The emailed password worked. Choose your own password to finish
            signing in. Next time, sign in with it directly.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="new-password" className="text-sm font-medium text-(--text)">
            New password
          </label>
          <div className="relative">
            <input
              id="new-password"
              name="password"
              type="password"
              autoComplete="new-password"
              className={`${inputClass} pr-16`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-sm font-semibold text-(--accent-text) hover:underline"
            >
              Show
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-sm font-medium text-(--text)">
            Confirm new password
          </label>
          <input
            id="confirm-password"
            name="confirm"
            type="password"
            autoComplete="new-password"
            className={inputClass}
          />
        </div>

        <p className="text-sm">
          At least 8 characters, with an uppercase letter, a lowercase letter, a
          number and a special character.
        </p>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            className="w-full bg-(--accent) text-white hover:bg-(--accent-hover) px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Save password and sign in
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordDialog;