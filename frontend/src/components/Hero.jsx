import React from 'react';
import Slider from 'react-slick';
import { FaWhatsapp, FaArrowRight } from 'react-icons/fa6';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const handleShopNow = () => {
    const phoneNumber = "917506577362"; 
    const message = "Hello! I'm interested in seeing your latest saree collection.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const slides = [
    {
      id: 1,
      image: "/image1.webp", // Ensure these paths are correct in your public folder
      tag: "Handcrafted Luxury",
      title: "Opulent Banarasi Weaves",
      subtitle: "Regal heritage woven in royal blue silk and intricate gold zari.",
    },
    {
      id: 2,
      image: "/image2.webp",
      tag: "Modern Elegance",
      title: "Elegant Pastel Chiffons",
      subtitle: "Effortless grace with lightweight, hand-embroidered drapes.",
    },
    {
      id: 3,
      image: "/image3.jpg",
      tag: "Traditional Roots",
      title: "Timeless Kanjivaram Silks",
      subtitle: "Grandeur of tradition with rich crimson and temple borders.",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1500, // Slower transition for luxury feel
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)', // Custom bezier for smoother fade
    pauseOnHover: false,
    arrows: false,
    appendDots: dots => (
      <div style={{ position: "absolute", bottom: "40px", width: "100%", zIndex: 20 }}>
        <ul className="flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button className="w-12 h-1 rounded-full bg-white/30 hover:bg-white/80 transition-all duration-300 before:content-[''] before:hidden" />
    )
  };

  return (
    <section className="relative w-full h-[90vh] md:h-screen bg-[#F9F5F0] overflow-hidden font-inter">
      <Slider {...sliderSettings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[90vh] md:h-screen outline-none">
            
            {/* Background Image with Zoom Effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-slowZoom"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* GRADIENT OVERLAY: Improved readability and aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-24 text-white">
              <div className="max-w-5xl flex flex-col items-center space-y-6">
                
                {/* 1. Small Top Tag (Replaces OM) */}
                <div className="flex flex-col items-center gap-3 opacity-90">
                  <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#E8DCC6]">
                    {slide.tag}
                  </span>
                  {/* Small vertical line */}
                  <div className="w-[1px] h-8 bg-[#E8DCC6]"></div>
                </div>

                {/* 2. Main Title */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-medium tracking-tight leading-[1.1] drop-shadow-xl">
                  {slide.title}
                </h1>

                {/* 3. Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
                  {slide.subtitle}
                </p>

                {/* 4. Shop Now Button */}
                <div className="pt-8 md:pt-10">
                  <button 
                    onClick={handleShopNow}
                    className="group relative flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full text-sm md:text-base font-semibold transition-all duration-500 hover:bg-[#7A2F2F] hover:border-[#7A2F2F] hover:scale-105"
                  >
                    <span>EXPLORE COLLECTION</span>
                    <span className="bg-white text-black rounded-full p-1.5 group-hover:bg-white group-hover:text-[#7A2F2F] transition-colors">
                       <FaWhatsapp className="text-lg" />
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Add Custom Animation for Slow Zoom in CSS */}
      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slowZoom {
          animation: slowZoom 8s infinite alternate ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;