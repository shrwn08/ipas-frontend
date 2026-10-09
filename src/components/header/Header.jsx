import { useEffect, useState } from "react";
import logo from "../../assets/logo_ipas.png";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/features/themes/theme";
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
    page: "Products & Panels",
    path: "/products&panels",
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

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logoClass = `h-full w-auto shrink-0 object-contain ${
    theme === "dark" ? "bg-white" : ""
  }`;

  return (
    <header className="relative h-16 w-full flex justify-center items-center border-b-2 border-b-(--border)">
      <div className="h-full w-full px-2 flex justify-between items-center min-[1100px]:hidden">
        <Link to="/" className="hover:cursor-pointer">
          <div className="h-14 min-w-0 flex justify-start items-center gap-2">
            <img src={logo} alt="IPAS Logo" className={logoClass} />
            <div className="font-semibold leading-tight text-xs sm:text-base">
              <p className="company font-semibold">Industrial Power &</p>
              <p className="company font-semibold">Automation System</p>
            </div>
          </div>
        </Link>
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="shrink-0 p-1 text-(--text)"
        >
          {isMenuOpen ? (
            <RxCross2 className="h-8 w-8" />
          ) : (
            <IoMenu className="h-8 w-8" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="min-[1100px]:hidden absolute top-full right-0 z-50 w-full sm:w-72 max-h-[calc(100vh-4rem)] overflow-y-auto flex flex-col items-start gap-2 px-3 py-3 border-2 border-(--border) rounded-md bg-(--card)">
          {navItems.map((item, index) => (
            <div key={index} className="w-full border-b border-(--border) pb-1">
              <Link to={item.path} className="text-(--text)">
                {item.page}
              </Link>
            </div>
          ))}
          <button
            type="button"
            onClick={handleToggleTheme}
            className="w-full border-b border-(--border) pb-1 flex items-center gap-2 text-left text-(--text)"
          >
            {theme === "light" ? (
              <MdDarkMode className="h-5 w-5" />
            ) : (
              <CiLight className="h-5 w-5 text-orange-400" />
            )}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>
          <div className="w-full h-10 bg-(--accent) text-white flex justify-center items-center rounded-md">
            <button type="button" className="h-full w-full">
              Request Plant Audit
            </button>
          </div>
        </div>
      )}

      <div className="hidden min-[1100px]:flex w-full max-w-7xl h-full px-3 justify-between items-center gap-3">
        <Link to="/" className="hover:cursor-pointer">
          <div className="h-14 shrink-0 flex justify-start items-center gap-2">
            <img src={logo} alt="IPAS Logo" className={logoClass} />
            <div className="font-semibold leading-tight text-sm">
              <p className="company font-semibold">Industrial Power &</p>
              <p className="company font-semibold">Automation System</p>
            </div>
          </div>
        </Link>

        <nav className="flex flex-1 min-w-0 justify-center items-center gap-3 text-sm">
          {navItems.map((item, index) => (
            <div key={index} className="navlinks whitespace-nowrap">
              <Link to={item.path}>{item.page}</Link>
            </div>
          ))}
        </nav>

        <div className="shrink-0 flex justify-end items-center gap-2">
          <button
            type="button"
            className="h-10 px-3 text-sm whitespace-nowrap bg-(--accent) text-white rounded-md"
          >
            Request Plant Audit
          </button>
          <button
            type="button"
            onClick={handleToggleTheme}
            aria-label="Toggle theme"
            className="h-10 w-10 flex justify-center items-center"
          >
            {theme === "light" ? (
              <MdDarkMode className="h-6 w-6" />
            ) : (
              <CiLight className="h-6 w-6 text-orange-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
