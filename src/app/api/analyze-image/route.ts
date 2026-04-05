import { NextResponse } from "next/server";

export const runtime = "nodejs";

type MaterialCount = {
  name: string;
  count: number;
};

function normalizeMaterialCounts(value: unknown): MaterialCount[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") {
        return null;
      }

      const name = "name" in entry ? entry.name : undefined;
      const count = "count" in entry ? entry.count : undefined;

      if (typeof name !== "string" || typeof count !== "number" || count <= 0) {
        return null;
      }

      return {
        name: name.trim(),
        count: Math.round(count),
      };
    })
    .filter((entry): entry is MaterialCount => Boolean(entry?.name));
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  const form = await request.formData();
  const file = form.get("image") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No image file was provided.", items: [], counts: [] }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Image analysis is unavailable because GEMINI_API_KEY or GOOGLE_API_KEY is missing in .env.local.",
        items: [],
        counts: [],
      },
      { status: 503 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: 'Analyze this image and identify only physical items that people commonly donate, such as books, clothes, toys, shoes, utensils, electronics, furniture, bags, or groceries. Ignore background elements like floors, walls, tables, shelves, scenery, and lighting. Return strict JSON in this exact shape: {"items":[{"name":"item name","count":number}]}. Use one entry per item type and include your best estimated count for each item visible in the image.'
              },
              {
                inline_data: {
                  mime_type: file.type,
                  data: base64,
                },
              },
            ],
          },
        ],
      }),
    }
  );

  if (!resp.ok) {
    const error = await resp.text();
    console.error(error);
    return NextResponse.json(
      { error: "Gemini analysis request failed.", items: [], counts: [] },
      { status: 502 }
    );
  }

  const json = await resp.json();

  const text =
    json.candidates?.[0]?.content?.parts?.[0]?.text || "";

  let counts: MaterialCount[] = [];

  try {
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    counts = normalizeMaterialCounts(parsed.items);
  } catch {
    const fallbackItems = text
      .split(",")
      .map((i: string) => i.trim())
      .filter(Boolean);

    counts = fallbackItems.map((name) => ({ name, count: 1 }));
  }

  const items = counts.map((entry) => entry.name);

  return NextResponse.json({ items, counts });
}
