import { Link } from "react-router";
import logo from "../../assets/logo_ipas.png";

const inputClass =
  "w-full px-3 py-2 rounded-md border border-(--border) bg-(--bg) text-(--text) focus:outline-none focus:border-(--accent-text)";

function Login() {
  //  UI only sign-in page with a Send password button beside the email field
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

        <form className="flex flex-col gap-4 p-5 sm:p-6 rounded-md border border-(--border) bg-(--card)">
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
                className={`${inputClass} min-w-0 flex-1`}
              />
              <button
                type="button"
                className="shrink-0 whitespace-nowrap px-3 py-2 text-sm font-semibold rounded-md border border-(--accent) text-(--accent-text) hover:bg-(--accent) hover:text-white transition-colors duration-200"
              >
                Send password
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-(--text)">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={`${inputClass} pr-16`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 text-sm font-semibold text-(--accent-text) hover:underline"
              >
                Show
              </button>
            </div>
            <p className="text-sm">
              First time? Click Send password, then enter the password from the
              email here.
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-(--accent) text-white hover:bg-(--accent-hover) px-4 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Sign in
          </button>
        </form>

        <Link to="/" className="self-center text-sm hover:underline">
          Back to website
        </Link>
      </div>
    </section>
  );
}

export default Login;