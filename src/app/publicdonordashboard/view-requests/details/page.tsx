"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ITEM_LABELS: Record<string, string> = {
  books: "Books",
  clothes: "Clothes",
  packedfood: "Packed Food",
  toys: "Toys",
};

type Donation = {
  id: string | number;
  item: string;
  status: string;
  details?: Record<string, unknown>;
};

function DonationDetailsPage() {
  const searchParams = useSearchParams();
  const donationId = searchParams.get("id");
  const [donation, setDonation] = useState<Donation | null>(null);
  useEffect(() => {
    if (!donationId) return;
    fetch("/api/public-donations")
      .then(res => res.json())
      .then((data) => {
        const found = data.find((d: Donation) => String(d.id) === String(donationId));
        setDonation(found || null);
      });
  }, [donationId]);

  if (!donation) {
    return <div className="min-h-screen flex items-center justify-center text-sky-700">Loading donation details...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] py-8 px-2">
      <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl border border-sky-100 flex flex-col items-center py-8 px-6 animate-fadeinup">
        <Link href="/publicdonordashboard/view-requests">
          <button className="bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow transition-all mb-6">← Back to Requests</button>
        </Link>
        <h1 className="text-2xl font-bold text-sky-700 mb-4">Donation Details</h1>
        <div className="w-full mb-4">
          <div className="font-semibold text-lg text-sky-800 mb-2">{ITEM_LABELS[donation.item] || donation.item}</div>
          <div className="text-gray-600 text-sm mb-2">Status: <span className="font-bold capitalize">{donation.status}</span></div>
          {donation.details && (
            <div className="bg-blue-50 rounded-xl p-4 mb-2">
              <h3 className="font-semibold text-sky-700 mb-2">Details:</h3>
              <ul className="list-disc ml-6 text-gray-700">
                {Object.entries(donation.details).map(([key, value]) => (
                  <li key={key}><span className="capitalize font-medium">{key}:</span> {String(value)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link href={`/publicdonordashboard/track-pickups/details?id=${donation.id}`}>
          <button className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">Track Pickup</button>
        </Link>
      </div>
    </div>
  );
}

const DonationDetailsPageWithSuspense = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <DonationDetailsPage />
  </React.Suspense>
);

export default DonationDetailsPageWithSuspense;
