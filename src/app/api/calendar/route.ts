import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Musisz być zalogowany' },
        { status: 401 },
      );
    }

    const data = await request.json();
    console.log('Otrzymane dane:', data);

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/auth/callback/google',
    );

    if (session.accessToken) {
      oauth2Client.setCredentials({
        access_token: session.accessToken as string,
      });
    } else {
      throw new Error('Brak tokena dostępu');
    }

    const calendar = google.calendar({
      version: 'v3',
      auth: oauth2Client,
    });

    const event = {
      summary: data.title,
      description: data.description,
      start: {
        dateTime: new Date(data.startTime).toISOString(),
        timeZone: 'Europe/Warsaw',
      },
      end: {
        dateTime: new Date(data.endTime).toISOString(),
        timeZone: 'Europe/Warsaw',
      },
    };

    console.log('Tworzone wydarzenie:', event);

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Szczegóły błędu:', error);
    return NextResponse.json(
      { error: error.message || 'Błąd podczas dodawania wydarzenia' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Musisz być zalogowany' },
        { status: 401 },
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000/api/auth/callback/google',
    );

    if (session.accessToken) {
      oauth2Client.setCredentials({
        access_token: session.accessToken as string,
      });
    }

    const calendar = google.calendar({
      version: 'v3',
      auth: oauth2Client,
    });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Błąd podczas pobierania wydarzeń:', error);
    return NextResponse.json(
      { error: error.message || 'Błąd podczas pobierania wydarzeń' },
      { status: 500 },
    );
  }
}
