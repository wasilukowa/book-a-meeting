'use client';
import { useState } from 'react';

export default function EventForm({ token }) {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          eventDetails,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      alert('Spotkanie zostało dodane!');
    } catch (error) {
      alert('Wystąpił błąd: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tytuł spotkania"
        value={eventDetails.title}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, title: e.target.value })
        }
      />
      <textarea
        placeholder="Opis spotkania"
        value={eventDetails.description}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, description: e.target.value })
        }
      />
      <input
        type="datetime-local"
        value={eventDetails.startTime}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, startTime: e.target.value })
        }
      />
      <input
        type="datetime-local"
        value={eventDetails.endTime}
        onChange={(e) =>
          setEventDetails({ ...eventDetails, endTime: e.target.value })
        }
      />
      <button type="submit">Dodaj spotkanie</button>
    </form>
  );
}
