import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const donations = await prisma.donation.findMany({
    where: { donorType: "public" },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(donations);
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/public-donations - Request received");
    const data = await req.json();
    console.log("Request data:", data);
    
    const newDonation = await prisma.donation.create({
      data: {
        donorType: "public",
        item: data.item,
        status: "pending",
        details: data.details ? data.details : {},
      },
    });
    
    console.log("Donation created successfully:", newDonation);
    return NextResponse.json(newDonation, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/public-donations:", error);
    return NextResponse.json(
      { error: "Failed to create donation", details: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();
  const updated = await prisma.donation.update({
    where: { id: Number(id) },
    data: { status },
  });
  return NextResponse.json(updated);
}
