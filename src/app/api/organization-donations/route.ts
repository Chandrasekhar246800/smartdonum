import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const donations = await prisma.donation.findMany({
    where: { donorType: "organization" },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(donations);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newDonation = await prisma.donation.create({
    data: {
      donorType: "organization",
      item: data.item,
      status: "pending",
      details: data.details ? data.details : {},
    },
  });
  return NextResponse.json(newDonation, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const updated = await prisma.donation.update({
    where: { id: Number(id) },
    data: { status },
  });
  return NextResponse.json(updated);
}
