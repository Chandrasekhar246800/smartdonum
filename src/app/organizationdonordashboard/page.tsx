"use client";

import Link from "next/link";
import React from "react";

export default function OrgDonorDashboardMain() {
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
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
			<main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
				<h2 className="text-2xl sm:text-3xl font-bold text-sky-700 text-center mt-8 mb-2">Welcome, Organization Donor!</h2>
				<p className="text-sky-800 text-center mb-8 text-base sm:text-lg">Manage your donations, view pickup requests, and track your impact in the community.</p>
				<div className="flex flex-col sm:flex-row gap-8 justify-center w-full mb-8">
					<div className="flex-1 bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px] max-w-[400px] mx-auto">
						<h3 className="text-lg font-bold text-sky-700 mb-2">Active Donations</h3>
						<p className="text-sky-700 text-center mb-4">View and manage your current donation listings.</p>
						<Link href="/organizationdonordashboard/manage-donations">
							<button className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
								Manage Donations
							</button>
						</Link>
					</div>
					<div className="flex-1 bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px] max-w-[400px] mx-auto">
						<h3 className="text-lg font-bold text-sky-700 mb-2">Pickup Requests</h3>
						<p className="text-sky-700 text-center mb-4">See requests from NGOs and volunteers for donation pickups.</p>
											<Link href="/organizationdonordashboard/view-requests">
												<button className="bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
													View Requests
												</button>
											</Link>
					</div>
				</div>
				<div className="w-full flex justify-center">
					<div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full max-w-2xl mx-auto">
						<h3 className="text-lg font-bold text-sky-700 mb-2">Impact Summary</h3>
						<p className="text-sky-700 mb-4 text-center">Track the total donations made and the number of lives impacted.</p>
						<div className="flex flex-col sm:flex-row gap-8 justify-center w-full">
							<div className="flex flex-col items-center flex-1">
								<span className="text-2xl font-bold text-sky-700">120</span>
								<span className="text-gray-500 text-sm">Donations</span>
							</div>
							<div className="flex flex-col items-center flex-1">
								<span className="text-2xl font-bold text-sky-700">350+</span>
								<span className="text-gray-500 text-sm">Lives Impacted</span>
							</div>
						</div>
					</div>
				</div>
			</main>
			<footer className="w-full flex-shrink-0 bg-cyan-900 bg-opacity-80 mt-auto">
				<div className="text-center text-cyan-100 text-sm py-4">
					© {new Date().getFullYear()} SmartDonum. All rights reserved.
				</div>
			</footer>
		</div>
	);
}

