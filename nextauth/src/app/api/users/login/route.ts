import { dbConnect } from "@/db/dbConfig";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

dbConnect()

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json()
        const {email, password} = reqBody

        const user = await UserModel.findOne({email})

        if(!user){
            return NextResponse.json({
                success: false,
                error: "User not exist"
            }, {
                status: 400
            })
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({
                success: false,
                error: "Password not matched"
            }, {
                status: 400
            })
        }

        if(!user.isVerified){
            return NextResponse.json({
                success: false,
                error: "Email is not verified. Verify first"
            }, {
                status: 400
            })
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {expiresIn: '1d'})

        const response = NextResponse.json({
            success: true,
            message: "User login success."
        },{
            status: 200
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        },{
            status: 500
        })
    }
}