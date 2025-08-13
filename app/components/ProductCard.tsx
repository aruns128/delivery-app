"use client";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product, addToCart }: any) {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* Price Badge */}
        <span className="absolute top-3 right-3 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
          ₹{product.price}
        </span>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col justify-between h-32">
        <h2 className="font-bold text-lg text-gray-800 truncate">{product.name}</h2>
        <p className="text-gray-500 text-sm line-clamp-2">
          {product.description || "Fresh from the farm, delivered to your door."}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <ShoppingCart size={18} /> Add to Cart
        </button>
      </div>
    </div>
  );
}
