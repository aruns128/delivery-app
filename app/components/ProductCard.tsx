"use client";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

export default function ProductCard({ product, addToCart }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    addToCart(product);

    setTimeout(() => {
      setIsLoading(false);
      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 1500);
    }, 1000);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1
        w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image || "/tomoto.jpg"}
          alt={product.name}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex flex-col justify-between h-32 sm:h-36">
        <h2 className="font-bold text-base sm:text-lg text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-500 text-xs sm:text-sm line-clamp-2">
          {product.description || "Fresh from the farm, delivered to your door."}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className={`mt-3 flex items-center justify-center gap-2 rounded-full shadow transition-all duration-300 relative sm:px-4 sm:py-2 sm:text-base px-2 py-2 text-sm
            ${
              isAdded
                ? "bg-green-700 text-white"
                : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            }`}
        >
          {isLoading ? (
            // Loader Spinner
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : isAdded ? (
            <>
              <Check size={18} />
              <span className="hidden sm:inline">Added</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Add to Cart</span>
            </>
          )}
          {!isLoading && (
            <span className="ml-2 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
              ₹{product.price} /kg
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
