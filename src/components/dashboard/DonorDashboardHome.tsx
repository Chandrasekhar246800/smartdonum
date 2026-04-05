"use client";

import Link from "next/link";
import React from "react";
import DonorDashboardShell from "./DonorDashboardShell";

type ActionCard = {
  href: string;
  title: string;
  description: string;
  buttonLabel: string;
};

type StatCard = {
  label: string;
  value: string;
};

type DonorDashboardHomeProps = {
  title: string;
  subtitle: string;
  accentLabel: string;
  actions: ActionCard[];
  stats: StatCard[];
};

export default function DonorDashboardHome({
  title,
  subtitle,
  accentLabel,
  actions,
  stats,
}: DonorDashboardHomeProps) {
  return (
    <DonorDashboardShell title={title} subtitle={subtitle} accentLabel={accentLabel}>
      <section className="grid gap-6 md:grid-cols-2">
        {actions.map((action) => (
          <div
            key={action.href}
            className="rounded-[1.75rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.9),rgba(255,250,240,0.8),rgba(236,253,245,0.74))] p-8 shadow-lg backdrop-blur-sm"
          >
            <h2 className="text-xl font-bold text-sky-800">{action.title}</h2>
            <p className="mt-3 text-sky-700 leading-relaxed">{action.description}</p>
            <Link href={action.href} className="inline-flex mt-6">
              <span className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-sky-600">
                {action.buttonLabel}
              </span>
            </Link>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-[1.75rem] border border-white/80 bg-[linear-gradient(135deg,rgba(248,250,252,0.95),rgba(239,248,255,0.9),rgba(255,250,240,0.78))] p-8 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-xl font-bold text-sky-800">Impact Snapshot</h2>
          <p className="text-sky-700">
            A quick overview of the donation activity in your dashboard.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-100 px-6 py-5 text-center"
            >
              <div className="text-3xl font-extrabold text-sky-800">{stat.value}</div>
              <div className="mt-1 text-sm font-medium text-sky-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </DonorDashboardShell>
  );
}
