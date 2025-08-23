
# SmartDonum

> A modern, full-stack donation management platform for NGOs, organizations, and the public, built with Next.js, React, TypeScript, and Tailwind CSS.

## 🌟 Project Overview

SmartDonum bridges the gap between donors and NGOs, making it easy to donate, manage, and distribute resources to those in need. The platform is designed for three main user roles:

- **Public Donors**: Individuals who want to donate items.
- **Organization Donors**: Companies or groups making bulk or specialized donations.
- **NGO Volunteers**: NGOs who coordinate, accept, and process donations.

## 🚀 Features

### 1. Public Donor Dashboard
- Simple, intuitive interface for individuals to donate items (food, clothes, books, toys, etc.).
- Donation form with image upload, item details, and donor info.
- View your donation history and status.
- Real-time feedback on donation submission.

### 2. Organization Donor Dashboard
- Tailored for organizations to manage larger or recurring donations.
- Bulk donation entry and tracking.
- Organization profile and contact management.
- Donation status updates and history.

### 3. NGO Dashboard
- Central hub for NGOs to view all incoming donations (from public and organizations).
- Accept or cancel donation pickups with a single click.
- Detailed donation cards with item info, donor type, and images.
- Status badges and action buttons for efficient workflow.
- Responsive, modern UI for easy management on any device.

### 4. Authentication (NGO Volunteer Login)
- Secure login for NGO volunteers.
- Password visibility toggle for better UX.
- Redirects to NGO dashboard upon successful login.

### 5. Backend API (Next.js API Routes)
- Unified API for all donation CRUD operations.
- Real-time updates for dashboards.
- Type-safe endpoints using TypeScript.

### 6. UI/UX Excellence
- Fully responsive design using Tailwind CSS.
- Modern card layouts, pill buttons, and status indicators.
- Image optimization with Next.js `<Image />`.
- Material icons for clear, accessible actions.
- Gradient backgrounds and glassmorphism effects for a premium look.

### 7. Code Quality & Best Practices
- TypeScript throughout for safety and maintainability.
- Modular, reusable React components.
- Clean separation of concerns between frontend, backend, and shared logic.

## 🛠️ Tech Stack
- Next.js (App Router, API routes)
- React
- TypeScript
- Tailwind CSS
- Next.js Image Optimization
- Material Icons

## 📦 Getting Started

1. Install dependencies:
	```bash
	npm install
	# or
	yarn install
	```
2. Run the development server:
	```bash
	npm run dev
	# or
	yarn dev
	```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Folder Structure

- `src/app/publicdonardashboard/` — Public donor dashboard
- `src/app/organizationdonordashboard/` — Organization donor dashboard
- `src/app/ngodashboard/` — NGO dashboard
- `src/app/api/donations/` — Backend API routes
- `src/components/navbar/` — Navigation bar
- `public/images/` — Donation and UI images

## 💡 Why SmartDonum?
- Bridges the gap between donors and NGOs with real-time, transparent donation management.
- Designed for usability, speed, and accessibility.
- Scalable architecture for future features (analytics, notifications, etc.).

## 🙌 Contributing
Pull requests and suggestions are welcome! Please open an issue to discuss your ideas.

---

_Built with ❤️ using Next.js, React, and Tailwind CSS._
