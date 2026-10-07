
import { Routes, Route } from "react-router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../pages/Home";
import Aboutus from "../pages/Aboutus";
import Error from "../pages/Error";
import Solutions from "../pages/Solutions";
import Software from "../pages/Software";
import Contact from "../pages/Contact";

function Layout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/solutions" element={<Solutions />}/>
        <Route path="/software" element={<Software />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Layout;
