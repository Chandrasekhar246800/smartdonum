"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import DonorDashboardShell from "./DonorDashboardShell";

type DonationCategory = {
  key: string;
  label: string;
  iconText: string;
  description: string;
};

type DonationRecord = {
  id: number | string;
  item: string;
  status: string;
};

type UnifiedDonorDashboardProps = {
  title: string;
  subtitle: string;
  accentLabel: string;
  categories: DonationCategory[];
  apiPath: string;
  donateBasePath: string;
  detailBasePath: string;
  trackBasePath: string;
  itemLabels: Record<string, string>;
};

function getStatusTone(status: string) {
  switch (status.toLowerCase()) {
    case "accepted":
      return "bg-emerald-100 text-emerald-800";
    case "cancelled":
      return "bg-rose-100 text-rose-800";
    default:
      return "bg-sky-100 text-sky-800";
  }
}

export default function UnifiedDonorDashboard({
  title,
  subtitle,
  accentLabel,
  categories,
  apiPath,
  donateBasePath,
  detailBasePath,
  trackBasePath,
  itemLabels,
}: UnifiedDonorDashboardProps) {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      const response = await fetch(apiPath);
      const data = await response.json();
      setDonations(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    fetchDonations();
    const interval = setInterval(fetchDonations, 4000);
    return () => clearInterval(interval);
  }, [apiPath]);

  const summary = useMemo(() => {
    const pending = donations.filter((donation) => donation.status === "pending").length;
    const accepted = donations.filter((donation) => donation.status === "accepted").length;
    const cancelled = donations.filter((donation) => donation.status === "cancelled").length;

    return {
      total: donations.length,
      pending,
      accepted,
      cancelled,
    };
  }, [donations]);

  return (
    <DonorDashboardShell title={title} subtitle={subtitle} accentLabel={accentLabel}>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-sky-200/80 bg-[linear-gradient(165deg,#dff3ff_0%,#eef8ff_52%,#f6fbff_100%)] p-6 shadow-[0_18px_38px_rgba(14,165,233,0.14)]">
          <p className="text-sm font-medium text-slate-500">Total Donations</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{summary.total}</p>
        </div>
        <div className="rounded-3xl border border-cyan-200/80 bg-[linear-gradient(165deg,#dbf4ff_0%,#e9f8ff_52%,#f5fbff_100%)] p-6 shadow-[0_18px_38px_rgba(6,182,212,0.12)]">
          <p className="text-sm font-medium text-slate-500">Pending</p>
          <p className="mt-2 text-3xl font-extrabold text-sky-700">{summary.pending}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200/80 bg-[linear-gradient(165deg,#d7fce7_0%,#e7fdf0_52%,#f4fff8_100%)] p-6 shadow-[0_18px_38px_rgba(16,185,129,0.14)]">
          <p className="text-sm font-medium text-slate-500">Accepted</p>
          <p className="mt-2 text-3xl font-extrabold text-green-700">{summary.accepted}</p>
        </div>
        <div className="rounded-3xl border border-rose-200/80 bg-[linear-gradient(165deg,#ffe1e7_0%,#fff0f3_52%,#fff8fa_100%)] p-6 shadow-[0_18px_38px_rgba(244,63,94,0.12)]">
          <p className="text-sm font-medium text-slate-500">Cancelled</p>
          <p className="mt-2 text-3xl font-extrabold text-red-700">{summary.cancelled}</p>
        </div>
      </section>

      <section id="donate" className="mt-8 rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(220,245,255,0.96),rgba(234,248,255,0.92),rgba(231,252,243,0.86))] p-6 shadow-[0_24px_56px_rgba(14,165,233,0.12)] sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Start a Donation</h2>
            <p className="text-slate-600">Pick a category and jump straight into the donation form.</p>
          </div>
          <a href="#requests" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">
            Jump to requests
          </a>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.key}
              href={`${donateBasePath}?item=${category.key}`}
              className="rounded-3xl border border-white/80 bg-[linear-gradient(145deg,#ecf9ff_0%,#f4fbff_46%,#e7fbf3_100%)] p-6 shadow-[0_14px_30px_rgba(148,163,184,0.12)] transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_22px_44px_rgba(14,165,233,0.14)]"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#164e63)] text-sm font-bold tracking-[0.2em] text-white">
                {category.iconText}
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{category.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{category.description}</p>
              <span className="mt-5 inline-flex rounded-xl bg-[linear-gradient(135deg,#0284c7,#0f766e)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-700/20">
                Open Form
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="requests" className="mt-8 rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(237,249,255,0.97),rgba(229,251,244,0.9),rgba(240,249,255,0.86))] p-6 shadow-[0_24px_56px_rgba(14,165,233,0.1)] sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Your Requests and Pickup Tracking</h2>
            <p className="text-slate-600">Everything you previously had across multiple screens now lives here.</p>
          </div>
          <a href="#donate" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">
            Add another donation
          </a>
        </div>

        {loading ? (
          <div className="mt-6 rounded-2xl bg-[linear-gradient(180deg,#eef9ff_0%,#e7f8f1_100%)] px-6 py-10 text-center text-slate-600 shadow-inner shadow-white/50">
            Loading your dashboard activity...
          </div>
        ) : donations.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-[linear-gradient(180deg,#eef9ff_0%,#e7f8f1_100%)] px-6 py-10 text-center text-slate-600 shadow-inner shadow-white/50">
            No donation activity yet. Use the donation section above to create your first request.
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="rounded-3xl border border-white/80 bg-[linear-gradient(145deg,#edf9ff_0%,#f3fbff_48%,#e8fbf3_100%)] p-5 shadow-[0_14px_34px_rgba(148,163,184,0.13)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-lg font-bold text-slate-900">
                      {itemLabels[donation.item] || donation.item}
                    </p>
                    <div className="mt-2">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(donation.status)}`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`${detailBasePath}?id=${donation.id}`}
                      className="rounded-xl bg-[linear-gradient(135deg,#0284c7,#0f766e)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-700/20 transition hover:brightness-95"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`${trackBasePath}?id=${donation.id}`}
                      className="rounded-xl border border-white/80 bg-[linear-gradient(135deg,#eef8ff,#e9f8f2)] px-4 py-2 text-sm font-semibold text-slate-700 shadow transition hover:brightness-95"
                    >
                      Track Pickup
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </DonorDashboardShell>
  );
}
