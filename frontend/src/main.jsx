import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <HelmetProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
