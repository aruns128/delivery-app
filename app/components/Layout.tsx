// app/components/Layout.tsx
"use client";
import { ShoppingCart, Home, Package } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col justify-center w-64 bg-red-100 p-5 shadow-lg">
        <nav className="flex flex-col gap-6 text-orange-800 text-lg">
          <a href="/" className="flex gap-2 hover:text-orange-600">
            <Home size={20} /> Home
          </a>
          <a href="/cart" className="flex gap-2 hover:text-orange-600">
            <Package size={20} /> My Orders
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-red-50 shadow-sm px-6 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Fresh Vegetables Daily</h1>
          <a
            href="/cart"
            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full shadow hover:bg-orange-600 transition"
          >
            <ShoppingCart size={18} /> Cart ({cart.reduce((sum, p) => sum + p.quantity, 0)})
          </a>
        </header>

        <main className="flex-1 p-3 sm:p-5">{children}</main>
      </div>
    </div>
  );
}
