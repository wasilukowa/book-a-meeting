import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
      return NextResponse.json(
        { error: 'Brak tokenu autoryzacji' },
        { status: 401 },
      );
    }

    const auth = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    );

    auth.setCredentials({ access_token: token });

    const calendar = google.calendar({ version: 'v3', auth });

    const event = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: body,
    });

    return NextResponse.json(event.data);
  } catch (error) {
    console.error('Błąd:', error);
    return NextResponse.json(
      { error: 'Błąd podczas tworzenia wydarzenia' },
      { status: 500 },
    );
  }
}
