import Link from "next/link";

export default function Footer() {
  return (
    <footer className="glass" style={{
      marginTop: 'auto',
      borderTop: '1px solid var(--color-border)',
      padding: '3rem 0',
      color: 'var(--color-text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          <div>
            <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.05em', color: 'var(--color-text)' }}>
              צימר-<span style={{ color: 'var(--color-primary)' }}>לוקס</span>
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
              חוו את הפסגה של חופשות הצימרים. רשימה אקסקלוסיבית למטיילים בעלי טעם אנין.
            </p>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>קישורים מהירים</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li><Link href="/">ראשי</Link></li>
              <li><Link href="/zimmers">כל הצימרים</Link></li>
              <li><Link href="/login">כניסת מנהל</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: 'var(--color-text)', marginBottom: '1rem' }}>צור קשר</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', direction: 'ltr', textAlign: 'right' }}>
              <li>contact@zimmerlux.co.il</li>
              <li>+972-555-0123</li>
              <li style={{ direction: 'rtl' }}>רמת הגולן, ישראל</li>
            </ul>
          </div>
        </div>
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
          textAlign: 'center',
          fontSize: '0.75rem'
        }}>
          &copy; {new Date().getFullYear()} צימר-לוקס. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
