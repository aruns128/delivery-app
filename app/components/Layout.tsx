// app/components/Layout.tsx
"use client";
import { ShoppingCart, Home, Package, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`relative transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } bg-gradient-to-b from-orange-200 via-red-200 to-orange-300 shadow-lg`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-6 bg-orange-500 text-white p-1 rounded-full shadow hover:bg-orange-600 transition"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Nav */}
        
       <nav
  className={`flex flex-col gap-6 text-orange-900 text-lg h-full justify-center transition-all duration-300
    ${isOpen ? "items-start p-5" : "items-center p-2"}`}
>
  <a
    href="/"
    className={`flex items-center w-full rounded-lg transition px-3 py-2
      ${isOpen ? "gap-2" : "justify-center"} 
      ${pathname === "/" ? "bg-orange-500 text-white shadow" : "hover:text-orange-600"}`}
  >
    <Home size={22} />
    {isOpen && <span>Home</span>}
  </a>

  <a
    href="/cart"
    className={`flex items-center w-full rounded-lg transition px-3 py-2
      ${isOpen ? "gap-2" : "justify-center"} 
      ${pathname === "/cart" ? "bg-orange-500 text-white shadow" : "hover:text-orange-600"}`}
  >
    <Package size={22} />
    {isOpen && <span>My Orders</span>}
  </a>
</nav>



      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-red-100 via-orange-100 to-red-50 shadow-sm px-6 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-orange-800">Fresh Vegetables Daily</h1>
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
