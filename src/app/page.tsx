'use client';
import { useRouter } from 'next/navigation';
import Login from '@/components/Login';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { setToken } = useAuth();

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    router.push('/calendar');
  };

  return (
    <div className="container">
      <h1>System rezerwacji spotkań</h1>
      <Login onLoginSuccess={handleLoginSuccess} />
    </div>
  );
}
