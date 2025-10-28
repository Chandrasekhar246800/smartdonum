import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL not configured");
      return NextResponse.json({ 
        error: "Database not configured", 
        message: "Please configure DATABASE_URL in environment variables" 
      }, { status: 503 });
    }

    const donations = await prisma.donation.findMany({
      where: { donorType: "public" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(donations);
  } catch (error) {
    console.error("Error in GET /api/public-donations:", error);
    return NextResponse.json({ 
      error: "Database connection failed", 
      details: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/public-donations - Request received");
    
    if (!process.env.DATABASE_URL) {
      console.error("DATABASE_URL not configured");
      return NextResponse.json({ 
        error: "Database not configured", 
        message: "Please set up DATABASE_URL in your deployment environment" 
      }, { status: 503 });
    }

    const data = await req.json();
    console.log("Request data:", data);
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Database URL exists:", !!process.env.DATABASE_URL);
    
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
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    
    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const errorName = error instanceof Error ? error.name : "UnknownError";
    
    return NextResponse.json(
      { 
        error: "Failed to create donation", 
        details: errorMessage,
        errorType: errorName,
        timestamp: new Date().toISOString(),
        suggestion: "Check if DATABASE_URL is properly configured in your deployment environment"
      }, 
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
