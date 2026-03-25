import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcrypt";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "barukh175@gmail.com" },
    update: { password: hashedPassword },
    create: {
      email: "barukh175@gmail.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  await prisma.reservation.deleteMany({});
  await prisma.zimmer.deleteMany({});

  const zimmers = await Promise.all([
    prisma.zimmer.create({
      data: {
        name: "בקתת עץ וזהב פרימיום",
        description: "בקתת עץ יוקרתית המשלבת אלמנטים מודרניים של זהב ושחור. מושלמת לזוגות המחפשים חופשה שקטה ורומנטית ברמה הגבוהה ביותר.",
        price: 1500,
        capacity: 2,
        imageUrl: "/images/zimmer1.png",
        amenities: "Wi-Fi, ג'קוזי מול הנוף, נוף ליער, אח עצים, מכונת אספרסו",
        isAvailable: true,
        poolType: "מחוממת ומקורה",
        suitableFor: "זוגות בלבד",
        rating: 4.9,
        reviewsCount: 34
      }
    }),
    prisma.zimmer.create({
      data: {
        name: "סוויטת הבוטיק הכהה",
        description: "סוויטת בוטיק יוקרתית ואינטימית בעיצוב כהה ומודרני, משלבת טקסטורות עץ ואבן לחוויית ריזורט אקסקלוסיבית.",
        price: 1850,
        capacity: 4,
        imageUrl: "/images/zimmer2.png",
        amenities: "Wi-Fi, בריכת אינפיניטי, עיצוב 8K, חלוקים יוקרתיים, מיטת סופר-קינג",
        isAvailable: true,
        poolType: "פרטית",
        suitableFor: "גם וגם",
        rating: 5.0,
        reviewsCount: 18
      }
    })
  ]);
  console.log("Seeded Zimmers:", zimmers.map(z => z.name).join(", "));

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
