"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { Search, Loader2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search vegetables..."
            className="pl-10 pr-4 py-2 w-full rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Loader2 className="animate-spin text-orange-500" size={40} />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pr-[10px]">
          {filteredProducts.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </Layout>
  );
}
