// import React from "react";

// const ProductCard = ({ img, name, price, pcs }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-xs mx-auto">

//       {/* IMAGE WITH ZOOM EFFECT */}
//       <div className="overflow-hidden rounded-t-2xl">
//         <img
//           src={img}
//           alt={name}
//           className="w-full h-72 object-cover transition-transform duration-500 hover:scale-110"
//         />
//       </div>

//       {/* TEXT AREA */}
//       <div className="py-6 text-center">
//         <h3 className="text-xl font-semibold text-black leading-7 px-4">
//           {name}
//         </h3>

//         <div className="font-playfair flex items-center justify-center gap-6 mt-3">
//           <span className="text-[#7A2F2F] text-lg font-semibold">{price}</span>
//           <span className="text-gray-600 text-lg">{pcs}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


const ProductCard = ({ img, name, price, pcs, discount, discountedPrice }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-[280px] flex flex-col mx-auto border border-transparent hover:border-[#E8DCC6]">

      {/* IMAGE CONTAINER */}
      <div className="relative h-[280px] sm:h-[320px] w-full overflow-hidden bg-gray-100">



        <img
          src={img}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay Gradient on Hover (Optional, for premium feel) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow py-4 px-3 text-center space-y-2">

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-[#2B0F0F] leading-snug line-clamp-2 min-h-[42px] font-serif">
          {name}
        </h3>

        {/* Divider */}
        <div className="w-12 h-[1px] bg-[#E8DCC6] mx-auto my-1" />

        {/* Price & Pieces Row */}
        <div className="flex flex-col items-center gap-1.5">

          {/* Prices */}
          <div className="flex items-baseline gap-2 font-playfair">
            {discountedPrice ? (
              <>
                <span className="text-[#7A2F2F] text-lg font-bold">
                  ₹{discountedPrice}
                </span>
                <span className="text-gray-400 text-sm line-through decoration-gray-400/60">
                  ₹{price}
                </span>
              </>
            ) : (
              <span className="text-[#2B0F0F] text-lg font-bold">
                ₹{price}
              </span>
            )}
          </div>

          {/* Pieces / Subcategory Badge - Highlighted */}
          {pcs && (
            <div className="inline-flex items-center px-4 py-1 rounded-md bg-[#7A2F2F] text-white text-xs font-bold tracking-wide shadow-sm mt-1">
              {pcs} peices
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
export default ProductCard;