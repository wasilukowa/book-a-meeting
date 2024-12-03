'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TimeSlot, BookingFormProps } from './types';
import { getAvailableSlots } from '@/lib/api';
import TimeGrid from '../TimeGrid/TimeGrid';

export default function BookingForm({ userId }: BookingFormProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        setIsLoading(true);
        const availableSlots = await getAvailableSlots();
        setSlots(availableSlots);
      } catch (err) {
        setError('Nie udało się pobrać dostępnych terminów');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rezerwacja:', { userId, selectedSlot, notes });
    // Tutaj dodamy później logikę wysyłania rezerwacji
  };

  if (isLoading) {
    return <div>Ładowanie dostępnych terminów...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        {error}
        <Button onClick={() => window.location.reload()} className="ml-4">
          Spróbuj ponownie
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Wybierz termin spotkania</h2>

        <TimeGrid slots={slots} />
      </div>

      <div className="space-y-2">
        <label htmlFor="notes" className="block font-medium">
          Dodatkowe uwagi
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded-md"
          placeholder="Opcjonalne uwagi do spotkania..."
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!selectedSlot || isLoading}
      >
        Zarezerwuj spotkanie
      </Button>
    </form>
  );
}
