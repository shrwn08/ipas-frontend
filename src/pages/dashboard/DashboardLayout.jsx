import { NavLink, Outlet } from "react-router";

const navItems = [
  { label: "Overview", to: "/dashboard", end: true },
  { label: "Enquiries", to: "/dashboard/enquiries" },
  { label: "Milestones", to: "/dashboard/milestones" },
  { label: "Industries", to: "/dashboard/industries" },
  { label: "Admins", to: "/dashboard/admins" },
  { label: "Settings", to: "/dashboard/settings" },
];

function DashboardLayout() {
  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr] bg-(--bg)">
      <aside className="w-full border-b lg:border-b-0 lg:border-r border-(--border) bg-(--card) lg:min-h-screen">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col">
            <span className="eyebrow">Admin</span>
            <h2 className="text-lg">IPAS Dashboard</h2>
          </div>

          <nav className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map(({ label, to, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-md border transition-colors duration-200 ${
                    isActive
                      ? "bg-(--accent) border-(--accent) !text-white"
                      : "border-transparent !text-(--text) hover:bg-(--bg-alt)"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <button
              type="button"
              className="shrink-0 whitespace-nowrap text-left px-3 py-2 rounded-md border border-(--border) text-(--text) hover:border-(--accent-text) lg:mt-6 transition-colors duration-200"
            >
              Log out
            </button>
          </nav>
        </div>
      </aside>

      <main className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;