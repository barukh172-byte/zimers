import ZimmerForm from "@/components/ZimmerForm";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";

async function getZimmer(id: string) {
  try {
    return await prisma.zimmer.findUnique({
      where: { id }
    });
  } catch (error) {
    return null;
  }
}

export default async function EditZimmerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession();
  
  if (!session) {
    redirect("/login");
  }

  const zimmer = await getZimmer(id);

  if (!zimmer) {
    notFound();
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <header style={{ marginBottom: '3rem' }}>
        <Link href="/admin" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', display: 'block', marginBottom: '1rem' }}>
          חזרה לפאנל הניהול &rarr;
        </Link>
        <h1 style={{ fontSize: '2.5rem' }}>עריכת <span style={{ color: 'var(--color-primary)' }}>נכס</span></h1>
        <p style={{ color: 'var(--color-text-muted)' }}>מעדכן את {zimmer.name}</p>
      </header>

      <ZimmerForm initialData={zimmer} />
    </div>
  );
}
