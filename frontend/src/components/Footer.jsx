import React from "react";
import { Link } from "react-router-dom";

// React Icons
import {
  FaInstagram,
  FaFacebookF,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialIcons = [
    { icon: <FaInstagram className="text-lg" />, url: "#" },
    { icon: <FaFacebookF className="text-lg" />, url: "#" },
  ];

  const contactInfo = [
    {
      icon: <FaPhone />,
      text: "+91 9106181135",
      href: "tel:+919106181135"
    },
    {
      icon: <FaEnvelope />,
      text: "meenakshi07raj@gmail.com",
      href: "mailto:meenakshi07raj@gmail.com"
    }
  ];

  return (
    <footer className="bg-[#F2E8DA] border-t border-[#E8DCC6] pt-16 pb-10 font-inter text-[#3B2E2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-24">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* 1. BRAND */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="flex items-center gap-2 group w-fit">
              <h2 className="text-2xl text-[#3B2E2A] font-serif font-bold tracking-wide uppercase">
                Saree Canvas
              </h2>
            </Link>

            <p className="text-[#6F6F6F] text-[15px] leading-relaxed max-w-sm">
              Enhance your look with our handpicked artisanal drapes. Where tradition meets timeless grace.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 pt-2">
              {socialIcons.map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-[#E8DCC6] bg-white text-[#3B2E2A] hover:bg-[#7A2F2F] hover:text-white hover:border-[#7A2F2F] transition-all duration-300 shadow-sm"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. EXPLORE */}
          <div className="lg:col-span-3 lg:pl-6">
            <h3 className="text-xl font-serif font-bold mb-6 text-[#3B2E2A]">
              Explore
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#6F6F6F] text-[15px] font-medium hover:text-[#7A2F2F] hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. CONTACT INFO (Replaced Form) */}
          <div className="lg:col-span-4">
            <h3 className="text-xl font-serif font-bold mb-6 text-[#3B2E2A]">
              Get in Touch
            </h3>
            <p className="text-[#6F6F6F] text-[15px] mb-6">
              Have questions? We'd love to hear from you.
            </p>

            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <li key={index}>
                  <a
                    href={info.href}
                    className="flex items-center gap-3 text-[#6F6F6F] hover:text-[#7A2F2F] transition-colors duration-300 group"
                  >
                    <span className="h-8 w-8 flex items-center justify-center rounded-full bg-white border border-[#E8DCC6] text-[#3B2E2A] group-hover:bg-[#7A2F2F] group-hover:text-white group-hover:border-[#7A2F2F] transition-all text-sm">
                      {info.icon}
                    </span>
                    <span className="text-[15px] font-medium">
                      {info.text}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="h-px w-full bg-[#E8DCC6] opacity-80 mb-8"></div>

        {/* BOTTOM BAR - Simple Copyright */}
        <div className="flex justify-center md:justify-start text-xs md:text-sm text-[#8C7B75]">
          <p>&copy; {currentYear} Saree Canvas. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;