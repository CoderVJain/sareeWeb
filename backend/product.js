// // // product.js
// // import { getSheet } from "./google.js";

// // const productsHandler = async (req, res) => {
// //   res.setHeader("Access-Control-Allow-Origin", "*");
// //   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
// //   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// //   if (req.method === "OPTIONS") {
// //     return res.status(200).end();
// //   }

// //   // Simple in-memory cache
// //   // Global variable on module scope to persist across requests (in this serverless-like file context, 
// //   // it works if the process stays alive, otherwise use external cache like Redis)
// //   // Since this is likely a persistent Node process on Render, this works.
// //   if (!global.productCache) {
// //     global.productCache = {
// //       data: null,
// //       lastFetch: 0
// //     };
// //   }

// //   const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
// //   const now = Date.now();

// //   try {
// //     if (global.productCache.data && (now - global.productCache.lastFetch < CACHE_DURATION)) {
// //       console.log("Serving products from cache");
// //       return res.status(200).json(global.productCache.data);
// //     }

// //     console.log("Fetching products from Google Sheets");
// //     const rows = await getSheet(process.env.SHEET_ID);

// //     const body = rows.slice(1);

// //     const products = body.map((row, index) => {
// //       // Parse images string (comma separated)
// //       let images = [];
// //       if (row[13]) {
// //         images = row[13].split(',').map(url => url.trim()).filter(url => url.length > 0);
// //       }

// //       return {
// //         id: index + 1,
// //         name: row[0] || "",
// //         peices: row[1] || "",
// //         category: row[2] || "",
// //         subcategory: row[3] || "",
// //         price: row[4] || "",
// //         fullPrice: row[5] || "",
// //         discount: row[6] || "",
// //         discountedPrice: row[7] || "",
// //         size: row[8] || "",
// //         fabric: row[9] || "",
// //         initialDelivery: row[10] || "",
// //         availability: row[11] || "",
// //         description: row[12] || "",
// //         images: images,
// //         // Backwards compatibility if needed, using first image
// //         image: images.length > 0 ? images[0] : ""
// //       };
// //     });

// //     // Update Cache
// //     global.productCache = {
// //       data: products,
// //       lastFetch: now
// //     };

// //     res.status(200).json(products);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Failed to load products" });
// //   }
// // };

// // export default productsHandler;


// import { getSheet } from "./google.js";

// // Helper function to convert Drive "view" links to direct thumbnail URLs
// const transformDriveUrl = (url) => {
//   if (!url || !url.includes("drive.google.com")) return url;

//   // Extract the File ID using a regular expression
//   const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
//   if (match && match[1]) {
//     const id = match[1];
//     // This is the format you wanted:
//     return `https://drive.google.com/thumbnail?authuser=0&sz=w500&id=${id}`;
//   }
//   return url;
// };

// const productsHandler = async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//   if (req.method === "OPTIONS") return res.status(200).end();

//   if (!global.productCache) {
//     global.productCache = { data: null, lastFetch: 0 };
//   }

//   const CACHE_DURATION = 5 * 60 * 1000; 
//   const now = Date.now();

//   try {
//     // TIP: During testing, you can temporarily comment out this cache block 
//     // to ensure you are seeing fresh data from your Sheet.
//     if (global.productCache.data && (now - global.productCache.lastFetch < CACHE_DURATION)) {
//       console.log("Serving products from cache");
//       return res.status(200).json(global.productCache.data);
//     }

//     console.log("Fetching products from Google Sheets");
//     const rows = await getSheet(process.env.SHEET_ID);
//     const body = rows.slice(1);

//     const products = body.map((row, index) => {
//       let images = [];
//       if (row[13]) {
//         // 1. Split by comma
//         // 2. Trim whitespace
//         // 3. Transform each URL to the thumbnail format
//         images = row[13]
//           .split(',')
//           .map(url => url.trim())
//           .filter(url => url.length > 0)
//           .map(url => transformDriveUrl(url)); 
//       }

//       return {
//         id: index + 1,
//         name: row[0] || "",
//         peices: row[1] || "",
//         category: row[2] || "",
//         subcategory: row[3] || "",
//         price: row[4] || "",
//         fullPrice: row[5] || "",
//         discount: row[6] || "",
//         discountedPrice: row[7] || "",
//         size: row[8] || "",
//         fabric: row[9] || "",
//         initialDelivery: row[10] || "",
//         availability: row[11] || "",
//         description: row[12] || "",
//         images: images, // Array of transformed thumbnail URLs
//         image: images.length > 0 ? images[0] : ""
//       };
//     });

//     global.productCache = { data: products, lastFetch: now };
//     res.status(200).json(products);
//   } catch (err) {
//     console.error("Error in productsHandler:", err);
//     res.status(500).json({ error: "Failed to load products" });
//   }
// };

// export default productsHandler;

import { getSheet } from "./google.js";

const productsHandler = async (req, res) => {
  // 1. Set CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 2. Simple in-memory cache logic
  if (!global.productCache) {
    global.productCache = {
      data: null,
      lastFetch: 0
    };
  }

  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  const now = Date.now();

  try {
    // Return cached data if it's still fresh
    if (global.productCache.data && (now - global.productCache.lastFetch < CACHE_DURATION)) {
      
      return res.status(200).json(global.productCache.data);
    }

    
    const rows = await getSheet(process.env.SHEET_ID);

    if (!rows || rows.length <= 1) {
      return res.status(200).json([]);
    }

    const body = rows.slice(1);

    const products = body.map((row, index) => {
      // 3. Process ImageKit URLs from Column N (Index 13)
      let images = [];
      const rawImageCell = row[13] || "";

      if (rawImageCell) {
        // Split by comma, trim whitespace, and remove any empty entries
        images = rawImageCell
          .split(',')
          .map(url => url.trim())
          .filter(url => url.length > 0 && url.startsWith("http"));

        if (index < 3) console.log(`Row ${index} images:`, images.length, rawImageCell.substring(0, 50));
      }

      return {
        id: index + 1,
        name: row[0] || "",
        peices: row[1] || "",
        category: row[2] || "",
        subcategory: row[3] || "",
        price: row[4] || "",
        fullPrice: row[5] || "",
        discount: row[6] || "",
        discountedPrice: row[7] || "",
        size: row[8] || "",
        fabric: row[9] || "",
        initialDelivery: row[10] || "",
        availability: row[11] || "",
        description: row[12] || "",
        images: images, // The full array of 10+ ImageKit links
        image: images.length > 0 ? images[0] : "" // First image as primary
      };
    });

    // 4. Update Cache
    global.productCache = {
      data: products,
      lastFetch: now
    };

    res.status(200).json(products);
  } catch (err) {
    console.error("Error in productsHandler:", err.message);
    res.status(500).json({ error: "Failed to load products" });
  }
};

export default productsHandler;