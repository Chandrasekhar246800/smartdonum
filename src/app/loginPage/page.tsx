'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

type AuthOption = {
  title: string;
  description: string;
  route: string;
  accent: string;
  surface: string;
  border: string;
};

export default function LoginPage() {
  const router = useRouter();

  const authOptions = useMemo<AuthOption[]>(
    () => [
      {
        title: 'Public Donor',
        description:
          'Donate food, books, or toys in a few steps and track pickups from one place.',
        route: '/donor/public',
        accent: 'text-emerald-300',
        surface: 'from-emerald-500/20 to-emerald-200/10',
        border: 'border-emerald-300/40',
      },
      {
        title: 'Organization Donor',
        description:
          'Register bulk donations and coordinate recurring pickups for your institution.',
        route: '/donor/organization',
        accent: 'text-sky-300',
        surface: 'from-sky-500/20 to-sky-200/10',
        border: 'border-sky-300/40',
      },
      {
        title: 'NGO Team',
        description:
          'Review incoming donations, accept requests, and manage fulfillment operations.',
        route: '/ngo',
        accent: 'text-amber-300',
        surface: 'from-amber-500/20 to-amber-200/10',
        border: 'border-amber-300/40',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(253,224,71,0.14),_transparent_24%),linear-gradient(180deg,#eef9ff_0%,#dff2ff_48%,#f9fcff_100%)] px-4 pb-10 pt-24 text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.92),rgba(255,251,235,0.82),rgba(236,253,245,0.78))] px-6 py-8 shadow-2xl shadow-sky-100/70 backdrop-blur-md md:px-10 md:py-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-5">
              <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-700">
                Sign In To SmartDonum
              </span>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
                  Choose your workspace and continue directly.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                  The extra donor-type stop is removed here. Pick the account you want and
                  jump straight to its login or signup form.
                </p>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/80 bg-[linear-gradient(145deg,#f7fbff_0%,#fffaf2_45%,#f2fcf7_100%)] p-5 shadow-xl">
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/90 bg-[linear-gradient(180deg,#eef9ff_0%,#f9fcff_100%)] p-4">
                  <div className="text-sm text-slate-500">Fewer steps</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">1 tap to form</div>
                </div>
                <div className="rounded-2xl border border-white/90 bg-[linear-gradient(180deg,#fffaf1_0%,#fffdf8_100%)] p-4">
                  <div className="text-sm text-slate-500">Best for donors</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">Public or organization</div>
                </div>
                <div className="rounded-2xl border border-white/90 bg-[linear-gradient(180deg,#f2fcf7_0%,#fbfffd_100%)] p-4">
                  <div className="text-sm text-slate-500">Operations access</div>
                  <div className="mt-2 text-2xl font-bold text-slate-900">NGO dashboard</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {authOptions.map((option) => (
            <button
              key={option.title}
              type="button"
              onClick={() => router.push(option.route)}
              className={`group flex h-full flex-col justify-between rounded-[1.75rem] border ${option.border} bg-gradient-to-br ${option.surface} p-6 text-left shadow-xl shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-white/40`}
            >
              <div className="space-y-4">
                <div className={`text-sm font-semibold uppercase tracking-[0.22em] ${option.accent}`}>
                  Account Type
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{option.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{option.description}</p>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-between border-t border-slate-200/80 pt-4">
                <span className="text-sm text-slate-500">Open login / signup</span>
                <span className="text-lg font-semibold text-slate-900 transition group-hover:translate-x-1">
                  Go
                </span>
              </div>
            </button>
          ))}
        </section>
      </div>
    </div>
  );
}
