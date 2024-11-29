'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

type FormData = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
};

type EventFormProps = {
  onSuccess?: () => void;
};

export const EventForm = ({ onSuccess }: EventFormProps) => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      console.log('Wysyłane dane:', formData); // debugging

      const response = await fetch('/api/calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Coś poszło nie tak');
      }

      // Wyczyść formularz po sukcesie
      setFormData({
        title: '',
        description: '',
        startTime: '',
        endTime: '',
      });

      alert('Wydarzenie zostało dodane!');
      onSuccess?.(); // Wywołaj callback po sukcesie
    } catch (err: any) {
      setError(err.message);
      console.error('Błąd:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block mb-1">Tytuł wydarzenia</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Opis</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block mb-1">Początek</label>
        <input
          type="datetime-local"
          value={formData.startTime}
          onChange={(e) =>
            setFormData({ ...formData, startTime: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Koniec</label>
        <input
          type="datetime-local"
          value={formData.endTime}
          onChange={(e) =>
            setFormData({ ...formData, endTime: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Dodawanie...' : 'Dodaj wydarzenie'}
      </button>
    </form>
  );
};
