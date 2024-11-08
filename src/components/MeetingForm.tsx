'use client';
import { useState } from 'react';
import styles from './MeetingForm.module.css';

interface MeetingFormProps {
  token: string;
}

export default function MeetingForm({ token }: MeetingFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/calendar/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          summary: formData.title,
          description: formData.description,
          start: {
            dateTime: `${formData.date}T${formData.startTime}:00`,
            timeZone: 'Europe/Warsaw',
          },
          end: {
            dateTime: `${formData.date}T${formData.endTime}:00`,
            timeZone: 'Europe/Warsaw',
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Błąd podczas tworzenia spotkania');
      }

      // Wyczyść formularz po sukcesie
      setFormData({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        description: '',
      });

      alert('Spotkanie zostało utworzone!');
    } catch (error) {
      console.error('Błąd:', error);
      alert('Wystąpił błąd podczas tworzenia spotkania');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Tytuł spotkania:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="date">Data:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="startTime">Czas rozpoczęcia:</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="endTime">Czas zakończenia:</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Opis:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Utwórz spotkanie
      </button>
    </form>
  );
}
