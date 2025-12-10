import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts.js";

const ITEMS_PER_PAGE = 8; // Reduced to 8 for better grid alignment (divisible by 2 and 4)

const ProductCatalogue = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { products } = useProducts();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Filter products based on search query
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPageSafe = Math.min(currentPage, totalPages || 1);

  const currentProducts = filteredProducts.slice(
    (currentPageSafe - 1) * ITEMS_PER_PAGE,
    currentPageSafe * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const goPrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="bg-[#F9F5F0] min-h-screen font-sans">
      
      <div className="w-full max-w-7xl mx-auto py-8 px-4 md:py-16 md:px-8 space-y-8 md:space-y-12">

        {/* Title */}
        <h2 className="text-center font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#752A2E]">
          Products
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center w-full">
          <div className="flex w-full max-w-md md:max-w-xl bg-white shadow-md hover:shadow-lg transition-shadow rounded-full overflow-hidden px-4 py-2 md:px-6 md:py-3 border border-transparent focus-within:border-[#752A2E]">
            <input
              type="text"
              placeholder="Search by name..."
              className="flex-1 bg-transparent outline-none text-gray-700 text-sm md:text-base placeholder:text-gray-400"
              value={query}
              onChange={handleSearchChange}
            />
            <button className="bg-black text-white text-xs md:text-sm px-4 md:px-6 py-2 rounded-full font-medium hover:bg-[#333] transition-colors">
              Search
            </button>
          </div>
        </div>

      
        {currentProducts.length > 0 ? (
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center justify-items-center">
            {currentProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleClick(product.id)} 
                className="cursor-pointer w-full max-w-[320px] sm:max-w-none transform hover:-translate-y-1 transition-transform duration-300"
              >
                <ProductCard
                  img={product.image}
                  name={product.name}
                  price={product.price}
                  pcs={product.pcs}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            No products found matching
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 md:gap-6 mt-8 md:mt-14">
            
            {/* LEFT ARROW */}
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-300 text-black text-lg md:text-xl transition-all
              ${currentPage === 1
                ? "opacity-30 cursor-not-allowed bg-gray-50"
                : "hover:bg-black hover:text-white hover:border-black active:scale-95"
              }`}
            >
              &lt;
            </button>

            {/* CURRENT PAGE INDICATOR */}
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full 
              bg-black text-white text-base md:text-lg font-semibold shadow-md">
              {currentPage}
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-gray-300 text-black text-lg md:text-xl transition-all
              ${currentPage === totalPages
                ? "opacity-30 cursor-not-allowed bg-gray-50"
                : "hover:bg-black hover:text-white hover:border-black active:scale-95"
              }`}
            >
              &gt;
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default ProductCatalogue;