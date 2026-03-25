import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// GET /api/zimmers - List all zimmers with optional filtering
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const capacity = searchParams.get("capacity");
  
  try {
    const zimmers = await prisma.zimmer.findMany({
      where: capacity ? {
        capacity: { gte: parseInt(capacity) }
      } : {},
      orderBy: { createdAt: 'desc' }
    });
    
    return NextResponse.json(zimmers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch zimmers" }, { status: 500 });
  }
}

// POST /api/zimmers - Create a new zimmer (Admin Only)
export async function POST(request: Request) {
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, price, capacity, imageUrl, amenities, poolType, suitableFor } = body;

    if (!name || !price || !capacity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const zimmer = await prisma.zimmer.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        capacity: parseInt(capacity),
        imageUrl,
        amenities: Array.isArray(amenities) ? amenities.join(",") : amenities,
        poolType,
        suitableFor
      }
    });

    return NextResponse.json(zimmer, { status: 201 });
  } catch (error) {
    console.error("POST Zimmer Error:", error);
    return NextResponse.json({ error: "Failed to create zimmer" }, { status: 500 });
  }
}
