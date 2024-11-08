'use client';
import { useState } from 'react';
// import styles from './EventForm.module.css';
import { EventFormProps, FormData } from './types';

export const EventForm = ({ token }: EventFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
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
          formData,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      alert('Wydarzenie zostało dodane!');
    } catch (error) {
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
      />
      <input
        type="datetime-local"
        value={formData.endTime}
        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
      />
      <button type="submit">Dodaj wydarzenie</button>
    </form>
  );
};
