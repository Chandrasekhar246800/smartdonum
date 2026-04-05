"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import DonorDashboardShell from "@/components/dashboard/DonorDashboardShell";

type MaterialCount = {
  name: string;
  count: number;
};

type DonationDetails = Record<string, unknown>;

interface Donation {
  id: number;
  donorType: string;
  item: string;
  details: DonationDetails;
  status: "pending" | "accepted" | "cancelled";
}

function formatDonorType(donorType: string) {
  return donorType.charAt(0).toUpperCase() + donorType.slice(1);
}

function formatStatus(status: Donation["status"]) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusTone(status: Donation["status"]) {
  switch (status) {
    case "accepted":
      return "bg-emerald-100 text-emerald-800";
    case "cancelled":
      return "bg-rose-100 text-rose-800";
    default:
      return "bg-sky-100 text-sky-800";
  }
}

function getImageSource(details: DonationDetails) {
  const image = details.image;
  return typeof image === "string" ? image : "";
}

function getImageSources(details: DonationDetails) {
  const images = details.images;

  if (Array.isArray(images)) {
    return images.filter(
      (image): image is string => typeof image === "string" && image.length > 0
    );
  }

  const singleImage = getImageSource(details);
  return singleImage ? [singleImage] : [];
}

function shouldHideDetailKey(key: string) {
  return (
    key === "image" ||
    key === "images" ||
    key === "analysis" ||
    key === "analysisCounts" ||
    key === "imageBase64"
  );
}

function getAnalyzedItems(details: DonationDetails) {
  const analysis = details.analysis;

  if (!Array.isArray(analysis)) {
    return [];
  }

  return analysis.filter(
    (item): item is string => typeof item === "string" && item.length > 0
  );
}

function getAnalyzedCounts(details: DonationDetails) {
  const analysisCounts = details.analysisCounts;

  if (!Array.isArray(analysisCounts)) {
    return [];
  }

  return analysisCounts
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const name = "name" in entry ? entry.name : undefined;
      const count = "count" in entry ? entry.count : undefined;

      if (typeof name !== "string" || typeof count !== "number") {
        return null;
      }

      return { name, count };
    })
    .filter((entry): entry is MaterialCount => Boolean(entry?.name));
}

function renderDetailValue(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => (typeof entry === "string" ? entry : JSON.stringify(entry)))
      .join(", ");
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  return String(value);
}

