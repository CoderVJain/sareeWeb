
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts.js";

const ITEMS_PER_PAGE = 8;

const ProductCatalogue = () => {

  const { products } = useProducts();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get("category"); // e.g., "Saree", "Suit"

  // Initialize state from URL params
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [currentPage, setCurrentPage] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) : 1;
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get("subcategory") || "All");

  // Reset page and subcategory when category changes
  useEffect(() => {
    // If the category changes via navigation (e.g. Navbar), the URL already changed.
    // We just need to sync the local state to match the "fresh" category view.
    setCurrentPage(1);
    setSelectedSubcategory("All");
    setQuery("");
  }, [categoryParam]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Helper to update URL params
  const updateUrlParams = (updates, replace = false) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });
      return newParams;
    }, { replace });
  };

  // 1. Filter by Category (from URL)
  const categoryFilteredProducts = useMemo(() => {
    if (!categoryParam) return products;
    return products.filter(p =>
      p.category?.toLowerCase() === categoryParam.toLowerCase() ||
      p.catalog?.toLowerCase() === categoryParam.toLowerCase() // Fallback if data is mixed
    );
  }, [products, categoryParam]);



  // 2. Extract Subcategories (Dynamic)
  const subcategories = useMemo(() => {
    const subs = new Set(categoryFilteredProducts.map(p => p.subcategory || p.fabric).filter(Boolean)); // Fallback to fabric if subcategory empty
    return ["All", ...Array.from(subs)];
  }, [categoryFilteredProducts]);



  // 3. Filter by Subcategory & Search Query
  const finalFilteredProducts = categoryFilteredProducts.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(query.toLowerCase());
    const matchesSub = selectedSubcategory === "All" ||
      p.subcategory === selectedSubcategory ||
      p.fabric === selectedSubcategory; // Fallback

    return matchesSearch && matchesSub;
  });

  // Pagination Logic
  const totalPages = Math.ceil(finalFilteredProducts.length / ITEMS_PER_PAGE);
  const currentPageSafe = Math.min(currentPage, totalPages || 1);

  const currentProducts = finalFilteredProducts.slice(
    (currentPageSafe - 1) * ITEMS_PER_PAGE,
    currentPageSafe * ITEMS_PER_PAGE
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setCurrentPage(1);
    updateUrlParams({ q: val, page: 1 }, true); // Replace history for typing
  };

  const handleSubcategoryChange = (sub) => {
    setSelectedSubcategory(sub);
    setCurrentPage(1);
    updateUrlParams({ subcategory: sub === "All" ? null : sub, page: 1 });
  }

  const handleClick = (id) => {
    navigate(`/product/${id}`);
  };

  const goPrev = () => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev - 1, 1);
      updateUrlParams({ page: newPage });
      return newPage;
    });
  };

  const goNext = () => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev + 1, totalPages);
      updateUrlParams({ page: newPage });
      return newPage;
    });
  };

  return (
    <section className="bg-[#F9F5F0] min-h-screen font-sans">

      <div className="w-full max-w-7xl mx-auto py-8 px-4 md:py-16 md:px-8 space-y-8 md:space-y-12">

        {/* Dynamic Title */}
        <h2 className="text-center font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#752A2E]">
          {categoryParam ? `${categoryParam} Collection` : "Our Products"}
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center w-full">
          <div className="flex w-full max-w-md md:max-w-xl bg-white shadow-md hover:shadow-lg transition-shadow rounded-full overflow-hidden px-4 py-2 md:px-6 md:py-3 border border-transparent focus-within:border-[#752A2E]">
            <input
              type="text"
              placeholder={`Search ${categoryParam || "products"}...`}
              className="flex-1 bg-transparent outline-none text-gray-700 text-sm md:text-base placeholder:text-gray-400"
              value={query}
              onChange={handleSearchChange}
            />
            <button className="bg-black text-white text-xs md:text-sm px-4 md:px-6 py-2 rounded-full font-medium hover:bg-[#333] transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Subcategory Pills */}
        {subcategories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubcategoryChange(sub)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedSubcategory === sub
                    ? "bg-[#7A2F2F] text-white shadow-md"
                    : "bg-white text-[#3B2E2A] border border-[#E8DCC6] hover:border-[#7A2F2F] hover:text-[#7A2F2F]"
                  }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}


        {currentProducts.length > 0 ? (
          <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleClick(product.id)}
                className="cursor-pointer w-full max-w-[320px] mx-auto transform hover:-translate-y-1 transition-transform duration-300"
              >
                <ProductCard
                  img={product.image}
                  name={product.name}
                  price={product.price}
                  pcs={product.peices}
                  discount={product.discount}
                  discountedPrice={product.discountedPrice}
                  subcategory={product.subcategory}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg">
            No products found matching your criteria.
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
