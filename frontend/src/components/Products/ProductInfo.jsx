// import React from "react";
// import { useParams } from "react-router-dom";
// import useProducts from "../../hooks/useProducts";

// const ProductInfo = () => {
//   const { id } = useParams();
//   const { products } = useProducts();

//   const product = products.find((p) => p.id == id);

//   if (!product) {
//     return (
//       <div className="bg-[#F7F5F2] p-10 text-center text-xl text-red-600">
//         Product not found.
//       </div>
//     );
//   }

//   const openWhatsApp = (message) => {
//     const phoneNumber = "+918097968735";
//     const encodedMessage = encodeURIComponent(message);
//     window.open(
//       `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
//       "_blank"
//     );
//   };

//   return (
//     <div className="bg-[#F7F5F2] w-full !px-30 sm:px-6 py-10 sm:py-16 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
//         {/* IMAGE SECTION */}
//         {/* IMAGE SECTION */}
//         <div className="w-full rounded-2xl overflow-hidden shadow-md flex items-start">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="
//       w-full 
//       h-auto 
//       max-h-[500px] 
//       md:h-full 
//       object-cover 
//       object-center
//       aspect-[3/4] md:aspect-auto
//     "
//           />
//         </div>

//         {/* DETAILS SECTION */}
//         <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-md">
//           {/* TITLE */}
//           <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#2B0F0F] mb-3">
//             {product.name}
//           </h1>

//           {/* PRICE */}
//           <p className="text-[#7A2F2F] text-xl sm:text-2xl font-semibold mb-4">
//             ₹{product.price}
//             <span className="text-lg font-normal"> per piece</span>
//           </p>

//           <hr className="my-4" />

//           {/* PRODUCT INFO */}
//           <div className="space-y-2 text-base sm:text-lg text-black">
//             <p>
//               <b className="text-[#874343]">Catalog:</b> {product.catalog}
//             </p>
//             <p>
//               <b className="text-[#874343]">Pieces:</b> {product.peices}
//             </p>
//             <p>
//               <b className="text-[#874343]">Per Piece Price:</b> ₹
//               {product.perPeicePrice}
//             </p>
//             <p>
//               <b className="text-[#874343]">Full Price:</b> ₹{product.fullPrice}
//             </p>
//             <p>
//               <b className="text-[#874343]">Size:</b> {product.size}
//             </p>
//             <p>
//               <b className="text-[#874343]">Fabric:</b> {product.fabric}
//             </p>
//             <p>
//               <b className="text-[#874343]">Initial Delivery:</b>{" "}
//               {product.initialDelivery}
//             </p>
//           </div>

//           {/* DESCRIPTION */}
//           <p className="mt-5 text-gray-600 text-sm sm:text-base leading-relaxed">
//             {product.description}
//           </p>

//           {/* BUTTON */}
//           <button
//             onClick={() =>
//               openWhatsApp(`Hello! I want to buy the product: ${product.name}`)
//             }
//             className="
//               mt-8 
//               w-full 
//               bg-[#7A2F2F] 
//               text-white 
//               py-3 
//               rounded-full 
//               text-lg 
//               font-semibold 
//               hover:opacity-90 
//               transition-all
//             "
//           >
//             Buy on WhatsApp
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { FaWhatsapp, FaArrowLeft, FaChevronRight, FaChevronLeft } from "react-icons/fa6";

// react-pdf imports
import { Document, Page, pdfjs } from 'react-pdf';
// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


const ProductInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPdf, setIsPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  // 1. Loading State
  if (!products) return <div className="p-10 text-center">Loading...</div>;

  const product = products.find((p) => p.id == id);

  // 2. Not Found State
  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center bg-[#F7F5F2]">
        <h2 className="text-2xl font-serif text-[#7A2F2F] mb-4">Product Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-black underline hover:text-[#7A2F2F]"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Detect and set PDF state
  useEffect(() => {
    if (product?.image && product.image.startsWith('pdf:')) {
      setIsPdf(true);
      const fileId = product.image.replace('pdf:', '');
      // Use our backend proxy
      setPdfUrl(`${import.meta.env.VITE_API_URL || "https://sareeweb-ip9t.onrender.com"}/api/proxy-pdf/${fileId}`);
    } else {
      setIsPdf(false);
      setPdfUrl(null);
    }
    setCurrentPage(1);
  }, [product]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Helper to ensure we have a Total Price number
  const calculateTotal = () => {
    const priceToUse = product.discountedPrice || product.price;
    const priceNum = parseInt(String(priceToUse).replace(/[^0-9]/g, '')) || 0;
    const piecesNum = parseInt(product.peices) || 1;
    return priceNum * piecesNum;
  };

  const totalPrice = calculateTotal();

  const openWhatsApp = (message) => {
    const phoneNumber = "917506577362";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-[#F9F5F0] min-h-screen py-8 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6F6F6F] hover:text-[#7A2F2F] transition-colors mb-6 md:mb-8"
        >
          <FaArrowLeft /> Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* --- LEFT: IMAGE / PDF SECTION --- */}
          <div className="w-full md:sticky md:top-24">
            <div className="rounded-3xl overflow-hidden bg-white shadow-lg border border-[#E8DCC6] relative group flex flex-col items-center justify-center aspect-[3/4] md:aspect-[4/5] w-full">

              {!isPdf ? (
                // STANDARD IMAGE
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                // PDF RENDERER
                <div className="w-full h-full flex justify-center bg-gray-100 relative overflow-hidden">
                  <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<div className="flex h-full items-center justify-center text-gray-500">Loading Image...</div>}
                    error={<div className="flex h-full items-center justify-center text-red-500">Failed.</div>}
                    className="w-full h-full flex justify-center items-center"
                  >
                    <Page
                      pageNumber={currentPage}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="w-full h-full flex items-center justify-center"
                      canvasClassName="w-full h-full object-cover object-top"
                      width={600} // Render at sufficient resolution, let CSS scale it
                    />
                  </Document>

                  {/* PDF Navigation Overlay */}
                  {/* {numPages && numPages > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm z-10 w-max">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="disabled:opacity-30 hover:text-[#7A2F2F]"
                      >
                        <FaChevronLeft />
                      </button>
                      <span className="text-sm font-medium whitespace-nowrap">{currentPage} / {numPages}</span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
                        disabled={currentPage >= numPages}
                        className="disabled:opacity-30 hover:text-[#7A2F2F]"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  )} */}
                </div>
              )}
            </div>

            {/* THUMBNAILS / VARIANTS (PDF Pages) */}
            {isPdf && numPages && numPages > 1 && (
              <div className="mt-6 w-full">
                <h3 className="text-sm font-bold text-[#7A2F2F] uppercase mb-3 tracking-wide">
                  Available Colors / Views
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {Array.from(new Array(numPages), (el, index) => (
                    <div
                      key={`page_${index + 1}`}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`
                                    flex-shrink-0 w-20 h-28 rounded-lg overflow-hidden border-2 cursor-pointer transition-all bg-gray-50
                                    ${currentPage === index + 1 ? 'border-[#7A2F2F] ring-2 ring-[#7A2F2F]/20 opacity-100' : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'}
                                `}
                    >
                      <div className="w-full h-full flex items-center justify-center pointer-events-none">
                        <Document file={pdfUrl} loading={null} error={null}>
                          <Page
                            pageNumber={index + 1}
                            width={100}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="w-full h-full"
                            canvasClassName="w-full h-full object-cover object-top"
                          />
                        </Document>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* --- RIGHT: DETAILS SECTION --- */}
          <div className="flex flex-col space-y-6 md:space-y-8">

            {/* Header */}
            <div>
              <p className="text-sm font-bold tracking-widest text-[#7A2F2F] uppercase mb-2">
                {product.subcategory || "New Arrival"}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2B0F0F] leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Block */}
            <div className="bg-white p-6 rounded-2xl border border-[#E8DCC6] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                {/* Per Piece Price */}
                <div>
                  <div className="flex items-baseline gap-3">
                    {product.discountedPrice ? (
                      <>
                        <span className="text-4xl font-serif font-bold text-[#2B0F0F]">
                          ₹{product.discountedPrice}
                        </span>
                        <span className="text-xl text-gray-400 line-through decoration-red-900/30">
                          ₹{product.price}
                        </span>
                        {product.discount && (
                          <span className="bg-[#7A2F2F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm">
                            {product.discount.toString().includes("%") ? product.discount : `${product.discount}% OFF`}
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-4xl font-serif font-bold text-[#2B0F0F]">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-px h-16 bg-[#E8DCC6]"></div>

                {/* Total Bundle Price */}
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">
                    Total Set Price ({product.peices || 1} Pcs)
                  </p>
                  <span className="text-2xl font-bold text-[#2B0F0F]">
                    ₹{totalPrice}
                  </span>
                </div>

              </div>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 text-sm md:text-base border-t border-b border-[#E8DCC6] py-6">

              <div className="space-y-1">
                <p className="text-[#8C7B75] font-medium">Pieces in Set</p>
                <p className="text-[#2B0F0F] font-semibold">{product.peices || "N/A"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#8C7B75] font-medium">Fabric</p>
                <p className="text-[#2B0F0F] font-semibold">{product.fabric || "Premium Silk"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#8C7B75] font-medium">Size</p>
                <p className="text-[#2B0F0F] font-semibold">{product.size || "Free Size"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-[#8C7B75] font-medium">Availability</p>
                <p className="text-[#2B0F0F] font-semibold">{product.initialDelivery || "Ready to Ship"}</p>
              </div>

              <div className="col-span-2 space-y-1">
                <p className="text-[#8C7B75] font-medium">Subcategory</p>
                <p className="text-[#2B0F0F] font-semibold">{product.subcategory || "-"}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-[#2B0F0F]">Description</h3>
              <p className="text-[#6F6F6F] leading-relaxed text-[15px]">
                {product.description || "Experience the elegance of traditional craftsmanship with this exquisite piece. Perfect for weddings, festivals, and special occasions."}
              </p>
            </div>

            {/* Call to Action Button */}
            <button
              onClick={() =>
                openWhatsApp(`Hello! I'm interested in buying: ${product.name}. Total Price for ${product.pcs} pcs: ₹${totalPrice}`)
              }
              className="
                w-full 
                flex items-center justify-center gap-3
                bg-[#2B0F0F] hover:bg-[#4A1A1A]
                text-white 
                py-4 
                px-8
                rounded-full 
                text-lg 
                font-bold 
                shadow-xl hover:shadow-2xl hover:-translate-y-1
                active:scale-95
                transition-all duration-300 border border-[#4A1A1A]
              "
            >
              <FaWhatsapp className="text-3xl" />
              <span>Buy Full Set on WhatsApp</span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;