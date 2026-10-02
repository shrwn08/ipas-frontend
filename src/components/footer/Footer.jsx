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
            <p>Home</p>
            <p>About us</p>
            <p>Solutions & Software</p>
            <p>Products & Panels</p>
            <p>Industries</p>
            <p>Achievements</p>
            <p>Contact us</p>
          </nav>
        </div>

        <div className="flex flex-col items-start gap-3">
          <h3>Reach us</h3>
          <div className="flex flex-col items-start gap-2">
            <p>+91 98290 12345</p>
            <p className="break-all">info@company.com</p>
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
    </footer>
  );
}

export default Footer;