import React from "react";
import ProductCard from "./ProductCard";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

const Products = () => {
  const navigate = useNavigate();
  const { products } = useProducts();

  const handleClick = () => {
    // Redirect to catalogue
    navigate("/products");
  };

  return (
    <section className="bg-[#F7F5F2] py-16 font-playfair">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
        {/* OM ICON */}
        <div className="text-3xl md:text-4xl  text-black leading-none">ॐ</div>

        {/* TITLE */}

        <p className="text-3xl md:text-3xl font-bold text-black leading-tight">
          Enhance Your Look
        </p>

        {/* DESCRIPTION */}
        <p className="text-center text-gray-700 text-base md:text-lg  max-w-2xl mx-auto mb-4">
          Step into the spotlight. From festive silks to daily comfort, find the
          perfect saree that speaks to your unique soul.
        </p>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {products.slice(0, 4).map((item) => (
            <div key={item.id} onClick={() => handleClick()}>
              <ProductCard
                key={item.id}
                img={item.image}
                name={item.name}
                price={item.price}
                pcs={item.peices}
                discount={item.discount}
                discountedPrice={item.discountedPrice}
              />
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button className="mt-16 px-10 py-3 bg-[#7A2F2F] text-white text-lg rounded-full hover:bg-[#5e2222] transition">
          <Link to="/products">View More Products</Link>
        </button>
      </div>
    </section>
  );
};

export default Products;
