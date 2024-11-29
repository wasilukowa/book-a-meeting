'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/calendar');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <div>Ładowanie...</div>;
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Zaloguj przez Google
    </button>
  );
};
