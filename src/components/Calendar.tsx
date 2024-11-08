'use client';
import { useEffect, useState } from 'react';

interface CalendarEvent {
  summary: string;
  start: {
    dateTime: string;
  };
}

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/calendar');
      const data = await response.json();
      setEvents(data.items || []);
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Twoje wydarzenia</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.summary} - {new Date(event.start.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
