"use client";

import Link from "next/link";
import React, { useState } from "react";

interface NGO {
  id: number;
  name: string;
  email: string;
  focus: string;
  status: string;
  registered: string;
  donations: number;
  rating: number;
  location: string;
  contact: string;
  category: string;
  totalImpact: number;
  lastActivity: string;
}

export default function AdminNGOsPage() {
const [selectedFilter, setSelectedFilter] = useState("all");
const [searchQuery, setSearchQuery] = useState("");
const [selectedNGOs, setSelectedNGOs] = useState<number[]>([]);
const [showVerificationModal, setShowVerificationModal] = useState(false);
const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
const [showTrackModal, setShowTrackModal] = useState(false);
const [showNotificationModal, setShowNotificationModal] = useState(false);
const [showDetailModal, setShowDetailModal] = useState(false);
const [selectedNGO, setSelectedNGO] = useState<NGO | null>(null);

const mockNGOs = [
{ 
id: 1, 
name: "Seva Bharti Foundation", 
email: "contact@sevabharti.org", 
focus: "Food Distribution", 
status: "Active", 
registered: "2023-08-15",
donations: 45,
rating: 4.8,
location: "Mumbai, Maharashtra",
contact: "+91 98765 43210",
category: "Food",
totalImpact: 2500,
lastActivity: "2024-01-12"
},
{ 
id: 2, 
name: "Ananda Marga Foundation", 
email: "info@anandamarga.org", 
focus: "Education & Books", 
status: "Active", 
registered: "2023-05-20",
donations: 32,
rating: 4.6,
location: "Delhi, NCR",
contact: "+91 87654 32109",
category: "Education",
totalImpact: 1800,
lastActivity: "2024-01-10"
},
{ 
id: 3, 
name: "Goonj Organization", 
email: "support@goonj.org", 
focus: "Clothing & Shelter", 
status: "Pending", 
registered: "2024-01-10",
donations: 18,
rating: 4.2,
location: "Bangalore, Karnataka",
contact: "+91 76543 21098",
category: "Clothing",
totalImpact: 900,
lastActivity: "2024-01-08"
}
];

// Filter NGOs based on search and filter criteria
const filteredNGOs = mockNGOs.filter(ngo => {
const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
ngo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
ngo.location.toLowerCase().includes(searchQuery.toLowerCase());

const matchesFilter = selectedFilter === 'all' || 
ngo.status.toLowerCase() === selectedFilter.toLowerCase();

return matchesSearch && matchesFilter;
});

// Track NGO performance
const handleTrackNGO = (ngoId: number) => {
const ngo = mockNGOs.find(n => n.id === ngoId);
setSelectedNGO(ngo || null);
setShowTrackModal(true);
};

// Send notification to NGO
const handleNotifyNGO = () => {
setShowNotificationModal(true);
};

// Export NGO data to PDF
const exportToPDF = () => {
const printWindow = window.open('', '_blank');
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<title>NGO Management Report</title>
<style>
body { font-family: Arial, sans-serif; margin: 20px; }
h1 { color: #059669; text-align: center; margin-bottom: 30px; }
.header-info { text-align: center; margin-bottom: 30px; color: #6b7280; }
table { width: 100%; border-collapse: collapse; margin-top: 20px; }
th, td { border: 1px solid #d1d5db; padding: 12px; text-align: left; }
th { background-color: #f9fafb; font-weight: bold; }
.status-active { background-color: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; font-size: 12px; }
.status-pending { background-color: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 12px; font-size: 12px; }
.rating { color: #d97706; }
.footer { margin-top: 30px; text-align: center; color: #6b7280; font-size: 12px; }
</style>
</head>
<body>
<h1> NGO Management Report</h1>
<div class="header-info">
<p>Generated on: ${new Date().toLocaleDateString()}</p>
<p>Total NGOs: ${mockNGOs.length}</p>
<p>Active NGOs: ${mockNGOs.filter(n => n.status === 'Active').length} | Pending: ${mockNGOs.filter(n => n.status === 'Pending').length}</p>
<p>Total Impact: ${mockNGOs.reduce((sum, ngo) => sum + ngo.totalImpact, 0)} lives</p>
</div>
<table>
<thead>
<tr>
<th>NGO Name</th>
<th>Email</th>
<th>Focus Area</th>
<th>Status</th>
<th>Location</th>
<th>Donations</th>
<th>Rating</th>
<th>Impact</th>
<th>Last Activity</th>
</tr>
</thead>
<tbody>
${mockNGOs.map(ngo => `
<tr>
<td>${ngo.name}</td>
<td>${ngo.email}</td>
<td>${ngo.focus}</td>
<td><span class="status-${ngo.status.toLowerCase()}">${ngo.status}</span></td>
<td>${ngo.location}</td>
<td>${ngo.donations}</td>
<td class="rating"> ${ngo.rating}</td>
<td>${ngo.totalImpact}</td>
<td>${ngo.lastActivity}</td>
</tr>
`).join('')}
</tbody>
</table>
<div class="footer">
<p> 2025 SmartDonum Admin Panel - NGO Management Report</p>
</div>
</body>
</html>
`;

printWindow?.document.write(htmlContent);
printWindow?.document.close();
setTimeout(() => {
printWindow?.print();
}, 500);
};

return (
<div className="min-h-screen flex flex-col bg-gradient-to-b from-[#b3e0ff] to-[#e0f7fa] px-2 sm:px-4">
<nav className="w-full flex flex-col sm:flex-row items-center gap-3 sm:justify-between py-4 bg-white bg-opacity-80 shadow-md rounded-b-2xl mb-4 px-4 sm:px-6">
<Link href="/admin" className="text-emerald-600 hover:text-emerald-800 font-semibold text-sm sm:text-base">
 Back to Dashboard
</Link>
<span className="bg-emerald-600 text-white font-bold px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow text-sm sm:text-base">NGO Management</span>
</nav>

<main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4">
<h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 text-center mt-4 sm:mt-8 mb-2">🏢 NGO Management</h2>
<p className="text-slate-800 text-center mb-4 sm:mb-8 font-medium text-sm sm:text-base px-2">Manage partner NGOs, verify credentials, and monitor their activities</p>

{/* Search and Filter Controls */}
<div className="bg-white rounded-lg shadow-lg p-3 sm:p-6 mb-4 sm:mb-6">
<div className="flex flex-col gap-3 sm:gap-4 mb-4">
<div className="flex-1">
<input
type="text"
placeholder="Search NGOs..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
/>
</div>
<div className="flex flex-wrap gap-2">
<button
onClick={() => setShowAnalyticsModal(true)}
className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
>
📊 Analytics
</button>
<button
onClick={handleNotifyNGO}
className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
>
 Notify
</button>
<button 
onClick={exportToPDF}
className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm"
>
 Export
</button>
</div>
</div>

{/* Filter Tabs */}
<div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
{['all', 'active', 'pending', 'suspended'].map((filter) => (
<button
key={filter}
onClick={() => setSelectedFilter(filter)}
className={`px-2 py-1 sm:px-4 sm:py-2 rounded-lg font-medium capitalize transition-colors text-xs sm:text-sm ${
selectedFilter === filter
? 'bg-emerald-600 text-white'
: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
}`}
>
{filter === 'all' ? `All (${filteredNGOs.length})` : filter}
{filter !== 'all' && (
<span className="hidden sm:inline">
{filter === 'active' && ` (${filteredNGOs.filter(n => n.status === 'Active').length})`}
{filter === 'pending' && ` (${filteredNGOs.filter(n => n.status === 'Pending').length})`}
</span>
)}
</button>
))}
</div>

{/* Bulk Actions */}
{selectedNGOs.length > 0 && (
<div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
<span className="text-blue-800 font-medium">{selectedNGOs.length} NGO(s) selected</span>
<div className="flex gap-2">
<button 
onClick={() => {
selectedNGOs.forEach(id => handleTrackNGO(id));
}}
className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
>
 Track All
</button>
<button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
 Verify All
</button>
<button 
onClick={handleNotifyNGO}
className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
>
� Notify All
</button>
<button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm">
 Suspend All
</button>
</div>
</div>
)}
</div>

<div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
<div className="overflow-x-auto">
<table className="w-full">
<thead className="bg-gray-50">
<tr>
<th className="px-6 py-3 text-left">
<input
type="checkbox"
checked={selectedNGOs.length === filteredNGOs.length && filteredNGOs.length > 0}
onChange={(e) => {
if (e.target.checked) {
setSelectedNGOs(filteredNGOs.map(n => n.id));
} else {
setSelectedNGOs([]);
}
}}
className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
/>
</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NGO Details</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Focus Area</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
{filteredNGOs.map((ngo) => (
<tr key={ngo.id} className="hover:bg-gray-50">
<td className="px-6 py-4 whitespace-nowrap">
<input
type="checkbox"
checked={selectedNGOs.includes(ngo.id)}
onChange={(e) => {
if (e.target.checked) {
setSelectedNGOs([...selectedNGOs, ngo.id]);
} else {
setSelectedNGOs(selectedNGOs.filter(id => id !== ngo.id));
}
}}
className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
/>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<div className="flex items-center">
<div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
{ngo.name.charAt(0)}
</div>
<div>
<div className="text-sm font-medium text-gray-900">{ngo.name}</div>
<div className="text-sm text-gray-700">{ngo.email}</div>
</div>
</div>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
ngo.category === "Food" ? "bg-yellow-100 text-yellow-800" :
ngo.category === "Education" ? "bg-green-100 text-green-800" :
"bg-purple-100 text-purple-800"
}`}>
{ngo.focus}
</span>
</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
ngo.status === "Active" ? "bg-green-100 text-green-800" :
"bg-yellow-100 text-yellow-800"
}`}>
{ngo.status}
</span>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
{ngo.location}
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm">
<div>
<div className="text-sm text-gray-900">Donations: {ngo.donations}</div>
<div className="text-sm text-yellow-600">⭐ {ngo.rating}</div>
<div className="text-sm text-blue-600">Impact: {ngo.totalImpact}</div>
</div>
</td>
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
<div className="flex space-x-2">
<button 
onClick={() => {
setSelectedNGO(ngo || null);
setShowDetailModal(true);
}}
className="text-blue-600 hover:text-blue-900 transition-colors"
>
View
</button>
<button 
onClick={() => handleTrackNGO(ngo.id)}
className="text-purple-600 hover:text-purple-900 transition-colors"
>
Track
</button>
<button 
onClick={() => {
setSelectedNGO(ngo || null);
setShowVerificationModal(true);
}}
className="text-emerald-600 hover:text-emerald-900 transition-colors"
>
Verify
</button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</div>
</main>

<footer className="w-full flex-shrink-0 bg-cyan-900 bg-opacity-80 mt-auto">
<div className="text-center text-cyan-100 text-sm py-4">
© 2025 SmartDonum Admin Panel. All rights reserved.
</div>
</footer>

{/* Track Modal */}
{showTrackModal && selectedNGO && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-bold text-gray-900"> Track NGO: {selectedNGO.name}</h3>
<button 
onClick={() => setShowTrackModal(false)}
className="text-gray-400 hover:text-gray-600"
>
✕
</button>
</div>
<div className="space-y-4">
<div className="grid grid-cols-2 gap-4">
<div className="bg-blue-50 p-4 rounded-lg">
<h4 className="text-sm text-blue-600 font-medium">Total Donations</h4>
<p className="text-2xl font-bold text-blue-900">{selectedNGO.donations}</p>
</div>
<div className="bg-green-50 p-4 rounded-lg">
<h4 className="text-sm text-green-600 font-medium">Lives Impacted</h4>
<p className="text-2xl font-bold text-green-900">{selectedNGO.totalImpact}</p>
</div>
</div>
<div>
<h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
<div className="space-y-2 text-sm">
<div className="flex justify-between items-center p-2 bg-gray-50 rounded">
<span>Last donation received</span>
<span className="text-gray-600">{selectedNGO.lastActivity}</span>
</div>
<div className="flex justify-between items-center p-2 bg-gray-50 rounded">
<span>Profile last updated</span>
<span className="text-gray-600">2024-01-05</span>
</div>
<div className="flex justify-between items-center p-2 bg-gray-50 rounded">
<span>Verification status</span>
<span className={`px-2 py-1 rounded-full text-xs ${
selectedNGO.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
}`}>{selectedNGO.status}</span>
</div>
</div>
</div>
</div>
<div className="flex justify-end pt-4">
<button 
onClick={() => setShowTrackModal(false)}
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
Close
</button>
</div>
</div>
</div>
)}

{/* Notification Modal */}
{showNotificationModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-2xl">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-bold text-gray-900">📧 Send Notification</h3>
<button 
onClick={() => setShowNotificationModal(false)}
className="text-gray-400 hover:text-gray-600"
>

</button>
</div>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
<select className="w-full p-2 border border-gray-300 rounded-lg">
<option value="all">All NGOs</option>
<option value="active">Active NGOs only</option>
<option value="pending">Pending NGOs only</option>
<option value="selected">Selected NGOs</option>
</select>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
<input 
type="text" 
placeholder="Enter notification subject"
className="w-full p-2 border border-gray-300 rounded-lg"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
<textarea 
rows={4}
placeholder="Enter your message..."
className="w-full p-2 border border-gray-300 rounded-lg"
></textarea>
</div>
</div>
<div className="flex justify-end gap-2 pt-4">
<button 
onClick={() => setShowNotificationModal(false)}
className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
>
Cancel
</button>
<button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
Send Notification
</button>
</div>
</div>
</div>
)}

{/* Analytics Modal */}
{showAnalyticsModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-bold text-gray-900">📊 NGO Analytics Dashboard</h3>
<button 
onClick={() => setShowAnalyticsModal(false)}
className="text-gray-400 hover:text-gray-600"
>

</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
<div className="bg-blue-50 p-4 rounded-lg">
<h4 className="text-sm text-blue-600 font-medium">Total NGOs</h4>
<p className="text-2xl font-bold text-blue-900">{mockNGOs.length}</p>
</div>
<div className="bg-green-50 p-4 rounded-lg">
<h4 className="text-sm text-green-600 font-medium">Active NGOs</h4>
<p className="text-2xl font-bold text-green-900">{mockNGOs.filter(n => n.status === 'Active').length}</p>
</div>
<div className="bg-yellow-50 p-4 rounded-lg">
<h4 className="text-sm text-yellow-600 font-medium">Pending Verification</h4>
<p className="text-2xl font-bold text-yellow-900">{mockNGOs.filter(n => n.status === 'Pending').length}</p>
</div>
<div className="bg-purple-50 p-4 rounded-lg">
<h4 className="text-sm text-purple-600 font-medium">Total Impact</h4>
<p className="text-2xl font-bold text-purple-900">{mockNGOs.reduce((sum, ngo) => sum + ngo.totalImpact, 0)}</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="border rounded-lg p-4">
<h4 className="font-medium text-gray-900 mb-2">Top Performing NGOs</h4>
<div className="space-y-2">
{mockNGOs
.sort((a, b) => b.donations - a.donations)
.slice(0, 3)
.map((ngo, idx) => (
<div key={ngo.id} className="flex justify-between items-center">
<span className="text-sm">{idx + 1}. {ngo.name}</span>
<span className="text-sm font-medium">{ngo.donations} donations</span>
</div>
))}
</div>
</div>
<div className="border rounded-lg p-4">
<h4 className="font-medium text-gray-900 mb-2">Categories Distribution</h4>
<div className="space-y-2">
<div className="flex justify-between items-center">
<span className="text-sm">Food Distribution</span>
<span className="text-sm font-medium">{mockNGOs.filter(n => n.category === 'Food').length} NGOs</span>
</div>
<div className="flex justify-between items-center">
<span className="text-sm">Education</span>
<span className="text-sm font-medium">{mockNGOs.filter(n => n.category === 'Education').length} NGOs</span>
</div>
<div className="flex justify-between items-center">
<span className="text-sm">Clothing & Shelter</span>
<span className="text-sm font-medium">{mockNGOs.filter(n => n.category === 'Clothing').length} NGOs</span>
</div>
</div>
</div>
</div>
<div className="flex justify-end pt-4">
<button 
onClick={() => setShowAnalyticsModal(false)}
className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
Close
</button>
</div>
</div>
</div>
)}

{/* Detail Modal */}
{showDetailModal && selectedNGO && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-bold text-gray-900">NGO Details: {selectedNGO.name}</h3>
<button 
onClick={() => setShowDetailModal(false)}
className="text-gray-400 hover:text-gray-600"
>

</button>
</div>
<div className="space-y-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
<div className="space-y-2 text-sm">
<div><span className="text-gray-600">Name:</span> {selectedNGO.name}</div>
<div><span className="text-gray-600">Email:</span> {selectedNGO.email}</div>
<div><span className="text-gray-600">Phone:</span> {selectedNGO.contact}</div>
<div><span className="text-gray-600">Focus Area:</span> {selectedNGO.focus}</div>
<div><span className="text-gray-600">Location:</span> {selectedNGO.location}</div>
</div>
</div>
<div>
<h4 className="font-medium text-gray-900 mb-2">Performance Metrics</h4>
<div className="space-y-2 text-sm">
<div><span className="text-gray-600">Total Donations:</span> {selectedNGO.donations}</div>
<div><span className="text-gray-600">Rating:</span>  {selectedNGO.rating}/5.0</div>
<div><span className="text-gray-600">Total Impact:</span> {selectedNGO.totalImpact} lives</div>
<div><span className="text-gray-600">Registration:</span> {selectedNGO.registered}</div>
<div><span className="text-gray-600">Status:</span> 
<span className={`ml-1 px-2 py-1 text-xs rounded-full ${
selectedNGO.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
}`}>{selectedNGO.status}</span>
</div>
</div>
</div>
</div>
<div>
<h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
<div className="space-y-2 text-sm text-gray-600">
<div> Received donation request for {selectedNGO.focus} - {selectedNGO.lastActivity}</div>
<div> Updated profile information - 1 week ago</div>
<div> Completed verification process - 2 weeks ago</div>
<div> Impacted {selectedNGO.totalImpact} lives through donations</div>
</div>
</div>
</div>
<div className="flex justify-end gap-2 pt-4">
<button 
onClick={() => setShowDetailModal(false)}
className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
>
Close
</button>
<button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
Edit NGO
</button>
</div>
</div>
</div>
)}

{/* Verification Modal */}
{showVerificationModal && selectedNGO && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
<div className="flex justify-between items-center mb-4">
<h3 className="text-xl font-bold text-gray-900">✓ Verify NGO: {selectedNGO.name}</h3>
<button 
onClick={() => setShowVerificationModal(false)}
className="text-gray-400 hover:text-gray-600"
>

</button>
</div>
<div className="space-y-4">
<div className="grid grid-cols-2 gap-4">
<div>
<p className="text-sm text-gray-600">Email</p>
<p className="font-medium">{selectedNGO.email}</p>
</div>
<div>
<p className="text-sm text-gray-600">Phone</p>
<p className="font-medium">{selectedNGO.contact}</p>
</div>
<div>
<p className="text-sm text-gray-600">Location</p>
<p className="font-medium">{selectedNGO.location}</p>
</div>
<div>
<p className="text-sm text-gray-600">Registration Date</p>
<p className="font-medium">{selectedNGO.registered}</p>
</div>
</div>
<div className="border-t pt-4">
<h4 className="font-medium text-gray-900 mb-2">Documents</h4>
<div className="space-y-2">
<div className="flex items-center justify-between p-2 border rounded">
<span className="text-sm">Registration Certificate</span>
<span className="text-green-600"> Verified</span>
</div>
<div className="flex items-center justify-between p-2 border rounded">
<span className="text-sm">Tax Exemption Certificate</span>
<span className="text-yellow-600"> Pending</span>
</div>
<div className="flex items-center justify-between p-2 border rounded">
<span className="text-sm">Bank Account Details</span>
<span className="text-green-600">✓ Verified</span>
</div>
</div>
</div>
<div className="border-t pt-4">
<h4 className="font-medium text-gray-900 mb-2">Verification Status</h4>
<select className="w-full p-2 border border-gray-300 rounded-lg">
<option value="pending">Pending Review</option>
<option value="approved">Approved</option>
<option value="rejected">Rejected</option>
<option value="suspended">Suspended</option>
</select>
<textarea 
placeholder="Add verification notes..."
className="w-full p-2 border border-gray-300 rounded-lg mt-2"
rows={3}
></textarea>
</div>
<div className="flex justify-end gap-2 pt-4">
<button 
onClick={() => setShowVerificationModal(false)}
className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
>
Cancel
</button>
<button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
Update Status
</button>
</div>
</div>
</div>
</div>
)}
</div>
);
}
