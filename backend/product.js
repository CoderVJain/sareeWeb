// product.js
import { getSheet } from "./google.js";

const productsHandler = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const rows = await getSheet(process.env.SHEET_ID);

    const body = rows.slice(1);

    const products = body.map((row, index) => ({
      id: index + 1,
      name: row[0] || "",
      price: row[1] || "",
      peices: row[2] || "",
      category: row[3] || "",
      subcategory: row[4] || "",
      perPeicePrice: row[5] || "",
      fullPrice: row[6] || "",
      size: row[7] || "",
      fabric: row[8] || "",
      initialDelivery: row[9] || "",
      availability: row[10] || "",
      description: row[11] || "",
      image: row[12] || "",

      discount: row[13] || "",
      discountedPrice: row[14] || "",
    }));

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load products" });
  }
};

export default productsHandler;
