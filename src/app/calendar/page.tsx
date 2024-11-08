'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { EventForm, Calendar } from '@/components';
import { useAuth } from '@/context/AuthContext';

export default function CalendarPage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  return (
    <div className="container">
      <h1>Twój Kalendarz</h1>
      <Calendar />
      <EventForm token={token} />
    </div>
  );
}
