"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";
import { Trash2, MapPin, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, total, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState("");

  const checkout = async () => {
    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ cart, address, payment: "COD" }),
    });
    alert("Order placed!");
    clearCart();
  };

  return (
    <Layout>
      <div className="p-5 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 flex items-center gap-3 text-orange-700">
          <ShoppingBag size={32} /> Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-lg text-center mt-10">
            🛒 Your cart is empty.  
            <span className="block mt-2">Add some fresh veggies!</span>
          </p>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={"/tomoto.jpg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-orange-600">
                      ₹{item.price * item.quantity}
                    </p>
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
            <div className="bg-orange-50 p-5 rounded-lg shadow-md h-fit sticky top-5">
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

              <button
                onClick={checkout}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition"
              >
                Place Order (COD)
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
