"use client";

import Link from "next/link";
import React, { useState } from "react";


export default function OrganizationDonorDashboard() {
  type DonationDetails = {
    class?: string;
    count?: number;
    subjects?: string;
    size?: string;
    condition?: string;
    foodType?: string;
    expiry?: string;
    toyType?: string;
    cookedFoodType?: string;
    cookedFoodQuantity?: number;
    cookedFoodPreparedAt?: string;
    image: string;
  };

  type Donation = { id: number; item: string; details: DonationDetails };

  const [showDonationsPage, setShowDonationsPage] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [activeDonateType, setActiveDonateType] = useState<string | null>(null);
  const [formDetails, setFormDetails] = useState<Partial<DonationDetails>>({ image: "" });
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleDonateClick = (type: string) => {
    setActiveDonateType(type);
    setFormDetails({ image: "" });
    setImagePreview("");
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDonateType) return;
    // Validation per type
    if (activeDonateType === "Books") {
      if (!formDetails.class || !formDetails.count || !formDetails.subjects || !imagePreview) return;
    } else if (activeDonateType === "Clothes") {
      if (!formDetails.size || !formDetails.condition || !formDetails.count || !imagePreview) return;
    } else if (activeDonateType === "Packed Food") {
      if (!formDetails.foodType || !formDetails.expiry || !formDetails.count || !imagePreview) return;
    } else if (activeDonateType === "Cooked Food") {
      if (!formDetails.cookedFoodType || !formDetails.cookedFoodQuantity || !formDetails.cookedFoodPreparedAt || !imagePreview) return;
    } else if (activeDonateType === "Toys") {
      if (!formDetails.toyType || !formDetails.condition || !formDetails.count || !imagePreview) return;
    }
    // Send donation to backend API
    fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item: activeDonateType,
        donorType: "Organization",
        details: { ...formDetails, image: imagePreview },
      }),
    }).then(async (res) => {
      if (res.ok) {
        const newDonation = await res.json();
        setDonations([...donations, newDonation]);
      }
    });
    setActiveDonateType(null);
    setFormDetails({ image: "" });
    setImagePreview("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteDonation = (id: number) => {
    setDonations(donations.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] via-[#87ceeb] to-[#e0f7fa] px-2 sm:px-4">
      {/* Navbar */}
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
      {!showDonationsPage ? (
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
          <section className="w-full flex flex-col items-center mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-sky-700 mb-2">Welcome, Organization Donor!</h2>
            <p className="text-sky-800 text-center mb-4">Manage your donations, view pickup requests, and track your impact in the community.</p>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center w-full">
              <h3 className="text-lg font-bold text-sky-600 mb-2">Manage Donations</h3>
              <p className="text-sky-700 mb-4 text-center">View and manage your organization&#39;s donations.</p>
              <button
                className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all mb-4"
                onClick={() => setShowDonationsPage(true)}
              >
                View & Add Donations
              </button>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-lg font-bold text-sky-600 mb-2">Pickup Requests</h3>
              <p className="text-sky-700 mb-4 text-center">See requests from NGOs and volunteers for donation pickups.</p>
              <Link href="/donor/organization/pickups" className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all">View Requests</Link>
            </div>
          </div>
          <div className="w-full mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-lg font-bold text-cyan-600 mb-2">Impact Summary</h3>
              <p className="text-gray-600 mb-4 text-center">Track the total donations made and the number of lives impacted.</p>
              <div className="flex gap-8 justify-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-cyan-700">{donations.length}</span>
                  <span className="text-gray-500 text-sm">Donations</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-cyan-700">350+</span>
                  <span className="text-gray-500 text-sm">Lives Impacted</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : null}
      {showDonationsPage && (
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-sky-200 flex flex-col items-center py-10 px-7 w-full mt-8 animate-fadeinup">
            {activeDonateType ? (
              <button
                className="self-start mb-6 bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow"
                onClick={() => setActiveDonateType(null)}
              >
                ← Back to Manage Donations
              </button>
            ) : (
              <button
                className="self-start mb-6 bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow"
                onClick={() => setShowDonationsPage(false)}
              >
                ← Back to Dashboard
              </button>
            )}
            <h2 className="text-2xl font-bold text-sky-700 mb-6">Add Organization Donation</h2>
            {!activeDonateType ? (
              <div className="w-full mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 justify-items-center">
                  {/* Top row: Books, Clothes, Packed Food */}
                  {[{ type: "Books", color: "bg-amber-100", icon: "📚", desc: "Donate books for education and joy." },
                    { type: "Clothes", color: "bg-blue-100", icon: "👕", desc: "Donate clothes for those in need." },
                    { type: "Packed Food", color: "bg-green-100", icon: "🥫", desc: "Donate packed food for hunger relief." }
                  ].map(card => (
                    <div key={card.type} className={`rounded-xl shadow-lg p-6 flex flex-col items-center ${card.color} w-full`}>
                      <span className="text-4xl mb-2">{card.icon}</span>
                      <h3 className="text-lg font-bold text-sky-600 mb-2">{card.type}</h3>
                      <p className="text-sky-700 mb-4 text-center">{card.desc}</p>
                      <button
                        className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all"
                        onClick={() => handleDonateClick(card.type)}
                      >
                        Donate
                      </button>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
                  {/* Bottom row: Cooked Food, Toys */}
                  {[{ type: "Cooked Food", color: "bg-orange-100", icon: "🍲", desc: "Donate cooked food for immediate relief." },
                    { type: "Toys", color: "bg-pink-100", icon: "🧸", desc: "Donate toys to bring smiles." }
                  ].map(card => (
                    <div key={card.type} className={`rounded-xl shadow-lg p-6 flex flex-col items-center ${card.color} w-full mx-auto`}>
                      <span className="text-4xl mb-2">{card.icon}</span>
                      <h3 className="text-lg font-bold text-sky-600 mb-2">{card.type}</h3>
                      <p className="text-sky-700 mb-4 text-center">{card.desc}</p>
                      <button
                        className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all"
                        onClick={() => handleDonateClick(card.type)}
                      >
                        Donate
                      </button>
                    </div>
                  ))}
                </div>
            </div>

            ) : (
              <form className="w-full max-w-md mb-8 bg-white/90 rounded-xl shadow-lg p-6 flex flex-col items-center" onSubmit={handleDonationSubmit}>
                <h3 className="text-lg font-bold text-sky-600 mb-4">Donate {activeDonateType}</h3>
                {activeDonateType === "Books" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Class (e.g. 5th, 10th)"
                      value={formDetails.class || ""}
                      onChange={e => setFormDetails({ ...formDetails, class: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Number of Books"
                      value={formDetails.count ?? ""}
                      onChange={e => setFormDetails({ ...formDetails, count: Number(e.target.value) })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Subjects (comma separated)"
                      value={formDetails.subjects || ""}
                      onChange={e => setFormDetails({ ...formDetails, subjects: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                  </div>
                )}
                {activeDonateType === "Clothes" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Size (e.g. S, M, L, XL)"
                      value={formDetails.size || ""}
                      onChange={e => setFormDetails({ ...formDetails, size: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Number of Clothes"
                      value={formDetails.count ?? ""}
                      onChange={e => setFormDetails({ ...formDetails, count: Number(e.target.value) })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Condition (e.g. New, Used)"
                      value={formDetails.condition || ""}
                      onChange={e => setFormDetails({ ...formDetails, condition: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                  </div>
                )}
                {activeDonateType === "Packed Food" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Type of Food (e.g. Biscuits, Canned)"
                      value={formDetails.foodType || ""}
                      onChange={e => setFormDetails({ ...formDetails, foodType: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Number of Packs"
                      value={formDetails.count ?? ""}
                      onChange={e => setFormDetails({ ...formDetails, count: Number(e.target.value) })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Expiry Date (e.g. 2025-12-31)"
                      value={formDetails.expiry || ""}
                      onChange={e => setFormDetails({ ...formDetails, expiry: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                  </div>
                )}
                {activeDonateType === "Cooked Food" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Type of Cooked Food (e.g. Rice, Curry)"
                      value={formDetails.cookedFoodType || ""}
                      onChange={e => setFormDetails({ ...formDetails, cookedFoodType: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-orange-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Quantity (number of servings)"
                      value={formDetails.cookedFoodQuantity ?? ""}
                      onChange={e => setFormDetails({ ...formDetails, cookedFoodQuantity: Number(e.target.value) })}
                      className="w-full mb-2 px-3 py-2 border border-orange-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Prepared At (e.g. 2025-08-14 10:00AM)"
                      value={formDetails.cookedFoodPreparedAt || ""}
                      onChange={e => setFormDetails({ ...formDetails, cookedFoodPreparedAt: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-orange-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                  </div>
                )}
                {activeDonateType === "Toys" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Type of Toy (e.g. Doll, Car)"
                      value={formDetails.toyType || ""}
                      onChange={e => setFormDetails({ ...formDetails, toyType: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Number of Toys"
                      value={formDetails.count ?? ""}
                      onChange={e => setFormDetails({ ...formDetails, count: Number(e.target.value) })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                    <input
                      type="text"
                      placeholder="Condition (e.g. New, Used)"
                      value={formDetails.condition || ""}
                      onChange={e => setFormDetails({ ...formDetails, condition: e.target.value })}
                      className="w-full mb-2 px-3 py-2 border border-sky-300 rounded-lg text-gray-900 placeholder-gray-700"
                    />
                  </div>
                )}
                <div className="w-full mb-4">
                  <label className="block text-sky-600 font-semibold mb-2">Upload a picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-sky-300 rounded-lg"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 rounded-lg shadow w-full h-32 object-cover" />
                  )}
                </div>
                <div className="flex gap-4 w-full">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-2 shadow w-1/2"
                    onClick={() => { setActiveDonateType(null); setImagePreview(""); }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow w-1/2"
                  >
                    Submit Donation
                  </button>
                </div>
              </form>
            )}
            {/* Only show 'Your Donations' when not in form */}
            {!activeDonateType && (
              <div className="w-full max-w-md">
                <h3 className="text-lg font-semibold text-sky-600 mb-4">Organization Donations</h3>
                {donations.length === 0 ? (
                  <p className="text-sky-700">No donations yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {donations.map((donation) => (
                      <li key={donation.id} className="bg-white/80 rounded-lg shadow p-4 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-sky-700">{donation.item}</span>
                          <button
                            onClick={() => deleteDonation(donation.id)}
                            className="bg-red-400 hover:bg-red-500 text-white rounded px-3 py-1 text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="text-sky-800 text-sm">
                          {donation.details && (
                            <div>
                              {donation.item === "Books" && (
                                <div>
                                  <div>Class: {donation.details.class}</div>
                                  <div>Number of Books: {donation.details.count}</div>
                                  <div>Subjects: {donation.details.subjects}</div>
                                </div>
                              )}
                              {donation.item === "Clothes" && (
                                <div>
                                  <div>Size: {donation.details.size}</div>
                                  <div>Number of Clothes: {donation.details.count}</div>
                                  <div>Condition: {donation.details.condition}</div>
                                </div>
                              )}
                              {donation.item === "Packed Food" && (
                                <div>
                                  <div>Type: {donation.details.foodType}</div>
                                  <div>Number of Packs: {donation.details.count}</div>
                                  <div>Expiry: {donation.details.expiry}</div>
                                </div>
                              )}
                              {donation.item === "Cooked Food" && (
                                <div>
                                  <div>Type: {donation.details.cookedFoodType}</div>
                                  <div>Quantity: {donation.details.cookedFoodQuantity}</div>
                                  <div>Prepared At: {donation.details.cookedFoodPreparedAt}</div>
                                </div>
                              )}
                              {donation.item === "Toys" && (
                                <div>
                                  <div>Type: {donation.details.toyType}</div>
                                  <div>Number of Toys: {donation.details.count}</div>
                                  <div>Condition: {donation.details.condition}</div>
                                </div>
                              )}
                              {donation.details.image && (
                                <img src={donation.details.image} alt="Donation" className="mt-2 rounded-lg shadow w-full h-24 object-cover" />
                              )}
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </main>
      )}
      <footer className="w-full flex-shrink-0 bg-cyan-900 bg-opacity-80 mt-auto">
        <div className="text-center text-cyan-100 text-sm py-4">
          © {new Date().getFullYear()} SmartDonum. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
