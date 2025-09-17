
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { Suspense } from "react";

const formConfigs: Record<string, { title: string; fields: { label: string; name: string; type: string; placeholder: string; }[]; borderColor: string; }> = {
  books: {
    title: "Donate Books",
    borderColor: "border-blue-400",
    fields: [
      { label: "Class (e.g. 5th, 10th)", name: "class", type: "text", placeholder: "Class (e.g. 5th, 10th)" },
      { label: "Number of Books", name: "number", type: "number", placeholder: "Number of Books" },
      { label: "Subjects (comma separated)", name: "subjects", type: "text", placeholder: "Subjects (comma separated)" },
    ],
  },
  clothes: {
    title: "Donate Clothes",
    borderColor: "border-blue-400",
    fields: [
      { label: "Size (e.g. S, M, L, XL)", name: "size", type: "text", placeholder: "Size (e.g. S, M, L, XL)" },
      { label: "Number of Clothes", name: "number", type: "number", placeholder: "Number of Clothes" },
      { label: "Condition (e.g. New, Used)", name: "condition", type: "text", placeholder: "Condition (e.g. New, Used)" },
    ],
  },
  packedfood: {
    title: "Donate Packed Food",
    borderColor: "border-blue-400",
    fields: [
      { label: "Type of Food (e.g. Biscuits, Canned)", name: "type", type: "text", placeholder: "Type of Food (e.g. Biscuits, Canned)" },
      { label: "Number of Packs", name: "number", type: "number", placeholder: "Number of Packs" },
      { label: "Expiry Date (e.g. 2025-12-31)", name: "expiry", type: "date", placeholder: "Expiry Date (e.g. 2025-12-31)" },
    ],
  },
  cookedfood: {
    title: "Donate Cooked Food",
    borderColor: "border-orange-400",
    fields: [
      { label: "Type of Cooked Food (e.g. Rice, Curry)", name: "type", type: "text", placeholder: "Type of Cooked Food (e.g. Rice, Curry)" },
      { label: "Quantity (number of servings)", name: "quantity", type: "number", placeholder: "Quantity (number of servings)" },
      { label: "Prepared At (e.g. 2025-08-14 10:00AM)", name: "preparedAt", type: "datetime-local", placeholder: "Prepared At (e.g. 2025-08-14 10:00AM)" },
    ],
  },
  toys: {
    title: "Donate Toys",
    borderColor: "border-blue-400",
    fields: [
      { label: "Type of Toy (e.g. Doll, Car)", name: "type", type: "text", placeholder: "Type of Toy (e.g. Doll, Car)" },
      { label: "Number of Toys", name: "number", type: "number", placeholder: "Number of Toys" },
      { label: "Condition (e.g. New, Used)", name: "condition", type: "text", placeholder: "Condition (e.g. New, Used)" },
    ],
  },
};

function getBackHref() {
  // For organization donor dashboard, always go back to manage donations
  return "/organizationdonordashboard/manage-donations";
}


function DonateFormPage() {
  const searchParams = useSearchParams();
  const item = searchParams.get("item") || "books";
  const config = formConfigs[item] || formConfigs["books"];

  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string | File | null> = { item };
    config.fields.forEach(f => {
      data[f.name] = formData.get(f.name);
    });
    // Prepare details as JSON for Prisma
    const details: Record<string, string> = {};
    config.fields.forEach(f => {
      const val = formData.get(f.name);
      if (val && typeof val === 'string') details[f.name] = val;
    });
    try {
      const response = await fetch("/api/organization-donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, details }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Donation submitted successfully:", result);
      setSuccess(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to submit donation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex flex-col items-center justify-start pt-12">
      <div className="w-full max-w-3xl bg-white bg-opacity-70 rounded-2xl shadow-lg p-8 mt-8">
        <Link href={getBackHref()} className="inline-block mb-6">
          <span className="text-blue-600 hover:underline font-medium">← Back to Manage Donations</span>
        </Link>
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">{item === "cookedfood" ? "Add Organization Donation" : "Donate Your Goods"}</h1>
        <div className="flex justify-center">
          <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow p-8 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-6">{config.title}</h2>
            {config.fields.map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className={`w-full mb-4 px-4 py-2 border ${config.borderColor} rounded focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-900 placeholder:text-gray-900`}
                required
              />
            ))}
            {/* Picture upload removed for now to ensure backend compatibility */}
            <div className="flex w-full gap-4 mt-2">
              <button
                type="button"
                className="flex-1 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                onClick={() => window.history.back()}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded bg-blue-400 text-white font-semibold hover:bg-blue-500 transition"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Donation"}
              </button>
            </div>
            {success && <div className="text-green-600 font-semibold mt-4">Donation submitted!</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default function DonateFormPageWithSuspense() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DonateFormPage />
    </Suspense>
  );
}
