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

  // const isSlotChoosen = (id: string) => {
  //   return choosenSlots.some((slot) => slot.id === id);
  // };

  // const manageChoosenSlots = (id: string) => {
  //   if (isSlotChoosen(id)) {
  //     setChoosenSlots((prev) => prev.filter((slot) => slot.id !== id));
  //   } else {
  //     setChoosenSlots((prev) => [...prev, id]);
  //   }
  // };

  const handleSlotClick = (id: TimeSlot) => {
    const clickedSlot = localPreparedSlots.find((slot) => slot.id === id);
    console.log(clickedSlot);

    const clickedSlotIndex = localPreparedSlots.findIndex(
      (slot) => slot.id === id,
    );

    // const slotsWithUpdatedChoosen = localPreparedSlots.map((slot) => ({
    //   ...slot,
    //   isChoosen: slot.id === id ? !slot.isChoosen : slot.isChoosen,
    // }));

    let isSlotSelectableFalseEncountered = false;
    const newSlots = localPreparedSlots.reduce((accumulator, slot, index) => {
      if (index < clickedSlotIndex) {
        return [...accumulator, { ...slot }];
      }

      if (index === clickedSlotIndex) {
        return [...accumulator, { ...slot, isChoosen: true }];
      }

      if (index > clickedSlotIndex) {
        const isPrevSlotSelectable = localPreparedSlots[index - 1].isSelectable;

        // if (!slot.isSelectable && !isSlotSelectableFalseEncountered) {
        //   console.log(
        //     index,
        //     '<- index',
        //     'slot.isSelectable=',
        //     slot.isSelectable,
        //   );
        //   isSlotSelectableFalseEncountered = true;
        // }

        if (
          isPrevSlotSelectable &&
          slot.isSelectable &&
          !isSlotSelectableFalseEncountered
        ) {
          console.log('!isPrevSlotSelectable', !isPrevSlotSelectable);
          console.log('slot.isSelectable', slot.isSelectable);
          console.log('slot.isSelectable', !isSlotSelectableFalseEncountered);

          console.log('wchodze w te pojebane warunki ziom');
          console.log('prevSlot:', localPreparedSlots[index - 1]);
          console.log('a ten teraz: ', slot);
          const updatedSlot = { ...slot, isSelectable: true };
          return accumulator.concat([updatedSlot]);
        } else {
          isSlotSelectableFalseEncountered = true;
          const updatedSlot = { ...slot, isSelectable: false };
          return accumulator.concat([updatedSlot]);
        }
      }

      return [...accumulator, { ...slot }];
    }, []);

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
        );
      })}
    </div>
  );
}
