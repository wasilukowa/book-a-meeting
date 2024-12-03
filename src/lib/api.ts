import { TimeSlot } from '../components/BookingForm/types';

// Bazowy URL do API - możesz zmienić na właściwy
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Funkcja pomocnicza do obsługi błędów
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  throw new Error('Wystąpił błąd podczas pobierania danych');
};

export async function getAvailableSlots(): Promise<TimeSlot[]> {
  try {
    const response = await fetch(`${API_URL}/slots`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as TimeSlot[];
  } catch (error) {
    handleApiError(error);
    // Tymczasowo zwracamy przykładowe dane w przypadku błędu
    return [
      {
        id: '1',
        date: '2024-02-20',
        time: '10:00',
        isAvailable: true,
      },
      {
        id: '2',
        date: '2024-02-20',
        time: '12:00',
        isAvailable: false,
      },
    ];
  }
}
