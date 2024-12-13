'use client';

import { useState } from 'react';
import { TimeSlot } from '../types';
import { format, addDays, startOfWeek, isWeekend } from 'date-fns';
import { da, is, pl } from 'date-fns/locale';
import { ColorWheelIcon } from '@radix-ui/react-icons';
import Column from './ColumnInactive/ColumnInactive';

import { getHours } from '@/lib/utils';
import TimeGridHeader from './TimeGridHeader/Header';
import ColumnInactive from './ColumnInactive/ColumnInactive';
import ColumnActive from './ColumActive/ColumnActive';

type TimeGridProps = {
  slots: TimeSlot[];
};

export default function TimeGrid({ slots }: TimeGridProps) {
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { locale: pl }),
  );
  const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);

  // Przygotowanie slotów z dodatkowym polem isSelectable
  const [preparedSlots, setPreparedSlots] = useState(
    slots.map((slot) => ({
      ...slot,
      isSelectable: slot.isAvailable,
      isChoosen: false,
    })),
  );

  // Generowanie dat dla całego tygodnia
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  // ----------------------------------------- mOje

  const isDayWeekend = (date: Date) => {
    const day = date.getDay(); // 0 = niedziela, 6 = sobota
    return day === 0 || day === 6;
  };

  const isDayActive = (date: Date) => {
    const currentDate = new Date();
    const startOfToday = new Date(currentDate.setHours(0, 0, 0, 0));

    const dateFromString = new Date(date);

    const isDayPast = dateFromString.getTime() < startOfToday.getTime();
    const isWeekend = isDayWeekend(dateFromString);
    return !isDayPast && !isWeekend;
  };

  // ----------------------------------------- mOje

  // Generowanie godzin (8:00 - 18:00)
  const hours = getHours();

  // const updateSlotsSelectability = (clickedSlot: TimeSlot) => {
  //   const clickedSlotIndex = hours.indexOf(clickedSlot.time);

  //   console.log(clickedSlotIndex);

  //   // Tworzymy nową tablicę slotów, którą będziemy modyfikować
  //   const updatedSlots = preparedSlots.map((slot) => ({
  //     ...slot,
  //     isSelectable: slot.isAvailable, // Resetujemy do wartości domyślnej
  //   }));

  //   // Sprawdzamy sloty przed klikniętym (do 3 slotów wstecz)
  //   for (let i = 1; i <= 3; i++) {
  //     const currentIndex = clickedSlotIndex - i;
  //     if (currentIndex < 0) break;

  //     const currentTime = hours[currentIndex];
  //     const previousSlot = preparedSlots.find(
  //       (slot) => slot.date === clickedSlot.date && slot.time === currentTime,
  //     );

  //     // Jeśli napotkamy niedostępny slot, wszystkie wcześniejsze stają się nieselectowalne
  //     if (!previousSlot?.isAvailable) {
  //       updatedSlots.forEach((slot) => {
  //         if (
  //           slot.date === clickedSlot.date &&
  //           hours.indexOf(slot.time) < currentIndex
  //         ) {
  //           slot.isSelectable = false;
  //         }
  //       });
  //       break;
  //     }
  //   }

  //   // Wszystkie sloty wcześniejsze niż 3 sloty przed klikniętym stają się nieselectowalne
  //   updatedSlots.forEach((slot) => {
  //     if (
  //       slot.date === clickedSlot.date &&
  //       hours.indexOf(slot.time) < clickedSlotIndex - 3
  //     ) {
  //       slot.isSelectable = false;
  //     }
  //   });

  //   return updatedSlots;
  // };

  // const handleSlotClick = (currentSlot: TimeSlot) => {
  //   if (currentSlot.isAvailable && currentSlot.isSelectable) {
  //     if (
  //       selectedSlots.some(
  //         (slot) =>
  //           slot.date === currentSlot.date && slot.time === currentSlot.time,
  //       )
  //     ) {
  //       // Odznaczanie slotu
  //       setSelectedSlots((prev) =>
  //         prev.filter(
  //           (slot) =>
  //             slot.date !== currentSlot.date || slot.time !== currentSlot.time,
  //         ),
  //       );
  //     } else {
  //       // Zaznaczanie slotu
  //       setSelectedSlots((prev) => [...prev, currentSlot]);
  //       // Aktualizujemy selectability slotów
  //       const updatedSlots = updateSlotsSelectability(currentSlot);
  //       setPreparedSlots(updatedSlots);
  //     }
  //   }
  // };
  return (
    <div className="w-full">
      <TimeGridHeader dates={weekDates} setStartDate={setStartDate} />

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
        {weekDates.map((date) => {
          const isActive = isDayActive(date);
          return isActive ? (
            <ColumnActive
              key={date.toISOString()}
              date={date}
              hours={hours}
              preparedSlots={preparedSlots}
              selectedSlots={selectedSlots}
              setPreparedSlots={setPreparedSlots}
            />
          ) : (
            <ColumnInactive
              key={date.toISOString()}
              date={date}
              hours={hours}
            />
          );
        })}
      </div>
    </div>
  );
}
