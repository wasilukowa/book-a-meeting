'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { EventFormProps, FormData } from './types';

export const EventForm = ({ onSuccess }: EventFormProps) => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      alert('Musisz być zalogowany, aby dodać wydarzenie');
      return;
    }

    try {
      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify({
          formData,
        }), // nie musimy już wysyłać tokena osobno
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      alert('Wydarzenie zostało dodane!');
      onSuccess?.(); // wywołujemy callback jeśli istnieje

      // Opcjonalnie: wyczyść formularz po sukcesie
      setFormData({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
      });
    } catch (error: any) {
      alert('Wystąpił błąd: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Tytuł wydarzenia"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Opis wydarzenia"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />
      <input
        type="datetime-local"
        value={formData.startTime}
        onChange={(e) =>
          setFormData({ ...formData, startTime: e.target.value })
        }
        required
      />
      <input
        type="datetime-local"
        value={formData.endTime}
        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
        required
      />
      <button type="submit" disabled={!session}>
        {session ? 'Dodaj wydarzenie' : 'Zaloguj się, aby dodać wydarzenie'}
      </button>
    </form>
  );
};
