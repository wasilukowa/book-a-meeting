import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHours = () => {
  const hours = Array.from({ length: 40 }, (_, index) => {
    const hour = Math.floor(index / 4) + 8;
    const minutes = (index % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
  });

  return hours;
};
