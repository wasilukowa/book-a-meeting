'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TimeSlot } from '../BookingForm/types';
import { format, addDays, startOfWeek } from 'date-fns';
import { pl } from 'date-fns/locale';

type TimeGridProps = {
  slots: TimeSlot[];
};

export default function TimeGrid({ slots }: TimeGridProps) {
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { locale: pl }),
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generowanie godzin (8:00 - 18:00)
  const hours = Array.from({ length: 40 }, (_, index) => {
    const hour = Math.floor(index / 4) + 8;
    const minutes = (index % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  });

  // Generowanie dat dla całego tygodnia
  const dates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const handlePreviousWeek = () => {
    setStartDate((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setStartDate((prev) => addDays(prev, 7));
  };

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div className="w-full">
      {/* Nagłówek z nawigacją */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
          &lt; Poprzedni tydzień
        </Button>
        <span className="text-lg font-semibold">
          {format(dates[0], 'd MMMM', { locale: pl })} -{' '}
          {format(dates[6], 'd MMMM yyyy', { locale: pl })}
        </span>
        <Button variant="outline" size="sm" onClick={handleNextWeek}>
          Następny tydzień &gt;
        </Button>
      </div>

      {/* Siatka z terminami */}
      <div className="grid grid-cols-8 gap-0.5">
        {/* Kolumna z godzinami */}
        <div className="space-y-0.5">
          <div className="h-8"></div>
          {hours.map((time) => (
            <div
              key={time}
              className={`h-6 flex items-center justify-end pr-2 text-xs text-gray-500`}
            >
              {time.endsWith(':00') ? time : ''}
            </div>
          ))}
        </div>

        {/* Kolumny z dniami */}
        {dates.map((date) => (
          <div key={date.toISOString()} className="space-y-0.5">
            <div
              className={`h-8 flex items-center justify-center font-medium text-sm
                ${isWeekend(date) ? 'text-gray-400' : ''}`}
            >
              {format(date, 'EEEE', { locale: pl })}
              <br />
              {format(date, 'd MMM', { locale: pl })}
            </div>
            {hours.map((time) => {
              const slotId = `${format(date, 'yyyy-MM-dd')}-${time}`;
              const isAvailable =
                !isWeekend(date) &&
                slots.some(
                  (slot) =>
                    slot.date === format(date, 'yyyy-MM-dd') &&
                    slot.time === time &&
                    slot.isAvailable,
                );

              return (
                <div
                  key={slotId}
                  className={`h-6 rounded relative
                    ${time.endsWith(':45') ? 'border-b border-gray-100' : ''}
                    ${
                      isAvailable
                        ? 'hover:bg-green-100 cursor-pointer border border-gray-200 bg-green-50'
                        : ''
                    }
                    ${
                      selectedSlot === slotId
                        ? 'bg-green-500 hover:bg-green-600 border-green-600'
                        : ''
                    }
                    ${isWeekend(date) ? 'bg-gray-50' : ''}
                  `}
                  onClick={() => isAvailable && setSelectedSlot(slotId)}
                  title={
                    isAvailable ? `${format(date, 'dd.MM.yyyy')} ${time}` : ''
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
