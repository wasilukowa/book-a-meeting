import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                ← Powrót do wyboru użytkownika
              </Button>
            </Link>
          </div>
          <h1 className="text-lg font-semibold">System rezerwacji spotkań</h1>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
