import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import BookingCalendar from "@/components/BookingCalendar";
import ReviewsSection from "@/components/ReviewsSection";

async function getZimmer(id: string) {
  try {
    return await prisma.zimmer.findUnique({
      where: { id }
    });
  } catch (error) {
    return null;
  }
}

export default async function ZimmerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const zimmer = await getZimmer(params.id) as any;

  if (!zimmer) {
    notFound();
  }

  const amenitiesList = zimmer.amenities.split(',').map(a => a.trim());

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <Link href="/zimmers" style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem'
      }}>
        חזרה לכל הצימרים &rarr;
      </Link>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '4rem',
        alignItems: 'start'
      }}>
        {/* Left: Images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card" style={{ 
            height: '550px', 
            overflow: 'hidden',
            borderRadius: 'var(--border-radius-xl)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            {zimmer.imageUrl ? (
              <img 
                src={zimmer.imageUrl} 
                alt={zimmer.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ 
                height: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                background: 'var(--color-surface)',
                color: 'var(--color-text-muted)'
              }}>
                תמונות פרימיום יעלו בקרוב
              </div>
            )}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
             <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
                <div style={{ color: 'var(--color-primary)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>★ {zimmer.rating}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>מתוך {zimmer.reviewsCount} ביקורות</div>
             </div>
             <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--border-radius-lg)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 600 }}>בריכה {zimmer.poolType || 'ללא'}</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{zimmer.suitableFor || 'מתאים לכולם'}</div>
             </div>
          </div>
        </div>

        {/* Right: Info & Booking */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1.1, letterSpacing: '-0.02em' }}>{zimmer.name}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', color: 'var(--color-primary)', fontWeight: 600, fontSize: '1.1rem' }}>
              <span style={{ direction: 'ltr' }}>₪{zimmer.price} / לילה</span>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', opacity: 0.5 }}></span>
              <span>עד {zimmer.capacity} אורחים</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>תיאור הנכס</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.1rem' }}>{zimmer.description}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>מה מחכה לכם כאן</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {amenitiesList.map((amenity, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  fontSize: '1rem',
                  color: 'var(--color-text-muted)'
                }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '1.2rem' }}>✔</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <BookingCalendar pricePerNight={zimmer.price} zimmerId={zimmer.id} />
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewsSection zimmerId={zimmer.id} />
    </div>
  );
}
