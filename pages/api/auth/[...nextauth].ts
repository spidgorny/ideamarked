import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../lib/db";
import bcrypt from "bcrypt";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await getUserByEmail(credentials?.email ?? "");
        // console.log("login user", user);
        if (!user) {
          return null;
        }
        // const hash = await hashPassword(credentials.password);
        // console.log(credentials.password, "=>", hash);
        if (!(await checkPassword(credentials.password, user.password))) {
          return null;
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: null,
          ...user,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("jwt callback", { token, user, account, profile, isNewUser });
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session callback", { session, token, user });
      // session.accessToken = token.accessToken;
      session.user.id = token.user.id;

      return session;
    },
  },
};
export default NextAuth(authOptions);

export async function hashPassword(plainText: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainText, salt);
  return hash;
}

export async function checkPassword(plainText: string, storedHash: string) {
  return await bcrypt.compare(plainText, storedHash);
}
