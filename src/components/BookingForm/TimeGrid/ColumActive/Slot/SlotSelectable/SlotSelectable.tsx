import styles from '../style.module.scss';
const { selectable } = styles;

export default function SlotSelectable({ date, time, id, handleSlotClick }) {
  return (
    <div
      key={`${date.toISOString()}-${time}`}
      className={`h-6 relative ${selectable}`}
      onClick={() => handleSlotClick(id)}
    />
  );
}
