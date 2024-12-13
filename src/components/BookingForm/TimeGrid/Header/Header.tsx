import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

import styles from './style.module.scss';
const { active, inactive } = styles;

export const Header = ({ date, isActive }) => {
  const className = isActive ? active : inactive;

  return (
    <div
      className={`h-8 flex items-center justify-center font-medium text-sm ${className}`}
    >
      {format(date, 'EEEE', { locale: enUS })}
      <br />
      {format(date, 'd MMM', { locale: enUS })}
    </div>
  );
};
