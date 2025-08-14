"use client";
import {
  ShoppingCart,
  Home,
  Package,
  ChevronLeft,
  ChevronRight,
  User2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { cart } = useCart();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration safe
  useEffect(() => setMounted(true), []);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false);
      else setIsOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-blue-50 to-blue-100 shadow-lg transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-16"} 
          ${isMobile ? "fixed top-0 left-0 z-50 h-screen" : "relative h-full"}`}
      >
        {!isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -right-4 top-5 bg-blue-600 text-white p-1 rounded-full shadow hover:bg-blue-700 transition"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        )}

        <nav
          className={`flex flex-col gap-6 text-blue-800 text-lg h-full justify-center transition-all duration-300
            ${isOpen ? "items-start p-5" : "items-center p-2"}`}
        >
          <a
            href="/products"
            className={`flex items-center w-full rounded-lg transition px-3 py-2
              ${isOpen ? "gap-2" : "justify-center"}
              ${pathname === "/products" ? "bg-blue-200 text-blue-800 shadow font-bold" : "hover:text-blue-600"}`}
          >
            <Home size={22} />
            {!isMobile && isOpen && <span>Products</span>}
          </a>

          <a
            href="/cart"
            className={`flex items-center w-full rounded-lg transition px-3 py-2
              ${isOpen ? "gap-2" : "justify-center"}
              ${pathname === "/cart" ? "bg-blue-200 text-blue-800 shadow font-bold" : "hover:text-blue-600"}`}
          >
            <Package size={22} />
            {!isMobile && isOpen && <span>My Orders</span>}
          </a>

          <a
            href="/admin"
            className={`flex items-center w-full rounded-lg transition px-3 py-2
              ${isOpen ? "gap-2" : "justify-center"}
              ${pathname === "/admin" ? "bg-blue-200 text-blue-800 shadow font-bold" : "hover:text-blue-600"}`}
          >
            <User2 size={22} />
            {!isMobile && isOpen && <span>Admin</span>}
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 h-full ${isMobile&& "ml-16"}`}
      >
        <header className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-sm px-4 sm:px-6 py-3 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-800">
            DailyMart
          </h1>

          <a
            href="/cart"
            className="flex items-center gap-1 sm:gap-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-full shadow hover:bg-blue-700 transition text-sm sm:text-base"
          >
            <ShoppingCart size={18} className="shrink-0" />
            {!isMobile && <span>Cart</span>}
            <span className="bg-white text-blue-600 rounded-full px-2 py-0.5 text-xs font-bold">
              {cart.reduce((sum, p) => sum + p.quantity, 0)}
            </span>
          </a>
        </header>

        {/* Scrollable content */}
        <main className={`flex-1 p-3 sm:p-5 overflow-y-auto`}>{children}</main>
      </div>
    </div>
  );
}
