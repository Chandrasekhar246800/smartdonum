import { NextRequest, NextResponse } from "next/server";

// In-memory store for demo (replace with DB for production)
interface Donation {
  id: number;
  status: string;
  [key: string]: unknown;
}
const donations: Donation[] = [];

export async function GET() {
  return NextResponse.json(donations);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newDonation = { ...data, id: Date.now(), status: "pending" };
  donations.push(newDonation);
  return NextResponse.json(newDonation, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const idx = donations.findIndex(d => d.id === id);
  if (idx === -1) return NextResponse.json({ error: "Donation not found" }, { status: 404 });
  donations[idx].status = status;
  return NextResponse.json(donations[idx]);
}
