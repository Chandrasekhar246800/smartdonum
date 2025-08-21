"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Donation {
  id: number;
  item: string;
  status: string;
  [key: string]: string | number;
}


const ITEM_LABELS: Record<string, string> = {
  books: "Books",
  clothes: "Clothes",
  packedfood: "Packed Food",
  toys: "Toys",
};

export default function PublicViewRequests() {
  const [donations, setDonations] = useState<Donation[]>([]);
  useEffect(() => {
    const fetchDonations = () => {
      fetch("/api/public-donations")
        .then(res => res.json())
        .then(setDonations);
    };
    fetchDonations();
    const interval = setInterval(fetchDonations, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] py-8 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl border border-sky-100 flex flex-col items-center py-8 px-4 sm:px-10 animate-fadeinup">
        <div className="w-full flex justify-start mb-6">
          <Link href="/publicdonordashboard">
            <button className="bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow transition-all">
              ← Back to Dashboard
            </button>
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-sky-700 mb-8 text-center">Your Donation Requests</h1>
        <div className="w-full">
          {donations.length === 0 ? (
            <div className="text-sky-700 text-center">No requests yet.</div>
          ) : (
            <ul className="space-y-6">
              {donations.map(d => (
                <li key={d.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all">
                  <div>
                    <div className="font-semibold text-sky-800 capitalize text-lg mb-1">{ITEM_LABELS[d.item as string] || d.item}</div>
                    <div className="text-gray-600 text-sm">Status: <span className="font-medium">{d.status}</span></div>
                  </div>
                  <Link href={`/publicdonordashboard/view-requests/details?id=${d.id}`}>
                    <button className="mt-4 sm:mt-0 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">See Details</button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
