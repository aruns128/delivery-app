"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { Trash2, MapPin, Loader2, Minus, Plus } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const { cart, total, removeFromCart, clearCart, updateQuantity } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const checkout = async () => {
    if (!address.trim()) {
      toast.error("Please enter your delivery address.");
      return;
    }

    try {
      setPlacingOrder(true);
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify({ cart, address, payment: "COD" }),
      });

      if (!res.ok) throw new Error("Order failed");

      toast.success("Order placed successfully!");
      clearCart();
      setAddress("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="animate-spin text-orange-500" size={40} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg text-center mt-10">
          🛒 Your cart is empty.
          <span className="block mt-2">Add some fresh veggies!</span>
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <img
                    src={"/tomoto.jpg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover border"
                  />
                  <div className="max-w-[200px] sm:max-w-none">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 text-gray-600 hover:text-orange-500"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                      className="px-2 py-1 text-gray-600 hover:text-orange-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="font-bold text-orange-600">
                    ₹{item.price * item.quantity}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div
            className="bg-orange-50 p-5 rounded-lg shadow-md h-fit 
                        lg:sticky lg:top-5 lg:self-start 
                        w-full sm:max-w-md mx-auto lg:mx-0"
          >
            <h2 className="text-xl font-bold mb-4 text-orange-800">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between mb-4 font-bold text-lg text-orange-700">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
                <MapPin size={18} /> Delivery Address
              </label>
              <textarea
                placeholder="Enter your delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border rounded p-2 w-full focus:ring-2 focus:ring-orange-400"
                rows={3}
              />
            </div>

            {/* Checkout Button */}
            <button
              onClick={checkout}
              disabled={placingOrder}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center"
            >
              {placingOrder ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Place Order (COD)"
              )}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
