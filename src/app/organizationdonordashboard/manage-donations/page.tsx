import Link from "next/link";
import React from "react";

const donationItems = [
  {
    key: "books",
    label: "Books",
    emoji: "📚",
    desc: "Donate books for education and joy.",
    bg: "bg-yellow-100",
  },
  {
    key: "clothes",
    label: "Clothes",
    emoji: "👕",
    desc: "Donate clothes for those in need.",
    bg: "bg-blue-100",
  },
  {
    key: "packedfood",
    label: "Packed Food",
    emoji: "🥫",
    desc: "Donate packed food for hunger relief.",
    bg: "bg-green-100",
  },
  {
    key: "cookedfood",
    label: "Cooked Food",
    emoji: "🍲",
    desc: "Donate cooked food for immediate relief.",
    bg: "bg-orange-100",
  },
  {
    key: "toys",
    label: "Toys",
    emoji: "🧸",
    desc: "Donate toys to bring smiles.",
    bg: "bg-pink-100",
  },
];

export default function ManageDonationsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] py-8 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl border border-sky-100 flex flex-col items-center py-8 px-4 sm:px-10 animate-fadeinup">
        <div className="w-full flex justify-start mb-6">
          <Link href="/organizationdonordashboard">
            <button className="bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow transition-all">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-sky-700 mb-8 text-center">Add Organization Donation</h2>
        {/* Custom 3-then-2 grid layout */}
        <div className="w-full flex flex-col gap-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {donationItems.slice(0, 3).map((item) => (
              <Link
                key={item.key}
                href={`/organizationdonordashboard/manage-donations/donate?item=${item.key}`}
                className="w-full"
              >
                <div className={`flex flex-col items-center rounded-xl shadow p-6 w-full h-56 min-h-[14rem] max-h-[14rem] hover:bg-blue-50 transition cursor-pointer ${item.bg}`}>
                  <span className="text-4xl mb-2">{item.emoji}</span>
                  <h3 className="text-lg font-bold text-sky-700 mb-1">{item.label}</h3>
                  <p className="text-sky-700 text-center mb-3 text-sm">{item.desc}</p>
                  <span className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded px-4 py-2 mt-2">Donate</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {donationItems.slice(3).map((item) => (
              <Link
                key={item.key}
                href={`/organizationdonordashboard/manage-donations/donate?item=${item.key}`}
                className="w-full"
              >
                <div className={`flex flex-col items-center rounded-xl shadow p-6 w-full h-56 min-h-[14rem] max-h-[14rem] hover:bg-blue-50 transition cursor-pointer ${item.bg}`}>
                  <span className="text-4xl mb-2">{item.emoji}</span>
                  <h3 className="text-lg font-bold text-sky-700 mb-1">{item.label}</h3>
                  <p className="text-sky-700 text-center mb-3 text-sm">{item.desc}</p>
                  <span className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded px-4 py-2 mt-2">Donate</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <h3 className="text-xl font-bold text-sky-700 mb-2 mt-2 w-full text-center">Organization Donations</h3>
        {/* List or table of donations can go here in the future */}
      </div>
    </div>
  );
}
