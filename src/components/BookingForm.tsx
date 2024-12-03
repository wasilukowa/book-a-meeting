'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TimeSlot, BookingFormProps } from './types';

export default function BookingForm({ userId }: BookingFormProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Tymczasowe dane do testów
  const availableSlots: TimeSlot[] = [
    {
      id: '1',
      date: '2024-02-20',
      time: '10:00',
      isAvailable: true,
    },
    {
      id: '2',
      date: '2024-02-20',
      time: '12:00',
      isAvailable: false,
    },
    // możesz dodać więcej przykładowych slotów
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Rezerwacja:', { userId, selectedSlot, notes });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Wybierz termin spotkania</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableSlots.map((slot) => (
            <label
              key={slot.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors
                ${!slot.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}
                ${
                  selectedSlot === slot.id
                    ? 'border-primary bg-primary/10'
                    : 'hover:bg-secondary/20'
                }
              `}
            >
              <input
                type="radio"
                name="timeSlot"
                value={slot.id}
                disabled={!slot.isAvailable}
                checked={selectedSlot === slot.id}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="mr-2"
              />
              {new Date(slot.date).toLocaleDateString('pl-PL')} o {slot.time}
            </label>
          ))}
        </div>
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

      <Button type="submit" className="w-full" disabled={!selectedSlot}>
        Zarezerwuj spotkanie
      </Button>
    </form>
  );
}
