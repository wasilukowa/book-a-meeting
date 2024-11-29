'use client';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { EventForm } from '@/components';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import pl from 'date-fns/locale/pl';
import { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  pl: pl,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Event = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
};

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/calendar');
      if (!response.ok) throw new Error('Błąd podczas pobierania wydarzeń');
      const data = await response.json();

      const formattedEvents =
        data.items?.map((event: any) => ({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
          description: event.description,
        })) || [];

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Błąd:', error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchEvents();
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Ładowanie...</div>;
  }

  if (!session) {
    router.push('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Twój Kalendarz</h1>
        <div className="flex items-center gap-4">
          <span>Witaj, {session.user?.name}!</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Wyloguj
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Dodaj nowe wydarzenie</h2>
          <EventForm onSuccess={fetchEvents} />
        </div>
      </div>
    </div>
  );
}
