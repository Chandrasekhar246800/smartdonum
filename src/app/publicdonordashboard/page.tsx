"use client";

import React from "react";
import UnifiedDonorDashboard from "@/components/dashboard/UnifiedDonorDashboard";

const CATEGORIES = [
  {
    key: "books",
    label: "Books",
    iconText: "BK",
    description: "Donate story books, school books, and study material for learning and joy.",
  },
  {
    key: "clothes",
    label: "Clothes",
    iconText: "CL",
    description: "Share clean and usable clothes for people who need them most.",
  },
  {
    key: "packedfood",
    label: "Packed Food",
    iconText: "PF",
    description: "Submit packaged food donations that are safe for pickup and distribution.",
  },
  {
    key: "toys",
    label: "Toys",
    iconText: "TY",
    description: "Donate toys that can bring comfort and smiles to children.",
  },
];

const ITEM_LABELS: Record<string, string> = {
  books: "Books",
  clothes: "Clothes",
  packedfood: "Packed Food",
  toys: "Toys",
};

export default function PublicDonorDashboard() {
  return (
    <UnifiedDonorDashboard
      title="Public Donor Dashboard"
      subtitle="Create donations and review all your request activity from one single dashboard instead of jumping across small pages."
      accentLabel="Public Dashboard"
      categories={CATEGORIES}
      apiPath="/api/public-donations"
      donateBasePath="/publicdonordashboard/manage-donations/donate"
      detailBasePath="/publicdonordashboard/view-requests/details"
      trackBasePath="/publicdonordashboard/track-pickups/details"
      itemLabels={ITEM_LABELS}
    />
  );
}
