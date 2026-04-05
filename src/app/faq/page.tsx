"use client";

import { Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

type FAQItem = {
  category: string;
  q: string;
  a: string;
};

const FAQ_LIST: FAQItem[] = [
  {
    category: "Getting Started",
    q: "What is SmartDonum and what is its main mission?",
    a: "SmartDonum connects individuals and organizations with NGOs that need usable surplus goods. The mission is to reduce waste while making giving easier, more transparent, and more timely.",
  },
  {
    category: "Getting Started",
    q: "How does donating through SmartDonum work from start to finish?",
    a: "You list your donation, NGOs review it, a pickup is accepted, and you can follow progress through your dashboard until delivery is complete.",
  },
  {
    category: "Accounts",
    q: "Is there any cost for donors or NGOs to use SmartDonum?",
    a: "No. The platform is free for donors and NGOs.",
  },
  {
    category: "Donations",
    q: "What types of items can I donate?",
    a: "The core categories currently supported are cooked food, packaged food, clothes, books, and toys.",
  },
  {
    category: "Accounts",
    q: "How do donor and NGO accounts get verified?",
    a: "Donor signup is lightweight, while NGOs go through a review process so accepted organizations on the platform are trustworthy and operationally ready.",
  },
  {
    category: "Food Safety",
    q: "What hygiene rules apply to cooked food donations?",
    a: "Cooked food should be recent, safely handled, clearly packed, and suitable for prompt pickup. Avoid highly risky or easily spoiled items when they cannot be transported quickly.",
  },
  {
    category: "Donations",
    q: "How should I package my donation for pickup?",
    a: "Use clean, secure packaging. Food should be sealed properly, and items like books, clothes, and toys should be packed in a way that protects them during handling.",
  },
  {
    category: "Pickup",
    q: "How do I schedule a pickup time and location?",
    a: "While creating a donation, you provide timing and location details. NGOs then use that information when accepting and coordinating the pickup.",
  },
  {
    category: "Pickup",
    q: "Can I choose the NGO that receives my donation?",
    a: "The platform is designed to help the right nearby NGO respond quickly, so matching is based more on need and availability than direct donor selection.",
  },
  {
    category: "NGO Trust",
    q: "How are NGOs vetted on the platform?",
    a: "NGOs go through a screening process that checks legitimacy, readiness, and relevance before they receive access to donation requests.",
  },
  {
    category: "Donations",
    q: "What condition should clothes, books, and toys be in?",
    a: "Items should be clean, usable, and respectful to the recipient. A good rule is to donate something you would feel comfortable giving to someone you know.",
  },
  {
    category: "Organizations",
    q: "Can restaurants or companies arrange recurring or large-scale donations?",
    a: "Yes. Organization donor flows are better suited for higher volume or recurring donations where pickups and coordination need more structure.",
  },
  {
    category: "NGOs",
    q: "How can NGOs express their current needs on the platform?",
    a: "NGOs can use their dashboard and request flows to review relevant donations and manage what they are able to accept.",
  },
  {
    category: "Tracking",
    q: "Can I track the donation after I schedule it?",
    a: "Yes. Your dashboard shows the donation status so you can follow it from submission to acceptance and final outcome.",
  },
  {
    category: "Support",
    q: "What if a pickup is missed or delayed?",
    a: "Check the dashboard first for any status update. If the issue remains unclear, contact support so the coordination gap can be resolved.",
  },
  {
    category: "Privacy",
    q: "How is my information kept private and secure?",
    a: "Pickup-related details are used only for coordination and are not meant to be shared broadly beyond what is necessary to complete the donation flow.",
  },
  {
    category: "Donations",
    q: "Can SmartDonum be used for money donations too?",
    a: "The current focus is on physical goods rather than direct monetary donations.",
  },
  {
    category: "Support",
    q: "Where should I go if I face a technical or donation issue?",
    a: "Use the contact or support channels available on the site so the issue can be reviewed quickly.",
  },
];

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={`${faq.category}-${faq.q}`}
            className="overflow-hidden rounded-[1.5rem] border border-white/80 bg-[linear-gradient(145deg,rgba(240,249,255,0.92),rgba(255,250,240,0.84),rgba(236,253,245,0.8))] shadow-sm transition hover:shadow-lg"
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                  {faq.category}
                </p>
                <p className="mt-2 text-lg font-bold text-slate-900">{faq.q}</p>
              </div>
              <span className="shrink-0 rounded-full border border-slate-200 bg-[linear-gradient(135deg,#f6fbff,#fffaf1)] p-2 text-slate-700">
                {isOpen ? <Minus size={20} /> : <Plus size={20} />}
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-600">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
  const categories = useMemo(
    () => Array.from(new Set(FAQ_LIST.map((faq) => faq.category))),
    []
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(103,232,249,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(253,224,71,0.14),_transparent_24%),linear-gradient(180deg,#effaff_0%,#dff3ff_45%,#f8fcff_100%)] px-4 pb-16 pt-24 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.9),rgba(255,250,240,0.74),rgba(236,253,245,0.72))] px-6 py-8 shadow-[0_30px_90px_rgba(14,116,144,0.12)] backdrop-blur-md md:px-10 md:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
                Support Center
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Answers that make SmartDonum easier to trust and use.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                We turned the FAQ into a cleaner support page so people can scan common
                questions quickly and feel more confident before they donate, receive, or manage.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Topics
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{categories.length}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  From pickups and privacy to food safety and NGO trust.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#fffaf2_100%)] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Questions
                </p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{FAQ_LIST.length}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Organized answers written for donors, NGOs, and organization teams.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(255,250,240,0.86),rgba(240,249,255,0.82))] p-6 shadow-xl backdrop-blur-sm">
            <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
              Categories
            </span>
            <div className="mt-5 flex flex-wrap gap-3">
              {categories.map((category) => (
                <div
                  key={category}
                  className="rounded-full border border-white/80 bg-[linear-gradient(135deg,#f7fbff,#fffaf1)] px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  {category}
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[1.75rem] bg-[linear-gradient(135deg,#0f172a_0%,#164e63_100%)] p-6 text-white shadow-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                Need More Help?
              </p>
              <h2 className="mt-3 text-2xl font-bold">Still unsure about your donation flow?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-100/88">
                If your question is not covered here, the contact page is the fastest way to
                reach out for support.
              </p>
              <a
                href="/contactUs"
                className="mt-5 inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
              >
                Contact Support
              </a>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(240,249,255,0.88),rgba(255,250,240,0.8),rgba(236,253,245,0.78))] p-6 shadow-xl backdrop-blur-sm md:p-8">
            <div className="mb-6">
              <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Common Questions
              </span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                Everything from donation basics to pickup confidence.
              </h2>
            </div>
            <FAQAccordion items={FAQ_LIST} />
          </section>
        </section>
      </div>
    </main>
  );
}
