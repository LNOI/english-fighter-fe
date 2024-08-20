import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { getUserByEmail } from './data/users';
import { jwtDecode } from 'jwt-decode';
import { encrypt } from '@/utils/encryption';

async function refreshAccessToken(token) {
  // console.log(token.refresh_token);
  const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.AUTH_KEYCLOAK_ID,
      client_secret: process.env.AUTH_KEYCLOAK_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token
    }),
    method: 'POST'
  });
  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token
  };
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.AUTH_KEYCLOAK_ID,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
      if (user) {
        // User is available during sign-in
        token.decoded = jwtDecode(account.access_token);
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        return token;
      } else if (nowTimeStamp < token.expires_at) {
        return token;
      } else {
        // console.log('Token has expired. Will refresh...');
        try {
          const refreshedToken = await refreshAccessToken(token);
          // console.log('Token is refreshed.');
          return refreshedToken;
        } catch (error) {
          // console.error('Error refreshing access token', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      }
    },
    async session({ session, token }) {
      // session.decoded = token.decoded
      session.user.id = token.decoded.sub;
      session.access_token = token.access_token;
      return session;
    }
  }
});
