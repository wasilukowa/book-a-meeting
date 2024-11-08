'use client';
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  View,
} from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import pl from 'date-fns/locale/pl';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

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

interface Event {
  title: string;
  start: Date;
  end: Date;
}

export const Calendar = () => {
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const events: Event[] = [
    {
      title: 'Przykładowe spotkanie',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)), // kończy się za godzinę
    },
  ];

  const handleNavigate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <div style={{ height: '600px', margin: '20px' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="pl"
        date={date}
        view={view}
        onNavigate={handleNavigate}
        onView={handleViewChange}
        messages={{
          next: 'Następny',
          previous: 'Poprzedni',
          today: 'Dziś',
          month: 'Miesiąc',
          week: 'Tydzień',
          day: 'Dzień',
          agenda: 'Agenda',
          noEventsInRange: 'Brak wydarzeń w tym okresie',
        }}
        popup
        selectable
        style={{ height: '100%' }}
      />
    </div>
  );
};
