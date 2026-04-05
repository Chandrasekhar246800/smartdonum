"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Hands from "../../public/images/hands.jpg";
import Smillegirl from "../../public/images/smillegirl.jpg";
import Twokids from "../../public/images/twokids.jpg";
import FoodImage from "../../public/images/food.jpg";
import ClothesImage from "../../public/images/clothes.jpg";
import BooksImage from "../../public/images/book.jpg";
import ToysImage from "../../public/images/toy.jpg";

const heroImages = [Hands, Twokids, Smillegirl];

const categories = [
  {
    title: "Food",
    description: "Redirect cooked or packaged food before it becomes waste.",
    image: FoodImage,
    accent: "from-amber-100 to-orange-50",
  },
  {
    title: "Clothes",
    description: "Give gently used clothing a second life with the right communities.",
    image: ClothesImage,
    accent: "from-sky-100 to-cyan-50",
  },
  {
    title: "Books",
    description: "Move school books, story books, and study material where learning continues.",
    image: BooksImage,
    accent: "from-emerald-100 to-teal-50",
  },
  {
    title: "Toys",
    description: "Turn unused toys into comfort, play, and joy for children.",
    image: ToysImage,
    accent: "from-rose-100 to-pink-50",
  },
];

const impactSteps = [
  {
    step: "1",
    title: "List your donation",
    body: "Choose a category, upload details, and describe pickup timing in a few quick steps.",
  },
  {
    step: "2",
    title: "NGOs get notified",
    body: "Relevant NGOs can review your offer, inspect details, and accept what they can use.",
  },
  {
    step: "3",
    title: "Track the delivery",
    body: "Follow the donation from request to pickup to final handoff through one dashboard.",
  },
];

const quotes = [
  {
    text: "No one has ever become poor by giving.",
    author: "Anne Frank",
  },
  {
    text: "We make a living by what we get, but we make a life by what we give.",
    author: "Winston Churchill",
  },
  {
    text: "It is not how much we give, but how much love we put into giving.",
    author: "Mother Teresa",
  },
];

export default function HomePage() {
  const [activeHero, setActiveHero] = useState(0);
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const heroTimer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroImages.length);
    }, 4200);

    const quoteTimer = window.setInterval(() => {
      setActiveQuote((current) => (current + 1) % quotes.length);
    }, 5000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(quoteTimer);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.22),_transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(253,224,71,0.16),_transparent_26%),linear-gradient(180deg,#effaff_0%,#dff3ff_42%,#f8fcff_100%)] px-4 pb-16 pt-24 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.9),rgba(255,250,240,0.74),rgba(236,253,245,0.74))] px-6 py-8 shadow-[0_30px_90px_rgba(14,116,144,0.12)] backdrop-blur-md md:px-10 md:py-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.1),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_30%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
                Smarter Donation Flow
              </span>
              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
                  Turn everyday surplus into timely help for real people.
                </h1>
                <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                  SmartDonum connects donors, organizations, and NGOs through one clean flow
                  so food, clothes, books, and toys move faster from extra to essential.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/loginPage"
                  className="inline-flex items-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Start Donating
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center rounded-2xl border border-white/80 bg-[linear-gradient(135deg,#f7fbff,#fffaf1)] px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:text-cyan-700"
                >
                  Explore FAQs
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/80 bg-[linear-gradient(180deg,#eef9ff_0%,#f9fcff_100%)] p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Categories
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">4+</p>
                </div>
                <div className="rounded-2xl border border-white/80 bg-[linear-gradient(180deg,#fffaf1_0%,#fffdf8_100%)] p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Shared Flow
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">Donor to NGO</p>
                </div>
                <div className="rounded-2xl border border-white/80 bg-[linear-gradient(180deg,#f2fcf7_0%,#fbfffd_100%)] p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Focus
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">Less waste</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[0.7fr_1.3fr] lg:grid-cols-[0.7fr_1.3fr]">
              <div className="flex flex-col gap-4">
                <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,#eef8ff_0%,#f3fbff_100%)] p-5 shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    What moves here
                  </p>
                  <ul className="mt-4 space-y-3 text-sm font-medium text-slate-700">
                    <li>Food pickups with faster routing</li>
                    <li>Book and toy redistribution</li>
                    <li>Donation status visibility</li>
                    <li>NGO acceptance workflow</li>
                  </ul>
                </div>
                <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,#fffaf2_0%,#fff7ec_100%)] p-5 shadow-lg">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-700">
                    Promise
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    A warmer, more trustworthy experience for both people giving and teams receiving.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/80 bg-slate-950 shadow-2xl shadow-sky-100/60">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
                {heroImages.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt="SmartDonum impact story"
                    priority={index === 0}
                    className={`h-full min-h-[430px] w-full object-cover transition-all duration-700 ${
                      index === activeHero
                        ? "opacity-100 scale-100"
                        : "pointer-events-none absolute inset-0 opacity-0 scale-105"
                    }`}
                  />
                ))}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="max-w-lg rounded-2xl bg-white/12 p-5 backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                      Live Impact Path
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">From extra items to meaningful delivery.</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-100/90">
                      One donor action can trigger pickup planning, NGO review, and real distribution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.88),rgba(236,253,245,0.72))] p-6 shadow-xl backdrop-blur-sm md:p-8">
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
              Why It Works
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
              Built for useful giving, not complicated giving.
            </h2>
            <div className="mt-6 space-y-4">
              {impactSteps.map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 rounded-2xl border border-white/80 bg-[linear-gradient(180deg,#f4fbff_0%,#f8fdf9_100%)] p-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#164e63)] text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,250,240,0.86),rgba(240,249,255,0.84))] p-6 shadow-xl backdrop-blur-sm md:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Donation Types
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                  Support different needs through one platform.
                </h2>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {categories.map((category) => (
                <div
                  key={category.title}
                  className={`overflow-hidden rounded-[1.75rem] border border-white bg-gradient-to-br ${category.accent} p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="relative h-44 overflow-hidden rounded-[1.35rem]">
                    <Image
                      src={category.image}
                      alt={category.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-slate-900">{category.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{category.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,#0f172a_0%,#164e63_100%)] p-8 text-white shadow-2xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
              Shared Trust
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">
              A donation experience that feels clear, warm, and accountable.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-100/88 md:text-base">
              SmartDonum is designed to help donors feel confident, NGOs stay organized,
              and communities receive help faster. That means fewer empty clicks, clearer status,
              and a platform that feels human from start to finish.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/loginPage"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
              >
                Open SmartDonum
              </Link>
              <Link
                href="/contactUs"
                className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
              >
                Contact Our Team
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,250,240,0.86),rgba(240,249,255,0.84),rgba(252,244,255,0.8))] p-8 shadow-xl backdrop-blur-sm">
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
              Giving Voices
            </span>
            <div className="mt-6 min-h-[180px]">
              <blockquote className="text-2xl font-semibold leading-10 text-slate-900">
                &ldquo;{quotes[activeQuote].text}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                {quotes[activeQuote].author}
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveQuote(index)}
                  className={`h-3 w-3 rounded-full transition ${
                    activeQuote === index ? "bg-cyan-600" : "bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Show quote ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
