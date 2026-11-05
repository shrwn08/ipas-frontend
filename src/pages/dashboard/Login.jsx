import logo from "../../assets/logo_ipas.png";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  requestCode,
  signIn,
  setNewPassword,
  restartFlow,
  clearError,
} from "../../redux/features/auth/auth.js"

const passwordRegex =
  /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+=\-\[\]{};:'"\\,.<>\/|?]).{8,}$/;

const passwordRule =
  "At least 8 characters, with an uppercase letter, a lowercase letter, a number and a special character.";

const RESEND_SECONDS = 60;

const inputClass =
  "w-full px-3 py-2 rounded-md border border-(--border) bg-(--bg) text-(--text) focus:outline-none focus:border-(--accent-text)";

const primaryClass =
  "w-full bg-(--accent) text-white hover:bg-(--accent-hover) px-4 py-2 rounded-md transition-colors duration-300 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";

const secondaryClass =
  "w-full px-4 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

function ErrorBanner({ text }) {
  if (!text) return null;
  return (
    <div
      role="alert"
      className="px-3 py-2 rounded-md border border-(--red) text-sm text-(--red)"
    >
      {text}
    </div>
  );
}

function FieldError({ id, text }) {
  if (!text) return null;
  return (
    <p id={id} role="alert" className="text-sm text-(--red)!">
      {text}
    </p>
  );
}

function ChangePasswordDialog() {
  const dispatch = useDispatch();
  const { loading, error, resetToken } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (error) dispatch(clearError());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const next = {};
    if (!form.password) next.password = "Enter a new password.";
    else if (!passwordRegex.test(form.password)) next.password = passwordRule;

    if (!form.confirm) next.confirm = "Confirm the new password.";
    else if (form.password && form.confirm !== form.password)
      next.confirm = "The passwords don't match.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    dispatch(setNewPassword({ resetToken, password: form.password }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <form
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-password-title"
        onSubmit={handleSubmit}
        noValidate
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
              type={show ? "text" : "password"}
              autoComplete="new-password"
              autoFocus
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "new-password-error" : undefined}
              className={`${inputClass} pr-16 ${errors.password ? "!border-(--red)" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              aria-label={show ? "Hide passwords" : "Show passwords"}
              className="absolute inset-y-0 right-0 px-3 text-sm font-semibold text-(--accent-text) hover:underline"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          <FieldError id="new-password-error" text={errors.password} />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-sm font-medium text-(--text)">
            Confirm new password
          </label>
          <input
            id="confirm-password"
            name="confirm"
            type={show ? "text" : "password"}
            autoComplete="new-password"
            value={form.confirm}
            onChange={handleChange}
            aria-invalid={!!errors.confirm}
            aria-describedby={errors.confirm ? "confirm-password-error" : undefined}
            className={`${inputClass} ${errors.confirm ? "!border-(--red)" : ""}`}
          />
          <FieldError id="confirm-password-error" text={errors.confirm} />
        </div>

        <p className="text-sm">{passwordRule}</p>

        <ErrorBanner text={error} />

        <div className="flex flex-col sm:flex-row gap-2">
          <button type="submit" disabled={loading} className={primaryClass}>
            {loading ? "Saving..." : "Save password and sign in"}
          </button>
          <button
            type="button"
            onClick={() => dispatch(restartFlow())}
            disabled={loading}
            className={secondaryClass}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Login() {
  const dispatch = useDispatch();
  const {
    token,
    loading,
    sending,
    error,
    info,
    sentAt,
    step,
  } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const email = form.email.trim().toLowerCase();
  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (!sentAt) {
      setSecondsLeft(0);
      return;
    }

    const tick = () =>
      setSecondsLeft(
        Math.max(0, RESEND_SECONDS - Math.floor((Date.now() - sentAt) / 1000))
      );

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sentAt]);

  if (token) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    if (error) dispatch(clearError());
  };

  const handleSend = () => {
    if (!email) {
      setErrors({ email: "Enter your email." });
      return;
    }
    if (!emailValid) {
      setErrors({ email: "Enter a valid email address." });
      return;
    }

    setErrors({});
    dispatch(requestCode(email));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const next = {};
    if (!email) next.email = "Enter your email.";
    else if (!emailValid) next.email = "Enter a valid email address.";
    if (!form.password) next.password = "Enter your password.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    dispatch(signIn({ email, password: form.password }));
  };

  const sendLabel = sending
    ? "Sending..."
    : secondsLeft > 0
    ? `Resend in ${secondsLeft}s`
    : sentAt
    ? "Send again"
    : "Send password";

  return (
    <section className="relative isolate w-full min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "75px 75px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 100%)",
        }}
      />

      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <img
            src={logo}
            alt="IPAS Logo"
            className="h-14 w-auto rounded-md bg-white p-1"
          />
          <span className="eyebrow">Admin</span>
          <h1 className="text-2xl sm:text-3xl">Sign in to the dashboard</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 p-5 sm:p-6 rounded-md border border-(--border) bg-(--card)"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-(--text)">
              Email
            </label>
            <div className="flex items-stretch gap-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`${inputClass} min-w-0 flex-1 ${errors.email ? "!border-(--red)" : ""}`}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={sending || secondsLeft > 0}
                className="shrink-0 whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-md border border-(--accent) text-(--accent-text) hover:bg-(--accent) hover:text-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-(--accent-text)"
              >
                {sendLabel}
              </button>
            </div>
            <FieldError id="email-error" text={errors.email} />
          </div>

          {info && (
            <div
              role="status"
              className="px-3 py-2 rounded-md border border-(--green) text-sm text-(--green)"
            >
              {info}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-(--text)">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={`${inputClass} pr-16 ${errors.password ? "!border-(--red)" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 px-3 text-sm font-semibold text-(--accent-text) hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <FieldError id="password-error" text={errors.password} />
            <p className="text-sm">
              First time? Click Send password, then enter the password from the
              email here.
            </p>
          </div>

          {step === "login" && <ErrorBanner text={error} />}

          <button type="submit" disabled={loading} className={primaryClass}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <Link to="/" className="self-center text-sm hover:underline">
          Back to website
        </Link>
      </div>

      {step === "password" && <ChangePasswordDialog />}
    </section>
  );
}

export default Login;