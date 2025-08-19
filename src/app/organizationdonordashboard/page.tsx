"use client";


import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

export default function OrganizationDonorDashboard() {
  const [showPickupStatus, setShowPickupStatus] = useState(false);
  // Example pickup data; replace with API call as needed
  const [pickups] = useState([
    { id: 1, item: "Books", status: "Scheduled", date: "2025-08-20" },
    { id: 2, item: "Clothes", status: "Picked Up", date: "2025-08-18" },
    { id: 3, item: "Packed Food", status: "Pending", date: "2025-08-22" },
  ]);
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
      {showPickupStatus ? (
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-sky-200 flex flex-col items-center py-10 px-7 w-full mt-8 animate-fadeinup">
            <button
              className="self-start mb-6 bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow"
              onClick={() => setShowPickupStatus(false)}
            >
              ← Back to Dashboard
            </button>
            {/* --- Pickup Status Header --- */}
            <h2 className="text-2xl font-bold text-sky-700 mb-2">Your pickup is confirmed</h2>
            <p className="text-sky-700 mb-4">Rahul (Helping Hands NGO) accepted your donation</p>
            {/* --- Status Timeline --- */}
            <div className="w-full flex flex-col items-center mb-6">
              <div className="flex flex-row items-center justify-center gap-2 w-full">
                {['Created','Reviewed','Accepted','On the way','Picked up','Verified','Thank you'].map((step, idx) => (
                  <React.Fragment key={step}>
                    <div className={`flex flex-col items-center`}>
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-sm font-bold 
                        ${idx <= 3 ? 'bg-sky-500' : 'bg-gray-300'}`}>{idx+1}</span>
                      <span className={`text-xs mt-1 ${idx <= 3 ? 'text-sky-700' : 'text-gray-400'}`}>{step}</span>
                    </div>
                    {idx < 6 && <div className={`flex-1 h-1 ${idx < 3 ? 'bg-sky-400' : 'bg-gray-200'}`}></div>}
                  </React.Fragment>
                ))}
              </div>
              <div className="w-full flex justify-between text-xs text-gray-500 mt-2">
                <span>2025-08-18 10:00</span>
                <span>2025-08-18 10:10</span>
                <span>2025-08-18 10:15</span>
                <span>Now</span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {/* --- Volunteer Card --- */}
            <div className="w-full flex items-center gap-4 bg-sky-50 rounded-xl p-4 mb-6 border border-sky-100">
              <Image src="/images/volunteer.jpg" alt="Volunteer" width={56} height={56} className="rounded-full h-14 w-14 object-cover" />
              <div className="flex-1">
                <div className="font-semibold text-sky-800">Rahul Sharma <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified</span></div>
                <div className="text-xs text-gray-600">Helping Hands NGO <span className="ml-1 bg-blue-100 text-blue-700 px-1 rounded">NGO</span></div>
                <div className="text-xs text-gray-500">ID: HH-2391</div>
              </div>
              <div className="flex flex-col gap-2">
                <a href="tel:+919999999999" className="bg-sky-400 hover:bg-sky-500 text-white rounded-full p-2"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.13.81.28 1.61.46 2.39a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.78.18 1.58.33 2.39.46A2 2 0 0 1 22 16.92z"></path></svg></a>
                <a href="sms:+919999999999" className="bg-green-400 hover:bg-green-500 text-white rounded-full p-2"><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></a>
              </div>
            </div>
            {/* --- Pickup Details --- */}
            <div className="w-full bg-white rounded-xl p-4 mb-6 border border-sky-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <div className="font-semibold text-sky-700">Pickup window: <span className="font-normal">Today, 6:30–7:30PM</span></div>
                <div className="text-xs text-gray-500">ETA ~6:45PM</div>
              </div>
              <div className="text-xs text-gray-600 mb-1">Vehicle: White WagonR (1234)</div>
              <div className="text-xs text-gray-600 mb-1">Pickup address: 123 Main St, City <button className="ml-2 text-sky-500 underline">Edit</button></div>
              <div className="text-xs text-gray-600">Special instructions: Please call on arrival. Gate code: 4321</div>
            </div>
            {/* --- Donation Summary --- */}
            <div className="w-full bg-white rounded-xl p-4 mb-6 border border-sky-100">
              <div className="font-semibold text-sky-700 mb-2">Donation Summary</div>
              <ul className="text-sm text-gray-700 mb-2">
                <li>Books: 10 (Class 5, Math, Science)</li>
                <li>Clothes: 5 (M, Good condition)</li>
              </ul>
              <div className="flex gap-2">
                <Image src="/images/book.jpg" alt="Book" width={60} height={60} className="rounded-lg object-cover" />
                <Image src="/images/clothes.jpg" alt="Clothes" width={60} height={60} className="rounded-lg object-cover" />
              </div>
              <div className="text-xs text-gray-500 mt-2">Donation ID: DON123456</div>
            </div>
            {/* --- Actions --- */}
            <div className="w-full flex flex-wrap gap-3 mb-6">
              <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold rounded-lg px-4 py-2 shadow">Reschedule</button>
              <button className="bg-sky-100 hover:bg-sky-200 text-sky-700 font-semibold rounded-lg px-4 py-2 shadow">Edit notes</button>
              <button className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg px-4 py-2 shadow">Cancel</button>
              <button className="bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg px-4 py-2 shadow">Mark items ready</button>
            </div>
            {/* --- Safety & Verification --- */}
            <div className="w-full bg-sky-50 rounded-xl p-4 mb-6 border border-sky-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-gray-700">Volunteer will show NGO ID at pickup. Match code: <span className="font-bold text-sky-700">8342</span></div>
              <div className="text-xs text-gray-700 mt-2 sm:mt-0">Your OTP: <span className="font-bold text-sky-700">5129</span></div>
              <button className="text-xs text-red-500 underline mt-2 sm:mt-0">Report an issue</button>
            </div>
            {/* --- After Pickup (hidden until picked up) --- */}
            <div className="w-full bg-green-50 rounded-xl p-4 border border-green-200 flex flex-col items-center" style={{ display: 'none' }}>
              <div className="font-semibold text-green-700 mb-2">Thanks! Pickup confirmed.</div>
              <a href="#" className="text-green-700 underline mb-1">Download receipt</a>
              <a href="#" className="text-green-700 underline mb-1">Download certificate</a>
              <div className="text-xs text-gray-600">Your donation will support X program</div>
              <button className="mt-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow">Rate your experience</button>
            </div>
          </div>
        </main>
      ) : !showDonationsPage ? (
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
                Manage Donations
              </button>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col items-center">
              <h3 className="text-lg font-bold text-sky-600 mb-2">Pickup Requests</h3>
              <p className="text-sky-700 mb-4 text-center">See requests from NGOs and volunteers for donation pickups.</p>
              <button
                className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow transition-all"
                onClick={() => setShowPickupStatus(true)}
              >
                View Requests
              </button>
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
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="mt-2 rounded-lg shadow w-full h-32 object-cover"
                      width={400}
                      height={128}
                    />
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
                                <Image
                                  src={donation.details.image}
                                  alt="Donation"
                                  className="mt-2 rounded-lg shadow w-full h-24 object-cover"
                                  width={400}
                                  height={96}
                                />
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
