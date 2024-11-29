export interface FormData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface EventFormProps {
  onSuccess?: () => void;
}
