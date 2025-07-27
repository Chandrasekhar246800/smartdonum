"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

function BasicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-6 mb-8 fixed top-0 left-0 z-50" style={{ minHeight: '72px' }}>
      <div className="flex items-center gap-3">
        <Image src="/images/logo.png" alt="SmartDonum Logo" width={48} height={48} />
        <span className="text-2xl font-extrabold text-green-700">SmartDonum</span>
      </div>
      {/* Desktop links */}
      <div className="hidden md:flex gap-8">
        <Link href="" className="text-lg text-gray-700 hover:text-green-600 font-semibold">Home</Link>
        <Link href="" className="text-lg text-gray-700 hover:text-green-600 font-semibold">Login</Link>
        <Link href="" className="text-lg text-gray-700 hover:text-green-600 font-semibold">About Us</Link>
      </div>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          className="text-green-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Mobile side menu drawer */}
      {menuOpen && (
        <>
          {/* Overlay (transparent) */}
          <div className="fixed inset-0 bg-transparent z-50 md:hidden" onClick={() => setMenuOpen(false)}></div>
          {/* Side drawer */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col items-center pt-24 z-50 md:hidden transition-transform duration-300">
            <button className="absolute top-6 right-6 text-green-700" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Link href="" className="text-lg text-gray-700 hover:text-green-600 font-semibold mb-8 mt-8" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="" className="text-lg text-gray-700 hover:text-green-600 font-semibold mb-8" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link href="" className="text-lg text-gray-700 hover:text-green-600 font-semibold" onClick={() => setMenuOpen(false)}>About Us</Link>
          </div>
        </>
      )}
    </nav>
  );
}

export default function PublicDonarDashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pt-24">
      <BasicNavbar />
      <div className="flex flex-col items-center justify-start w-full mt-2">
        <div className="bg-white/90 rounded-xl shadow-lg border border-green-200 px-8 py-8 mb-8 flex flex-col items-center max-w-2xl w-full">
          <h1 className="text-4xl font-extrabold text-green-700 mb-2">Welcome, Public Donor!</h1>
          <p className="text-lg text-gray-600 text-center mb-4">
            Thank you for joining SmartDonum as a public donor. Here you can register your leftover food, books, or toys for donation. NGOs will be notified and can schedule a pickup. We appreciate your generosity and commitment to making a difference in your community!
          </p>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full mb-8 relative">
            <div className="bg-white rounded-xl shadow-md border border-green-200 px-0 pt-0 pb-10 flex flex-col items-center w-full max-w-md min-h-[540px] z-10 overflow-hidden">
              <div className="w-full h-72 relative mb-4">
                <Image src="/images/PACKEDFOOD.jpg" alt="Packaged Food" fill style={{objectFit: 'cover'}} className="rounded-t-xl" />
              </div>
              <div className="px-8">
                <h3 className="text-3xl font-bold text-green-700 mb-4 mt-2 text-center">Donate Packed Food</h3>
                <p className="text-lg text-gray-600 text-center mb-6">Easily donate your leftover packed food for those in need. NGOs will be notified and can schedule a pickup.</p>
                <div className="flex justify-center w-full">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold text-lg">Donate Packed Food</button>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-green-200" style={{transform: 'translateX(-50%)'}}></div>
            <div className="bg-white rounded-xl shadow-md border border-green-200 px-0 pt-0 pb-10 flex flex-col items-center w-full max-w-md min-h-[540px] z-10 overflow-hidden">
              <div className="w-full h-72 relative mb-4">
                <Image src="/images/TOYS.png" alt="Toys" fill style={{objectFit: 'cover'}} className="rounded-t-xl" />
              </div>
              <div className="px-8">
                <h3 className="text-3xl font-bold text-green-700 mb-4 mt-2 text-center">Donate Toys</h3>
                <p className="text-lg text-gray-600 text-center mb-6">Donate your toys to bring joy to children in need. NGOs will be notified and can schedule a pickup.</p>
                <div className="flex justify-center w-full">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold text-lg">Donate Toys</button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center w-full mb-8 relative">
            <div className="bg-white rounded-xl shadow-md border border-green-200 px-0 pt-0 pb-10 flex flex-col items-center w-full max-w-md min-h-[540px] z-10 overflow-hidden">
              <div className="w-full h-72 relative mb-4">
                <Image src="/images/booksss.jpeg" alt="Books" fill style={{objectFit: 'cover'}} className="rounded-t-xl" />
              </div>
              <div className="px-8">
                <h3 className="text-3xl font-bold text-green-700 mb-4 mt-2 text-center">Donate Books</h3>
                <p className="text-lg text-gray-600 text-center mb-6">Donate your books to help spread knowledge and joy. NGOs will be notified and can schedule a pickup.</p>
                <div className="flex justify-center w-full">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold text-lg">Donate Books</button>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-green-200" style={{transform: 'translateX(-50%)'}}></div>
            <div className="bg-white rounded-xl shadow-md border border-green-200 px-0 pt-0 pb-10 flex flex-col items-center w-full max-w-md min-h-[540px] z-10 overflow-hidden">
              <div className="w-full h-72 relative mb-4">
                <Image src="/images/CLOTHES.jpeg" alt="Clothes" fill style={{objectFit: 'cover'}} className="rounded-t-xl" />
              </div>
              <div className="px-8">
                <h3 className="text-3xl font-bold text-green-700 mb-4 mt-2 text-center">Donate Clothes</h3>
                <p className="text-lg text-gray-600 text-center mb-6">Donate your clothes to help those in need. NGOs will be notified and can schedule a pickup.</p>
                <div className="flex justify-center w-full">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded font-semibold text-lg">Donate Clothes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}