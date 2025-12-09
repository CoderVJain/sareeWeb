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


const ProductCard = ({ img, name, price, pcs }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-[260px] flex flex-col">

      {/* FIXED IMAGE HEIGHT */}
      <div className="h-[200px] sm:h-[240px] md:h-[260px] lg:h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover hover:cursor-pointer transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow py-5 px-4 text-center">

        {/* FIXED TITLE HEIGHT */}
        <p className="text-lg font-bold  text-[#3B2F2F] leading-snug h-[40px] flex items-center justify-center">
          {name}
        </p>

        {/* PRICE ROW PERFECT ALIGNMENT */}
        <div className="font-playfair flex items-center justify-center gap-4 mt-4 h-[28px]">
          <span className="text-[#7A2F2F] text-lg font-semibold">
            ₹{price}
          </span>

          <span className="text-gray-600 text-lg">
            {pcs} pcs
          </span>
        </div>

      </div>
    </div>
  );
};
export default ProductCard;