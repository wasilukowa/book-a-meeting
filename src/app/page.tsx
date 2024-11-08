'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Login } from '@/components';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  // Automatyczne przekierowanie po zalogowaniu
  useEffect(() => {
    if (session) {
      router.push('/calendar');
    }
  }, [session, router]);

  const handleLoginSuccess = () => {
    // Przekierowanie nastąpi automatycznie dzięki useEffect
    console.log('Zalogowano pomyślnie!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">System rezerwacji spotkań</h1>
      <div className="mt-4">
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}
