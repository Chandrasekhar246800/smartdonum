'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const btnsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (lineRef.current) lineRef.current.classList.add('animate-lineGrow');
    if (titleRef.current) {
      titleRef.current.style.animationDelay = '0.5s';
      titleRef.current.classList.add('animate-fromLineUp');
    }
    if (descRef.current) {
      descRef.current.style.animationDelay = '0.7s';
      descRef.current.classList.add('animate-fromLineUp');
    }
    btnsRef.current.forEach((btn, i) => {
      if (btn) {
        btn.style.animationDelay = `${0.9 + i * 0.1}s`;
        btn.classList.add('animate-fromLineDown');
      }
    });
  }, []);

  const handleRoute = (route: string) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center px-2 sm:px-4 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      <div className="h-16"></div>
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        {/* Top part: title and description */}
        <div className="w-full flex flex-col items-center">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white text-center drop-shadow-lg"
            style={{ letterSpacing: '0.02em' }}
          >
            SmartDonum
          </h1>
          <p
            ref={descRef}
            className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 sm:mb-10 leading-relaxed"
          >
            SmartDonum is your platform to donate food, unused books, and toys to those in need.
            <br />
            We connect donors with NGOs and volunteers, making it easy to schedule pickups and ensure nothing goes to waste.
            <br />
            Join us and help bring smiles to many lives!
          </p>
        </div>
        {/* Animated line divider */}
        <hr
          ref={lineRef}
          className="border-t-4 border-cyan-300 w-full max-w-xl mb-10"
        />
        {/* Bottom part: buttons */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 xl:gap-16 w-full max-w-xs sm:max-w-lg md:max-w-md justify-center">
          <button
            ref={el => { if (el) btnsRef.current[0] = el; }}
            className="w-full md:w-auto bg-cyan-400 hover:bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold shadow-lg transition-all"
            onClick={() => handleRoute('/donor')}
          >
            Donor
          </button>
          <button
            ref={el => { if (el) btnsRef.current[1] = el; }}
            className="w-full md:w-auto bg-cyan-400 hover:bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold shadow-lg transition-all"
            onClick={() => handleRoute('/ngo')}
          >
            NGO
          </button>
          <button
            ref={el => { if (el) btnsRef.current[2] = el; }}
            className="w-full md:w-auto bg-cyan-400 hover:bg-cyan-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-lg sm:text-xl font-semibold shadow-lg transition-all"
            onClick={() => handleRoute('/admin')}
          >
            Admin
          </button>
        </div>
      </div>
      <footer className="w-full mt-10 sm:mt-16 flex-shrink-0 bg-cyan-900 bg-opacity-80">
        <div className="text-center text-cyan-100 text-sm py-4">
          © {new Date().getFullYear()} SmartDonum. All rights reserved. |
          <a href="#contact" className="text-cyan-300 hover:text-cyan-400 underline ml-2">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
