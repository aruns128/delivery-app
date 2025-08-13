"use client";
import { useState } from "react";
import Layout from "../components/Layout";
import { useCart } from "../context/CartContext";

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
      <div className="p-5 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-orange-600">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="text-right mt-4 font-bold text-xl">
              Total: ₹{total}
            </div>

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 w-full mt-4 rounded"
            />

            <button
              onClick={checkout}
              className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600"
            >
              Place Order (COD)
            </button>
          </>
        )}
      </div>
    </Layout>
  );
}
