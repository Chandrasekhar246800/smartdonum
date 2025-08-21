"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Donation = {
    id: string;
    item: string;
    status: string;
    // Add other fields if needed
};

export default function TrackPickupsPage() {
    const [donations, setDonations] = React.useState<Donation[]>([]);
    const router = useRouter();
    React.useEffect(() => {
        const fetchDonations = () => {
            fetch("/api/donations?donorType=public")
                .then(res => res.json())
                .then(setDonations);
        };
        fetchDonations();
        const interval = setInterval(fetchDonations, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-100 py-8 px-2">
            <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl border border-sky-100 flex flex-col items-center py-8 px-4 sm:px-10 animate-fadeinup">
                <h1 className="text-2xl font-bold text-sky-700 mb-6">Your Donation Pickup Requests</h1>
                {donations.length === 0 ? (
                    <p className="text-sky-700 text-lg">You have not made any donations yet.</p>
                ) : (
                    <ul className="w-full flex flex-col gap-6">
                        {donations.map((donation) => (
                            <li key={donation.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-sky-100 hover:shadow-2xl transition-all">
                                <div>
                                    <div className="font-semibold text-sky-800 capitalize text-lg mb-1">{donation.item.replace(/food$/, ' Food')}</div>
                                    <div className="text-gray-600 text-sm">Status: <span className="font-medium">{donation.status}</span></div>
                                </div>
                                <button onClick={() => router.push(`/publicdonordashboard/track-pickups/details?id=${donation.id}`)} className="mt-4 sm:mt-0 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">Track</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
