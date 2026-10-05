import React from 'react';
import { Routes, Route } from "react-router";
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Home from '../pages/Home';

function Layout() {
  return (
    <>
        <Header />
        <Routes>
            <Route path='/' element={<Home />}/>
        </Routes>
        <Footer />
    </>
  )
}

export default Layout;