import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'צימר-לוקס - הזמנת צימרי יוקרה',
  description: 'הזמינו את חופשת היוקרה המושלמת שלכם.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <Navigation />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
