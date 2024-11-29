const { google } = require('googleapis');
const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config({ path: '.env.local' });

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/callback/google',
);

// Generuj URL do autoryzacji
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar'],
});

console.log('Otwórz ten URL w przeglądarce:', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Zapytaj o kod autoryzacji
rl.question('Wklej kod autoryzacji tutaj: ', async (code: string) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Twój refresh token:', tokens.refresh_token);
    console.log('Dodaj go do .env.local jako GOOGLE_REFRESH_TOKEN');
  } catch (error) {
    console.error('Błąd:', error);
  }
  rl.close();
});
