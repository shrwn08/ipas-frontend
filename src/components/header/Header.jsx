import { useState } from "react";
import logo from "../../assets/logo_ipas.png";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme,setTheme] = useState("light");


  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  }
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <div className="h-16 w-full flex justify-center items-center border-b-2 border-b-(--border)">
      {/* Mobile view */}
      <div className=" h-full w-12/13 flex justify-between items-center lg:hidden ">
        <div className="h-14 w-auto flex justify-start items-center gap-2">
          <img src={logo} alt="IPAS Logo" className="h-full" />
          <div className="font-[Serif] font-semibold text-black">
            <p className="company font-semibold">Industrial Power &</p>
            <p className="company font-semibold">Automation System</p>
          </div>
        </div>

        <div className="h-auto w-16 flex justify-center items-center">
          {isMenuOpen ? (
            <button type="button" onClick={toggleMenu}>
              <RxCross2 className="h-10 w-10" />
            </button>
          ) : (
            <button type="button" onClick={toggleMenu}>
              <IoMenu className="h-10 w-10" />
            </button>
          )}
        </div>

        <div
          className={
            isMenuOpen
              ? "h-auto w-48  flex justify-center items-start border-2 px-2 py-3 border-(--border) rounded-md flex-col gap-2 absolute top-16 right-0 bg-white z-10 transition-transform duration-300 ease-in-out transform origin-top-right"
              : "hidden"
          }
        >
          <div className=" w-full border-b-2 border-border">
            <p>Home</p>
          </div>
          <div className=" w-full border-b-2 border-border">
            <p>About us</p>
          </div>
          <div className=" w-full border-b-2 border-border">
            <p>Solutions & Software</p>
          </div>
          <div className=" w-full border-b-2 border-border">
            <p>Products & Panels</p>
          </div>
          <div className=" w-full border-b-2 border-border">
            <p>Industries</p>
          </div>
          <div className=" w-full border-b-2 border-border">
            <p>Contact us</p>
          </div>
          <div className=" w-full border-b-2 border-border">
            <p>Dark Mode Light Mode</p>
          </div>
          <div className=" w-full h-full bg-accent text-white flex justify-center items-center rounded-md">
            <button type="button" className="h-full w-full">
              Request Plant Audit
            </button>
          </div>
        </div>
      </div>
      <div className="hidden w-11/12 h-20 lg:flex  justify-start items-center gap-4 ">
        <div className="h-full w-full flex justify-between items-center ">
          {/* logo */}
          <div className="h-14 w-80 flex justify-start items-center gap-2 ">
            <img src={logo} alt="IPAS Logo" className="h-full" />
            <div className="font-[Serif] font-semibold text-black">
              <p className="company font-semibold">Industrial Power &</p>
              <p className="company font-semibold">Automation System</p>
            </div>
          </div>
          {/* Navbar */}
          <div className="h-full w-full flex justify-center items-center gap-4">
            <div className="navlinks">
              <p>Home</p>
            </div>
            <div className="navlinks">
              <p>About us</p>
            </div>
            <div className="navlinks">
              <p>Solutions & Software</p>
            </div>
            <div className="navlinks">
              <p>Products & Panels</p>
            </div>
            <div className="navlinks">
              <p>Industries</p>
            </div>
            <div className="navlinks">
              <p>Achievements</p>
            </div>
            <div className="navlinks">
              <p>Contact us</p>
            </div>
          </div>
          <div className="h-full w-80 flex justify-end items-center gap-4">
            <button type="button" className="h-10 w-48 bg-(--accent) text-white  rounded-md">
              Request Plant Audit
            </button>
            <div className="h-10 w-10 flex justify-center items-center  ">
            {theme === "light" ? (
              <button type="button" onClick={toggleTheme} className="ml-4 text-center">
                <MdDarkMode className="h-6 w-6 " />
              </button>
            ) : (
              <button type="button" onClick={toggleTheme} className="ml-4 text-center">
                <CiLight className="h-6 w-6 text-orange-400" />
              </button>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
