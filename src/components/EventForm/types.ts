export interface FormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

// Możemy usunąć token z props, bo będziemy używać useSession
export interface EventFormProps {
  onSuccess?: () => void; // opcjonalny callback po sukcesie
}
