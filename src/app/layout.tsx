'use client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/context/AuthContext';

import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID nie jest zdefiniowany');
    return null;
  }

  return (
    <html>
      <body>
        <GoogleOAuthProvider clientId={clientId}>
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
