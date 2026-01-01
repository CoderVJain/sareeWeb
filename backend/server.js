// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsHandler from "./product.js";





const allowedOrigins = [
  "http://localhost:5173",                        // local dev
  "https://sareeweb-mjnj.onrender.com",
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

import { google } from "googleapis";
app.get("/api/proxy-pdf/:fileId", async (req, res) => {
  const { fileId } = req.params;
  try {
    // Re-use auth from environment (simplified for this snippet, ideally export auth from google.js)
    // We'll quickly re-instantiate auth here or simple import it if exported.
    // Ideally we should export 'auth' from google.js. Let's assume we can get a client.

    // Quick fix: Since 'auth' isn't exported, we'll re-create logic or ask user to export it. 
    // Actually, let's modify google.js to export 'auth' in next step if needed, 
    // BUT for now, let's rely on the environment variables which exist.

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const client = await auth.getClient();
    const drive = google.drive({ version: "v3", auth: client });

    const driveRes = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", "application/pdf");
    driveRes.data.pipe(res);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).send("Error streaming file");
  }
});


app.listen(5000, () => console.log("Backend running on port 5000"));
