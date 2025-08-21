"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";



function formatTime(ts: string | null) {
    if (!ts) return "--";
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function TrackPickupDetailsPage() {
    interface Donation {
        id: string | number;
        status: string;
        timeline: { step: string; ts: string | null }[];
        volunteer: {
            id: string | number;
            name: string;
            ngo: string;
            ngoVerified: boolean;
            vehicle: string;
            phone: string;
            photoUrl: string;
            verificationId: string;
        };
        items: { name: string; quantity: number; details: string }[];
        address: string;
        instructions: string;
        donorOtp: string;
        receipts: {
            pickupSlipUrl: string;
            certificateUrl: string;
        };
    }

    const [donation, setDonation] = useState<Donation | null>(null);
    const [showReschedule, setShowReschedule] = useState(false);
    const [showEditNotes, setShowEditNotes] = useState(false);
    const [showCancel, setShowCancel] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const donationId = searchParams.get("id");


    useEffect(() => {
        const fetchDonation = () => {
            fetch("/api/public-donations")
                .then(res => res.json())
                .then((data) => {
                    console.log("Fetched donations:", data);
                    console.log("Looking for donationId:", donationId);
                    let found = null;
                    if (donationId) {
                        found = data.find((d: Donation) => String(d.id) === String(donationId));
                    }
                    if (!found) {
                        console.warn("Donation not found for id:", donationId);
                    }
                    setDonation(found || data[0] || null);
                });
        };
        fetchDonation();
        const interval = setInterval(fetchDonation, 5000);
        return () => clearInterval(interval);
    }, [donationId]);

    if (!donation) {
        return <div className="min-h-screen flex items-center justify-center text-sky-700">Loading donation details...</div>;
    }
    const d = donation;
    // const timeline = getTimeline(d.status);

    function handleMarkReady() {
        setToast("Marked as ready for pickup!");
        setTimeout(() => setToast(null), 2000);
    }

    function handleCancel() {
        setShowCancel(false);
        setToast("Pickup cancelled.");
        setTimeout(() => setToast(null), 2000);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex flex-col items-center py-8 px-2">
            <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl border border-sky-100 p-6 sm:p-10 animate-fadeinup relative">
                   {d.status === 'cancelled' ? (
                       <>
                           <h1 className="text-2xl font-bold text-red-700 mb-2">Pickup Cancelled</h1>
                           <p className="text-red-700 mb-4">This pickup request has been cancelled by the NGO or volunteer. If you have questions, please contact support.</p>
                       </>
                   ) : (
                       <>
                           <h1 className="text-2xl font-bold text-sky-700 mb-2">Your donation pickup is confirmed</h1>
                           <p className="text-sky-700 mb-4">Pickup Status: <span className={d.status === 'accepted' ? 'text-green-600' : 'text-yellow-600'}>{d.status}</span></p>
                           {/* Timeline */}
                           <div className="mb-6">
                               <div className="flex items-center gap-2 mb-2">
                                   {(d.timeline || []).map((step, idx) => (
                                       <React.Fragment key={step.step}>
                                           <div className={`flex flex-col items-center ${step.ts ? "text-sky-600" : "text-gray-400"}`}>
                                               <div className={`w-4 h-4 rounded-full border-2 ${step.ts ? "bg-sky-400 border-sky-600" : "bg-gray-200 border-gray-400"}`}></div>
                                               <span className="text-xs mt-1">{step.step}</span>
                                               <span className="text-[10px]">{formatTime(step.ts)}</span>
                                           </div>
                                           {idx < (d.timeline?.length || 0) - 1 && <div className="w-6 h-0.5 bg-gray-300" />}
                                       </React.Fragment>
                                   ))}
                               </div>
                               <div className="flex gap-2 mt-2">
                                   <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold">Status: {d.status}</span>
                                   <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Pickup window: Today, 6:30–7:30PM</span>
                                   <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">ETA: ~6:45PM</span>
                               </div>
                           </div>
                           {/* Volunteer Card */}
                           <div className="flex items-center gap-4 mb-6">
                               <Image
                                   src={d.volunteer && d.volunteer.photoUrl ? d.volunteer.photoUrl : "/images/abdulpic.jpg"}
                                   alt="Volunteer"
                                   width={64}
                                   height={64}
                                   className="w-16 h-16 rounded-full object-cover border-2 border-sky-300"
                               />
                               <div className="flex-1">
                                   <div className="font-semibold text-sky-800 text-lg flex items-center gap-2">
                                       {d.volunteer && d.volunteer.name ? d.volunteer.name : "Volunteer"}
                                       {d.volunteer && d.volunteer.ngoVerified && <span className="ml-1 text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Verified</span>}
                                   </div>
                                   <div className="text-gray-600 text-sm">ID: {d.volunteer && d.volunteer.id ? d.volunteer.id : "N/A"} &bull; {d.volunteer && d.volunteer.ngo ? d.volunteer.ngo : "N/A"}</div>
                                   <div className="text-gray-600 text-sm">Vehicle: {d.volunteer && d.volunteer.vehicle ? d.volunteer.vehicle : "N/A"}</div>
                                   <div className="flex gap-2 mt-2">
                                       <a href={`tel:${d.volunteer && d.volunteer.phone ? d.volunteer.phone : "#"}`} className="bg-sky-400 hover:bg-sky-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">Call</a>
                                       <a href={`sms:${d.volunteer && d.volunteer.phone ? d.volunteer.phone : "#"}`} className="bg-sky-200 hover:bg-sky-300 text-sky-800 px-3 py-1 rounded-lg text-xs font-semibold">Message</a>
                                   </div>
                               </div>
                           </div>
                           {/* Safety Note */}
                           <div className="mb-6 text-sm text-yellow-700 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                               For your safety, the volunteer will show their NGO ID at pickup. Please verify their ID and match code: <span className="font-bold">{d.volunteer && d.volunteer.verificationId ? d.volunteer.verificationId : "N/A"}</span>.
                           </div>
                           {/* Security & Verification */}
                           <div className="mb-6 text-sm bg-blue-50 border-l-4 border-sky-300 p-3 rounded">
                               <div className="text-gray-900">Volunteer code: <span className="font-bold">{d.volunteer && d.volunteer.verificationId ? d.volunteer.verificationId : "N/A"}</span></div>
                               <div className="text-gray-900">Your OTP: <span className="font-bold">{d.donorOtp}</span></div>
                               <div className="mt-2"><button className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded px-3 py-1 text-xs" onClick={() => setShowReport(true)}>Report an issue</button></div>
                           </div>
                           {/* After Pickup (Demo) */}
                           <div className="mb-2">
                               <div className="text-green-700 font-semibold mb-1">Thank you for your donation! Pickup confirmed.</div>
                               <a href={d.receipts && d.receipts.pickupSlipUrl ? d.receipts.pickupSlipUrl : "#"} className="text-sky-600 underline mr-4">Download pickup slip</a>
                               <a href={d.receipts && d.receipts.certificateUrl ? d.receipts.certificateUrl : "#"} className="text-sky-600 underline">Download certificate</a>
                           </div>
                       </>
                   )}
                {/* Safety Note */}
                {/* No duplicate safety note for public donor */}
                {/* Donation Summary */}
                <div className="mb-6">
                    <h2 className="font-semibold text-sky-700 mb-2">Donation Summary</h2>
                    <ul className="mb-2">
                        {(d.items || []).map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-sm">{item.name} &times; {item.quantity} <span className="text-gray-500">({item.details})</span></li>
                        ))}
                    </ul>
                    <div className="text-gray-700 text-sm">Pickup address: {d.address}</div>
                    <div className="text-gray-700 text-sm">Special instructions: {d.instructions}</div>
                    <div className="text-gray-700 text-sm">Donation ID: {d.id}</div>
                </div>
                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-6">
                    <button className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-4 py-2 shadow text-sm" onClick={() => setShowReschedule(true)}>Reschedule</button>
                    <button className="bg-yellow-200 hover:bg-yellow-300 text-yellow-900 font-semibold rounded-lg px-4 py-2 shadow text-sm" onClick={() => setShowEditNotes(true)}>Edit notes</button>
                    <button className="bg-red-200 hover:bg-red-300 text-red-900 font-semibold rounded-lg px-4 py-2 shadow text-sm" onClick={() => setShowCancel(true)}>Cancel pickup</button>
                    <button className="bg-green-200 hover:bg-green-300 text-green-900 font-semibold rounded-lg px-4 py-2 shadow text-sm" onClick={handleMarkReady}>Mark items ready</button>
                </div>
                {/* Security & Verification */}
                <div className="mb-6 text-sm bg-blue-50 border-l-4 border-sky-300 p-3 rounded">
                       <div className="text-gray-900">Volunteer code/QR: <span className="font-bold">{d.volunteer && d.volunteer.verificationId ? d.volunteer.verificationId : "N/A"}</span></div>
                    <div className="text-gray-900">Donor OTP: <span className="font-bold">{d.donorOtp}</span></div>
                    <div className="mt-2"><button className="bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded px-3 py-1 text-xs" onClick={() => setShowReport(true)}>Report an issue</button></div>
                </div>
                {/* After Pickup (Demo) */}
                <div className="mb-2">
                    <div className="text-green-700 font-semibold mb-1">Thanks! Pickup confirmed.</div>
                       <a href={d.receipts && d.receipts.pickupSlipUrl ? d.receipts.pickupSlipUrl : "#"} className="text-sky-600 underline mr-4">Download receipt</a>
                       <a href={d.receipts && d.receipts.certificateUrl ? d.receipts.certificateUrl : "#"} className="text-sky-600 underline">Download certificate</a>
                </div>
                {/* Modals */}
                {showReschedule && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 shadow-xl w-80">
                            <h2 className="font-bold text-lg mb-2">Reschedule Pickup</h2>
                            <p className="mb-4 text-sm">Select a new pickup window (demo only).</p>
                            <button className="bg-sky-400 hover:bg-sky-500 text-white rounded px-4 py-2" onClick={() => { setShowReschedule(false); setToast('Pickup rescheduled!'); setTimeout(() => setToast(null), 2000); }}>Confirm</button>
                            <button className="ml-2 text-gray-500" onClick={() => setShowReschedule(false)}>Cancel</button>
                        </div>
                    </div>
                )}
                {showEditNotes && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 shadow-xl w-80">
                            <h2 className="font-bold text-lg mb-2">Edit Notes</h2>
                            <textarea className="w-full border rounded p-2 mb-4" rows={3} defaultValue={d.instructions}></textarea>
                            <button className="bg-sky-400 hover:bg-sky-500 text-white rounded px-4 py-2" onClick={() => { setShowEditNotes(false); setToast('Notes updated!'); setTimeout(() => setToast(null), 2000); }}>Save</button>
                            <button className="ml-2 text-gray-500" onClick={() => setShowEditNotes(false)}>Cancel</button>
                        </div>
                    </div>
                )}
                {showCancel && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 shadow-xl w-80">
                            <h2 className="font-bold text-lg mb-2">Cancel Pickup</h2>
                            <p className="mb-4 text-sm">Are you sure you want to cancel this pickup?</p>
                            <button className="bg-red-400 hover:bg-red-500 text-white rounded px-4 py-2" onClick={handleCancel}>Yes, Cancel</button>
                            <button className="ml-2 text-gray-500" onClick={() => setShowCancel(false)}>No</button>
                        </div>
                    </div>
                )}
                {showReport && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 shadow-xl w-80">
                            <h2 className="font-bold text-lg mb-2">Report an Issue</h2>
                            <textarea className="w-full border rounded p-2 mb-4" rows={3} placeholder="Describe the issue..."></textarea>
                            <button className="bg-red-400 hover:bg-red-500 text-white rounded px-4 py-2" onClick={() => { setShowReport(false); setToast('Issue reported!'); setTimeout(() => setToast(null), 2000); }}>Submit</button>
                            <button className="ml-2 text-gray-500" onClick={() => setShowReport(false)}>Cancel</button>
                        </div>
                    </div>
                )}
                {/* Toast */}
                {toast && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-sky-700 text-white px-6 py-2 rounded shadow-lg z-50 animate-fadeinup">{toast}</div>
                )}
            </div>
        </div>
    );

}

const TrackPickupDetailsPageWithSuspense = () => (
    <React.Suspense fallback={<div>Loading...</div>}>
        <TrackPickupDetailsPage />
    </React.Suspense>
);

export default TrackPickupDetailsPageWithSuspense;
