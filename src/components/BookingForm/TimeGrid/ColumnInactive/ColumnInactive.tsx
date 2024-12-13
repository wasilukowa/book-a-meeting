import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Header } from '../Header/Header';

import styles from './styles.module.scss';

const { column } = styles;

export default function ColumnInactive({ date, hours }) {
  return (
    <>
      <div key={date.toISOString()} className={column}>
        <Header date={date} isActive={false} />
      </div>
      {/* NO! */}
    </>
  );
}
