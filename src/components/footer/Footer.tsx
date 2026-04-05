'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [year, setYear] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  if (!["aboutUs", "faq", "contactUs", ""].includes(pathname.split("/")[1])) {
    return null;
  }

  return (
    <footer
      className="absolute z-10 w-full rounded-2xl bg-gradient-to-r from-sky-100 via-white to-amber-100 bg-opacity-90 sm:mt-16 md:ml-10 md:w-[95%]"
      style={{ marginTop: "1rem" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row">
        <div className="flex flex-col items-center sm:items-start">
          <div className="mb-2 flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="SmartDonum Logo"
              width={40}
              height={40}
              className="rounded-full shadow"
            />
            <span className="text-2xl font-extrabold tracking-wide text-sky-700">
              SmartDonum
            </span>
          </div>
          <p className="text-sm font-medium text-sky-800">
            Thoughtful giving, lasting impact.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Link href="/" className="font-semibold text-sky-700 transition-colors hover:text-sky-900">
            Home
          </Link>
          <Link href="/aboutUs" className="font-semibold text-sky-700 transition-colors hover:text-sky-900">
            About Us
          </Link>
          <Link href="/faq" className="font-semibold text-sky-700 transition-colors hover:text-sky-900">
            FAQ
          </Link>
          <Link href="/contactUs" className="font-semibold text-sky-700 transition-colors hover:text-sky-900">
            Contact Us
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="mailto:info@smartdonum.com" aria-label="Email" className="text-sky-500 hover:text-sky-700">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4V4zm8 8l8-8H4l8 8z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" className="text-sky-500 hover:text-sky-700">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M8 19c7.732 0 11.946-6.41 11.946-11.946 0-.182 0-.364-.012-.545A8.548 8.548 0 0022 4.59a8.19 8.19 0 01-2.357.646A4.118 4.118 0 0021.448 3.2a8.224 8.224 0 01-2.605.996A4.107 4.107 0 0016.616 3c-2.266 0-4.104 1.838-4.104 4.104 0 .322.036.637.106.938A11.654 11.654 0 013 4.15a4.104 4.104 0 001.27 5.475A4.073 4.073 0 012.8 9.1v.052a4.104 4.104 0 003.292 4.022 4.093 4.093 0 01-1.085.145c-.265 0-.522-.026-.773-.075a4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.843"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="text-sky-500 hover:text-sky-700">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h5v-7h-2v-3h2V9.5A3.5 3.5 0 0115.5 6H17v3h-1.5A1.5 1.5 0 0014 10.5V12h3l-.5 3h-2.5v7h2a5 5 0 005-5V7a5 5 0 00-5-5z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="py-2 text-center text-xs text-sky-700">
        &copy; {year} SmartDonum. All rights reserved.
      </div>
    </footer>
  );
}
