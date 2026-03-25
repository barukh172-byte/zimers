import Link from "next/link";
import { getServerSession } from "next-auth";

export default async function Navigation() {
  const session = await getServerSession();

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '4rem'
      }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            צימר-<span style={{ color: 'var(--color-primary)' }}>לוקס</span>
          </Link>
          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--color-text-muted)' }}>
            <Link href="/" style={{ ':hover': { color: 'var(--color-primary)' } } as any}>ראשי</Link>
            <Link href="/zimmers" style={{ ':hover': { color: 'var(--color-primary)' } } as any}>הרשימה</Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {session ? (
            <>
              <Link href="/admin" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                פאנל ניהול
              </Link>
              <Link href="/api/auth/signout" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                התנתק
              </Link>
            </>
          ) : (
            <Link href="/login" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              כניסת מנהל
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
