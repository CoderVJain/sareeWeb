import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx"
import Home from "./pages/home.jsx";
import Contact from "./pages/Contact.jsx";
import ProductCatalogue from "./components/Products/ProductCatalogue.jsx";
import ProductInfo from "./components/Products/ProductInfo.jsx";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductCatalogue/>}/>
        <Route path="/product/:id" element={<ProductInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
