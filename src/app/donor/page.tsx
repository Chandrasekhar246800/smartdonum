'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Donor() {
  const router = useRouter();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLHRElement>(null);
  const btnsRef = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    if (lineRef.current) lineRef.current.classList.add('animate-lineGrow');
    if (titleRef.current) {
      titleRef.current.style.animationDelay = '0.9s';
      titleRef.current.classList.add('animate-fromLineUp');
    }
    if (descRef.current) {
      descRef.current.style.animationDelay = '1.1s';
      descRef.current.classList.add('animate-fromLineUp');
    }
    btnsRef.current.forEach((btn, i) => {
      if (btn) {
        btn.style.animationDelay = `${1.3 + i * 0.15}s`;
        btn.classList.add('animate-fromLineDown');
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      <div className="h-16"></div>
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-green-400 mb-4 text-center drop-shadow-lg"
        >
          DONOR
        </h1>
        <p
          ref={descRef}
          className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed"
        >
          As a donor, you can help make a difference by sharing your surplus food, unused books, or toys with those in need. Choose your donor type below to get started.
        </p>
        <hr
          ref={lineRef}
          className="border-t-4 border-green-300 w-full max-w-xl mb-10"
        />
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-md justify-center">
          <button
            ref={el => { if (el) btnsRef.current[0] = el; }}
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow transition-all"
            onClick={() => router.push('/donor/public')}
          >
            Public
          </button>
          <button
            ref={el => { if (el) btnsRef.current[1] = el; }}
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow transition-all"
            onClick={() => router.push('/donor/organization')}
          >
            Organization
          </button>
        </div>
      </div>
    </div>
  );
}
