"use client";

import Link from "next/link";
import React from "react";

type NavigationLink = {
  href: string;
  label: string;
};

type DonorDashboardShellProps = {
  title: string;
  subtitle: string;
  accentLabel: string;
  children: React.ReactNode;
  navLinks?: NavigationLink[];
  sectionLabel?: string;
};

const DEFAULT_NAV_LINKS: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "/aboutUs", label: "About Us" },
  { href: "/contactUs", label: "Contact Us" },
];

export default function DonorDashboardShell({
  title,
  subtitle,
  accentLabel,
  children,
  navLinks = DEFAULT_NAV_LINKS,
  sectionLabel = "Dashboard Workspace",
}: DonorDashboardShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_28%),linear-gradient(180deg,#edf9ff_0%,#eaf5ff_45%,#f6fbff_100%)] px-3 sm:px-4">
      <nav className="sticky top-0 z-20 mx-auto mt-4 w-full max-w-6xl rounded-[1.75rem] border border-white/70 bg-[linear-gradient(135deg,rgba(232,247,255,0.96),rgba(241,250,255,0.94),rgba(236,252,246,0.9))] px-5 py-4 shadow-[0_20px_50px_rgba(14,165,233,0.1)] backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-600">
              SmartDonum
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">{sectionLabel}</h2>
          </div>
          <ul className="flex flex-wrap items-center gap-3 sm:gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-sky-200/80 bg-[linear-gradient(135deg,#f5fbff,#edf9ff)] px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:text-sky-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <span className="inline-flex rounded-full bg-[linear-gradient(135deg,#0f172a,#155e75)] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-cyan-900/15">
                {accentLabel}
              </span>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-1 mx-auto w-full max-w-6xl py-6 sm:py-10">
        <div className="mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,rgba(221,245,255,0.96),rgba(233,247,255,0.92),rgba(228,252,243,0.84))] px-6 py-8 shadow-[0_26px_60px_rgba(14,165,233,0.12)] backdrop-blur-sm sm:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-cyan-200 bg-[linear-gradient(135deg,#ecfeff,#dbeafe)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 shadow-sm">
                {accentLabel}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-lg">
                {subtitle}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-2xl border border-sky-200/80 bg-[linear-gradient(180deg,#e7f6ff_0%,#dff8f2_100%)] px-4 py-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Look
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  Unified navigation and calmer surfaces
                </p>
              </div>
              <div className="rounded-2xl border border-sky-200/80 bg-[linear-gradient(180deg,#e9f7ff_0%,#eef8ff_100%)] px-4 py-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Flow
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  Fewer empty pages and clearer actions
                </p>
              </div>
              <div className="rounded-2xl border border-emerald-200/80 bg-[linear-gradient(180deg,#e4fbf2_0%,#dcfce7_100%)] px-4 py-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Status
                </p>
                <p className="mt-2 text-base font-semibold text-slate-900">
                  Consistent cards, badges, and spacing
                </p>
              </div>
            </div>
          </div>
        </div>

        {children}
      </main>

      <footer className="mt-auto border-t border-slate-200/80 bg-[linear-gradient(135deg,rgba(232,247,255,0.92),rgba(241,250,255,0.9),rgba(236,252,246,0.84))] backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-sm font-semibold text-slate-700">SmartDonum</p>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} SmartDonum. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
