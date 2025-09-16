"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [adminEmail, setAdminEmail] = useState("");

	useEffect(() => {
		// Check if admin is authenticated
		const authStatus = localStorage.getItem("adminAuthenticated");
		const email = localStorage.getItem("adminEmail");
		
		if (authStatus === "true" && email) {
			setIsAuthenticated(true);
			setAdminEmail(email);
		} else {
			// Redirect to login if not authenticated
			router.push("/admin/login");
		}
		setIsLoading(false);
	}, [router]);

	const handleLogout = () => {
		localStorage.removeItem("adminAuthenticated");
		localStorage.removeItem("adminEmail");
		router.push("/admin/login");
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa]">
				<div className="text-emerald-700 font-semibold text-xl">Loading...</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return null; // Will redirect to login
	}
	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
			{/* Navbar */}
			<nav className="w-full flex flex-col sm:flex-row items-center justify-between py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4 px-4 sm:px-6">
				<ul className="flex flex-wrap gap-3 sm:gap-6 md:gap-10 lg:gap-16 justify-center sm:justify-start mb-3 sm:mb-0">
					<li>
						<Link href="/" className="text-sky-700 hover:text-sky-900 font-semibold transition-all text-sm sm:text-base">Home</Link>
					</li>
					<li>
						<Link href="/aboutUs" className="text-sky-700 hover:text-sky-900 font-semibold transition-all text-sm sm:text-base">About</Link>
					</li>
					<li>
						<Link href="/contactUs" className="text-sky-700 hover:text-sky-900 font-semibold transition-all text-sm sm:text-base">Contact</Link>
					</li>
					<li>
						<span className="bg-emerald-600 text-white font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow text-xs sm:text-sm">SmartDonum Admin</span>
					</li>
				</ul>
				
				{/* Admin Info & Logout */}
				<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
					<span className="text-sky-700 font-medium text-sm sm:text-base text-center">Welcome, {adminEmail}</span>
					<button 
						onClick={handleLogout}
						className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
					>
						Logout
					</button>
				</div>
			</nav>

			<main className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto">
				<h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mt-8 mb-2">Admin Dashboard</h2>
				<p className="text-sky-800 text-center mb-8 text-base sm:text-lg">
					Manage users, oversee donations, monitor NGOs, and maintain system operations.
				</p>

				{/* Quick Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8 px-4">
					<div className="bg-white/90 rounded-xl shadow-lg p-6 text-center border-l-4 border-emerald-500">
						<h3 className="text-2xl font-bold text-emerald-700">245</h3>
						<p className="text-gray-800 font-medium">Total Users</p>
					</div>
					<div className="bg-white/90 rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
						<h3 className="text-2xl font-bold text-green-700">1,820</h3>
						<p className="text-gray-800 font-medium">Total Donations</p>
					</div>
					<div className="bg-white/90 rounded-xl shadow-lg p-6 text-center border-l-4 border-blue-500">
						<h3 className="text-2xl font-bold text-blue-700">42</h3>
						<p className="text-gray-800 font-medium">Active NGOs</p>
					</div>
					<div className="bg-white/90 rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-500">
						<h3 className="text-2xl font-bold text-yellow-700">128</h3>
						<p className="text-gray-800 font-medium">Pending Requests</p>
					</div>
				</div>

				{/* Admin Control Panels */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-8 px-4">
					{/* User Management */}
					<div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px]">
						<div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
							<svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-bold text-emerald-700 mb-2">User Management</h3>
						<p className="text-slate-800 text-center mb-4 font-medium">
							Manage user accounts, permissions, and verification status.
						</p>
						<Link href="/admin/users">
							<button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
								Manage Users
							</button>
						</Link>
					</div>

					{/* Donation Oversight */}
					<div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px]">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
							<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-bold text-green-700 mb-2">Donation Oversight</h3>
						<p className="text-slate-800 text-center mb-4 font-medium">
							Monitor all donations, track distributions, and generate reports.
						</p>
						<Link href="/admin/donations">
							<button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
								View Donations
							</button>
						</Link>
					</div>

					{/* NGO Management */}
					<div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px]">
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
							<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
							</svg>
						</div>
						<h3 className="text-lg font-bold text-blue-700 mb-2">NGO Management</h3>
						<p className="text-slate-800 text-center mb-4 font-medium">
							Approve NGO registrations, manage partnerships, and monitor activities.
						</p>
						<Link href="/admin/ngos">
							<button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
								Manage NGOs
							</button>
						</Link>
					</div>

					{/* Analytics & Reports */}
					<div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px]">
						<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
							<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
						</div>
						<h3 className="text-lg font-bold text-purple-700 mb-2">Analytics & Reports</h3>
						<p className="text-slate-800 text-center mb-4 font-medium">
							Generate comprehensive reports and view system analytics.
						</p>
						<Link href="/admin/analytics">
							<button className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
								View Analytics
							</button>
						</Link>
					</div>

					{/* System Settings */}
					<div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px]">
						<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
							<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</div>
						<h3 className="text-lg font-bold text-gray-700 mb-2">System Settings</h3>
						<p className="text-slate-800 text-center mb-4 font-medium">
							Configure system parameters, security settings, and maintenance.
						</p>
						<Link href="/admin/settings">
							<button className="bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
								System Settings
							</button>
						</Link>
					</div>

					{/* Content Management */}
					<div className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col items-center min-w-[280px]">
						<div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
							<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
							</svg>
						</div>
						<h3 className="text-lg font-bold text-yellow-700 mb-2">Content Management</h3>
						<p className="text-slate-800 text-center mb-4 font-medium">
							Manage website content, announcements, and FAQ updates.
						</p>
						<Link href="/admin/content">
							<button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg px-6 py-2 shadow transition-all text-base">
								Manage Content
							</button>
						</Link>
					</div>
				</div>

				{/* Recent Activity Section */}
				<div className="w-full bg-white/80 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-8 mx-4">
					<h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">Recent System Activity</h3>
					<div className="space-y-3 sm:space-y-4">
						<div className="flex flex-col sm:flex-row sm:items-center p-3 sm:p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
							<div className="flex-1 mb-2 sm:mb-0">
								<p className="font-semibold text-green-800 text-sm sm:text-base">New NGO Registration</p>
								<p className="text-green-600 text-xs sm:text-sm">Hope Foundation has registered and is awaiting approval</p>
							</div>
							<span className="text-green-500 text-xs self-start sm:self-center">2 hours ago</span>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
							<div className="flex-1 mb-2 sm:mb-0">
								<p className="font-semibold text-blue-800 text-sm sm:text-base">Donation Completed</p>
								<p className="text-blue-600 text-xs sm:text-sm">500kg food items distributed to 3 NGOs successfully</p>
							</div>
							<span className="text-blue-500 text-xs self-start sm:self-center">5 hours ago</span>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center p-3 sm:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
							<div className="flex-1 mb-2 sm:mb-0">
								<p className="font-semibold text-yellow-800 text-sm sm:text-base">System Maintenance</p>
								<p className="text-yellow-600 text-xs sm:text-sm">Scheduled maintenance completed successfully</p>
							</div>
							<span className="text-yellow-500 text-xs self-start sm:self-center">1 day ago</span>
						</div>
					</div>
				</div>
			</main>

			<footer className="w-full flex-shrink-0 bg-cyan-900 bg-opacity-80 mt-auto">
				<div className="text-center text-cyan-100 text-sm py-4">
					© {new Date().getFullYear()} SmartDonum Admin Panel. All rights reserved.
				</div>
			</footer>
		</div>
	);
}