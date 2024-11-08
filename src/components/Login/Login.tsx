'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { LoginProps } from './types';
import { useEffect } from 'react';

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      onLoginSuccess?.();
    }
  }, [session, onLoginSuccess]);

  const handleGoogleLogin = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/',
        redirect: true,
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  if (status === 'loading') {
    return <div>Ładowanie...</div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span>Witaj, {session.user?.name}!</span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Wyloguj
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Zaloguj przez Google
    </button>
  );
};
