/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    styledComponents: {
      ssr: true,
      fileName: true,
      displayName: true,
      pure: true,
    },
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    KEYCLOAK_URL: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
    CLIENT_ID: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    CLIENT_SECRET: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
    PROFILE_URL: process.env.NEXT_PUBLIC_PROFILE_URL,
  },
};

module.exports = nextConfig;
