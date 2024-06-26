import NextAuth, { CredentialsSignin } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GitGubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { UserModel } from "./model/user.model";
import bcrypt from 'bcryptjs'
import { connectDB } from "./lib/db";

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

        //Database connection
        await connectDB()

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
  pages: {
    signIn: "/login"
  },
  callbacks: {
    signIn: async ({ user, account, profile, email }) => {
      // console.log(user);
      // console.log(account);
      // console.log(profile);
      // console.log(email);

      if (account?.provider === "google") {
        try {

          const { email, name, id } = user

          await connectDB()

          const registerUser = await UserModel.findOne({ email })

          if (!registerUser) {
            await UserModel.create({ email, name, googleId: id })
          }

          return true
        } catch (error) {
          throw new Error("Error while creating user.")
        }
      }

      if (account?.provider === "github") {
        console.log(user);

        try {
          const { email, name, id } = user

          await connectDB()

          const registerUser = await UserModel.findOne({ email })

          if (!registerUser) {
            await UserModel.create({ email, name, googleId: id })
          }

          return true
        } catch (error) {
          throw new Error("Error while creating user.")
        }
      }

      return false
    }
  }
})