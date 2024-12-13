'useClient';
import SlotUnavailable from './SlotUnavailable/SlotUnavailable';
import SlotChoosen from './SlotChoosen/SlotChoosen';
import SlotAvailable from './SlotAvailable/SlotAvailable';
import SlotSelectable from './SlotSelectable/SlotSelectable';

export const Slot = ({ slotOptions, date, time, id, handleClick }) => {
  // const slotClass = slotOptions.isChoosen
  //   ? choosen
  //   : slotOptions.isSelected
  //   ? selectable
  //   : slotOptions.isAvailable
  //   ? available
  //   : isUnavailable;

  if (!slotOptions.isAvailable) {
    return <SlotUnavailable date={date} time={time} />;
  }

  if (slotOptions.isChoosen) {
    return (
      <SlotChoosen
        date={date}
        time={time}
        id={id}
        handleSlotClick={handleClick}
      />
    );
  }

  if (slotOptions.isSelectable) {
    return (
      <SlotSelectable
        date={date}
        time={time}
        id={id}
        handleSlotClick={handleClick}
      />
    );
  }

  if (slotOptions.isAvailable) {
    return (
      <SlotAvailable
        date={date}
        time={time}
        id={id}
        handleSlotClick={handleClick}
      />
    );
  }
};
