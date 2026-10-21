import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router";
import { useSelector } from "react-redux";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import ErrorPage from "../pages/Error";
import Solutions from "../pages/Solutions";
import Software from "../pages/Software";
import Contact from "../pages/Contact";
import Industries from "../pages/Industries";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Overview from "../pages/dashboard/Overview";
import Enquiries from "../pages/dashboard/Enquiries";
import Milestones from "../pages/dashboard/Milestones";
import DashboardIndustries from "../pages/dashboard/DashboardIndustries";
import Admins from "../pages/dashboard/Admins";
import Settings from "../pages/dashboard/Settings";
import Login from "../pages/dashboard/Login";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function Layout() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }, [theme]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/software" element={<Software />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="milestones" element={<Milestones />} />
        <Route path="industries" element={<DashboardIndustries />} />
        <Route path="admins" element={<Admins />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default Layout;