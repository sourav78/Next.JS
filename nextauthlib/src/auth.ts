import NextAuth, { CredentialsSignin } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GitGubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { UserModel } from "./model/user.model";
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    GitGubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      authorize: async (credentials) => {

        const email = credentials.email as string | undefined
        const password = credentials.password as string | undefined

        if (!email || !password) {
          throw new CredentialsSignin("All fields are required.")
        }

        const user = await UserModel.findOne({ email }).select("+password")

        if (!user) {
          throw new CredentialsSignin("Invalid email/password")
        }

        if (!user.password) {
          throw new CredentialsSignin("Invalid email/password")
        }

        const isPasswordMatch = bcrypt.compare(password, user.password)

        if (!isPasswordMatch)
          throw new CredentialsSignin("Please Provide valid Password")

        user.password = undefined

        return user

      }
    })
  ],
})