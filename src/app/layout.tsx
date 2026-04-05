import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "SmartDonum",
  description: "Donation management platform connecting donors with NGOs for faster, smarter giving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body
        suppressHydrationWarning
        className="antialiased font-sans"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        <Navbar />

        {children}
        <div className="relative">
          <Footer />
        </div>
        {/* <div className="h-[220px]"></div> */}
      </body>
    </html>
  );
}
