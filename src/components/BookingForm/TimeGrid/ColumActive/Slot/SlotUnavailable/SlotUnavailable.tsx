import styles from '../style.module.scss';
const { isUnavailable } = styles;

export default function SlotUnavailable({ date, time }) {
  return (
    <div
      key={`${date.toISOString()}-${time}`}
      className={`h-6 relative ${isUnavailable}`}
    />
  );
}
