
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const ProductContext = createContext(null);
const PRODUCT_CACHE_KEY = "products";

/* -----------------------------
   FIXED API BASE
----------------------------- */
const resolveApiBase = () => {
  return "https://sareeweb-ip9t.onrender.com/"
};

const API_BASE_URL = resolveApiBase();

/* -----------------------------
   CACHE READER
----------------------------- */
const readCachedProducts = () => {
  if (typeof window === "undefined") return [];
  try {
    const value = localStorage.getItem(PRODUCT_CACHE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

/* -----------------------------
   PROVIDER
----------------------------- */
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(readCachedProducts);
  const [status, setStatus] = useState(products.length ? "success" : "idle");
  const [error, setError] = useState(null);
  const didBoot = useRef(false);

  const fetchProducts = useCallback(async () => {
    const hasCache = products.length > 0;
    setStatus(hasCache ? "refreshing" : "loading");
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to load products");

      const data = await res.json();
      setProducts(data);

      localStorage.setItem(PRODUCT_CACHE_KEY, JSON.stringify(data));
      setStatus("success");
    } catch (err) {
      setError(err.message || "Unknown error");
      setStatus(hasCache ? "success" : "error");
    }
  }, [products.length]);

  useEffect(() => {
    if (didBoot.current) return;
    didBoot.current = true;

    fetchProducts();
  }, [fetchProducts]);

  const value = useMemo(
    () => ({
      products,
      isLoading: status === "loading",
      isRefreshing: status === "refreshing",
      error,
      reload: fetchProducts,
    }),
    [products, status, error, fetchProducts]
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

/* -----------------------------
   HOOK
----------------------------- */
export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProductContext must be used within ProductProvider");
  }
  return ctx;
};
