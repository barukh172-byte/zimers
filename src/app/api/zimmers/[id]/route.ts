import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

// GET /api/zimmers/[id] - Get details for a single zimmer
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const zimmer = await prisma.zimmer.findUnique({
      where: { id }
    });

    if (!zimmer) {
      return NextResponse.json({ error: "Zimmer not found" }, { status: 404 });
    }

    return NextResponse.json(zimmer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch zimmer" }, { status: 500 });
  }
}

// PUT /api/zimmers/[id] - Update a zimmer (Admin Only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, price, capacity, imageUrl, amenities, isAvailable } = body;

    const zimmer = await prisma.zimmer.update({
      where: { id },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        capacity: capacity ? parseInt(capacity) : undefined,
        imageUrl,
        amenities: Array.isArray(amenities) ? amenities.join(",") : amenities,
        isAvailable
      }
    });

    return NextResponse.json(zimmer);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update zimmer" }, { status: 500 });
  }
}

// DELETE /api/zimmers/[id] - Delete a zimmer (Admin Only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await getServerSession();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.zimmer.delete({
      where: { id }
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete zimmer" }, { status: 500 });
  }
}
