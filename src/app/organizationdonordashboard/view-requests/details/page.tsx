"use client";
import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Donation {
  id: string | number;
  item: string;
  status: string;
  details?: Record<string, unknown>;
}




interface Donation {
  id: string | number;
  item: string;
  status: string;
  details?: Record<string, unknown>;
}

const ITEM_LABELS: Record<string, string> = {
  books: "Books",
  clothes: "Clothes",
  toys: "Toys",
};

function OrgDonationDetailsPage() {
  const searchParams = useSearchParams();
  const donationId = searchParams.get("id");
  const [donation, setDonation] = useState<Donation | null>(null);

  useEffect(() => {
    if (!donationId) return;
    fetch("/api/organization-donations")
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
        <Link href="/organizationdonordashboard/view-requests">
          <button className="bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow transition-all mb-6">← Back to Requests</button>
        </Link>
        <h1 className="text-3xl font-bold text-sky-700 mb-8 text-center">Donation Details</h1>
        <div className="w-full mb-8">
          <div className="font-semibold text-2xl text-sky-800 mb-2">{ITEM_LABELS[donation.item] || donation.item}</div>
          <div className="text-gray-600 text-lg mb-4">Status: <span className="font-bold capitalize">{donation.status}</span></div>
          <div className="bg-blue-50 rounded-2xl p-6 mb-2 shadow-inner">
            <h3 className="font-semibold text-sky-700 mb-3 text-lg">Details:</h3>
            {donation.item === "books" && (
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><span className="font-bold">Class:</span> <span className="font-medium">{String(donation.details?.class ?? "-")}</span></li>
                <li><span className="font-bold">Number of Books:</span> <span className="font-medium">{String(donation.details?.number ?? "-")}</span></li>
                <li><span className="font-bold">Subjects:</span> <span className="font-medium">{String(donation.details?.subjects ?? "-")}</span></li>
                {typeof donation.details?.image === 'string' && donation.details.image && (
                  <li><span className="font-bold">Picture:</span> <br /><Image src={donation.details.image} alt="Book" width={120} height={80} className="rounded mt-2" /></li>
                )}
              </ul>
            )}
            {donation.item === "clothes" && (
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><span className="font-bold">Size:</span> <span className="font-medium">{String(donation.details?.size ?? "-")}</span></li>
                <li><span className="font-bold">Number of Clothes:</span> <span className="font-medium">{String(donation.details?.number ?? "-")}</span></li>
                <li><span className="font-bold">Condition:</span> <span className="font-medium">{String(donation.details?.condition ?? "-")}</span></li>
                {typeof donation.details?.image === 'string' && donation.details.image && (
                  <li><span className="font-bold">Picture:</span> <br /><Image src={donation.details.image} alt="Clothes" width={120} height={80} className="rounded mt-2" /></li>
                )}
              </ul>
            )}
            {donation.item === "packedfood" && (
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><span className="font-bold">Type of Food:</span> <span className="font-medium">{String(donation.details?.type ?? "-")}</span></li>
                <li><span className="font-bold">Number of Packs:</span> <span className="font-medium">{String(donation.details?.number ?? "-")}</span></li>
                <li><span className="font-bold">Expiry Date:</span> <span className="font-medium">{String(donation.details?.expiry ?? "-")}</span></li>
                {typeof donation.details?.image === 'string' && donation.details.image && (
                  <li><span className="font-bold">Picture:</span> <br /><Image src={donation.details.image} alt="Packed Food" width={120} height={80} className="rounded mt-2" /></li>
                )}
              </ul>
            )}
            {donation.item === "cookedfood" && (
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><span className="font-bold">Type of Cooked Food:</span> <span className="font-medium">{String(donation.details?.type ?? "-")}</span></li>
                <li><span className="font-bold">Quantity:</span> <span className="font-medium">{String(donation.details?.quantity ?? "-")}</span></li>
                <li><span className="font-bold">Prepared At:</span> <span className="font-medium">{String(donation.details?.preparedAt ?? "-")}</span></li>
                {typeof donation.details?.image === 'string' && donation.details.image && (
                  <li><span className="font-bold">Picture:</span> <br /><Image src={donation.details.image} alt="Cooked Food" width={120} height={80} className="rounded mt-2" /></li>
                )}
              </ul>
            )}
            {donation.item === "toys" && (
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><span className="font-bold">Type of Toy:</span> <span className="font-medium">{String(donation.details?.type ?? "-")}</span></li>
                <li><span className="font-bold">Number of Toys:</span> <span className="font-medium">{String(donation.details?.number ?? "-")}</span></li>
                <li><span className="font-bold">Condition:</span> <span className="font-medium">{String(donation.details?.condition ?? "-")}</span></li>
                {typeof donation.details?.image === 'string' && donation.details.image && (
                  <li><span className="font-bold">Picture:</span> <br /><Image src={donation.details.image} alt="Toy" width={120} height={80} className="rounded mt-2" /></li>
                )}
              </ul>
            )}
            {/* fallback for unknown or missing details */}
            {!["books","clothes","packedfood","cookedfood","toys"].includes(donation.item) && (
              <div className="text-gray-500 italic">No additional details provided.</div>
            )}
          </div>
        </div>
        {donation.status === "accepted" ? (
          <Link href={`/organizationdonordashboard/track-pickups/details?id=${donation.id}`}>
            <button className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-xl px-8 py-3 shadow transition-all text-lg mt-4">Track Pickup</button>
          </Link>
        ) : donation.status === "pending" ? (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-4 rounded-xl text-center mt-4">
            <p className="font-semibold text-lg">Donation Pending</p>
            <p className="text-sm">Waiting for NGO to accept your donation. You&apos;ll be able to track pickup once accepted.</p>
          </div>
        ) : donation.status === "cancelled" ? (
          <div className="bg-red-100 border border-red-300 text-red-800 px-6 py-4 rounded-xl text-center mt-4">
            <p className="font-semibold text-lg">Donation Cancelled</p>
            <p className="text-sm">This donation request was not accepted by the NGO.</p>
          </div>
        ) : (
          <div className="bg-gray-100 border border-gray-300 text-gray-800 px-6 py-4 rounded-xl text-center mt-4">
            <p className="font-semibold text-lg">Status: {donation.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const OrgDonationDetailsPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OrgDonationDetailsPage />
  </Suspense>
);

export default OrgDonationDetailsPageWithSuspense;
