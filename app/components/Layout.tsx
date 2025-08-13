"use client";
import {
  ShoppingCart,
  Home,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false); // force collapsed in mobile
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`relative transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-16"} 
          bg-gradient-to-b from-orange-200 via-red-200 to-orange-300 shadow-lg`}
      >
        {/* Toggle Button — hide on mobile */}
        {!isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-4 top-6 bg-orange-500 text-white p-1 rounded-full shadow hover:bg-orange-600 transition"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}

        {/* Navigation */}
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
            {!isMobile && isOpen && <span>Home</span>}
          </a>

          <a
            href="/cart"
            className={`flex items-center w-full rounded-lg transition px-3 py-2
              ${isOpen ? "gap-2" : "justify-center"}
              ${pathname === "/cart" ? "bg-orange-500 text-white shadow" : "hover:text-orange-600"}`}
          >
            <Package size={22} />
            {!isMobile && isOpen && <span>My Orders</span>}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gradient-to-r from-red-100 via-orange-100 to-red-50 shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-orange-800">
            Fresh Vegetables Daily
          </h1>

          {/* Cart Button */}
          <a
            href="/cart"
            className="flex items-center gap-1 sm:gap-2 bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-full shadow hover:bg-orange-600 transition text-sm sm:text-base"
          >
            <ShoppingCart size={18} className="shrink-0" />
            {/* Hide text in mobile */}
            {!isMobile && <span>Cart</span>}
            <span className="bg-white text-orange-600 rounded-full px-2 py-0.5 text-xs font-bold">
              {cart.reduce((sum, p) => sum + p.quantity, 0)}
            </span>
          </a>
        </header>

        <main className="flex-1 p-3 sm:p-5">{children}</main>
      </div>
    </div>
  );
}
