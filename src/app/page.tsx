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

async function getFeaturedZimmers() {
  try {
    return await prisma.zimmer.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' }
    }) as unknown as Zimmer[];
  } catch (error) {
    console.error("Failed to fetch zimmers:", error);
    return [];
  }
}

export default async function Home() {
  const featuredZimmers = await getFeaturedZimmers();

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("/images/zimmer1.png") center/cover no-repeat'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'max(3rem, 5vw)', 
            fontWeight: 800, 
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.1
          }}>
            חוויית <span style={{ color: 'var(--color-primary)' }}>יוקרה</span><br />
            שטרם הכרתם
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--color-text-muted)', 
            maxWidth: '600px', 
            margin: '0 auto 2rem' 
          }}>
            גלו את הצימרים האקסקלוסיביים ביותר, שנבחרו בקפידה עבור הנוחות והשלווה שלכם.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="/zimmers" className="btn btn-primary">גלו את הצימרים</a>
            <a href="/login" className="btn btn-secondary">כניסת מנהל</a>
          </div>
        </div>
      </section>

      {/* Featured Zimmers Section */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '3rem' 
          }}>
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>חופשות <span style={{ color: 'var(--color-primary)' }}>נבחרות</span></h2>
              <p style={{ color: 'var(--color-text-muted)' }}>מבחר מוקפד של הנכסים המרהיבים ביותר שלנו.</p>
            </div>
            <a href="/zimmers" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>צפו בהכל &larr;</a>
          </div>

          {featuredZimmers.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem' 
            }}>
              {featuredZimmers.map(zimmer => (
                <ZimmerCard key={zimmer.id} zimmer={zimmer} />
              ))}
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>אנו מכינים כעת את הרשימות האקסקלוסיביות שלנו.</p>
              <a href="/zimmers" className="btn btn-primary">בדקו שוב מאוחר יותר</a>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '6rem 0', background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>ההבטחה של <span style={{ color: 'var(--color-primary)' }}>צימר-לוקס</span></h2>
            <div style={{ width: '60px', height: '3px', background: 'var(--color-primary)', margin: '0 auto' }}></div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '3rem' 
          }}>
            {[
              { title: "פרטיות ללא תחרות", desc: "כל נכס נבדק כדי להבטיח התבודדות ושקט מוחלטים." },
              { title: "יוקרה טהורה", desc: "ממתקנים מתקדמים ועד נופים עוצרי נשימה, איננו מתפשרים." },
              { title: "חוויה חלקה", desc: "תקשורת ישירה ורישומים מאומתים לשקט הנפשי שלכם." }
            ].map((feature, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
