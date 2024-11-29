'use client';
import { Login } from '@/components';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">System rezerwacji spotkań</h1>
      <Login />
    </div>
  );
}
