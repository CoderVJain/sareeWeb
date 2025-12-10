// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsHandler from "./product.js";





const allowedOrigins = [
  "http://localhost:5173",                        // local dev
  "https://sareeweb-mjnj.onrender.com"   ,
  "https://sareecanvas.com",              
  "https://www.sareecanvas.com"   
];



dotenv.config();

const app = express();
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked by server"));
    }
  },
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

app.get("/api/products", productsHandler);


app.listen(5000, () => console.log("Backend running on port 5000"));
