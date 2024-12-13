import { format } from 'date-fns';

export default function Slot({ slot, preparedSlots, date }) {
  const currentSlot = preparedSlots.find(
    (slot) => slot.date === format(date, 'yyyy-MM-dd') && slot.time === time,
  );

  const isSelected = selectedSlots.some(
    (slot) =>
      slot.date === currentSlot?.date && slot.time === currentSlot?.time,
  );

  return (
    <div
      key={`${date.toISOString()}-${time}`}
      className={`h-6 relative
            ${time.endsWith(':45') ? 'border-b-2 border-[#B0B0B0]' : ''}
            ${
              isWeekend(date)
                ? 'bg-[#D3D3D3]'
                : isSelected
                ? 'bg-[#075c07] cursor-pointer'
                : currentSlot?.isSelectable
                ? 'bg-[#5ce167] hover:bg-[#086e08] cursor-pointer'
                : currentSlot?.isAvailable
                ? 'bg-[#7c7c7c] cursor-pointer'
                : ''
            }
          `}
      onClick={() => handleSlotClick(currentSlot!)}
      title={
        currentSlot?.isAvailable && !isWeekend(date)
          ? `${format(date, 'dd.MM.yyyy')} ${time}`
          : ''
      }
    />
  );
}
