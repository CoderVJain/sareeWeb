// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <div className="navbar bg-[#F9F5F0] px-6 py-4 shadow-sm">

//       {/* LEFT SECTION */}
//       <div className="navbar-start">
//         {/* Mobile Hamburger */}
//         <div className="dropdown">
//           <label tabIndex={0} className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-7 w-7 text-black"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </label>

//           {/* MOBILE MENU */}
//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[999] p-4 shadow bg-base-100 rounded-lg w-52 text-black"
//           >
//            <li><Link to="/" className="text-black">Home</Link></li>
//             <li><Link to="/products" className="text-black">Sarees</Link></li>
//             <li><Link to="/contact" className="text-black">Contact</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* CENTER (DESKTOP MENU) */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 pt-5 gap-16 text-lg font-medium text-black">
//           <li><Link to="/" className="!text-black">Home</Link></li>
//           <li><Link to="/products" className="hover:text-gray-700 !text-black">Sarees</Link></li>
//           <li><Link to="/contact" className="hover:text-gray-700 !text-black">Contact</Link></li>
//         </ul>
//       </div>

//       {/* RIGHT BUTTON */}
//       <div className="navbar-end">
//         <button className="px-8 py-3 bg-[#7A2F2F] text-white text-lg font-medium rounded-2xl hover:bg-[#5e2222] transition">
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaXmark, FaWhatsapp } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Navigation Links
  const links = [
    { name: "Home", path: "/" },
    { name: "Saree Collection", path: "/products" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Function to handle WhatsApp Redirect
  const handleShopNow = () => {
    const phoneNumber = "+917506577362"; // Replace with your number
    const message = "Hello! I would like to browse your Saree collection.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  
  useEffect(() => {
  queueMicrotask(() => setIsOpen(false));
}, [location.pathname]);

  return (
    // Added 'border-b border-[#E8DCC6]' for the separation line
    <nav className="fixed w-full top-0 z-50 bg-[#F9F5F0]/80 backdrop-blur-md border-b border-[#E8DCC6] transition-all duration-300 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* 1. LEFT: LOGO */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#2B0F0F] tracking-wide uppercase">
            Saree Canvas
          </h1>
        </Link>

        {/* 2. MIDDLE: NAVIGATION LINKS (Hidden on Mobile) */}
        {/* absolute + left-1/2 + -translate-x-1/2 ensures it is perfectly centered relative to the screen, not just the flex gap */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[15px] font-medium transition-all duration-300 hover:text-[#7A2F2F] ${
                location.pathname === link.path ? "text-[#7A2F2F]" : "text-[#3B2E2A]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. RIGHT: SHOP NOW BUTTON + MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          
          {/* Shop Now Button (Visible on all screens) */}
          <button 
            onClick={handleShopNow}
            className="flex items-center gap-2 bg-[#7A2F2F] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#5E2222] transition-all shadow-md active:scale-95"
          >
            <span>Shop Now</span>
            <FaWhatsapp className="text-lg" />
          </button>

          {/* Mobile Menu Toggle (Hidden on Desktop) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-[#3B2E2A] hover:text-[#7A2F2F] transition-colors focus:outline-none ml-2"
          >
            {isOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 4. MOBILE MENU DROPDOWN */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#F9F5F0] border-b border-[#E8DCC6] shadow-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col py-6 px-8 space-y-6 text-center">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-medium ${
                location.pathname === link.path
                  ? "text-[#7A2F2F]"
                  : "text-[#3B2E2A]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;