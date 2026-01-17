import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col text-base-content">
      <Navbar />
      <main className="flex-grow mt-20 lg:mt-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
