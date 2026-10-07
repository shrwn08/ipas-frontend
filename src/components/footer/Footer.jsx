import { Link } from "react-router";

const navItems = [
  {
    page: "Solutions",
    path: "/solutions",
  },
  {
    page: "Software",
    path: "/software",
  },
  {
    page: "Products",
    path: "/products",
  },
  {
    page: "Panels",
    path: "/panels",
  },
  {
    page: "Industries",
    path: "/industries",
  },
  {
    page: "Achievements",
    path: "/achievements",
  },
  {
    page: "About us",
    path: "/about-us",
  },
  {
    page: "Contact us",
    path: "/contact-us",
  },
];
function Footer() {
  return (
    <footer className="w-full border-t border-(--border)">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-8">
        <div className="flex flex-col items-start gap-3">
          <h3>Industrial Power & Automation System</h3>
          <p>
            Industrial automation, PLC, SCADA, drive systems, electrical panels
            and Industry 4.0 solutions.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3>Explore</h3>
          <nav className="flex flex-col items-start gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className=" hover:text-(--accent-text) hover:underline transition-colors duration-200"
              >
                {item.page}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3>Reach us</h3>
          <div className="flex flex-col items-start gap-2">
            <a href="tel:+917982903925" className="hover:underline">
              +91 79829 03925
            </a>
            <a
              href="mailto:info@ipasautomation.com"
              className="break-all hover:underline"
            >
              info@ipasautomation.com
            </a>
            <a
              href="https://www.linkedin.com/company/your-company-page"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3>Office</h3>
          <div className="flex flex-col items-start gap-2">
            <p>
              Plot No-659, Badoli, Sector-80, Opposite Gov. High School,
              Faridabad-121004, Haryana, India
            </p>
            <p>Staff sign in</p>
          </div>
        </div>
      </div>

      <div className="border-t border-(--border) px-4 py-4">
        <p className="mx-auto max-w-7xl text-center text-sm">
          © {new Date().getFullYear()} Industrial Power & Automation System. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
