"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function AdminDonationsPage() {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedDonations, setSelectedDonations] = useState<number[]>([]);
	const [showTrackModal, setShowTrackModal] = useState(false);
	const [showNotificationModal, setShowNotificationModal] = useState(false);
	const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

	const mockDonations = [
		{ 
			id: 1, 
			donor: "Arjun Sharma", 
			items: "Food Items", 
			quantity: "50kg", 
			status: "Completed", 
			ngo: "Seva Bharti Foundation", 
			date: "2024-01-15",
			value: "₹15,000",
			location: "Mumbai, Maharashtra",
			category: "Food"
		},
		{ 
			id: 2, 
			donor: "TechCorp India Pvt Ltd", 
			items: "Clothing", 
			quantity: "200 pieces", 
			status: "In Transit", 
			ngo: "Ananda Marga Foundation", 
			date: "2024-01-14",
			value: "₹25,000",
			location: "Bangalore, Karnataka",
			category: "Clothing"
		},
		{ 
			id: 3, 
			donor: "Priya Patel", 
			items: "Books", 
			quantity: "100 books", 
			status: "Pending", 
			ngo: "Education First Foundation", 
			date: "2024-01-13",
			value: "₹8,000",
			location: "Ahmedabad, Gujarat",
			category: "Education"
		},
		{ 
			id: 4, 
			donor: "Infosys Foundation", 
			items: "Toys", 
			quantity: "75 items", 
			status: "Completed", 
			ngo: "Child Care India", 
			date: "2024-01-12",
			value: "₹12,000",
			location: "Pune, Maharashtra",
			category: "Toys"
		},
		{ 
			id: 5, 
			donor: "Rajesh Kumar", 
			items: "Medical Supplies", 
			quantity: "30kg", 
			status: "In Transit", 
			ngo: "Health for All NGO", 
			date: "2024-01-11",
			value: "₹35,000",
			location: "Chennai, Tamil Nadu",
			category: "Medical"
		},
		{ 
			id: 6, 
			donor: "Sunita Gupta", 
			items: "Blankets", 
			quantity: "150 pieces", 
			status: "Pending", 
			ngo: "Winter Relief Foundation", 
			date: "2024-01-10",
			value: "₹18,000",
			location: "Hyderabad, Telangana",
			category: "Clothing"
		},
	];

	// Export Data Functionality - PDF Format
	const exportToPDF = () => {
		const printWindow = window.open('', '_blank');
		
		if (!printWindow) {
			alert('Please allow pop-ups to export PDF');
			return;
		}

		const currentDate = new Date().toLocaleDateString('en-IN');
		const totalDonations = filteredDonations.length;
		const totalValue = filteredDonations.reduce((sum, donation) => 
			sum + parseInt(donation.value.replace('₹', '').replace(',', '')), 0
		);
		
		const htmlContent = `
			<!DOCTYPE html>
			<html>
			<head>
				<title>SmartDonum - Donation Oversight Report</title>
				<style>
					body { 
						font-family: Arial, sans-serif; 
						margin: 20px; 
						background: #f8f9fa;
					}
					.header { 
						text-align: center; 
						margin-bottom: 30px;
						padding: 20px;
						background: linear-gradient(135deg, #10b981, #059669);
						color: white;
						border-radius: 10px;
					}
					.header h1 { 
						margin: 0; 
						font-size: 28px;
						font-weight: bold;
					}
					.header p { 
						margin: 5px 0; 
						font-size: 14px;
						opacity: 0.9;
					}
					.summary {
						display: flex;
						justify-content: space-between;
						margin: 20px 0;
						gap: 15px;
					}
					.summary-card {
						background: white;
						padding: 15px;
						border-radius: 8px;
						box-shadow: 0 2px 4px rgba(0,0,0,0.1);
						text-align: center;
						flex: 1;
					}
					.summary-card h3 {
						margin: 0;
						font-size: 20px;
						color: #10b981;
					}
					.summary-card p {
						margin: 5px 0 0 0;
						color: #6b7280;
						font-size: 14px;
					}
					table { 
						width: 100%; 
						border-collapse: collapse; 
						margin: 20px 0;
						background: white;
						border-radius: 8px;
						overflow: hidden;
						box-shadow: 0 2px 8px rgba(0,0,0,0.1);
					}
					th { 
						background: #f3f4f6; 
						padding: 12px 8px; 
						text-align: left;
						font-weight: 600;
						color: #374151;
						border-bottom: 2px solid #e5e7eb;
						font-size: 11px;
					}
					td { 
						padding: 10px 8px; 
						border-bottom: 1px solid #f3f4f6;
						font-size: 10px;
						color: #1f2937;
					}
					tr:hover { 
						background-color: #f9fafb; 
					}
					.status {
						padding: 4px 8px;
						border-radius: 12px;
						font-size: 9px;
						font-weight: 600;
						text-transform: uppercase;
					}
					.status.completed { background: #dcfce7; color: #166534; }
					.status.pending { background: #fef3c7; color: #92400e; }
					.status.in-transit { background: #dbeafe; color: #1e40af; }
					.category-badge {
						padding: 3px 6px;
						border-radius: 10px;
						font-size: 9px;
						font-weight: 600;
					}
					.cat-food { background: #fef3c7; color: #92400e; }
					.cat-clothing { background: #e0e7ff; color: #5b21b6; }
					.cat-education { background: #dcfce7; color: #166534; }
					.cat-medical { background: #fee2e2; color: #dc2626; }
					.cat-toys { background: #fce7f3; color: #be185d; }
					.footer {
						text-align: center;
						margin-top: 30px;
						padding: 20px;
						color: #6b7280;
						font-size: 12px;
						border-top: 2px solid #e5e7eb;
					}
					@media print {
						body { margin: 0; background: white; }
					}
				</style>
			</head>
			<body>
				<div class="header">
					<h1>SmartDonum Donation Oversight Report</h1>
					<p>Generated on ${currentDate}</p>
					<p>Total Donations: ${totalDonations} | Total Value: ₹${totalValue.toLocaleString('en-IN')}</p>
				</div>
				
				<div class="summary">
					<div class="summary-card">
						<h3>${filteredDonations.filter(d => d.status === 'Completed').length}</h3>
						<p>Completed</p>
					</div>
					<div class="summary-card">
						<h3>${filteredDonations.filter(d => d.status === 'In Transit').length}</h3>
						<p>In Transit</p>
					</div>
					<div class="summary-card">
						<h3>${filteredDonations.filter(d => d.status === 'Pending').length}</h3>
						<p>Pending</p>
					</div>
					<div class="summary-card">
						<h3>₹${totalValue.toLocaleString('en-IN')}</h3>
						<p>Total Value</p>
					</div>
				</div>
				
				<table>
					<thead>
						<tr>
							<th>Donor</th>
							<th>Items</th>
							<th>Category</th>
							<th>Quantity</th>
							<th>Value</th>
							<th>NGO</th>
							<th>Status</th>
							<th>Location</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						${filteredDonations.map(donation => `
							<tr>
								<td><strong>${donation.donor}</strong></td>
								<td>${donation.items}</td>
								<td>
									<span class="category-badge cat-${donation.category.toLowerCase()}">
										${donation.category}
									</span>
								</td>
								<td>${donation.quantity}</td>
								<td><strong>${donation.value}</strong></td>
								<td>${donation.ngo}</td>
								<td>
									<span class="status ${donation.status.toLowerCase().replace(' ', '-')}">
										${donation.status}
									</span>
								</td>
								<td>${donation.location}</td>
								<td>${donation.date}</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
				
				<div class="footer">
					<p>&copy; ${new Date().getFullYear()} SmartDonum Admin Panel. All rights reserved.</p>
					<p>This document contains confidential donation information. Handle with care.</p>
				</div>
				
				<script>
					window.onload = function() {
						window.print();
						setTimeout(() => {
							window.close();
						}, 1000);
					}
				</script>
			</body>
			</html>
		`;

		printWindow.document.write(htmlContent);
		printWindow.document.close();
	};

	// Action Functions
	const handleViewDonation = (donationId: number) => {
		alert(`Viewing details for donation ID: ${donationId}`);
		// TODO: Implement view functionality
	};

	const handleTrackDonation = (donationId: number) => {
		alert(`Tracking donation ID: ${donationId}`);
		// TODO: Implement tracking functionality
	};

	const handleUpdateStatus = (donationId: number, newStatus: string) => {
		alert(`Updating donation ${donationId} status to: ${newStatus}`);
		// TODO: Update donation status
	};

	// Bulk Actions
	const handleSendUpdates = () => {
		if (selectedDonations.length === 0) return;
		alert(`Sending updates to ${selectedDonations.length} selected donations`);
		// TODO: Implement send updates functionality
	};

	const handleBulkStatusUpdate = (status: string) => {
		if (selectedDonations.length === 0) return;
		alert(`Updating ${selectedDonations.length} donations to ${status}`);
		// TODO: Update all selected donations status
	};

	// Quick Actions Functions
	const handleTrackAll = () => {
		setShowTrackModal(true);
	};

	const handleSendNotifications = () => {
		setShowNotificationModal(true);
	};

	const handleViewAnalytics = () => {
		setShowAnalyticsModal(true);
	};

	const filteredDonations = mockDonations.filter(donation => {
		const matchesFilter = selectedFilter === "all" ? true : 
			selectedFilter === "food" ? donation.category === "Food" :
			selectedFilter === "clothing" ? donation.category === "Clothing" :
			selectedFilter === "education" ? donation.category === "Education" :
			selectedFilter === "medical" ? donation.category === "Medical" :
			selectedFilter === "toys" ? donation.category === "Toys" : true;
		
		const matchesSearch = searchQuery === "" ? true :
			donation.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
			donation.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
			donation.ngo.toLowerCase().includes(searchQuery.toLowerCase()) ||
			donation.status.toLowerCase().includes(searchQuery.toLowerCase());
			
		return matchesFilter && matchesSearch;
	});

	const handleSelectDonation = (donationId: number) => {
		setSelectedDonations(prev => 
			prev.includes(donationId) 
				? prev.filter(id => id !== donationId)
				: [...prev, donationId]
		);
	};

	const handleSelectAll = () => {
		if (selectedDonations.length === filteredDonations.length) {
			setSelectedDonations([]);
		} else {
			setSelectedDonations(filteredDonations.map(donation => donation.id));
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
			{/* Navbar */}
			<nav className="w-full flex flex-col sm:flex-row items-center gap-3 sm:justify-between py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4 px-4 sm:px-6">
				<Link href="/admin" className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm sm:text-base">
					← Back to Dashboard
				</Link>
				<span className="bg-emerald-600 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow text-sm sm:text-base">💰 Donation Oversight</span>
			</nav>

			<main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
				<h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mt-4 sm:mt-8 mb-2">💰 Donation Oversight</h2>
				<p className="text-slate-800 text-center mb-4 sm:mb-8 font-medium text-sm sm:text-base px-2">Monitor all donations, track distributions, and generate comprehensive reports</p>

				{/* Search and Filter Section */}
				<div className="bg-white rounded-lg shadow-md p-3 sm:p-6 mb-4 sm:mb-6">
					<div className="flex flex-col gap-3 sm:gap-4 items-stretch sm:items-center sm:justify-between">
						<div className="flex-1 max-w-full sm:max-w-md">
							<div className="relative">
								<svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<input
									type="text"
									placeholder="Search donations..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium placeholder-gray-600 text-sm sm:text-base"
								/>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
							<button 
								onClick={() => setShowAnalyticsModal(true)}
								className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
							>
								📊 Generate Report
							</button>
							<button 
								onClick={exportToPDF}
								className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
							>
								📄 Export PDF
							</button>
						</div>
					</div>
				</div>

				{/* Tab Navigation */}
				<div className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
					<div className="flex border-b overflow-x-auto">
						{[
							{ key: "all", label: "All Donations", icon: "📦" },
							{ key: "food", label: "Food", icon: "🍲" },
							{ key: "clothing", label: "Clothing", icon: "👕" },
							{ key: "education", label: "Education", icon: "📚" },
							{ key: "medical", label: "Medical", icon: "🏥" },
							{ key: "toys", label: "Toys", icon: "🧸" }
						].map((tab) => (
							<button
								key={tab.key}
								onClick={() => setSelectedFilter(tab.key)}
								className={`flex items-center px-3 py-2 sm:px-6 sm:py-3 font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
									selectedFilter === tab.key
										? "border-b-2 border-emerald-500 text-emerald-600 bg-emerald-50"
										: "text-gray-600 hover:text-emerald-500 hover:bg-gray-50"
								}`}
							>
								<span className="mr-1 sm:mr-2">{tab.icon}</span>
								<span className="hidden sm:inline">{tab.label}</span>
								<span className="sm:hidden">{tab.key === "all" ? "All" : tab.label}</span>
								<span className="ml-1 text-xs bg-gray-100 px-1 rounded">
									{tab.key === "all" ? mockDonations.length : mockDonations.filter(d => 
										tab.key === "food" ? d.category === "Food" :
										tab.key === "clothing" ? d.category === "Clothing" :
										tab.key === "education" ? d.category === "Education" :
										tab.key === "medical" ? d.category === "Medical" :
										tab.key === "toys" ? d.category === "Toys" : true
									).length}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Bulk Actions */}
				{selectedDonations.length > 0 && (
					<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
							<div className="flex items-center">
								<svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span className="text-xs sm:text-sm font-medium text-emerald-800">
									{selectedDonations.length} donation{selectedDonations.length === 1 ? '' : 's'} selected
								</span>
							</div>
							<div className="flex flex-wrap gap-2 w-full sm:w-auto">
								<button 
									onClick={handleSendUpdates}
									className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									📧 Updates
								</button>
								<button 
									onClick={() => handleBulkStatusUpdate('Completed')}
									className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									✅ Complete
								</button>
								<button 
									onClick={() => handleBulkStatusUpdate('In Transit')}
									className="bg-yellow-600 hover:bg-yellow-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									🚛 Transit
								</button>
								<button 
									onClick={() => setSelectedDonations([])}
									className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									✖️ Clear
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Summary Cards */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-emerald-500">
						<h3 className="text-lg sm:text-2xl font-bold text-emerald-600">{mockDonations.length}</h3>
						<p className="text-gray-600 text-xs sm:text-base">Total Donations</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-green-500">
						<h3 className="text-lg sm:text-2xl font-bold text-green-600">{mockDonations.filter(d => d.status === 'Completed').length}</h3>
						<p className="text-gray-600 text-xs sm:text-base">Completed</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-yellow-500">
						<h3 className="text-lg sm:text-2xl font-bold text-yellow-600">{mockDonations.filter(d => d.status === 'In Transit').length}</h3>
						<p className="text-gray-600 text-xs sm:text-base">In Transit</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 text-center border-l-4 border-amber-500">
						<h3 className="text-lg sm:text-2xl font-bold text-amber-600">{mockDonations.filter(d => d.status === 'Pending').length}</h3>
						<p className="text-gray-600 text-xs sm:text-base">Pending</p>
					</div>
				</div>

				{/* Donations List - Desktop Table & Mobile Cards */}
				<div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 sm:mb-8">
					{/* Desktop Table */}
					<div className="hidden lg:block overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left">
										<input
											type="checkbox"
											checked={selectedDonations.length === filteredDonations.length && filteredDonations.length > 0}
											onChange={handleSelectAll}
											className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
										/>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NGO</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredDonations.map((donation) => (
									<tr key={donation.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<input
												type="checkbox"
												checked={selectedDonations.includes(donation.id)}
												onChange={() => handleSelectDonation(donation.id)}
												className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
													{donation.donor.charAt(0)}
												</div>
												<div>
													<div className="text-sm font-medium text-gray-900">{donation.donor}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{donation.items}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												donation.category === "Food" ? "bg-yellow-100 text-yellow-800" :
												donation.category === "Clothing" ? "bg-purple-100 text-purple-800" :
												donation.category === "Education" ? "bg-green-100 text-green-800" :
												donation.category === "Medical" ? "bg-red-100 text-red-800" :
												"bg-pink-100 text-pink-800"
											}`}>
												{donation.category}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{donation.quantity}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm">
											<span className="font-medium text-emerald-600">{donation.value}</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{donation.ngo}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												donation.status === "Completed" ? "bg-green-100 text-green-800" :
												donation.status === "In Transit" ? "bg-blue-100 text-blue-800" :
												"bg-yellow-100 text-yellow-800"
											}`}>
												{donation.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{donation.location}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{donation.date}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<div className="flex space-x-2">
												<button 
													onClick={() => handleViewDonation(donation.id)}
													className="text-blue-600 hover:text-blue-900 transition-colors"
													title="View Details"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
													</svg>
												</button>
												<button 
													onClick={() => handleTrackDonation(donation.id)}
													className="text-green-600 hover:text-green-900 transition-colors"
													title="Track"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
													</svg>
												</button>
												<button 
													onClick={() => handleUpdateStatus(donation.id, 'Completed')}
													className="text-emerald-600 hover:text-emerald-900 transition-colors"
													title="Mark Complete"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
													</svg>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Mobile Card View */}
					<div className="lg:hidden p-4">
						{filteredDonations.map((donation) => (
							<div key={donation.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
								<div className="flex items-start justify-between mb-3">
									<div className="flex items-center">
										<input
											type="checkbox"
											checked={selectedDonations.includes(donation.id)}
											onChange={() => handleSelectDonation(donation.id)}
											className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mr-3"
										/>
										<div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
											{donation.donor.charAt(0)}
										</div>
									</div>
									<div className="flex space-x-2">
										<button 
											onClick={() => handleViewDonation(donation.id)}
											className="text-blue-600 hover:text-blue-900 transition-colors p-1"
											title="View Details"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
											</svg>
										</button>
										<button 
											onClick={() => handleTrackDonation(donation.id)}
											className="text-green-600 hover:text-green-900 transition-colors p-1"
											title="Track"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
											</svg>
										</button>
										<button 
											onClick={() => handleUpdateStatus(donation.id, 'Completed')}
											className="text-emerald-600 hover:text-emerald-900 transition-colors p-1"
											title="Mark Complete"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
											</svg>
										</button>
									</div>
								</div>
								
								<div className="ml-15">
									<h3 className="font-semibold text-gray-900 text-sm mb-1">{donation.donor}</h3>
									<p className="text-gray-600 text-sm mb-2">{donation.items} • {donation.quantity}</p>
									
									<div className="flex flex-wrap gap-2 mb-3">
										<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
											donation.category === "Food" ? "bg-yellow-100 text-yellow-800" :
											donation.category === "Clothing" ? "bg-purple-100 text-purple-800" :
											donation.category === "Education" ? "bg-green-100 text-green-800" :
											donation.category === "Medical" ? "bg-red-100 text-red-800" :
											"bg-pink-100 text-pink-800"
										}`}>
											{donation.category}
										</span>
										<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
											donation.status === "Completed" ? "bg-green-100 text-green-800" :
											donation.status === "In Transit" ? "bg-blue-100 text-blue-800" :
											"bg-yellow-100 text-yellow-800"
										}`}>
											{donation.status}
										</span>
									</div>
									
									<div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
										<div>
											<span className="font-medium">Value:</span>
											<div className="text-emerald-600 font-semibold">{donation.value}</div>
										</div>
										<div>
											<span className="font-medium">NGO:</span>
											<div>{donation.ngo}</div>
										</div>
										<div>
											<span className="font-medium">Location:</span>
											<div>{donation.location}</div>
										</div>
										<div>
											<span className="font-medium">Date:</span>
											<div>{donation.date}</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{filteredDonations.length === 0 && (
						<div className="text-center py-12">
							<svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
							</svg>
							<p className="text-gray-500 text-sm sm:text-lg">No donations found matching your criteria</p>
						</div>
					)}
				</div>

				{/* Quick Actions Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4">🚚 Track Donations</h3>
						<p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Monitor real-time donation delivery status</p>
						<button 
							onClick={handleTrackAll}
							className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-3 py-2 sm:px-4 sm:py-2 w-full transition-colors text-sm sm:text-base"
						>
							Track All
						</button>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4">📱 Send Notifications</h3>
						<p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">Notify donors and NGOs about updates</p>
						<button 
							onClick={handleSendNotifications}
							className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg px-3 py-2 sm:px-4 sm:py-2 w-full transition-colors text-sm sm:text-base"
						>
							Send Updates
						</button>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
						<h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-4">📊 Analytics</h3>
						<p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">View detailed donation analytics</p>
						<button 
							onClick={handleViewAnalytics}
							className="bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg px-3 py-2 sm:px-4 sm:py-2 w-full transition-colors text-sm sm:text-base"
						>
							View Analytics
						</button>
					</div>
				</div>
			</main>

			<footer className="w-full flex-shrink-0 bg-cyan-900 bg-opacity-80 mt-auto">
				<div className="text-center text-cyan-100 text-xs sm:text-sm py-3 sm:py-4 px-4">
					© {new Date().getFullYear()} SmartDonum Admin Panel. All rights reserved.
				</div>
			</footer>

			{/* Track All Modal */}
			{showTrackModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800">📊 Donation Tracking Overview</h2>
							<button 
								onClick={() => setShowTrackModal(false)}
								className="text-gray-500 hover:text-gray-700 text-2xl"
							>
								×
							</button>
						</div>

						<div className="space-y-6">
							{(() => {
								const totalDonations = filteredDonations.length;
								const completed = filteredDonations.filter(d => d.status === 'Completed').length;
								const inTransit = filteredDonations.filter(d => d.status === 'In Transit').length;
								const pending = filteredDonations.filter(d => d.status === 'Pending').length;

								return (
									<>
										<div className="grid grid-cols-4 gap-4">
											<div className="bg-blue-50 p-4 rounded-lg text-center">
												<div className="text-2xl font-bold text-blue-600">{totalDonations}</div>
												<div className="text-sm text-gray-600">Total Donations</div>
											</div>
											<div className="bg-green-50 p-4 rounded-lg text-center">
												<div className="text-2xl font-bold text-green-600">{completed}</div>
												<div className="text-sm text-gray-600">Completed ({Math.round(completed/totalDonations*100)}%)</div>
											</div>
											<div className="bg-yellow-50 p-4 rounded-lg text-center">
												<div className="text-2xl font-bold text-yellow-600">{inTransit}</div>
												<div className="text-sm text-gray-600">In Transit ({Math.round(inTransit/totalDonations*100)}%)</div>
											</div>
											<div className="bg-red-50 p-4 rounded-lg text-center">
												<div className="text-2xl font-bold text-red-600">{pending}</div>
												<div className="text-sm text-gray-600">Pending ({Math.round(pending/totalDonations*100)}%)</div>
											</div>
										</div>

										<div className="bg-gray-50 p-4 rounded-lg">
											<h3 className="font-semibold text-gray-800 mb-3">📍 Recent Activities</h3>
											<div className="space-y-2">
												{filteredDonations.slice(0, 5).map(donation => (
													<div key={donation.id} className="flex justify-between items-center py-2 border-b border-gray-200">
														<span className="text-sm text-gray-700">{donation.donor}: {donation.items}</span>
														<span className={`px-2 py-1 rounded-full text-xs font-medium ${
															donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
															donation.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
															'bg-red-100 text-red-800'
														}`}>
															{donation.status}
														</span>
													</div>
												))}
											</div>
										</div>

										<div className="bg-emerald-50 p-4 rounded-lg">
											<div className="flex items-center">
												<div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
												<span className="text-emerald-800 font-medium">System Status: All tracking systems operational</span>
											</div>
										</div>
									</>
								);
							})()}
						</div>
					</div>
				</div>
			)}

			{/* Send Notifications Modal */}
			{showNotificationModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800">📱 Notification System</h2>
							<button 
								onClick={() => setShowNotificationModal(false)}
								className="text-gray-500 hover:text-gray-700 text-2xl"
							>
								×
							</button>
						</div>

						<div className="space-y-6">
							{(() => {
								const activeUsers = filteredDonations.length;
								const pendingCount = filteredDonations.filter(d => d.status === 'Pending').length;
								const inTransitCount = filteredDonations.filter(d => d.status === 'In Transit').length;
								const completedCount = filteredDonations.filter(d => d.status === 'Completed').length;

								return (
									<>
										<div className="bg-blue-50 p-4 rounded-lg">
											<h3 className="font-semibold text-blue-800 mb-2">🎯 Sending updates to {activeUsers} stakeholders</h3>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="bg-white border border-gray-200 p-4 rounded-lg">
												<h4 className="font-semibold text-gray-800 mb-3">📧 Donor Notifications</h4>
												<div className="space-y-2 text-sm">
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Thank you messages:</span>
														<span className="font-medium text-green-600">{completedCount} sent</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Status updates:</span>
														<span className="font-medium text-blue-600">{inTransitCount} sent</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Pickup reminders:</span>
														<span className="font-medium text-orange-600">{pendingCount} sent</span>
													</div>
												</div>
											</div>

											<div className="bg-white border border-gray-200 p-4 rounded-lg">
												<h4 className="font-semibold text-gray-800 mb-3">🏢 NGO Notifications</h4>
												<div className="space-y-2 text-sm">
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Delivery confirmations:</span>
														<span className="font-medium text-green-600">{completedCount} sent</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Incoming donations:</span>
														<span className="font-medium text-blue-600">{inTransitCount} sent</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Pending requests:</span>
														<span className="font-medium text-orange-600">{pendingCount} sent</span>
													</div>
												</div>
											</div>
										</div>

										<div className="bg-green-50 p-4 rounded-lg">
											<div className="flex items-center justify-between">
												<div>
													<div className="flex items-center">
														<div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
														<span className="text-green-800 font-medium">All notifications queued successfully!</span>
													</div>
													<div className="text-sm text-green-600 mt-1">Delivery rate: 98.5%</div>
												</div>
												<div className="text-right">
													<div className="text-sm text-gray-600">Messages sent today</div>
													<div className="text-2xl font-bold text-green-600">47</div>
												</div>
											</div>
										</div>
									</>
								);
							})()}
						</div>
					</div>
				</div>
			)}

			{/* View Analytics Modal */}
			{showAnalyticsModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
					<div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-bold text-gray-800">📊 Donation Analytics Dashboard</h2>
							<button 
								onClick={() => setShowAnalyticsModal(false)}
								className="text-gray-500 hover:text-gray-700 text-2xl"
							>
								×
							</button>
						</div>

						<div className="space-y-6">
							{(() => {
								const totalValue = filteredDonations.reduce((sum, donation) => 
									sum + parseInt(donation.value.replace('₹', '').replace(',', '')), 0
								);
								
								const categoryStats = {
									Food: filteredDonations.filter(d => d.category === 'Food').length,
									Clothing: filteredDonations.filter(d => d.category === 'Clothing').length,
									Education: filteredDonations.filter(d => d.category === 'Education').length,
									Medical: filteredDonations.filter(d => d.category === 'Medical').length,
									Toys: filteredDonations.filter(d => d.category === 'Toys').length
								};

								const topCategory = Object.entries(categoryStats).reduce((a, b) => a[1] > b[1] ? a : b)[0];
								const avgDonationValue = Math.round(totalValue / filteredDonations.length);

								return (
									<>
										<div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg">
											<h3 className="font-semibold text-gray-800 mb-4">💰 Financial Overview</h3>
											<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
												<div className="text-center">
													<div className="text-3xl font-bold text-emerald-600">₹{totalValue.toLocaleString('en-IN')}</div>
													<div className="text-sm text-gray-600">Total Value</div>
												</div>
												<div className="text-center">
													<div className="text-3xl font-bold text-blue-600">₹{avgDonationValue.toLocaleString('en-IN')}</div>
													<div className="text-sm text-gray-600">Average Donation</div>
												</div>
												<div className="text-center">
													<div className="text-3xl font-bold text-purple-600">+23.5%</div>
													<div className="text-sm text-gray-600">Monthly Growth</div>
												</div>
											</div>
										</div>

										<div className="bg-white border border-gray-200 p-6 rounded-lg">
											<h3 className="font-semibold text-gray-800 mb-4">📈 Category Breakdown</h3>
											<div className="space-y-3">
												{Object.entries(categoryStats).map(([category, count]) => {
													const percentage = Math.round(count/filteredDonations.length*100);
													return (
														<div key={category} className="flex items-center justify-between">
															<span className="text-gray-700">{category}</span>
															<div className="flex items-center space-x-2">
																<div className="w-32 bg-gray-200 rounded-full h-2">
																	<div 
																		className="bg-emerald-500 h-2 rounded-full" 
																		style={{width: `${percentage}%`}}
																	></div>
																</div>
																<span className="text-sm font-medium text-gray-600 w-16">{count} ({percentage}%)</span>
															</div>
														</div>
													);
												})}
											</div>
										</div>

										<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
											<div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg">
												<h4 className="font-semibold text-gray-800 mb-2">🎯 Key Metrics</h4>
												<div className="space-y-2 text-sm">
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Top Category:</span>
														<span className="font-medium text-purple-600">{topCategory}</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Success Rate:</span>
														<span className="font-medium text-green-600">92.3%</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Monthly Target:</span>
														<span className="font-medium text-blue-600">85% achieved</span>
													</div>
												</div>
											</div>

											<div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg">
												<h4 className="font-semibold text-gray-800 mb-2">🚀 Performance Insights</h4>
												<div className="space-y-2 text-sm">
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Response Time:</span>
														<span className="font-medium text-orange-600">4.2 hours avg</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Peak Hours:</span>
														<span className="font-medium text-yellow-600">2-4 PM</span>
													</div>
													<div className="flex justify-between">
														<span className="text-gray-800 font-medium">Most Active:</span>
														<span className="font-medium text-green-600">Weekends</span>
													</div>
												</div>
											</div>
										</div>
									</>
								);
							})()}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}