import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaXmark, FaWhatsapp, FaChevronDown } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const location = useLocation();

  const categories = [
    { name: "Saree", path: "/products?category=Saree" },
    { name: "Kurti", path: "/products?category=Kurti" },
    { name: "Lehenga", path: "/products?category=Lehenga" },
    { name: "Suit", path: "/products?category=Suit" },
  ];

  // Function to handle WhatsApp Redirect
  const handleShopNow = () => {
    const phoneNumber = "+917506577362";
    const message = "Hello! I would like to browse your collection.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  useEffect(() => {
    // Close mobile menu on route change
    setIsOpen(false);
    setIsProductDropdownOpen(false);
  }, [location.pathname, location.search]);

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#F9F5F0]/90 backdrop-blur-lg border-b border-[#E8DCC6]/60 font-inter transition-all duration-300 shadow-sm">

      {/* --- TOP ROW --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-24 flex items-center justify-between relative">

        {/* MOBILE: HAMBURGER (LEFT) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl text-[#3B2E2A] hover:text-[#7A2F2F] transition-colors focus:outline-none p-2 rounded-full hover:bg-black/5"
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>

        {/* LOGO (CENTER) */}
        {/* Absolute center for perfect alignment on all screens */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <Link to="/" className="flex items-center gap-3">
            {/* Logo Image with Hover Expansion */}
            <img
              src="/logo.webp"
              alt="Saree Canvas Logo"
              className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
            />
            {/* Brand Name */}
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-[#2B0F0F] tracking-wide uppercase transition-colors duration-300 group-hover:text-[#7A2F2F]">
              Saree Canvas
            </h1>
          </Link>
        </div>

        {/* RIGHT: SHOP BUTTON */}
        <div className="ml-auto lg:ml-0">
          <button
            onClick={handleShopNow}
            className="flex items-center gap-2 bg-gradient-to-r from-[#7A2F2F] to-[#5E2222] text-white px-6 py-3 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 active:scale-95 border border-[#7A2F2F]/20"
          >
            <span className="hidden sm:inline tracking-wide">Shop Now</span>
            <span className="sm:hidden">Shop</span>
            <FaWhatsapp className="text-xl" />
          </button>
        </div>
      </div>

      {/* --- BOTTOM ROW (DESKTOP ONLY) --- */}
      <div className="hidden lg:flex justify-center items-center py-4 border-t border-[#E8DCC6]/30 bg-white/40">
        <div className="flex gap-12">
          <Link
            to="/"
            className={`text-[15px] font-medium tracking-wide transition-all duration-300 hover:text-[#7A2F2F] relative group ${location.pathname === '/' ? 'text-[#7A2F2F]' : 'text-[#3B2E2A]'}`}
          >
            Home
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#7A2F2F] transform origin-left transition-transform duration-300 ${location.pathname === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="text-[15px] font-medium text-[#3B2E2A] hover:text-[#7A2F2F] transition-all uppercase tracking-wide relative group"
            >
              {cat.name}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#7A2F2F] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}

          <Link
            to="/contact"
            className={`text-[15px] font-medium tracking-wide transition-all duration-300 hover:text-[#7A2F2F] relative group ${location.pathname === '/contact' ? 'text-[#7A2F2F]' : 'text-[#3B2E2A]'}`}
          >
            Contact
            <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#7A2F2F] transform origin-left transition-transform duration-300 ${location.pathname === '/contact' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
          </Link>
        </div>
      </div>

      {/* --- MOBILE MENU SLIDEOUT/DROPDOWN --- */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#F9F5F0] border-b border-[#E8DCC6] shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col py-6 px-8 space-y-6">
          <Link to="/" className="text-xl font-medium text-[#3B2E2A] border-b border-[#E8DCC6]/50 pb-3 hover:text-[#7A2F2F] transition-colors">Home</Link>

          {/* Products Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="flex items-center justify-between text-xl font-medium text-[#3B2E2A] border-b border-[#E8DCC6]/50 pb-3 hover:text-[#7A2F2F] transition-colors"
            >
              <span>Products</span>
              <FaChevronDown className={`text-sm transition-transform duration-300 ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`flex flex-col pl-4 space-y-4 mt-4 overflow-hidden transition-all duration-300 ${isProductDropdownOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className="text-lg text-[#5A4A45] hover:text-[#7A2F2F] tracking-wide transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/contact" className="text-xl font-medium text-[#3B2E2A] border-b border-[#E8DCC6]/50 pb-3 hover:text-[#7A2F2F] transition-colors">Contact Us</Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;