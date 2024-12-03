import { Suspense } from 'react';
import BookingForm from '@/components/BookingForm';

export default async function BookingPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Rezerwacja spotkania</h1>

        <div className="bg-secondary/20 p-4 rounded-lg mb-8">
          <p>Zalogowano jako: {userId}</p>
        </div>

        <Suspense fallback={<div>Ładowanie formularza rezerwacji...</div>}>
          <BookingForm userId={userId} />
        </Suspense>
      </div>
    </div>
  );
}
