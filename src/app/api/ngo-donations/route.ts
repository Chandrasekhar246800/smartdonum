import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET all donations (public and organization) for NGO dashboard
export async function GET() {
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(donations);
}
