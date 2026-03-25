import Link from "next/link";

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

export default function ZimmerCard({ zimmer }: { zimmer: Zimmer }) {
  const amenitiesList = zimmer.amenities.split(',').slice(0, 3); // Show top 3 amenities

  return (
    <div className="glass-card premium-hover" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      {/* Premium Badge */}
      {zimmer.rating >= 4.9 && (
        <div style={{ 
          position: 'absolute', 
          top: '1rem', 
          left: '1rem', 
          background: 'var(--color-primary)', 
          color: 'black', 
          padding: '0.2rem 0.6rem', 
          borderRadius: 'var(--border-radius-sm)',
          fontSize: '0.7rem',
          fontWeight: 800,
          zIndex: 2,
          boxShadow: '0 4px 10px rgba(212, 175, 55, 0.3)'
        }}>
          PREMIUM
        </div>
      )}

      <div style={{ height: '240px', backgroundColor: 'var(--color-surface)', position: 'relative' }}>
        {zimmer.imageUrl ? (
          <img 
            src={zimmer.imageUrl} 
            alt={zimmer.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            אין תמונה זמינה
          </div>
        )}
        <div style={{ 
          position: 'absolute', 
          bottom: '1rem', 
          right: '1rem', 
          background: 'rgba(0,0,0,0.8)', 
          backdropFilter: 'blur(4px)',
          padding: '0.4rem 0.8rem', 
          borderRadius: 'var(--border-radius-md)',
          fontWeight: 'bold',
          color: 'var(--color-primary)',
          direction: 'ltr',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}>
          ₪{zimmer.price} / לילה
        </div>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
            <h3 style={{ fontSize: '1.25rem' }}>{zimmer.name}</h3>
            {zimmer.rating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-primary)', fontSize: '0.875rem' }}>
                <span>★</span>
                <span>{zimmer.rating}</span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>({zimmer.reviewsCount})</span>
              </div>
            )}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            עד {zimmer.capacity} אורחים • {zimmer.suitableFor || 'מתאים לכולם'}
          </p>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', flex: 1 }}>
          {zimmer.poolType && zimmer.poolType !== 'ללא' && (
             <span style={{ 
              fontSize: '0.7rem', 
              border: '1px solid var(--color-primary)', 
              color: 'var(--color-primary)',
              padding: '0.15rem 0.45rem', 
              borderRadius: 'var(--border-radius-sm)',
              fontWeight: 600
            }}>
              בריכה {zimmer.poolType}
            </span>
          )}
          {amenitiesList.map((amenity, i) => (
            <span key={i} style={{ 
              fontSize: '0.75rem', 
              background: 'var(--color-surface)', 
              padding: '0.25rem 0.5rem', 
              borderRadius: 'var(--border-radius-sm)'
            }}>
              {amenity.trim()}
            </span>
          ))}
        </div>

        <Link href={`/zimmers/${zimmer.id}`} className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', textAlign: 'center' }}>
          פרטים נוספים והזמנה
        </Link>
      </div>
    </div>
  );
}
