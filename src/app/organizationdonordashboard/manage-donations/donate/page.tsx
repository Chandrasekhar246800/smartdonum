"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { Suspense } from "react";

type MaterialCount = {
  name: string;
  count: number;
};

type FormConfig = {
  title: string;
  description: string;
  accentClass: string;
  fields: {
    label: string;
    name: string;
    type: string;
    placeholder: string;
  }[];
};

const formConfigs: Record<string, FormConfig> = {
  books: {
    title: "Donate Books",
    description: "Share books that can support classrooms, libraries, and learning programs.",
    accentClass: "from-sky-500 to-cyan-500",
    fields: [
      {
        label: "Class (e.g. 5th, 10th)",
        name: "class",
        type: "text",
        placeholder: "Class (e.g. 5th, 10th)",
      },
      {
        label: "Number of Books",
        name: "number",
        type: "number",
        placeholder: "Number of Books",
      },
      {
        label: "Subjects (comma separated)",
        name: "subjects",
        type: "text",
        placeholder: "Subjects (comma separated)",
      },
    ],
  },
  clothes: {
    title: "Donate Clothes",
    description: "Provide clothing details so NGOs can sort and distribute quickly.",
    accentClass: "from-emerald-500 to-teal-500",
    fields: [
      {
        label: "Size (e.g. S, M, L, XL)",
        name: "size",
        type: "text",
        placeholder: "Size (e.g. S, M, L, XL)",
      },
      {
        label: "Number of Clothes",
        name: "number",
        type: "number",
        placeholder: "Number of Clothes",
      },
      {
        label: "Condition (e.g. New, Used)",
        name: "condition",
        type: "text",
        placeholder: "Condition (e.g. New, Used)",
      },
    ],
  },
  packedfood: {
    title: "Donate Packed Food",
    description: "Submit packaged food with expiry details to help safe distribution.",
    accentClass: "from-amber-500 to-orange-500",
    fields: [
      {
        label: "Type of Food (e.g. Biscuits, Canned)",
        name: "type",
        type: "text",
        placeholder: "Type of Food (e.g. Biscuits, Canned)",
      },
      {
        label: "Number of Packs",
        name: "number",
        type: "number",
        placeholder: "Number of Packs",
      },
      {
        label: "Expiry Date",
        name: "expiry",
        type: "date",
        placeholder: "Expiry Date",
      },
    ],
  },
  cookedfood: {
    title: "Donate Cooked Food",
    description: "Share freshly prepared food details for immediate relief coordination.",
    accentClass: "from-orange-500 to-rose-500",
    fields: [
      {
        label: "Type of Cooked Food (e.g. Rice, Curry)",
        name: "type",
        type: "text",
        placeholder: "Type of Cooked Food (e.g. Rice, Curry)",
      },
      {
        label: "Quantity (number of servings)",
        name: "quantity",
        type: "number",
        placeholder: "Quantity (number of servings)",
      },
      {
        label: "Prepared At",
        name: "preparedAt",
        type: "datetime-local",
        placeholder: "Prepared At",
      },
    ],
  },
  toys: {
    title: "Donate Toys",
    description: "Add toy details to make review and distribution easier for partner NGOs.",
    accentClass: "from-indigo-500 to-blue-500",
    fields: [
      {
        label: "Type of Toy (e.g. Doll, Car)",
        name: "type",
        type: "text",
        placeholder: "Type of Toy (e.g. Doll, Car)",
      },
      {
        label: "Number of Toys",
        name: "number",
        type: "number",
        placeholder: "Number of Toys",
      },
      {
        label: "Condition (e.g. New, Used)",
        name: "condition",
        type: "text",
        placeholder: "Condition (e.g. New, Used)",
      },
    ],
  },
};

function getBackHref() {
  return "/organizationdonordashboard";
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unable to read file."));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });
}

