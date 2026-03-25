import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/reviews - Submit a review for a zimmer
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { zimmerId, name, rating, comment } = body;

    if (!zimmerId || !name || !rating || !comment) {
      return NextResponse.json({ error: "כל השדות הם חובה" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "דירוג חייב להיות בין 1 ל-5" }, { status: 400 });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        zimmerId,
        name,
        rating: parseInt(rating),
        comment,
      },
    });

    // Update zimmer's average rating and review count
    const allReviews = await prisma.review.findMany({
      where: { zimmerId },
      select: { rating: true },
    });

    const avgRating = allReviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / allReviews.length;

    await prisma.zimmer.update({
      where: { id: zimmerId },
      data: {
        rating: Math.round(avgRating * 10) / 10,
        reviewsCount: allReviews.length,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("POST Review Error:", error);
    return NextResponse.json({ error: "שגיאה בשמירת הביקורת" }, { status: 500 });
  }
}

// GET /api/reviews?zimmerId=xxx - Get reviews for a specific zimmer
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zimmerId = searchParams.get("zimmerId");

  if (!zimmerId) {
    return NextResponse.json({ error: "zimmerId is required" }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { zimmerId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
