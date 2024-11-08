'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EventForm, Calendar } from '@/components';

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Przekieruj na stronę główną, jeśli użytkownik nie jest zalogowany
  if (status === 'loading') {
    return <div>Ładowanie...</div>;
  }

  if (!session) {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Twój Kalendarz</h1>
      <Calendar />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Dodaj nowe wydarzenie</h2>
        <EventForm
          onSuccess={() => {
            // Tutaj możesz dodać odświeżanie kalendarza
            // np. przez wywołanie funkcji pobierającej wydarzenia na nowo
          }}
        />
      </div>
    </div>
  );
}
