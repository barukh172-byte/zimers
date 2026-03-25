import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
      where: { email: "admin@zimmer.com" },
      update: {},
      create: {
        email: "admin@zimmer.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const countZimmers = await prisma.zimmer.count();
    
    if (countZimmers === 0) {
      const zimmers = await Promise.all([
        prisma.zimmer.create({
          data: {
            name: "Rustic Wooden Cabin",
            description: "A beautiful wooden cabin overlooking the northern mountains. Perfect for couples seeking a quiet retreat.",
            price: 1200,
            capacity: 2,
            imageUrl: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800",
            amenities: "Wi-Fi, Hot Tub, Mountain View, Fireplace",
            isAvailable: true,
          }
        }),
        prisma.zimmer.create({
          data: {
            name: "Modern Desert Villa",
            description: "Stunning modern architecture placed right in the heart of the desert. Includes a private pool.",
            price: 1800,
            capacity: 4,
            imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800",
            amenities: "Wi-Fi, Private Pool, Desert View, AC, Kitchen",
            isAvailable: true,
          }
        })
      ]);
    }

    return NextResponse.json({ success: true, message: "Database seeded." });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
