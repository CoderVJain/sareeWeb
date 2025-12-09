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
      catalog: row[3] || "",
      perPeicePrice: row[4] || "",
      fullPrice: row[5] || "",
      size: row[6] || "",
      fabric: row[7] || "",
      initialDelivery: row[8] || "",
      availability: row[9] || "",
      description: row[10] || "",
      image: row[11] || "",
    }));

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load products" });
  }
};

export default productsHandler;
