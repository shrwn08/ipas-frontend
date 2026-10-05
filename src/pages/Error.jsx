import { Link } from "react-router";

function Error() {
  return (
    <section className="relative isolate w-full min-h-[70vh] flex flex-col justify-center items-center px-4 lg:px-20 py-16 overflow-hidden">
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

      <div className="w-full max-w-2xl flex flex-col items-center gap-4 text-center">
        <span className="eyebrow">Error 404</span>

        <p
          className="text-7xl sm:text-9xl font-extrabold leading-none text-(--accent-text)"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          404
        </p>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl">Page not found</h1>

        <p className="max-w-md">
          The page you are looking for may have been moved, renamed or doesn't
          exist yet. Check the address, or head back to a page that does.
        </p>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            to="/"
            className="w-full sm:w-auto text-center bg-(--accent) text-white hover:bg-(--accent-hover) hover:text-white px-5 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Back to home
          </Link>
          <Link
            to="/contact-us"
            className="w-full sm:w-auto text-center border border-(--border) text-(--text) hover:bg-(--card) px-5 py-2 rounded-md transition-colors duration-300 ease-in-out"
          >
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Error;