export type TimeSlot = {
  id: string;
  date: string;
  time: string;
  isAvailable: boolean;
};

// Jeśli będziemy potrzebować więcej typów dla formularza rezerwacji, możemy je dodać tutaj
export type BookingFormProps = {
  userId: string;
};