export default function NGODashboard() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDonations() {
      setLoading(true);
      const res = await fetch("/api/ngo-donations");
      const data = await res.json();
      setDonations(Array.isArray(data) ? data : []);
      setLoading(false);
    }

    fetchDonations();
  }, []);

  async function handleStatus(id: number, status: "accepted" | "cancelled") {
    setLoading(true);

    await fetch("/api/public-donations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    await fetch("/api/organization-donations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });

    const res = await fetch("/api/ngo-donations");
    const data = await res.json();
    setDonations(Array.isArray(data) ? data : []);
    setLoading(false);
    setSelectedDonation(null);
  }

  const pendingCount = donations.filter((donation) => donation.status === "pending").length;
  const acceptedCount = donations.filter((donation) => donation.status === "accepted").length;
  const cancelledCount = donations.filter((donation) => donation.status === "cancelled").length;

  return (
    <DonorDashboardShell
      title="NGO Operations Dashboard"
      subtitle="Review incoming donations, inspect analyzed materials, and process pickups from one aligned operations workspace."
      accentLabel="NGO Dashboard"
      sectionLabel="Operations Workspace"
    >
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-sky-200/80 bg-[linear-gradient(165deg,#dff3ff_0%,#eef8ff_52%,#f6fbff_100%)] p-6 shadow-[0_18px_38px_rgba(14,165,233,0.14)]">
          <p className="text-sm font-medium text-slate-500">Total Donations</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{donations.length}</p>
        </div>
        <div className="rounded-3xl border border-cyan-200/80 bg-[linear-gradient(165deg,#dbf4ff_0%,#e9f8ff_52%,#f5fbff_100%)] p-6 shadow-[0_18px_38px_rgba(6,182,212,0.12)]">
          <p className="text-sm font-medium text-slate-500">Pending Review</p>
          <p className="mt-2 text-3xl font-extrabold text-sky-700">{pendingCount}</p>
        </div>
        <div className="rounded-3xl border border-emerald-200/80 bg-[linear-gradient(165deg,#d7fce7_0%,#e7fdf0_52%,#f4fff8_100%)] p-6 shadow-[0_18px_38px_rgba(16,185,129,0.14)]">
          <p className="text-sm font-medium text-slate-500">Accepted</p>
          <p className="mt-2 text-3xl font-extrabold text-green-700">{acceptedCount}</p>
        </div>
        <div className="rounded-3xl border border-rose-200/80 bg-[linear-gradient(165deg,#ffe1e7_0%,#fff0f3_52%,#fff8fa_100%)] p-6 shadow-[0_18px_38px_rgba(244,63,94,0.12)]">
          <p className="text-sm font-medium text-slate-500">Cancelled</p>
          <p className="mt-2 text-3xl font-extrabold text-red-700">{cancelledCount}</p>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(237,249,255,0.98),rgba(229,251,244,0.9),rgba(240,249,255,0.86))] p-6 shadow-[0_24px_56px_rgba(14,165,233,0.1)] sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Incoming Donations</h2>
            <p className="text-slate-600">
              Accept or cancel requests and inspect donation details without leaving this screen.
            </p>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="rounded-2xl bg-[linear-gradient(180deg,#eef9ff_0%,#e7f8f1_100%)] px-6 py-10 text-center text-slate-600 shadow-inner shadow-white/50">
              Loading donations...
            </div>
          ) : donations.length === 0 ? (
            <div className="rounded-2xl bg-[linear-gradient(180deg,#eef9ff_0%,#e7f8f1_100%)] px-6 py-10 text-center text-slate-600 shadow-inner shadow-white/50">
              No donations available.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {donations.map((donation) => {
                const imageSources = getImageSources(donation.details ?? {});
                const analyzedCounts = getAnalyzedCounts(donation.details ?? {});
                const analyzedItems =
                  analyzedCounts.length > 0
                    ? analyzedCounts.map(({ name }) => name)
                    : getAnalyzedItems(donation.details ?? {});

                return (
                  <div
                    key={donation.id}
                    className="rounded-3xl border border-white/80 bg-[linear-gradient(145deg,#edf9ff_0%,#f3fbff_48%,#e8fbf3_100%)] p-6 shadow-[0_14px_34px_rgba(148,163,184,0.13)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-lg font-bold text-slate-900">{donation.item}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          From: {formatDonorType(donation.donorType)}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusTone(
                          donation.status
                        )}`}
                      >
                        {formatStatus(donation.status)}
                      </span>
                    </div>

                    {imageSources.length > 0 && (
                      <div className="mt-4 grid w-full grid-cols-2 gap-2">
                        {imageSources.slice(0, 4).map((imageSource, index) => (
                          <Image
                            key={`${donation.id}-image-${index}`}
                            src={imageSource}
                            alt={`${donation.item} ${index + 1}`}
                            width={300}
                            height={120}
                            className="h-28 w-full rounded-2xl object-cover shadow"
                            unoptimized
                          />
                        ))}
                      </div>
                    )}

                    {analyzedItems.length > 0 && (
                      <div className="mt-4 w-full rounded-2xl bg-[linear-gradient(180deg,#eef9ff_0%,#e7f8f1_100%)] px-4 py-3 shadow-inner shadow-white/40">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          Analyzed Materials
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(analyzedCounts.length > 0
                            ? analyzedCounts
                            : analyzedItems.map((name) => ({ name, count: 1 }))).map((material) => (
                            <span
                              key={`${donation.id}-${material.name}`}
                              className="rounded-full bg-[linear-gradient(135deg,#d9f4ff,#eefdf7)] px-3 py-1 text-xs font-medium text-cyan-900 shadow-sm"
                            >
                              {material.name} ({material.count})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <ul className="mt-4 space-y-1 text-sm text-slate-600">
                      {donation.details &&
                        Object.entries(donation.details).map(([key, value]) =>
                          !shouldHideDetailKey(key) ? (
                            <li key={key}>
                              <span className="font-semibold capitalize text-slate-800">
                                {key}:
                              </span>{" "}
                              {renderDetailValue(value)}
                            </li>
                          ) : null
                        )}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button
                        className="rounded-xl bg-[linear-gradient(135deg,#16a34a,#0f766e)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-green-300"
                        onClick={() => handleStatus(donation.id, "accepted")}
                        disabled={donation.status === "accepted" || loading}
                      >
                        {donation.status === "accepted" ? "Accepted" : "Accept"}
                      </button>
                      <button
                        className="rounded-xl bg-[linear-gradient(135deg,#f43f5e,#ea580c)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-rose-700/15 transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-red-300"
                        onClick={() => handleStatus(donation.id, "cancelled")}
                        disabled={donation.status === "cancelled" || loading}
                      >
                        {donation.status === "cancelled" ? "Cancelled" : "Cancel Pickup"}
                      </button>
                      <button
                        className="rounded-xl bg-[linear-gradient(135deg,#0284c7,#0f766e)] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-700/20 transition hover:brightness-95"
                        onClick={() => setSelectedDonation(donation)}
                        disabled={loading}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(223,246,255,0.96),rgba(235,248,255,0.92),rgba(228,252,243,0.84))] p-8 shadow-[0_32px_80px_rgba(15,23,42,0.18)]">
            <button
              className="absolute right-5 top-5 text-2xl text-slate-400 transition hover:text-slate-700"
              onClick={() => setSelectedDonation(null)}
            >
              &times;
            </button>

            <div className="pr-10">
              <h2 className="text-2xl font-bold text-slate-900">Donation Details</h2>
              <p className="mt-1 text-sm text-slate-500">
                {formatDonorType(selectedDonation.donorType)} donor
              </p>
            </div>

            {getImageSources(selectedDonation.details ?? {}).length > 0 && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {getImageSources(selectedDonation.details ?? {}).map((imageSource, index) => (
                  <Image
                    key={`selected-image-${selectedDonation.id}-${index}`}
                    src={imageSource}
                    alt={`${selectedDonation.item} ${index + 1}`}
                    width={400}
                    height={140}
                    className="h-36 w-full rounded-2xl object-cover shadow"
                    unoptimized
                  />
                ))}
              </div>
            )}

            {(getAnalyzedCounts(selectedDonation.details ?? {}).length > 0 ||
              getAnalyzedItems(selectedDonation.details ?? {}).length > 0) && (
              <div className="mt-5 rounded-2xl bg-[linear-gradient(180deg,#eef9ff_0%,#e7f8f1_100%)] px-4 py-4 shadow-inner shadow-white/40">
                <p className="mb-2 text-sm font-semibold text-slate-700">Analyzed Materials</p>
                <div className="flex flex-wrap gap-2">
                  {(getAnalyzedCounts(selectedDonation.details ?? {}).length > 0
                    ? getAnalyzedCounts(selectedDonation.details ?? {})
                    : getAnalyzedItems(selectedDonation.details ?? {}).map((name) => ({
                        name,
                        count: 1,
                      }))).map((material) => (
                    <span
                      key={`selected-${selectedDonation.id}-${material.name}`}
                      className="rounded-full bg-[linear-gradient(135deg,#d9f4ff,#eefdf7)] px-3 py-1 text-xs font-medium text-cyan-900 shadow-sm"
                    >
                      {material.name} ({material.count})
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              {Object.entries(selectedDonation.details).map(([key, value]) =>
                !shouldHideDetailKey(key) ? (
                  <li key={key}>
                    <span className="font-semibold capitalize text-slate-800">{key}:</span>{" "}
                    {renderDetailValue(value)}
                  </li>
                ) : null
              )}
            </ul>

            <div className="mt-5 border-t border-slate-200 pt-4 text-sm text-slate-500">
              <p>Donor Type: {formatDonorType(selectedDonation.donorType)}</p>
              <p className="mt-1">Item: {selectedDonation.item}</p>
              <p className="mt-1">Status: {formatStatus(selectedDonation.status)}</p>
            </div>
          </div>
        </div>
      )}
    </DonorDashboardShell>
  );
}
