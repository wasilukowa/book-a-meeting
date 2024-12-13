'use client';
import { format, set } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Slot } from './Slot/Slot';
import { Header } from '../Header/Header';
import { useState } from 'react';
import { TimeSlot } from '../../types';

export default function ColumnActive({
  date,
  hours,
  preparedSlots,
  selectedSlots,
  setPreparedSlots,
}) {
  const [choosenSlots, setChoosenSlots] = useState([]);

  const [localPreparedSlots, setLocalPreparedSlots] = useState([
    ...preparedSlots,
  ]);

  const handleSlotClick = (id: TimeSlot) => {
    const clickedSlot = localPreparedSlots.find((slot) => slot.id === id);

    // Najpierw aktualizujemy isChoosen dla klikniętego slotu
    const slotsWithUpdatedChoosen = localPreparedSlots.map((slot) => ({
      ...slot,
      isChoosen: slot.id === id ? !slot.isChoosen : slot.isChoosen,
    }));

    // Teraz aktualizujemy isSelectable
    const newSlots = slotsWithUpdatedChoosen.map((slot, index, array) => {
      if (index === 0) return slot; // pierwszy slot zostawiamy bez zmian

      const prevSlot = array[index - 1];

      // Jeśli poprzedni slot jest false, ten i wszystkie następne też będą false
      if (!prevSlot.isSelectable) {
        return {
          ...slot,
          isSelectable: false,
        };
      }

      // W przeciwnym razie zachowujemy wartość z poprzedniego slotu
      return {
        ...slot,
        isSelectable: prevSlot.isSelectable,
      };
    });

    // Aktualizacja choosenSlots
    const isSlotChoosen = choosenSlots.some((slot) => slot.id === id);
    if (!isSlotChoosen) {
      setChoosenSlots((prev) => [...prev, clickedSlot]);
    } else {
      setChoosenSlots((prev) => {
        const updated = prev.filter((slot) => slot.id !== id);
        if (updated.length === 0) {
          setLocalPreparedSlots([...preparedSlots]);
        }
        return updated;
      });
    }

    setLocalPreparedSlots(newSlots);
  };

  const newTime = new Date().getTime();
  // console.log('newTime =>', newTime);
  // console.log('date =>', date.getTime());
  // console.log(newTime > date.getTime());
  return (
    <div key={date.toISOString()} className="space-y-0.5">
      <Header date={date} isActive={true} />
      {hours.map((time) => {
        const currentSlot = localPreparedSlots.find(
          (slot) =>
            slot.date === format(date, 'yyyy-MM-dd') && slot.time === time,
        );

        const slotOptions = {
          isAvailable: currentSlot?.isAvailable,
          isSelectable: currentSlot?.isSelectable,
          isChoosen: currentSlot?.isChoosen,
        };
        return (
          <Slot
            key={`${date.toISOString()}-${time}`}
            id={currentSlot?.id}
            handleClick={handleSlotClick}
            slotOptions={slotOptions}
            date={date}
            time={time}
          />
          // <div key={`${date.toISOString()}-${time}`}>
          //   {' '}
          //   <div
          //     key={`${date.toISOString()}-${time}`}
          //     className={`h-6 relative
          //     ${time.endsWith(':45') ? 'border-b-2 border-[#B0B0B0]' : ''}
          //     ${
          //       false
          //         ? 'bg-[#D3D3D3]'
          //         : isSelected
          //         ? 'bg-[#075c07] cursor-pointer'
          //         : currentSlot?.isSelectable
          //         ? 'bg-[#5ce167] hover:bg-[#086e08] cursor-pointer'
          //         : currentSlot?.isAvailable
          //         ? 'bg-[#7c7c7c] cursor-pointer'
          //         : ''
          //     }
          //   `}
          //     onClick={() => handleSlotClick(currentSlot!)}
          //     title={
          //       currentSlot?.isAvailable
          //         ? `${format(date, 'dd.MM.yyyy')} ${time}`
          //         : ''
          //     }
          //   />
          // </div>
        );
      })}
    </div>
  );
}
