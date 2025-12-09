// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsHandler from "./product.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/products", productsHandler);


app.listen(5000, () => console.log("Backend running on port 5000"));
