import styles from '../style.module.scss';
const { choosen } = styles;

export default function SlotChoosen({ date, time, id, handleSlotClick }) {
  return (
    <div
      key={`${date.toISOString()}-${time}`}
      className={`h-6 relative ${choosen}`}
      onClick={() => handleSlotClick(id)}
    />
  );
}
