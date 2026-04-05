"use client";

import Link from "next/link";
import React from "react";
import DonorDashboardShell from "./DonorDashboardShell";

type DonationListItem = {
  id: number | string;
  item: string;
  status: string;
};

type DonorRequestsPageProps = {
  title: string;
  subtitle: string;
  accentLabel: string;
  backHref: string;
  backLabel: string;
  emptyMessage: string;
  detailHref: (id: number | string) => string;
  detailLabel: string;
  donations: DonationListItem[];
  itemLabels: Record<string, string>;
};

function getStatusStyles(status: string) {
  switch (status.toLowerCase()) {
    case "accepted":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-amber-100 text-amber-800";
  }
}

export default function DonorRequestsPage({
  title,
  subtitle,
  accentLabel,
  backHref,
  backLabel,
  emptyMessage,
  detailHref,
  detailLabel,
  donations,
  itemLabels,
}: DonorRequestsPageProps) {
  return (
    <DonorDashboardShell title={title} subtitle={subtitle} accentLabel={accentLabel}>
      <div className="rounded-[1.75rem] border border-white/80 bg-[linear-gradient(135deg,rgba(248,250,252,0.95),rgba(239,248,255,0.9),rgba(255,250,240,0.78))] p-6 shadow-xl backdrop-blur-sm sm:p-8">
        <Link href={backHref} className="mb-6 inline-flex">
          <span className="rounded-lg bg-sky-100 px-4 py-2 font-semibold text-sky-700 shadow-sm transition hover:bg-sky-200">
            &larr; {backLabel}
          </span>
        </Link>

        {donations.length === 0 ? (
          <div className="rounded-2xl bg-[linear-gradient(180deg,#f5fbff_0%,#fffaf2_100%)] px-6 py-12 text-center text-sky-700">
            {emptyMessage}
          </div>
        ) : (
          <ul className="space-y-5">
            {donations.map((donation) => (
              <li
                key={donation.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/80 bg-[linear-gradient(145deg,#f7fbff_0%,#fff9f1_48%,#f2fcf7_100%)] p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-lg font-bold text-sky-800">
                    {itemLabels[donation.item] || donation.item}
                  </div>
                  <div className="mt-2">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
                        donation.status
                      )}`}
                    >
                      {donation.status}
                    </span>
                  </div>
                </div>

                <Link href={detailHref(donation.id)} className="inline-flex">
                  <span className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-sky-600">
                    {detailLabel}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </DonorDashboardShell>
  );
}
