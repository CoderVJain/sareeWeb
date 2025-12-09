import React from "react";
import siteConfig from "../config/siteConfig.js";
import MaterialIcon from "./MaterialIcon.jsx";

const contactDetails = [
  {
    icon: "call",
    label: "CALL US",
    value: siteConfig.contact.phone,
    helper: "We are happy to assist you",
    href: `tel:${siteConfig.contact.phoneHref}`,
  },
  {
    icon: "mail",
    label: "EMAIL",
    value: siteConfig.contact.salesEmail,
    helper: "We reply within 24 hours",
    href: `mailto:${siteConfig.contact.salesEmail}`,
  },
];

const ContactUs = () => {
  return (
    <section className="bg-[#F9F5F0] py-12 md:py-20 font-inter">
      {/* Responsive Container:
        - px-4: Small padding on mobile
        - sm:px-8: Medium padding on tablets
        - lg:px-24: Large padding on desktop
        - lg:grid-cols-2: Stacks on mobile/tablet, side-by-side on desktop
      */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 px-4 sm:px-8 lg:px-24">
        
        {/* LEFT CARD */}
        <div className="rounded-3xl bg-white border border-[#E8DCC6] p-6 md:p-10 shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
          <h3 className="text-xl md:text-2xl !font-bold !text-black">
            We’d Love to Hear From You
          </h3>

          <p className="mt-2 text-[14px] md:text-[15px] text-[#6F6F6F] leading-relaxed">
            Whether you're looking for a perfect bridal saree or need help
            choosing a collection, we are always here for you.
          </p>

          <div className="mt-8 md:mt-10 space-y-6 md:space-y-8">
            {contactDetails.map(
              ({ icon: Icon, label, value, helper, href }, index) => (
                <div key={index} className="flex items-start md:items-center gap-4">
                  {/* Icon Container: Slightly smaller on mobile if needed, but flex-shrink-0 prevents squashing */}
                  <div className="h-12 w-12 md:h-14 md:w-14 flex-shrink-0 rounded-full bg-[#7A2F2F] flex items-center justify-center text-white shadow-md">
                    <MaterialIcon name={Icon} className="text-[20px] md:text-[22px]" />
                  </div>

                  <div className="flex flex-col gap-1 md:gap-2">
                    <p className="!m-0 text-[10px] md:text-xs uppercase tracking-widest text-[#A28F7C]">
                      {label}
                    </p>

                    {href ? (
                      <a
                        href={href}
                        className="!m-0 !font-serif !text-black block text-base md:text-lg font-semibold mt-0.5 break-all md:break-normal"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="!m-0 text-base md:text-lg font-semibold !text-black mt-0.5">
                        {value}
                      </p>
                    )}

                    <p className="!m-0 text-xs md:text-sm text-[#6F6F6F]">
                      {helper}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Social Icons */}
          <div className="mt-8 md:mt-10 flex gap-3 md:gap-4 flex-wrap">
            {siteConfig.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full border border-[#E8DCC6] bg-white hover:bg-[#F2E8DA] transition"
              >
                <MaterialIcon
                  name={link.icon}
                  className="text-base md:text-lg text-[#3B2E2A]"
                />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-3xl bg-white border border-[#E8DCC6] p-6 md:p-10 shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
          <p className="!m-0 text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#7A2F2F]">
            Contact Saree Bliss
          </p>

          <h2 className="mt-2 md:!mt-3 text-2xl md:text-3xl !font-bold !text-black">
            Send Us a Message
          </h2>

          <p className="mt-2 text-[14px] md:text-[15px] text-[#6F6F6F]">
            Share your query—we’ll get back with styling help, catalogue, or
            product details.
          </p>

          <form className="mt-8 md:mt-10 space-y-4 md:space-y-5">
            {/* FIRST ROW: Stacks on mobile, 2 columns on medium screens */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <input
                className="input w-full rounded-xl border border-[#E8DCC6] bg-[#F7F5F2] px-4 py-3 text-sm md:text-base !text-black outline-none focus:border-[#7A2F2F] transition"
                placeholder="Your Name"
              />
              <input
                className="input w-full rounded-xl border border-[#E8DCC6] bg-[#F7F5F2] px-4 py-3 text-sm md:text-base !text-black outline-none focus:border-[#7A2F2F] transition"
                placeholder="Email"
                type="email"
              />
            </div>

            {/* TEXTAREA */}
            <textarea
              rows={5}
              className="textarea w-full rounded-xl border border-[#E8DCC6] bg-[#F7F5F2] px-4 py-3 text-sm md:text-base !text-black outline-none focus:border-[#7A2F2F] transition resize-none"
              placeholder="Tell us how we can help..."
            />

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 md:py-4 rounded-full bg-[#7A2F2F] text-white text-base md:text-lg font-semibold shadow-[0px_6px_20px_rgba(0,0,0,0.15)] hover:bg-[#5E2222] transition active:scale-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;