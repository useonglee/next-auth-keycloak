import NextAuth, { Redirect, Session } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

const authOptions = {
  providers: [
    KeycloakProvider({
      clientId: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_URL}/realms/alpha-maxst`,
      authorization: { url: "http://localhost:3000" },
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }: Redirect) {
      return `${baseUrl}`;
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user) {
        token.id = user.id;
      }

      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.sub = token.sub;

      console.log("session: ", session);

      return session;
    },
  },
  // events: {},
  secret: `${process.env.SECRET}`,
};

export { authOptions };
export default NextAuth(authOptions);
