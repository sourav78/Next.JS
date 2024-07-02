import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User.model";

export const authOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any): Promise<any> {
                await dbConnect()

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier},
                            { username: credentials.identifier}
                        ]
                    })

                    if (!user) {
                        throw new Error("No user found with this email.")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please verify your account.")
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error("Incorrect password.")
                    }
                } catch (error: any) {
                    throw new Error(error)
                }
            },
        })
    ],
    callbacks: {
        async session({ session, token }) {
            return session
        },
        async jwt({ token, user }) {
            return token
        }
    },
    pages: {
        signIn: "/signin"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}