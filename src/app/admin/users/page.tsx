"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function AdminUsersPage() {
	const [selectedTab, setSelectedTab] = useState("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	const [showAddUserModal, setShowAddUserModal] = useState(false);
	const [newUserData, setNewUserData] = useState({
		name: "",
		email: "",
		type: "Public Donor",
		location: ""
	});

	const mockUsers = [
		{ 
			id: 1, 
			name: "Arjun Sharma", 
			email: "arjun.sharma@example.com", 
			type: "Public Donor", 
			status: "Active", 
			joined: "2023-12-15",
			lastLogin: "2024-01-14",
			donations: 15,
			location: "Mumbai, Maharashtra"
		},
		{ 
			id: 2, 
			name: "TechCorp India Pvt Ltd", 
			email: "contact@techcorp.in", 
			type: "Organization", 
			status: "Active", 
			joined: "2023-11-20",
			lastLogin: "2024-01-13",
			donations: 8,
			location: "Bangalore, Karnataka"
		},
		{ 
			id: 3, 
			name: "Seva Bharti Foundation", 
			email: "info@sevabharti.org", 
			type: "NGO", 
			status: "Pending", 
			joined: "2024-01-10",
			lastLogin: "Never",
			donations: 0,
			location: "Delhi, NCR"
		},
		{ 
			id: 4, 
			name: "Priya Patel", 
			email: "priya.patel@example.com", 
			type: "Public Donor", 
			status: "Inactive", 
			joined: "2023-10-05",
			lastLogin: "2023-12-20",
			donations: 3,
			location: "Ahmedabad, Gujarat"
		},
		{ 
			id: 5, 
			name: "Infosys Foundation", 
			email: "admin@infosysfoundation.org", 
			type: "Organization", 
			status: "Active", 
			joined: "2023-09-12",
			lastLogin: "2024-01-15",
			donations: 12,
			location: "Pune, Maharashtra"
		},
		{ 
			id: 6, 
			name: "Rajesh Kumar", 
			email: "rajesh.kumar@example.com", 
			type: "Public Donor", 
			status: "Active", 
			joined: "2023-08-20",
			lastLogin: "2024-01-12",
			donations: 22,
			location: "Chennai, Tamil Nadu"
		},
		{ 
			id: 7, 
			name: "Ananda Marga Foundation", 
			email: "contact@anandamarga.org", 
			type: "NGO", 
			status: "Active", 
			joined: "2023-07-15",
			lastLogin: "2024-01-10",
			donations: 5,
			location: "Kolkata, West Bengal"
		},
		{ 
			id: 8, 
			name: "Sunita Gupta", 
			email: "sunita.gupta@example.com", 
			type: "Public Donor", 
			status: "Pending", 
			joined: "2024-01-05",
			lastLogin: "Never",
			donations: 0,
			location: "Hyderabad, Telangana"
		},
	];

	// Export Data Functionality - PDF Format
	const exportToPDF = () => {
		// Create a new window for PDF generation
		const printWindow = window.open('', '_blank');
		
		if (!printWindow) {
			alert('Please allow pop-ups to export PDF');
			return;
		}

		const currentDate = new Date().toLocaleDateString('en-IN');
		const totalUsers = filteredUsers.length;
		
		// Generate HTML content for PDF
		const htmlContent = `
			<!DOCTYPE html>
			<html>
			<head>
				<title>SmartDonum - User Management Report</title>
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
						font-size: 24px;
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
						font-size: 12px;
					}
					td { 
						padding: 10px 8px; 
						border-bottom: 1px solid #f3f4f6;
						font-size: 11px;
						color: #1f2937;
					}
					tr:hover { 
						background-color: #f9fafb; 
					}
					.status {
						padding: 4px 8px;
						border-radius: 12px;
						font-size: 10px;
						font-weight: 600;
						text-transform: uppercase;
					}
					.status.active { background: #dcfce7; color: #166534; }
					.status.pending { background: #fef3c7; color: #92400e; }
					.status.inactive { background: #f3f4f6; color: #6b7280; }
					.type-badge {
						padding: 4px 8px;
						border-radius: 12px;
						font-size: 10px;
						font-weight: 600;
					}
					.type-public { background: #dbeafe; color: #1e40af; }
					.type-org { background: #e0e7ff; color: #5b21b6; }
					.type-ngo { background: #d1fae5; color: #065f46; }
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
						.no-print { display: none; }
					}
				</style>
			</head>
			<body>
				<div class="header">
					<h1>SmartDonum User Management Report</h1>
					<p>Generated on ${currentDate}</p>
					<p>Total Users: ${totalUsers}</p>
				</div>
				
				<div class="summary">
					<div class="summary-card">
						<h3>${filteredUsers.filter(u => u.type === 'Public Donor').length}</h3>
						<p>Public Donors</p>
					</div>
					<div class="summary-card">
						<h3>${filteredUsers.filter(u => u.type === 'Organization').length}</h3>
						<p>Organizations</p>
					</div>
					<div class="summary-card">
						<h3>${filteredUsers.filter(u => u.type === 'NGO').length}</h3>
						<p>NGOs</p>
					</div>
					<div class="summary-card">
						<h3>${filteredUsers.filter(u => u.status === 'Active').length}</h3>
						<p>Active Users</p>
					</div>
				</div>
				
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Type</th>
							<th>Status</th>
							<th>Location</th>
							<th>Donations</th>
							<th>Last Login</th>
							<th>Joined</th>
						</tr>
					</thead>
					<tbody>
						${filteredUsers.map(user => `
							<tr>
								<td><strong>${user.name}</strong></td>
								<td>${user.email}</td>
								<td>
									<span class="type-badge ${user.type === 'Public Donor' ? 'type-public' : user.type === 'Organization' ? 'type-org' : 'type-ngo'}">
										${user.type}
									</span>
								</td>
								<td>
									<span class="status ${user.status.toLowerCase()}">
										${user.status}
									</span>
								</td>
								<td>${user.location}</td>
								<td><strong>${user.donations}</strong></td>
								<td>${user.lastLogin}</td>
								<td>${user.joined}</td>
							</tr>
						`).join('')}
					</tbody>
				</table>
				
				<div class="footer">
					<p>&copy; ${new Date().getFullYear()} SmartDonum Admin Panel. All rights reserved.</p>
					<p>This document contains confidential information. Handle with care.</p>
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
	const handleEditUser = (userId: number) => {
		alert(`Edit user with ID: ${userId}`);
		// TODO: Implement edit functionality
	};

	const handleApproveUser = (userId: number) => {
		alert(`Approved user with ID: ${userId}`);
		// TODO: Update user status to Active
	};

	const handleSuspendUser = (userId: number) => {
		alert(`Suspended user with ID: ${userId}`);
		// TODO: Update user status to Inactive
	};

	// Bulk Actions
	const handleSendMessage = () => {
		if (selectedUsers.length === 0) return;
		alert(`Sending message to ${selectedUsers.length} selected users`);
		// TODO: Implement send message functionality
	};

	const handleApproveAll = () => {
		if (selectedUsers.length === 0) return;
		alert(`Approving ${selectedUsers.length} selected users`);
		// TODO: Update all selected users status to Active
	};

	const handleSuspendAll = () => {
		if (selectedUsers.length === 0) return;
		alert(`Suspending ${selectedUsers.length} selected users`);
		// TODO: Update all selected users status to Inactive
	};

	// Add User Functions
	const handleAddUser = () => {
		if (!newUserData.name || !newUserData.email) {
			alert('Please fill in all required fields');
			return;
		}
		alert(`Adding new user: ${newUserData.name}`);
		// TODO: Add user to database
		setShowAddUserModal(false);
		setNewUserData({ name: "", email: "", type: "Public Donor", location: "" });
	};

	const filteredUsers = mockUsers.filter(user => {
		const matchesTab = selectedTab === "all" ? true : 
			selectedTab === "public" ? user.type === "Public Donor" :
			selectedTab === "organization" ? user.type === "Organization" :
			selectedTab === "ngo" ? user.type === "NGO" : true;
		
		const matchesSearch = searchQuery === "" ? true :
			user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.type.toLowerCase().includes(searchQuery.toLowerCase());
			
		return matchesTab && matchesSearch;
	});

	const handleSelectUser = (userId: number) => {
		setSelectedUsers(prev => 
			prev.includes(userId) 
				? prev.filter(id => id !== userId)
				: [...prev, userId]
		);
	};

	const handleSelectAll = () => {
		if (selectedUsers.length === filteredUsers.length) {
			setSelectedUsers([]);
		} else {
			setSelectedUsers(filteredUsers.map(user => user.id));
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
			{/* Navbar */}
			<nav className="w-full flex flex-col sm:flex-row items-center gap-3 sm:justify-between py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4 px-4 sm:px-6">
				<Link href="/admin" className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm sm:text-base">
					← Back to Dashboard
				</Link>
				<span className="bg-emerald-600 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow text-sm sm:text-base">User Management</span>
			</nav>

			<main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
				<h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mt-4 sm:mt-8 mb-2">👥 User Management</h2>
				<p className="text-slate-800 text-center mb-4 sm:mb-8 font-medium text-sm sm:text-base px-2">Manage user accounts, permissions, and verification status</p>

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
									placeholder="Search users..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium placeholder-gray-600 text-sm sm:text-base"
								/>
							</div>
						</div>
						<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
							<button 
								onClick={() => setShowAddUserModal(true)}
								className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
							>
								➕ Add User
							</button>
							<button 
								onClick={exportToPDF}
								className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base"
							>
								📄 Export PDF
							</button>
							{selectedUsers.length > 0 && (
								<button className="bg-slate-500 hover:bg-slate-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base">
									⚡ Bulk Actions ({selectedUsers.length})
								</button>
							)}
						</div>
					</div>
				</div>

				{/* Tab Navigation */}
				<div className="bg-white rounded-lg shadow-md mb-4 sm:mb-6 overflow-hidden">
					<div className="flex flex-col sm:flex-row border-b overflow-x-auto">
						{[
							{ key: "all", label: "All Users", icon: "👥" },
							{ key: "public", label: "Public", icon: "👤" },
							{ key: "organization", label: "Organizations", icon: "🏢" },
							{ key: "ngo", label: "NGOs", icon: "🤝" }
						].map((tab) => (
							<button
								key={tab.key}
								onClick={() => setSelectedTab(tab.key)}
								className={`flex-1 sm:flex-none flex items-center justify-center px-3 py-2 sm:px-6 sm:py-3 font-semibold transition-all text-xs sm:text-sm whitespace-nowrap ${
									selectedTab === tab.key
										? "border-b-2 border-emerald-500 text-emerald-600 bg-emerald-50"
										: "text-gray-600 hover:text-emerald-500 hover:bg-gray-50"
								}`}
							>
								<span className="mr-1 sm:mr-2">{tab.icon}</span>
								<span className="hidden sm:inline">{tab.label}</span>
								<span className="sm:hidden">{tab.label.split(' ')[0]}</span>
								<span className="ml-1 text-xs bg-gray-100 px-1 rounded">
									{tab.key === "all" ? mockUsers.length : mockUsers.filter(u => 
										tab.key === "public" ? u.type === "Public Donor" :
										tab.key === "organization" ? u.type === "Organization" :
										tab.key === "ngo" ? u.type === "NGO" : true
									).length}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Bulk Actions */}
				{selectedUsers.length > 0 && (
					<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
							<div className="flex items-center">
								<svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<span className="text-xs sm:text-sm font-medium text-emerald-800">
									{selectedUsers.length} user{selectedUsers.length === 1 ? '' : 's'} selected
								</span>
							</div>
							<div className="flex flex-wrap gap-2 w-full sm:w-auto">
								<button 
									onClick={handleSendMessage}
									className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									📧 Message
								</button>
								<button 
									onClick={handleApproveAll}
									className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									✅ Approve
								</button>
								<button 
									onClick={handleSuspendAll}
									className="bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									⏸️ Suspend
								</button>
								<button 
									onClick={() => setSelectedUsers([])}
									className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm transition-colors"
								>
									✖️ Clear
								</button>
							</div>
						</div>
					</div>
				)}
				{/* Users List - Desktop Table View */}
				<div className="bg-white rounded-lg shadow-lg overflow-hidden">
					{/* Desktop Table */}
					<div className="hidden lg:block overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left">
										<input
											type="checkbox"
											checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
											onChange={handleSelectAll}
											className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
										/>
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donations</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{filteredUsers.map((user) => (
									<tr key={user.id} className="hover:bg-gray-50">
										<td className="px-6 py-4 whitespace-nowrap">
											<input
												type="checkbox"
												checked={selectedUsers.includes(user.id)}
												onChange={() => handleSelectUser(user.id)}
												className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												<div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
													{user.name.charAt(0)}
												</div>
												<div>
													<div className="text-sm font-medium text-gray-900">{user.name}</div>
													<div className="text-sm text-gray-500">{user.email}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												user.type === "Public Donor" ? "bg-blue-100 text-blue-800" :
												user.type === "Organization" ? "bg-purple-100 text-purple-800" :
												"bg-teal-100 text-teal-800"
											}`}>
												{user.type}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												user.status === "Active" ? "bg-green-100 text-green-800" :
												user.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
												"bg-gray-100 text-gray-800"
											}`}>
												{user.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{user.location}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm">
											<span className="font-medium text-emerald-600">{user.donations}</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
											{user.lastLogin}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
											<div className="flex space-x-2">
												<button 
													onClick={() => handleEditUser(user.id)}
													className="text-blue-600 hover:text-blue-900 transition-colors"
													title="Edit User"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
													</svg>
												</button>
												{user.status === "Pending" && (
													<button 
														onClick={() => handleApproveUser(user.id)}
														className="text-green-600 hover:text-green-900 transition-colors"
														title="Approve User"
													>
														<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
														</svg>
													</button>
												)}
												<button 
													onClick={() => handleSuspendUser(user.id)}
													className="text-amber-600 hover:text-amber-900 transition-colors"
													title="Suspend User"
												>
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 12M6 6l12 12" />
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
						{filteredUsers.map((user) => (
							<div key={user.id} className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
								<div className="flex items-start justify-between mb-3">
									<div className="flex items-center">
										<input
											type="checkbox"
											checked={selectedUsers.includes(user.id)}
											onChange={() => handleSelectUser(user.id)}
											className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mr-3"
										/>
										<div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
											{user.name.charAt(0)}
										</div>
									</div>
									<div className="flex space-x-2">
										<button 
											onClick={() => handleEditUser(user.id)}
											className="text-blue-600 hover:text-blue-900 transition-colors p-1"
											title="Edit User"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
											</svg>
										</button>
										{user.status === "Pending" && (
											<button 
												onClick={() => handleApproveUser(user.id)}
												className="text-green-600 hover:text-green-900 transition-colors p-1"
												title="Approve User"
											>
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
												</svg>
											</button>
										)}
										<button 
											onClick={() => handleSuspendUser(user.id)}
											className="text-amber-600 hover:text-amber-900 transition-colors p-1"
											title="Suspend User"
										>
											<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 12M6 6l12 12" />
											</svg>
										</button>
									</div>
								</div>
								
								<div className="ml-15">
									<h3 className="font-semibold text-gray-900 text-sm mb-1">{user.name}</h3>
									<p className="text-gray-600 text-sm mb-2">{user.email}</p>
									
									<div className="flex flex-wrap gap-2 mb-3">
										<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
											user.type === "Public Donor" ? "bg-blue-100 text-blue-800" :
											user.type === "Organization" ? "bg-purple-100 text-purple-800" :
											"bg-teal-100 text-teal-800"
										}`}>
											{user.type}
										</span>
										<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
											user.status === "Active" ? "bg-green-100 text-green-800" :
											user.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
											"bg-gray-100 text-gray-800"
										}`}>
											{user.status}
										</span>
									</div>
									
									<div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
										<div>
											<span className="font-medium">Location:</span>
											<div>{user.location}</div>
										</div>
										<div>
											<span className="font-medium">Donations:</span>
											<div className="text-emerald-600 font-semibold">{user.donations}</div>
										</div>
										<div>
											<span className="font-medium">Last Login:</span>
											<div>{user.lastLogin}</div>
										</div>
										<div>
											<span className="font-medium">Joined:</span>
											<div>{user.joined}</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{filteredUsers.length === 0 && (
						<div className="text-center py-12">
							<svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
							<p className="text-gray-500 text-sm sm:text-lg">No users found matching your criteria</p>
						</div>
					)}
				</div>

				{/* User Statistics */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-8 mb-6 sm:mb-8">
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
						<h3 className="text-xl sm:text-2xl font-bold text-blue-600">156</h3>
						<p className="text-gray-600 text-sm sm:text-base">Public Donors</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center">
						<h3 className="text-xl sm:text-2xl font-bold text-green-600">47</h3>
						<p className="text-gray-600 text-sm sm:text-base">Organizations</p>
					</div>
					<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
						<h3 className="text-xl sm:text-2xl font-bold text-purple-600">42</h3>
						<p className="text-gray-600 text-sm sm:text-base">NGOs</p>
					</div>
				</div>
			</main>

			<footer className="w-full flex-shrink-0 bg-cyan-900 bg-opacity-80 mt-auto">
				<div className="text-center text-cyan-100 text-xs sm:text-sm py-3 sm:py-4 px-4">
					© {new Date().getFullYear()} SmartDonum Admin Panel. All rights reserved.
				</div>
			</footer>

			{/* Add User Modal */}
			{showAddUserModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md mx-auto">
						<div className="flex justify-between items-center mb-4 sm:mb-6">
							<h2 className="text-lg sm:text-xl font-bold text-gray-900">Add New User</h2>
							<button 
								onClick={() => setShowAddUserModal(false)}
								className="text-gray-400 hover:text-gray-600 p-1"
							>
								<svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						
						<form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>
							<div className="space-y-3 sm:space-y-4">
								<div>
									<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
										Full Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										required
										value={newUserData.name}
										onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium placeholder-gray-600 text-sm sm:text-base"
										placeholder="Enter full name"
									/>
								</div>
								
								<div>
									<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
										Email Address <span className="text-red-500">*</span>
									</label>
									<input
										type="email"
										required
										value={newUserData.email}
										onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium placeholder-gray-600 text-sm sm:text-base"
										placeholder="Enter email address"
									/>
								</div>
								
								<div>
									<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
										User Type
									</label>
									<select
										value={newUserData.type}
										onChange={(e) => setNewUserData(prev => ({ ...prev, type: e.target.value }))}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium text-sm sm:text-base"
									>
										<option value="Public Donor">Public Donor</option>
										<option value="Organization">Organization</option>
										<option value="NGO">NGO</option>
									</select>
								</div>
								
								<div>
									<label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
										Location
									</label>
									<input
										type="text"
										value={newUserData.location}
										onChange={(e) => setNewUserData(prev => ({ ...prev, location: e.target.value }))}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900 font-medium placeholder-gray-600 text-sm sm:text-base"
										placeholder="Enter location (City, State)"
									/>
								</div>
							</div>
							
							<div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
								<button
									type="button"
									onClick={() => setShowAddUserModal(false)}
									className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
								>
									Add User
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}