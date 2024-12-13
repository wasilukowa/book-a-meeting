import styles from '../style.module.scss';
const { available } = styles;

export default function SlotAvailable({ date, time, id, handleSlotClick }) {
  return (
    <div
      key={`${date.toISOString()}-${time}`}
      className={`h-6 relative ${available}`}
    />
  );
}
