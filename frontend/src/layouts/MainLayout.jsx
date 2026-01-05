import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";


const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col text-base-content">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow mt-20 lg:mt-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
