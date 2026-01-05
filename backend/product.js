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
      subcategory: row[5] || "",
      perPeicePrice: row[6] || "",
      fullPrice: row[7] || "",
      size: row[8] || "",
      fabric: row[9] || "",
      initialDelivery: row[10] || "",
      availability: row[11] || "",
      description: row[12] || "",
      image: row[13] || "",
      discount: row[14] || "",
      discountedPrice: row[15] || "",
    }));

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load products" });
  }
};

export default productsHandler;
