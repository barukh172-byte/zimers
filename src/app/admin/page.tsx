import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DeleteZimmerButton from "@/components/DeleteZimmerButton";

export default async function AdminDashboard() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  }

  const zimmers = await prisma.zimmer.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '3rem' 
      }}>
        <div>
          <h1 style={{ fontSize: '2.5rem' }}>פאנל <span style={{ color: 'var(--color-primary)' }}>מנהל</span></h1>
          <p style={{ color: 'var(--color-text-muted)' }}>סקירה וניהול של הנכסים שלכם.</p>
        </div>
        <Link href="/admin/new" className="btn btn-primary">
          + הוסף צימר חדש
        </Link>
      </header>

      <div className="glass" style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>שם הצימר</th>
              <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>מחיר</th>
              <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>תפוסה</th>
              <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}>סטטוס</th>
              <th style={{ padding: '1.25rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', textAlign: 'left' }}>פעולות</th>
            </tr>
          </thead>
          <tbody>
            {zimmers.map(zimmer => (
              <tr key={zimmer.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background var(--transition-fast)' }} className="hover-row">
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ fontWeight: 600 }}>{zimmer.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>נוצר ב-{new Date(zimmer.createdAt).toLocaleDateString('he-IL')}</div>
                </td>
                <td style={{ padding: '1.25rem', direction: 'ltr', textAlign: 'right' }}>₪{zimmer.price} / לילה</td>
                <td style={{ padding: '1.25rem' }}>{zimmer.capacity} אורחים</td>
                <td style={{ padding: '1.25rem' }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: 'var(--border-radius-sm)',
                    background: zimmer.isAvailable ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: zimmer.isAvailable ? 'var(--color-success)' : 'var(--color-error)',
                    border: `1px solid ${zimmer.isAvailable ? 'var(--color-success)' : 'var(--color-error)'}`
                  }}>
                    {zimmer.isAvailable ? 'זמין' : 'לא זמין'}
                  </span>
                </td>
                <td style={{ padding: '1.25rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', direction: 'rtl' }}>
                    <Link href={`/admin/edit/${zimmer.id}`} style={{ color: 'var(--color-primary)', fontSize: '0.875rem' }}>ערוך</Link>
                    <DeleteZimmerButton id={zimmer.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {zimmers.length === 0 && (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            לא נמצאו צימרים. התחילו בהוספת הצימר הראשון שלכם!
          </div>
        )}
      </div>


    </div>
  );
}
