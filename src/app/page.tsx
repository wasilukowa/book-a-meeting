'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleUserSelect = (userType: string) => {
    switch (userType) {
      case 'test-user-1':
      case 'test-user-2':
        router.push(`/booking/${userType}`);
        break;
      case 'calendar-owner':
        router.push('/dashboard');
        break;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">System rezerwacji spotkań</h1>

      <div className="flex flex-col gap-4 max-w-md mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Wybierz typ użytkownika:</h2>

        <Button
          variant="default"
          onClick={() => handleUserSelect('test-user-1')}
          className="w-full"
        >
          Test User 1
        </Button>

        <Button
          variant="default"
          onClick={() => handleUserSelect('test-user-2')}
          className="w-full"
        >
          Test User 2
        </Button>

        <Button
          variant="default"
          onClick={() => handleUserSelect('calendar-owner')}
          className="w-full"
        >
          Calendar Owner
        </Button>
      </div>
    </div>
  );
}
