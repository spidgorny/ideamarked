import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "../../../lib/contentful";
import bcrypt from "bcrypt";
import { store } from "next/dist/build/output/store";

// console.log({ CredentialsProvider });

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
        console.log("login user", user);
        if (!user) {
          return null;
        }
        const hash = await hashPassword(credentials.password);
        console.log(credentials.password, "=>", hash);
        if (
          !(await checkPassword(credentials.password, user.fields.password))
        ) {
          return null;
        }
        return {
          id: user.sys.id,
          ...user,
        };
      },
    }),
  ],
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
