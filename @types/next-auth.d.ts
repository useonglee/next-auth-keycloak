import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
    } & DefaultSession["user"];
    accessToken: string;
    sub: string;
  }

  interface Redirect {
    baseUrl: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
  }
}
