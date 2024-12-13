import { Button } from '@/components/ui/button';

import { format, addDays, startOfWeek } from 'date-fns';
import { pl } from 'date-fns/locale';

export default function TimeGridHeader({ dates, setStartDate }) {
  const handlePreviousWeek = () => {
    setStartDate((prev) => addDays(prev, -7));
  };

  const handleNextWeek = () => {
    setStartDate((prev) => addDays(prev, 7));
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <Button variant="outline" size="sm" onClick={handlePreviousWeek}>
        &lt; Poprzedni tydzień
      </Button>
      <span className="text-lg font-semibold">
        {format(dates[0], 'd MMMM', { locale: pl })} -{' '}
        {format(dates[6], 'd MMMM yyyy', { locale: pl })}
      </span>
      <Button variant="outline" size="sm" onClick={handleNextWeek}>
        Następny tydzień &gt;
      </Button>
    </div>
  );
}