function mergeMaterialCounts(materialGroups: MaterialCount[][]) {
  const merged = new Map<string, number>();

  materialGroups.flat().forEach(({ name, count }) => {
    const normalizedName = name.trim();

    if (!normalizedName) {
      return;
    }

    merged.set(normalizedName, (merged.get(normalizedName) ?? 0) + count);
  });

  return Array.from(merged.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

function DonateFormPage() {
  const searchParams = useSearchParams();
  const item = searchParams.get("item") || "books";
  const config = formConfigs[item] || formConfigs.books;

  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [analysisCounts, setAnalysisCounts] = React.useState<MaterialCount[]>([]);
  const [analysisError, setAnalysisError] = React.useState("");
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) {
      setImageFiles([]);
      setImagePreviews([]);
      setAnalysisCounts([]);
      setAnalysisError("");
      setAnalyzing(false);
      return;
    }

    setImageFiles(files);
    setAnalysisCounts([]);
    setAnalysisError("");
    setAnalyzing(true);

    try {
      const previews = await Promise.all(files.map(readFileAsDataUrl));
      setImagePreviews(previews);

      const analysisResults = await Promise.all(
        files.map(async (file) => {
          const form = new FormData();
          form.append("image", file);

          const res = await fetch("/api/analyze-image", {
            method: "POST",
            body: form,
          });

          const json = await res.json();

          if (!res.ok) {
            throw new Error(json.error || "Image analysis request failed.");
          }

          return Array.isArray(json.counts) ? (json.counts as MaterialCount[]) : [];
        })
      );

      const merged = mergeMaterialCounts(analysisResults);
      setAnalysisCounts(merged);

      if (merged.length === 0) {
        setAnalysisError("No clear donation materials were detected from these images. You can still submit manually.");
      }
    } catch (err) {
      console.error("analysis failed", err);
      setAnalysisCounts([]);
      setAnalysisError(
        err instanceof Error
          ? err.message
          : "We could not analyze these images, but you can still submit the donation."
      );
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const details: Record<string, string | string[] | MaterialCount[]> = {};

    config.fields.forEach((field) => {
      const value = formData.get(field.name);
      if (value && typeof value === "string") {
        details[field.name] = value;
      }
    });

    if (imageFiles.length > 0) {
      const images = await Promise.all(imageFiles.map(readFileAsDataUrl));
      details.image = images[0];
      details.images = images;
    }

    if (analysisCounts.length > 0) {
      details.analysis = analysisCounts.map(({ name }) => name);
      details.analysisCounts = analysisCounts;
    }

    try {
      const response = await fetch("/api/organization-donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, details }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit donation.");
      }

      setSuccess(true);
      form.reset();
      setImageFiles([]);
      setImagePreviews([]);
      setAnalysisCounts([]);
      setAnalysisError("");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to submit donation.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_24%),linear-gradient(180deg,#ecf9ff_0%,#eaf7ff_42%,#f6fbff_100%)] px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-6xl">
        <Link
          href={getBackHref()}
          className="inline-flex items-center rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:text-sky-700"
        >
          &larr; Back to Dashboard
        </Link>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-white/80 bg-[linear-gradient(135deg,rgba(221,244,255,0.96),rgba(233,248,255,0.92),rgba(227,252,244,0.84))] p-7 shadow-[0_26px_60px_rgba(14,165,233,0.12)] sm:p-10">
            <span className="inline-flex rounded-full border border-sky-200 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
              Organization Donation
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
              {config.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              {config.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-sky-200/80 bg-[linear-gradient(180deg,#ebf8ff_0%,#f6fbff_100%)] p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step 1
                </p>
                <p className="mt-2 font-semibold text-slate-900">Add donation details</p>
              </div>
              <div className="rounded-2xl border border-cyan-200/80 bg-[linear-gradient(180deg,#e7faff_0%,#f3fbff_100%)] p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step 2
                </p>
                <p className="mt-2 font-semibold text-slate-900">Upload one or more images</p>
              </div>
              <div className="rounded-2xl border border-emerald-200/80 bg-[linear-gradient(180deg,#e6fbf3_0%,#f3fff9_100%)] p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Step 3
                </p>
                <p className="mt-2 font-semibold text-slate-900">Review Gemini-detected items</p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_56px_rgba(148,163,184,0.16)] backdrop-blur sm:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <div className={`inline-flex rounded-2xl bg-gradient-to-r ${config.accentClass} px-4 py-2 text-sm font-semibold text-white shadow-lg`}>
                  {config.title}
                </div>
              </div>

              {config.fields.map((field) => (
                <label key={field.name} className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    {field.label}
                  </span>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    className="w-full rounded-2xl border border-sky-200 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-4 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                    required
                  />
                </label>
              ))}

              <div className="rounded-2xl border border-dashed border-sky-300 bg-[linear-gradient(180deg,#eef9ff_0%,#f8fcff_100%)] p-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Upload donation images
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={submitting}
                    className="w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-sky-600 file:px-4 file:py-2.5 file:font-semibold file:text-white file:shadow-sm hover:file:bg-sky-700"
                  />
                </label>
                <p className="mt-2 text-sm text-slate-500">
                  Upload clear photos so the system can automatically detect donation materials.
                </p>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={`${preview}-${index}`}
                      className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm"
                    >
                      <img
                        src={preview}
                        alt={`Donation preview ${index + 1}`}
                        className="h-28 w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {analyzing && (
                <div className="rounded-2xl border border-cyan-200 bg-[linear-gradient(180deg,#ebf8ff_0%,#f5fbff_100%)] px-4 py-3 text-sm font-medium text-cyan-800">
                  Analyzing uploaded image{imageFiles.length > 1 ? "s" : ""}...
                </div>
              )}

              {analysisError && (
                <div className="rounded-2xl border border-amber-200 bg-[linear-gradient(180deg,#fff8e8_0%,#fffdf5_100%)] px-4 py-3 text-sm text-amber-800">
                  {analysisError}
                </div>
              )}

              {analysisCounts.length > 0 && (
                <div className="rounded-2xl border border-emerald-200 bg-[linear-gradient(180deg,#ebfff5_0%,#f6fffa_100%)] px-4 py-4">
                  <p className="text-sm font-semibold text-slate-800">Detected materials</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {analysisCounts.map((entry) => (
                      <span
                        key={entry.name}
                        className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-emerald-800 shadow-sm"
                      >
                        {entry.name} ({entry.count})
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  className="flex-1 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-200"
                  onClick={() => window.history.back()}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-2xl bg-[linear-gradient(135deg,#0284c7,#0f766e)] px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-700/20 transition hover:brightness-95 disabled:opacity-70"
                  disabled={submitting || analyzing}
                >
                  {submitting ? "Submitting..." : "Submit Donation"}
                </button>
              </div>

              {success && (
                <div className="rounded-2xl border border-emerald-200 bg-[linear-gradient(180deg,#ebfff5_0%,#f6fffa_100%)] px-4 py-3 text-sm font-semibold text-emerald-700">
                  Donation submitted successfully.
                </div>
              )}
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function DonateFormPageWithSuspense() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading...</div>}>
      <DonateFormPage />
    </Suspense>
  );
}
