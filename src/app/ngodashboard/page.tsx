"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Custom NGO Navbar (same as public donor dashboard)
function NGONavbar() {
  return (
    <nav className="w-full flex items-center justify-center py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4">
        <ul className="flex gap-6 sm:gap-10 md:gap-16">
          <li>
            <Link href="/" className="text-sky-700 hover:text-sky-900 font-semibold transition-all">Home</Link>
          </li>
          <li>
            <Link href="/aboutUs" className="text-sky-700 hover:text-sky-900 font-semibold transition-all">About Us</Link>
          </li>
          <li>
            <Link href="#contact" className="text-sky-700 hover:text-sky-900 font-semibold transition-all">Contact Us</Link>
          </li>
          <li>
            <span className="bg-sky-400 text-white font-bold px-4 py-2 rounded-lg shadow">SmartDonum</span>
          </li>
        </ul>
      </nav>
  );
}
interface Donation {
  id: number;
  donorType: "Public" | "Organization";
  item: string;
  details: Record<string, string>;
  status: "pending" | "accepted" | "cancelled";
}

export default function NGODashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch donations from API
  useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      const res = await fetch("/api/donations");
      const data = await res.json();
      setDonations(data);
      setLoading(false);
    }
    fetchDonations();
  }, []);

  // Accept or cancel pickup
  async function handleStatus(id: number, status: "accepted" | "cancelled") {
    setLoading(true);
    await fetch("/api/donations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    // Refresh donations
    const res = await fetch("/api/donations");
    const data = await res.json();
    setDonations(data);
    setLoading(false);
    setSelectedDonation(null);
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-bl from-[#e0f2fe] via-[#f1f5f9] to-[#fef9c3]">
      <NGONavbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-cyan-700 mb-8">NGO Dashboard</h1>
      <p className="mb-6 text-gray-700 text-center max-w-xl">
        Welcome to your NGO dashboard. Here you can view and manage donations received from the public and organizations. NGOs cannot donate, but can accept and process donations.
      </p>
      <div className="w-full mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {loading ? (
            <div className="text-center text-sky-600 font-semibold">Loading donations...</div>
          ) : donations.length === 0 ? (
            <div className="text-center text-gray-500">No donations available.</div>
          ) : donations.map((donation) => (
                <div key={donation.id} className="rounded-xl shadow-lg p-6 flex flex-col items-center bg-white w-full mx-auto max-w-xl">
              <span className="text-lg font-bold text-sky-600 mb-2">{donation.item}</span>
              <span className="text-sm text-gray-500 mb-2">From: {donation.donorType}</span>
              {donation.details.image && (
                <Image
                  src={donation.details.image}
                  alt={donation.item}
                  width={300}
                  height={96}
                  className="mb-2 rounded-lg shadow w-full h-24 object-cover"
                />
              )}
              <ul className="mb-4 text-sky-700 text-sm">
                {Object.entries(donation.details).map(([key, value]) =>
                  key !== "image" ? (
                    <li key={key}>
                      <span className="font-semibold capitalize">{key}:</span> {value}
                    </li>
                  ) : null
                )}
              </ul>
                <div className="flex flex-col gap-3">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all"
                  onClick={() => handleStatus(donation.id, "accepted")}
                  disabled={donation.status === "accepted" || loading}
                >
                  {donation.status === "accepted" ? "Accepted" : "Accept"}
                </button>
                <button
                  className="bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all"
                  onClick={() => handleStatus(donation.id, "cancelled")}
                  disabled={donation.status === "cancelled" || loading}
                >
                  {donation.status === "cancelled" ? "Cancelled" : "Cancel Pickup"}
                </button>
                <button
                  className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all"
                  onClick={() => setSelectedDonation(donation)}
                  disabled={loading}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => setSelectedDonation(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-cyan-700 mb-4">Donation Details</h2>
            {selectedDonation.details.image && (
              <Image
                src={selectedDonation.details.image}
                alt={selectedDonation.item}
                width={400}
                height={128}
                className="mb-4 rounded-lg shadow w-full h-32 object-cover"
              />
            )}
            <ul className="mb-4 text-sky-700 text-base">
              {Object.entries(selectedDonation.details).map(([key, value]) =>
                key !== "image" ? (
                  <li key={key}>
                    <span className="font-semibold capitalize">{key}:</span> {value}
                  </li>
                ) : null
              )}
            </ul>
            <span className="block text-sm text-gray-500 mb-2">Donor Type: {selectedDonation.donorType}</span>
            <span className="block text-sm text-gray-500">Item: {selectedDonation.item}</span>
          </div>
        </div>
      )}
      </main>
      <footer className="w-full flex-shrink-0 bg-cyan-900 bg-opacity-80 mt-auto">
        <div className="text-center text-cyan-100 text-sm py-4">
          © {new Date().getFullYear()} SmartDonum. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
