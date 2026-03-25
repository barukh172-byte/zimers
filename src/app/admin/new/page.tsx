import ZimmerForm from "@/components/ZimmerForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function NewZimmerPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/admin" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'block', marginBottom: '1rem' }}>
          חזרה לפאנל הניהול &rarr;
        </Link>
        <h1 style={{ fontSize: '2.5rem' }}>הוסף <span style={{ color: 'var(--color-primary)' }}>נכס חדש</span></h1>
      </header>

      <ZimmerForm />
    </div>
  );
}
