import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com'}/api/v1/auth/signin`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });

          const data = await res.json();
          
          if (res.ok && data.token) {
            // Include token and basic user info
            return {
              id: data.user._id,
              name: data.user.name,
              email: data.user.email,
              token: data.token,
            };
          }
          throw new Error(data.message || "Invalid credentials");
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      // 1. If it's a regular credentials login
      if (user && account?.provider === "credentials") {
        token.accessToken = user.token;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }

      // 2. If it's a Social login (Google or Facebook), we need to "sync" with the backend to get a valid Route token
      if ((account?.provider === "google" || account?.provider === "facebook") && user) {
        try {
          const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com';
          // Deterministic safe password based on email
          const safeEmailHash = Buffer.from(user.email).toString("base64").replace(/[^a-zA-Z0-9]/g, "").substring(0, 8);
          const dummyPassword = `G@${safeEmailHash}123!`;

          // Generate a valid 11-digit temporary phone number (e.g. 010 + 8 random digits)
          const randomPhone = "010" + Math.floor(10000000 + Math.random() * 90000000).toString();

          // Try to sign up first
          let res = await fetch(`${BASE_URL}/api/v1/auth/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: user.name || "Google User",
              email: user.email,
              password: dummyPassword,
              rePassword: dummyPassword,
              phone: randomPhone,
            }),
          });

          let data = await res.json();

          // If signup fails because the email already exists, just sign in
          if (!res.ok && (data.message?.includes("already exists") || data.errors?.some((e: any) => e.msg?.includes("already")))) {
            res = await fetch(`${BASE_URL}/api/v1/auth/signin`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                password: dummyPassword,
              }),
            });
            data = await res.json();
          }

          if (res.ok && data.token) {
            token.accessToken = data.token;
            // Decode the Route token to securely get the real Mongo _id
            let routeUserId = data.user?._id || user.id;
            try {
              const payload = data.token.split('.')[1];
              const decoded = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'));
              routeUserId = decoded.id || routeUserId;
            } catch (e) {
              console.error("Failed to decode token for ID", e);
            }

            token.user = {
              id: routeUserId,
              name: data.user?.name || user.name,
              email: data.user?.email || user.email,
            };
          } else {
             console.error("Route backend syncing failed:", data);
          }
        } catch (error) {
          console.error("Failed to bridge Google user to backend:", error);
        }
      }
 
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      
      // Safely apply user data to avoid showing "Guest" if structure is slightly different
      if (token.user) {
        session.user = { ...session.user, ...token.user };
      } else if (token.name) {
        session.user = {
          id: token.sub || token.id || "",
          name: token.name || "User",
          email: token.email || "",
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "fresh-cart-secret-key-123",
};
