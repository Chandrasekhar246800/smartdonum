"use client";

import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const path = usePathname();
  console.log("Current path:", path);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const [donorDropdown, setDonorDropdown] = useState(false);
  const router = useRouter();

  const handleNavigateDest = (dest: string) => {
    router.push(dest);
    setDonorDropdown(false);
  };

  return (
    <>
      {["aboutus", "faq", "home"].includes(path.split("/")[1]) && (
        <nav className="w-full flex items-center justify-between px-4 py-3 bg-sky-100/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 z-30">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img
              src="/images/logo.png"
              alt="SmartDonum Logo"
              className="md:h-[70px] md:w-[70px] w-[50px] h-[50px] object-contain"
              style={{ display: "block" }}
            />
            <span className="md:text-2xl text-[20px] font-bold text-sky-700">
              SmartDonum
            </span>
          </div>
          {/* Desktop menu bar */}
          <div className="hidden md:flex items-center gap-0">
            <div className="flex items-center bg-gradient-to-r from-sky-100 via-white to-amber-100 bg-opacity-80 rounded-xl shadow border border-sky-100 px-2 py-1">
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-green-100 hover:underline focus:outline-none rounded-l-xl transition-all"
                onClick={() => handleNavigate("/")}
              >
                Home
              </button>
              <div className="w-px h-8 bg-sky-200 mx-2" />
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-sky-200 hover:underline focus:outline-none transition-all"
                onClick={() => handleNavigate("/aboutUs")}
              >
                About Us
              </button>
              <div className="w-px h-8 bg-sky-200 mx-2" />
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-amber-100 hover:underline focus:outline-none transition-all"
                onClick={() => handleNavigate("/faq")}
              >
                FAQ
              </button>
              <div className="w-px h-8 bg-sky-200 mx-2" />
              <button
                className="px-5 py-2 bg-sky-200 hover:bg-sky-300 text-sky-700 text-lg font-semibold rounded-r-xl shadow transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none"
                onClick={() => handleNavigate("/loginPage")}
              >
                Login
              </button>
            </div>
          </div>
          {/* Mobile view: Only Login button and hamburger menu */}
          <div className="md:hidden flex items-center gap-2 w-full justify-end">
            <button
              className="px-5 py-2 bg-sky-200 hover:bg-sky-300 text-sky-700 text-lg font-semibold rounded-xl shadow transition-all focus:outline-none"
              onClick={() => handleNavigate("/landing")}
            >
              Login
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-sky-700 focus:outline-none p-2"
              aria-label="Open menu"
            >
              <Menu size={32} />
            </button>
          </div>
        </nav>
      )}

      {/* --- Mobile Overlay & Side Panel --- */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Side menu */}
          <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform md:hidden transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="text-xl font-bold text-sky-700">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 p-2"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-3">
              <button
                className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-green-100 rounded-lg transition-colors"
                onClick={() => handleNavigate("/")}
              >
                Home
              </button>
              <button
                className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-sky-50 rounded-lg transition-colors"
                onClick={() => handleNavigate("/aboutUs")}
              >
                About Us
              </button>
              <button
                className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-amber-100 rounded-lg transition-colors"
                onClick={() => handleNavigate("/faq")}
              >
                FAQ
              </button>
            </div>
          </div>
        </>
      )}

      {['donor'].includes(path.split("/")[1]) && (
        <nav className="w-full flex items-center justify-between px-4 py-3 bg-sky-100/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 z-30">
          {/* Logo and site name */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            <img
              src="/images/logo.png"
              alt="SmartDonum Logo"
              className="md:h-[70px] md:w-[70px] w-[50px] h-[50px] object-contain"
              style={{ display: "block" }}
            />
            <span className="md:text-2xl text-[20px] font-bold text-sky-700">
              SmartDonum
            </span>
          </div>
          {/* Donor dropdown and NGO button */}
          <div className="flex items-center gap-4">
            {/* Donor dropdown */}
            <div className="relative">
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg bg-white rounded-xl shadow hover:bg-sky-200 focus:outline-none transition-all"
                onClick={() => setDonorDropdown((v) => !v)}
                type="button"
              >
                Donor
                <svg
                  className="inline ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {donorDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-xl shadow border z-40 min-w-[180px]">
                  <button
                    className="w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-100 rounded-t-xl"
                    onClick={() => handleNavigateDest("/donor/public")}
                    type="button"
                  >
                    Public Donor
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-100 rounded-b-xl"
                    onClick={() => handleNavigateDest("/donor/organization")}
                    type="button"
                  >
                    Organization Donor
                  </button>
                </div>
              )}
            </div>
            {/* NGO Button */}
            <button
              className="px-5 py-2 text-sky-700 font-semibold text-lg bg-white rounded-xl shadow hover:bg-sky-200 focus:outline-none transition-all"
              onClick={() => handleNavigateDest("/ngo")}
              type="button"
            >
              NGO
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
