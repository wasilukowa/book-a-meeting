import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const auth = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    );

    const calendar = google.calendar({ version: 'v3', auth });

    // Pobierz wydarzenia z kalendarza
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Błąd podczas pobierania wydarzeń' },
      { status: 500 },
    );
  }
}
