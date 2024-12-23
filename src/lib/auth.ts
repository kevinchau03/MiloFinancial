import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import type { NextAuthOptions, Session, JWT } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Your email" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
      },
      async authorize(credentials) {
        // Validate provided credentials
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        // Connect to the database
        await connectDB();

        // Find the user in the database
        const user = await User.findOne({ email: credentials.email }).select("+password");

        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Incorrect password.");
        }

        // Return user object without the password field
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name; // Include the full name
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: typeof token.id === "string" ? token.id : "", // Ensure id is a string
        email: token.email || "",
        name: token.name || "", // Include the full name
      };
      return session;
    },
  },
  pages: {
    signIn: "/login", // Redirect to a custom login page
    error: "/login", // Redirect to login page on error
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development", // Enable debugging in development
};
