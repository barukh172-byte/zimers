"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword = await bcrypt_1.default.hash("admin123", 10);
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
        console.log("Seeded Zimmers:", zimmers.map(z => z.name).join(", "));
    }
    console.log("Admin seeded:", admin.email);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
