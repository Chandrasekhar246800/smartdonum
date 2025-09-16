"use client";

import Link from "next/link";
import React from "react";

export default function AdminContentPage() {
	const mockContent = [
		{ id: 1, title: "About Us", type: "page", lastModified: "2024-01-10", status: "Published" },
		{ id: 2, title: "FAQ", type: "page", lastModified: "2024-01-08", status: "Published" },
		{ id: 3, title: "New Year Donation Drive", type: "announcement", lastModified: "2024-01-05", status: "Published" },
		{ id: 4, title: "Privacy Policy", type: "page", lastModified: "2023-12-20", status: "Draft" },
	];

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
			{/* Navbar */}
			<nav className="w-full flex items-center justify-between py-3 sm:py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4 px-4 sm:px-6">
				<Link href="/admin" className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm sm:text-base">
					← Back to Dashboard
				</Link>
				<span className="bg-emerald-600 text-white font-bold px-3 sm:px-4 py-2 rounded-lg shadow text-sm sm:text-base">Content Management</span>
			</nav>

			<main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
				<h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mt-6 sm:mt-8 mb-2">Content Management</h2>
				<p className="text-gray-700 text-center mb-6 sm:mb-8 text-sm sm:text-base px-4">Manage website content, announcements, and FAQ updates</p>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
							<svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
							</svg>
						</div>
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">📄 Create Page</h3>
						<p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Add new static pages to the website</p>
						<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base w-full sm:w-auto">
							New Page
						</button>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
							<svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
							</svg>
						</div>
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">📢 New Announcement</h3>
						<p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Create announcements for users</p>
						<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base w-full sm:w-auto">
							Create Announcement
						</button>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
							<svg className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
						</div>
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">❓ Update FAQ</h3>
						<p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Manage frequently asked questions</p>
						<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base w-full sm:w-auto">
							Edit FAQ
						</button>
					</div>
				</div>

				{/* Content List */}
				<div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 sm:mb-8">
					<div className="px-4 sm:px-6 py-4 border-b border-gray-200">
						<h3 className="text-base sm:text-lg font-semibold text-gray-800">📋 Content Items</h3>
					</div>

					{/* Desktop Table View */}
					<div className="hidden lg:block overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{mockContent.map((item) => (
									<tr key={item.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											{item.title}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												item.type === "page" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
											}`}>
												{item.type}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												item.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
											}`}>
												{item.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{item.lastModified}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
											<button className="text-emerald-600 hover:text-emerald-900">Edit</button>
											<button className="text-blue-600 hover:text-blue-900">View</button>
											<button className="text-red-600 hover:text-red-900">Delete</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile Card View */}
					<div className="lg:hidden space-y-4 p-4">
						{mockContent.map((item) => (
							<div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
								<div className="flex justify-between items-start mb-3">
									<h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
									<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
										item.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
									}`}>
										{item.status}
									</span>
								</div>
								<div className="flex items-center justify-between mb-3">
									<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
										item.type === "page" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
									}`}>
										{item.type}
									</span>
									<span className="text-xs text-gray-500">{item.lastModified}</span>
								</div>
								<div className="flex space-x-2">
									<button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-medium py-2 px-3 rounded">
										Edit
									</button>
									<button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded">
										View
									</button>
									<button className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium py-2 px-3 rounded">
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Content Editor (Mock) */}
				<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
					<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">✏️ Content Editor</h3>
					<div className="space-y-3 sm:space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
							<input
								type="text"
								placeholder="Enter content title"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
							<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base">
								<option>Page</option>
								<option>Announcement</option>
								<option>FAQ Item</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
							<textarea
								rows={6}
								placeholder="Enter your content here..."
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
							/>
						</div>
						<div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6">
							<div className="flex items-center">
								<input type="checkbox" id="published" className="mr-2 text-emerald-600 focus:ring-emerald-500" />
								<label htmlFor="published" className="text-sm text-gray-700">Publish immediately</label>
							</div>
							<div className="flex items-center">
								<input type="checkbox" id="featured" className="mr-2 text-emerald-600 focus:ring-emerald-500" />
								<label htmlFor="featured" className="text-sm text-gray-700">Feature on homepage</label>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
							<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base">
								Save Content
							</button>
							<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base">
								Save as Draft
							</button>
							<button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base">
								Preview
							</button>
						</div>
					</div>
				</div>

				{/* Media Library */}
				<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
					<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">🖼️ Media Library</h3>
					<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
						{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
							<div key={i} className="relative group">
								<div className="w-full h-16 sm:h-20 md:h-24 bg-gray-200 rounded-lg flex items-center justify-center">
									<svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
								</div>
								<div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
									<button className="text-white text-xs sm:text-sm font-medium">Select</button>
								</div>
							</div>
						))}
					</div>
					<div className="mt-3 sm:mt-4">
						<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base w-full sm:w-auto">
							📁 Upload Media
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