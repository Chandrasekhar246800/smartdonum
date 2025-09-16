"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function AdminAnalyticsPage() {
	const [selectedTimeframe, setSelectedTimeframe] = useState("month");

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
			{/* Navbar */}
			<nav className="w-full flex flex-col sm:flex-row items-center gap-3 sm:justify-between py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4 px-4 sm:px-6">
				<Link href="/admin" className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm sm:text-base">
					← Back to Dashboard
				</Link>
				<span className="bg-emerald-600 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow text-sm sm:text-base">📊 Analytics & Reports</span>
			</nav>

			<main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
				<h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mt-4 sm:mt-8 mb-2">📊 Analytics & Reports</h2>
				<p className="text-gray-700 text-center mb-4 sm:mb-8 text-sm sm:text-base px-2">Generate comprehensive reports and view system analytics</p>

				{/* Time Filter */}
				<div className="bg-white rounded-lg shadow-md mb-4 sm:mb-8 p-3 sm:p-4">
					<div className="flex flex-wrap justify-center gap-2 sm:gap-4">
						{["week", "month", "quarter", "year"].map((timeframe) => (
							<button
								key={timeframe}
								onClick={() => setSelectedTimeframe(timeframe)}
								className={`px-3 py-2 sm:px-6 sm:py-2 font-semibold capitalize rounded-lg transition-all text-sm sm:text-base ${
									selectedTimeframe === timeframe
										? "bg-emerald-500 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-emerald-100"
								}`}
							>
								{timeframe}
							</button>
						))}
					</div>
				</div>

				{/* Key Metrics */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-green-500">
						<h3 className="text-lg sm:text-3xl font-bold text-green-600">1,820</h3>
						<p className="text-gray-600 text-xs sm:text-base">Total Donations</p>
						<p className="text-green-500 text-xs sm:text-sm mt-1 sm:mt-2">↑ 12% from last month</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-blue-500">
						<h3 className="text-lg sm:text-3xl font-bold text-blue-600">245</h3>
						<p className="text-gray-600 text-xs sm:text-base">Active Users</p>
						<p className="text-blue-500 text-xs sm:text-sm mt-1 sm:mt-2">↑ 8% from last month</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-purple-500">
						<h3 className="text-lg sm:text-3xl font-bold text-purple-600">42</h3>
						<p className="text-gray-600 text-xs sm:text-base">Partner NGOs</p>
						<p className="text-purple-500 text-xs sm:text-sm mt-1 sm:mt-2">↑ 3 new this month</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-yellow-500 col-span-2 lg:col-span-1">
						<h3 className="text-lg sm:text-3xl font-bold text-yellow-600">5,420</h3>
						<p className="text-gray-600 text-xs sm:text-base">Lives Impacted</p>
						<p className="text-yellow-500 text-xs sm:text-sm mt-1 sm:mt-2">↑ 18% from last month</p>
					</div>
				</div>

				{/* Charts and Analytics */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
					{/* Donation Trends */}
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
						<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">📈 Donation Trends</h3>
						<div className="h-48 sm:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
							<div className="text-center text-gray-500 p-4">
								<svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
								</svg>
								<p className="text-sm sm:text-base font-medium">Interactive Chart Would Be Here</p>
								<p className="text-xs sm:text-sm">Showing donation volume over time</p>
							</div>
						</div>
					</div>

					{/* User Growth */}
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
						<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">📊 User Growth</h3>
						<div className="h-48 sm:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
							<div className="text-center text-gray-500 p-4">
								<svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
								</svg>
								<p className="text-sm sm:text-base font-medium">User Growth Chart</p>
								<p className="text-xs sm:text-sm">Tracking new registrations</p>
							</div>
						</div>
					</div>
				</div>

				{/* Category Breakdown */}
				<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
					<h3 className="text-xl font-bold text-gray-800 mb-6">Donation Categories</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="text-center">
							<div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-green-600">35%</span>
							</div>
							<h4 className="font-semibold text-gray-800">Food Items</h4>
							<p className="text-gray-600">637 donations</p>
						</div>
						<div className="text-center">
							<div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-blue-600">28%</span>
							</div>
							<h4 className="font-semibold text-gray-800">Clothing</h4>
							<p className="text-gray-600">509 donations</p>
						</div>
						<div className="text-center">
							<div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-purple-600">22%</span>
							</div>
							<h4 className="font-semibold text-gray-800">Books</h4>
							<p className="text-gray-600">400 donations</p>
						</div>
						<div className="text-center">
							<div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<span className="text-2xl font-bold text-yellow-600">15%</span>
							</div>
							<h4 className="font-semibold text-gray-800">Toys</h4>
							<p className="text-gray-600">273 donations</p>
						</div>
					</div>
				</div>

				{/* Report Generation */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">📊 Monthly Report</h3>
						<p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Generate comprehensive monthly donation and user activity report</p>
						<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-2 w-full text-sm sm:text-base">
							Generate Report
						</button>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">📈 NGO Performance</h3>
						<p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Detailed analysis of NGO performance and impact metrics</p>
						<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-2 w-full text-sm sm:text-base">
							Generate Report
						</button>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">💰 Financial Summary</h3>
						<p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Financial overview and donation value analysis</p>
						<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-2 w-full text-sm sm:text-base">
							Generate Report
						</button>
					</div>
				</div>

				{/* Export Options */}
				<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
					<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">📤 Export Data</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
						<button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg px-3 sm:px-4 py-2 sm:py-3 border text-sm sm:text-base">
							📊 Export as CSV
						</button>
						<button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg px-3 sm:px-4 py-2 sm:py-3 border text-sm sm:text-base">
							📈 Export as Excel
						</button>
						<button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg px-3 sm:px-4 py-2 sm:py-3 border text-sm sm:text-base">
							📄 Export as PDF
						</button>
						<button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg px-3 sm:px-4 py-2 sm:py-3 border text-sm sm:text-base">
							📧 Email Report
						</button>
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