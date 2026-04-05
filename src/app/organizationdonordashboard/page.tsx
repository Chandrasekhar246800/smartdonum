"use client";

import React from "react";
import UnifiedDonorDashboard from "@/components/dashboard/UnifiedDonorDashboard";

const CATEGORIES = [
  {
    key: "books",
    label: "Books",
    iconText: "BK",
    description: "Donate academic or general books that can support learning and community libraries.",
  },
  {
    key: "clothes",
    label: "Clothes",
    iconText: "CL",
    description: "Contribute wearable clothes in usable condition for organized distribution.",
  },
  {
    key: "packedfood",
    label: "Packed Food",
    iconText: "PF",
    description: "Submit packaged food donations that are easy to transport and distribute safely.",
  },
  {
    key: "cookedfood",
    label: "Cooked Food",
    iconText: "CF",
    description: "Share prepared food for immediate relief and time-sensitive pickups.",
  },
  {
    key: "toys",
    label: "Toys",
    iconText: "TY",
    description: "Donate toys that can be sorted and distributed to children in need.",
  },
];

const ITEM_LABELS: Record<string, string> = {
  books: "Books",
  clothes: "Clothes",
  packedfood: "Packed Food",
  cookedfood: "Cooked Food",
  toys: "Toys",
};

export default function OrganizationDonorDashboard() {
  return (
    <UnifiedDonorDashboard
      title="Organization Donor Dashboard"
      subtitle="Start new donations, monitor statuses, and track pickup progress from one central workspace."
      accentLabel="Organization Dashboard"
      categories={CATEGORIES}
      apiPath="/api/organization-donations"
      donateBasePath="/organizationdonordashboard/manage-donations/donate"
      detailBasePath="/organizationdonordashboard/view-requests/details"
      trackBasePath="/organizationdonordashboard/track-pickups/details"
      itemLabels={ITEM_LABELS}
    />
  );
}
