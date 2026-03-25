import ZimmerCard from "@/components/ZimmerCard";
import { prisma } from "@/lib/prisma";

interface Zimmer {
  id: string;
  name: string;
  price: number;
  capacity: number;
  imageUrl?: string | null;
  amenities: string;
  poolType?: string | null;
  suitableFor?: string | null;
  rating: number;
  reviewsCount: number;
}

async function getZimmers(searchParams: { capacity?: string, poolType?: string, suitableFor?: string }) {
  try {
    const where: any = {};
    if (searchParams.capacity) where.capacity = { gte: parseInt(searchParams.capacity) };
    if (searchParams.poolType && searchParams.poolType !== 'all') where.poolType = searchParams.poolType;
    if (searchParams.suitableFor && searchParams.suitableFor !== 'all') where.suitableFor = searchParams.suitableFor;

    return await prisma.zimmer.findMany({
      where,
      orderBy: { price: 'asc' }
    }) as unknown as Zimmer[];
  } catch (error) {
    console.error("Failed to fetch zimmers:", error);
    return [];
  }
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: { capacity?: string, poolType?: string, suitableFor?: string };
}) {
  const zimmers = await getZimmers(searchParams);

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>הקולקציות <span style={{ color: 'var(--color-primary)' }}>שלנו</span></h1>
        <p style={{ color: 'var(--color-text-muted)' }}>גלו את הרשימה המוקפדת שלנו של נכסי פרימיום.</p>
      </header>

      {/* Advanced Filter Bar */}
      <div className="glass" style={{ 
        padding: '2rem', 
        borderRadius: 'var(--border-radius-lg)', 
        marginBottom: '4rem',
        border: '1px solid rgba(212, 175, 55, 0.2)'
      }}>
        <form style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>מספר אורחים</label>
            <select name="capacity" className="input-base" defaultValue={searchParams.capacity || ""}>
              <option value="">הכל</option>
              <option value="1">+1 אורחים</option>
              <option value="2">+2 אורחים</option>
              <option value="4">+4 אורחים</option>
              <option value="6">+6 אורחים</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>סוג בריכה</label>
            <select name="poolType" className="input-base" defaultValue={searchParams.poolType || "all"}>
              <option value="all">הכל</option>
              <option value="פרטית">בריכה פרטית</option>
              <option value="מחוממת ומקורה">מחוממת ומקורה</option>
              <option value="ללא">ללא בריכה</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>מתאים ל...</label>
            <select name="suitableFor" className="input-base" defaultValue={searchParams.suitableFor || "all"}>
              <option value="all">הכל</option>
              <option value="זוגות בלבד">זוגות בלבד</option>
              <option value="משפחות">משפחות</option>
              <option value="גם וגם">גם וגם</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem' }}>החל סינון</button>
        </form>
      </div>

      {zimmers.length > 0 ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {zimmers.map(zimmer => (
            <ZimmerCard key={zimmer.id} zimmer={zimmer} />
          ))}
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '6rem', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>לא נמצאו נכסים התואמים לחיפוש שלך.</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>נסו לשנות את הסינון או חזרו מאוחר יותר.</p>
          <a href="/zimmers" className="btn btn-secondary">נקה סינון</a>
        </div>
      )}
    </div>
  );
}
