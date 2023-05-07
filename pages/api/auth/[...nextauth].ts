import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import prismadb from "@/lib/prismadb";

export default NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // Si un champs est manquant
        if (!credentials?.email || !credentials?.password)
          throw new Error("L'Email et/ou le password sont requis");

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Si aucun user trouvé ou hash du password
        if (!user || !user.hashedPassword)
          throw new Error("L'email n'existe pas");

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Password Incorrect");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
