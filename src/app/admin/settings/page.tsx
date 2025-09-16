"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function AdminSettingsPage() {
	const [activeSection, setActiveSection] = useState("general");

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
			{/* Navbar */}
			<nav className="w-full flex items-center justify-between py-3 sm:py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4 px-4 sm:px-6">
				<Link href="/admin" className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm sm:text-base">
					← Back to Dashboard
				</Link>
				<span className="bg-emerald-600 text-white font-bold px-3 sm:px-4 py-2 rounded-lg shadow text-sm sm:text-base">System Settings</span>
			</nav>

			<main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
				<h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mt-6 sm:mt-8 mb-2">System Settings</h2>
				<p className="text-gray-700 text-center mb-6 sm:mb-8 text-sm sm:text-base px-4">Configure system parameters, security settings, and maintenance</p>

				<div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
					{/* Settings Navigation */}
					<div className="lg:w-1/4">
						<div className="bg-white rounded-lg shadow-lg p-3 sm:p-4">
							<h3 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">⚙️ Settings Categories</h3>
							<nav className="space-y-1 sm:space-y-2">
								{[
									{ id: "general", label: "General Settings", icon: "⚙️" },
									{ id: "security", label: "Security", icon: "🔒" },
									{ id: "email", label: "Email Settings", icon: "📧" },
									{ id: "maintenance", label: "Maintenance", icon: "🔧" },
									{ id: "backup", label: "Backup & Recovery", icon: "💾" },
									{ id: "logs", label: "System Logs", icon: "📊" },
								].map((item) => (
									<button
										key={item.id}
										onClick={() => setActiveSection(item.id)}
										className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base ${
											activeSection === item.id
												? "bg-emerald-100 text-emerald-800 border-l-3 sm:border-l-4 border-emerald-600"
												: "text-gray-600 hover:bg-gray-50"
										}`}
									>
										<span className="text-base sm:text-lg">{item.icon}</span>
										<span className="text-xs sm:text-sm md:text-base">{item.label}</span>
									</button>
								))}
							</nav>
						</div>
					</div>

					{/* Settings Content */}
					<div className="lg:w-3/4">
						<div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
							{/* General Settings */}
							{activeSection === "general" && (
								<div>
									<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">⚙️ General Settings</h3>
									<div className="space-y-4 sm:space-y-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
											<input
												type="text"
												defaultValue="SmartDonum"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
											<textarea
												defaultValue="Smart donation platform connecting donors with NGOs"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
												rows={3}
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
											<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base">
												<option>UTC</option>
												<option>EST</option>
												<option>PST</option>
												<option>IST</option>
											</select>
										</div>
										<div className="flex items-center">
											<input type="checkbox" id="maintenance-mode" className="mr-2 text-emerald-600 focus:ring-emerald-500" />
											<label htmlFor="maintenance-mode" className="text-sm text-gray-700">Enable Maintenance Mode</label>
										</div>
										<div className="pt-4">
											<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base w-full sm:w-auto">
												Save General Settings
											</button>
										</div>
									</div>
								</div>
							)}

							{/* Security Settings */}
							{activeSection === "security" && (
								<div>
									<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">🔒 Security Settings</h3>
									<div className="space-y-4 sm:space-y-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
											<div className="space-y-2">
												<div className="flex items-center">
													<input type="checkbox" id="min-length" className="mr-2 text-emerald-600 focus:ring-emerald-500" defaultChecked />
													<label htmlFor="min-length" className="text-sm text-gray-700">Minimum 8 characters</label>
												</div>
												<div className="flex items-center">
													<input type="checkbox" id="special-chars" className="mr-2 text-emerald-600 focus:ring-emerald-500" defaultChecked />
													<label htmlFor="special-chars" className="text-sm text-gray-700">Require special characters</label>
												</div>
												<div className="flex items-center">
													<input type="checkbox" id="uppercase" className="mr-2 text-emerald-600 focus:ring-emerald-500" defaultChecked />
													<label htmlFor="uppercase" className="text-sm text-gray-700">Require uppercase letters</label>
												</div>
											</div>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
											<input
												type="number"
												defaultValue="30"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
											/>
										</div>
										<div className="flex items-center">
											<input type="checkbox" id="two-factor" className="mr-2 text-emerald-600 focus:ring-emerald-500" />
											<label htmlFor="two-factor" className="text-sm text-gray-700">Enable Two-Factor Authentication</label>
										</div>
										<div className="pt-4">
											<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base w-full sm:w-auto">
												Save Security Settings
											</button>
										</div>
									</div>
								</div>
							)}

							{/* Email Settings */}
							{activeSection === "email" && (
								<div>
									<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">📧 Email Settings</h3>
									<div className="space-y-4 sm:space-y-6">
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
											<input
												type="text"
												placeholder="smtp.gmail.com"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
											<input
												type="number"
												defaultValue="587"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">From Email Address</label>
											<input
												type="email"
												placeholder="noreply@smartdonum.com"
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
											/>
										</div>
										<div className="flex items-center">
											<input type="checkbox" id="email-notifications" className="mr-2 text-emerald-600 focus:ring-emerald-500" defaultChecked />
											<label htmlFor="email-notifications" className="text-sm text-gray-700">Enable email notifications</label>
										</div>
										<div className="pt-4">
											<button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg px-4 sm:px-6 py-2 text-sm sm:text-base w-full sm:w-auto">
												Save Email Settings
											</button>
										</div>
									</div>
								</div>
							)}

							{/* Maintenance */}
							{activeSection === "maintenance" && (
								<div>
									<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">🔧 System Maintenance</h3>
									<div className="space-y-4 sm:space-y-6">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
											<div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
												<h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Database Cleanup</h4>
												<p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Remove old logs and temporary data</p>
												<button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
													Run Cleanup
												</button>
											</div>
											<div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
												<h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Cache Clear</h4>
												<p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Clear system cache and temporary files</p>
												<button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm w-full sm:w-auto">
													Clear Cache
												</button>
											</div>
										</div>
										<div>
											<h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">System Status</h4>
											<div className="space-y-2">
												<div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
													<span className="text-xs sm:text-sm">Database Connection</span>
													<span className="text-green-600 font-semibold text-xs sm:text-sm">✓ Healthy</span>
												</div>
												<div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
													<span className="text-xs sm:text-sm">Email Service</span>
													<span className="text-green-600 font-semibold text-xs sm:text-sm">✓ Operational</span>
												</div>
												<div className="flex justify-between items-center p-2 sm:p-3 bg-green-50 rounded-lg">
													<span className="text-xs sm:text-sm">File Storage</span>
													<span className="text-green-600 font-semibold text-xs sm:text-sm">✓ Available</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* Backup Settings */}
							{activeSection === "backup" && (
								<div>
									<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">💾 Backup & Recovery</h3>
									<div className="space-y-4 sm:space-y-6">
										<div>
											<h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Automatic Backup</h4>
											<div className="space-y-3 sm:space-y-4">
												<div className="flex items-center">
													<input type="checkbox" id="auto-backup" className="mr-2 text-emerald-600 focus:ring-emerald-500" defaultChecked />
													<label htmlFor="auto-backup" className="text-sm text-gray-700">Enable automatic backup</label>
												</div>
												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
													<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base">
														<option>Daily</option>
														<option>Weekly</option>
														<option>Monthly</option>
													</select>
												</div>
											</div>
										</div>
										<div>
											<h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Manual Backup</h4>
											<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
												<button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
													Create Backup
												</button>
												<button className="bg-gray-500 hover:bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
													Download Backup
												</button>
											</div>
										</div>
										<div>
											<h4 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Recent Backups</h4>
											<div className="space-y-2">
												<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 bg-gray-50 rounded-lg space-y-1 sm:space-y-0">
													<span className="text-xs sm:text-sm font-medium">backup_2024-01-15.sql</span>
													<span className="text-gray-500 text-xs sm:text-sm">15 Jan 2024, 02:00 AM</span>
												</div>
												<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-3 bg-gray-50 rounded-lg space-y-1 sm:space-y-0">
													<span className="text-xs sm:text-sm font-medium">backup_2024-01-14.sql</span>
													<span className="text-gray-500 text-xs sm:text-sm">14 Jan 2024, 02:00 AM</span>
												</div>
											</div>
										</div>
									</div>
								</div>
							)}

							{/* System Logs */}
							{activeSection === "logs" && (
								<div>
									<h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">📊 System Logs</h3>
									<div className="space-y-4 sm:space-y-6">
										<div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-4">
											<button className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
												Application Logs
											</button>
											<button className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
												Error Logs
											</button>
											<button className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
												Access Logs
											</button>
										</div>
										<div className="bg-gray-900 text-green-400 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm h-48 sm:h-64 overflow-y-auto">
											<div>[2024-01-15 10:30:42] INFO: User login successful - user@example.com</div>
											<div>[2024-01-15 10:29:15] INFO: Donation created - ID: 1234</div>
											<div>[2024-01-15 10:25:33] WARNING: Failed login attempt - suspicious@email.com</div>
											<div>[2024-01-15 10:20:18] INFO: NGO registration approved - Hope Foundation</div>
											<div>[2024-01-15 10:15:45] ERROR: Database connection timeout - retrying...</div>
											<div>[2024-01-15 10:15:48] INFO: Database connection restored</div>
											<div>[2024-01-15 10:10:22] INFO: Backup completed successfully</div>
											<div>[2024-01-15 10:05:11] INFO: System maintenance started</div>
										</div>
									</div>
								</div>
							)}

							{/* Save Button */}
							<div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
								<div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
									<button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base">
										Cancel
									</button>
									<button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base">
										Save Changes
									</button>
								</div>
							</div>
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