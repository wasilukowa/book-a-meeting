import { NextResponse } from 'next/server';
import { TimeSlot } from '../../../components/BookingForm/types';

export async function GET() {
  const today = new Date();
  const slots: TimeSlot[] = [];
  let id = 1;

  // Generujemy sloty dla najbliższych 3 dni
  for (let day = 0; day < 3; day++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];

    // Dla dzisiejszego dnia zaczynamy od aktualnej godziny
    const startHour = day === 0 ? today.getHours() : 8;

    // Generujemy sloty od startHour do 18:00 co 15 minut
    for (let hour = startHour; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        // Dla pierwszego dnia i aktualnej godziny pomijamy minione minuty
        if (
          day === 0 &&
          hour === today.getHours() &&
          minute <= today.getMinutes()
        ) {
          continue;
        }

        // Losowo ustawiamy dostępność (50% szans na dostępny slot)
        const isAvailable = Math.random() < 0.5;

        const timeStr = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;

        slots.push({
          id: id.toString(),
          date: dateStr,
          time: timeStr,
          isAvailable: isAvailable,
        });

        id++;
      }
    }
  }

  return NextResponse.json(slots);
}
