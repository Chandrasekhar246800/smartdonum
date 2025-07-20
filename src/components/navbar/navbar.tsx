"use client";

import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleNavigate = (dest: string) => {
    router.push(dest);
    setIsMobileMenuOpen(false);
  };

  // =============== UNCHANGED: Home/About/FAQ/Login NAVBAR ===============
  if (["aboutus", "faq", ""].includes(path.split("/")[1])) {
    return (
      <>
        <nav className="w-full flex items-center justify-between px-4 py-3 bg-sky-100/80 backdrop-blur-sm shadow-lg fixed top-0 left-0 z-30">
          {/* Logo and site name */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            <Image
              src="/images/logo.png"
              alt="SmartDonum Logo"
              width={70}
              height={70}
              className="md:h-[70px] md:w-[70px] w-[50px] h-[50px] object-contain"
              style={{ display: "block" }}
              priority
            />
            <span className="md:text-2xl text-[20px] font-bold text-sky-700">
              SmartDonum
            </span>
          </div>
          {/* Desktop menu */}
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
          {/* Mobile view: Login button and hamburger */}
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
        {/* Mobile Overlay & Side Panel */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out">
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
      </>
    );
  }

  // =============== CHANGED: Donor/Public/OrganizationDonor/NGO NAVBAR ===============
  if (
    ["donor", "public", "organization", "ngo"].includes(
      path.split("/")[1]
    )
  ) {
    return (
      <>
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
          {/* Desktop menu: Donor navigation */}
          <div className="hidden md:flex items-center gap-0">
            <div className="flex items-center bg-gradient-to-r from-sky-100 via-white to-amber-100 bg-opacity-80 rounded-xl shadow border border-sky-100 px-2 py-1">
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-green-100 hover:underline focus:outline-none rounded-l-xl transition-all"
                onClick={() => handleNavigate("/donor")}
              >
                Donor
              </button>
              <div className="w-px h-8 bg-sky-200 mx-2" />
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-sky-200 hover:underline focus:outline-none transition-all"
                onClick={() => handleNavigate("/donor/public")}
              >
                Public Donor
              </button>
              <div className="w-px h-8 bg-sky-200 mx-2" />
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-amber-100 hover:underline focus:outline-none transition-all"
                onClick={() => handleNavigate("/donor/organization")}
              >
                Organization Donor
              </button>
              <div className="w-px h-8 bg-sky-200 mx-2" />
              <button
                className="px-5 py-2 text-sky-700 font-semibold text-lg hover:bg-amber-100 hover:underline focus:outline-none transition-all"
                onClick={() => handleNavigate("/ngo")}
              >
                NGO
              </button>
            </div>
          </div>
          {/* Mobile view: Hamburger menu */}
          <div className="md:hidden flex items-center w-full justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-sky-700 focus:outline-none p-2"
              aria-label="Open menu"
            >
              <Menu size={32} />
            </button>
          </div>
        </nav>
        {/* Mobile Overlay & Side Panel */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out">
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
                  onClick={() => handleNavigate("/donor")}
                >
                  Donor
                </button>
                <button
                  className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-sky-50 rounded-lg transition-colors"
                  onClick={() => handleNavigate("/donor/public")}
                >
                  Public Donor
                </button>
                <button
                  className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-amber-100 rounded-lg transition-colors"
                  onClick={() => handleNavigate("/donor/organization")}
                >
                  Organization Donor
                </button>
                <button
                  className="text-left w-full px-4 py-3 text-lg text-sky-700 font-semibold hover:bg-amber-100 rounded-lg transition-colors"
                  onClick={() => handleNavigate("/ngo")}
                >
                  NGO
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Fallback: no navbar
  return null;
}
