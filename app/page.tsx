// pages/index.tsx
"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex flex-col items-center justify-center text-center p-6">
      {/* Hero Section */}
      <h1 className="text-5xl font-extrabold text-orange-800 animate-fadeInUp">
        Welcome to <span className="text-orange-600">Farm Fresh</span>
      </h1>
      <p className="mt-6 text-lg text-gray-700 max-w-xl animate-fadeInUp delay-200">
        Bringing you nature’s best — freshly harvested fruits, vegetables, and grains,
        sourced directly from local farmers. Experience the taste of purity,
        with zero chemicals and 100% love.
      </p>
      <p className="mt-2 text-sm text-gray-500 animate-fadeInUp delay-300">
        Trusted by hundreds of happy families for daily nutrition and wellness.
      </p>

      {/* CTA Button */}
      <div className="mt-10 flex gap-4 animate-fadeInUp delay-400">
        <Link
          href="/products"
          className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
        >
          Start Shopping
        </Link>
      </div>

     

      {/* Simple Tailwind Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </main>
  );
}
