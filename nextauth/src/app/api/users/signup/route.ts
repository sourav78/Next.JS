import { dbConnect } from "@/db/dbConfig";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";

dbConnect()

export async function POST(req: NextRequest){
    try {
        
        const reqBody = await req.json()
        const {username, email, password} = reqBody

        const user = await UserModel.findOne({email})

        if(user){
            return NextResponse.json({
                error: "User already registered."
            }, {
                status: 400
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            username,
            email,
            password: hasedPassword
        })

        const savedUser = await newUser.save()

        //Send email to user

        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

        return NextResponse.json({
            success: true,
            message: "User registered successfully."
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {
            status: 500
        })
    }
}

