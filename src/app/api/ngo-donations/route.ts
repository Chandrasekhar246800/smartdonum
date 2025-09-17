import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET all donations (public and organization) for NGO dashboard
export async function GET() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(donations);
}

// PATCH donation status
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    const updated = await prisma.donation.update({
      where: { id: Number(id) },
      data: { status },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Failed to update donation" }, { status: 500 });
  }
}
