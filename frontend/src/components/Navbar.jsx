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
    <nav className="fixed w-full top-0 z-50 bg-[#F9F5F0]/95 backdrop-blur-md border-b border-[#E8DCC6] font-inter transition-all duration-300">

      {/* --- TOP ROW --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between relative">

        {/* MOBILE: HAMBURGER (LEFT) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl text-[#3B2E2A] hover:text-[#7A2F2F] transition-colors focus:outline-none"
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>

        {/* LOGO (CENTER) */}
        {/* Absolute center for perfect alignment */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex flex-col items-center">
            {/* You can Replace with an Image Logo if available */}
            <h1 className="text-3xl font-serif font-bold text-[#2B0F0F] tracking-wide uppercase">
              Saree Canvas
            </h1>
          </Link>
        </div>

        {/* RIGHT: SHOP BUTTON */}
        <div className="ml-auto lg:ml-0">
          <button
            onClick={handleShopNow}
            className="flex items-center gap-2 bg-[#7A2F2F] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#5E2222] transition-all shadow-md active:scale-95"
          >
            <span className="hidden sm:inline">Shop Now</span>
            <span className="sm:hidden">Shop</span>
            <FaWhatsapp className="text-lg" />
          </button>
        </div>
      </div>

      {/* --- BOTTOM ROW (DESKTOP ONLY) --- */}
      <div className="hidden lg:flex justify-center items-center py-3 border-t border-[#E8DCC6]/50">
        <div className="flex gap-10">
          <Link
            to="/"
            className={`text-[15px] font-medium transition-all hover:text-[#7A2F2F] ${location.pathname === '/' ? 'text-[#7A2F2F]' : 'text-[#3B2E2A]'}`}
          >
            Home
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="text-[15px] font-medium text-[#3B2E2A] hover:text-[#7A2F2F] transition-all uppercase tracking-normal"
            >
              {cat.name}
            </Link>
          ))}

          <Link
            to="/contact"
            className={`text-[15px] font-medium transition-all hover:text-[#7A2F2F] ${location.pathname === '/contact' ? 'text-[#7A2F2F]' : 'text-[#3B2E2A]'}`}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* --- MOBILE MENU SLIDEOUT/DROPDOWN --- */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-[#F9F5F0] border-b border-[#E8DCC6] shadow-lg overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col py-6 px-8 space-y-4">
          <Link to="/" className="text-lg font-medium text-[#3B2E2A] border-b border-[#E8DCC6] pb-2">Home</Link>

          {/* Products Dropdown */}
          <div className="flex flex-col">
            <button
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="flex items-center justify-between text-lg font-medium text-[#3B2E2A] border-b border-[#E8DCC6] pb-2"
            >
              <span>Products</span>
              <FaChevronDown className={`text-sm transition-transform ${isProductDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`flex flex-col pl-4 space-y-3 mt-2 overflow-hidden transition-all duration-300 ${isProductDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
              {categories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  className="text-base text-[#5A4A45] hover:text-[#7A2F2F]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/contact" className="text-lg font-medium text-[#3B2E2A] border-b border-[#E8DCC6] pb-2">Contact Us</Link>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;