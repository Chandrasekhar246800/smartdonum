"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { Suspense } from "react";

type MaterialCount = {
  name: string;
  count: number;
};

const formConfigs: Record<
  string,
  {
    title: string;
    fields: {
      label: string;
      name: string;
      type: string;
      placeholder: string;
    }[];
    borderColor: string;
  }
> = {
  books: {
    title: "Donate Books",
    fields: [
      {
        label: "Book title",
        name: "title",
        type: "text",
        placeholder: "The title of the book",
      },
      {
        label: "Author",
        name: "author",
        type: "text",
        placeholder: "Author name",
      },
      {
        label: "Condition",
        name: "condition",
        type: "text",
        placeholder: "e.g. new, good, worn",
      },
    ],
    borderColor: "border-blue-300",
  },
  clothes: {
    title: "Donate Clothes",
    fields: [
      {
        label: "Item",
        name: "item",
        type: "text",
        placeholder: "e.g. t‑shirt, jacket",
      },
      { label: "Size", name: "size", type: "text", placeholder: "S, M, L…" },
      {
        label: "Condition",
        name: "condition",
        type: "text",
        placeholder: "e.g. new, used",
      },
    ],
    borderColor: "border-green-300",
  },
  // add any other categories you expect to support
};

function getBackHref() {
  // For public donor dashboard, always go back to manage donations
  return "/publicdonordashboard/manage-donations";
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
  const config = formConfigs[item] || formConfigs["books"];

  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  // new state for picture/analysis
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [analysisCounts, setAnalysisCounts] = React.useState<MaterialCount[]>([]);
  const [analysisError, setAnalysisError] = React.useState("");

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) {
      setImageFiles([]);
      setAnalysisCounts([]);
      setAnalysisError("");
      return;
    }

    setImageFiles(files);
    setAnalysisError("");
    setAnalysisCounts([]);

    try {
      const analysisResults = await Promise.all(
        files.map(async (file) => {
          const form = new FormData();
          form.append("image", file);

          const res = await fetch("/api/analyze-image", {
            method: "POST",
            body: form,
          });

          if (!res.ok) {
            throw new Error("Image analysis request failed.");
          }

          const json = await res.json();
          return Array.isArray(json.counts) ? (json.counts as MaterialCount[]) : [];
        })
      );

      setAnalysisCounts(mergeMaterialCounts(analysisResults));
    } catch (err) {
      console.error("analysis failed", err);
      setAnalysisCounts([]);
      setAnalysisError("We could not analyze this image, but you can still submit the donation.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const details: Record<string, string | string[] | MaterialCount[]> = {};
    config.fields.forEach((f) => {
      const val = formData.get(f.name);
      if (val && typeof val === "string") details[f.name] = val;
    });

    // attach image / analysis if we have them
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
      await fetch("/api/public-donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item, details }),
      });
      setSuccess(true);
      form.reset();
      setImageFiles([]);
      setAnalysisCounts([]);
      setAnalysisError("");
    } catch {
      alert("Failed to submit donation.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 flex flex-col items-center justify-start pt-12">
      <div className="w-full max-w-3xl bg-white bg-opacity-70 rounded-2xl shadow-lg p-8 mt-8">
        <Link href={getBackHref()} className="inline-block mb-6">
          <span className="text-blue-600 hover:underline font-medium">
            ← Back to Manage Donations
          </span>
        </Link>
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-8">
          Donate Your Goods
        </h1>
        <div className="flex justify-center">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white rounded-xl shadow p-8 flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-6">
              {config.title}
            </h2>
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

            {/* new image-upload section */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              disabled={submitting}
              className="w-full mb-4 text-gray-800
              file:bg-blue-600
              file:text-white
              file:px-4
              file:py-2
              file:border-0
              file:rounded
              file:cursor-pointer
              file:hover:bg-blue-700"
            />
            {analysisError && (
              <p className="w-full mb-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {analysisError}
              </p>
            )}
            {imageFiles.length > 0 && (
              <p className="w-full mb-3 text-sm text-gray-600">
                {imageFiles.length} image{imageFiles.length > 1 ? "s" : ""} selected
              </p>
            )}
            {analysisCounts.length > 0 && (
              <ul className="w-full rounded-md bg-blue-50 px-4 py-3 text-gray-800 mb-4">
                {analysisCounts.map((item) => (
                  <li key={item.name}>
                    Detected: {item.name} ({item.count})
                  </li>
                ))}
              </ul>
            )}

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
            {success && (
              <div className="text-green-600 font-semibold mt-4">
                Donation submitted!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

const DonateFormPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DonateFormPage />
  </Suspense>
);

export default DonateFormPageWithSuspense;
