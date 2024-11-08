import NextAuth, { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  logger: {
    error: (code, ...message) => {
      console.error(code, message);
    },
    warn: (code, ...message) => {
      console.warn(code, message);
    },
    debug: (code, ...message) => {
      console.debug(code, message);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
