import { dbConnect } from "@/db/dbConfig";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";

dbConnect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await UserModel.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})

        if(!user){
            return NextResponse.json({
                success: false,
                error: "Invalid token"
            },{
                status: 400
            })
        }

        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()
        
        return NextResponse.json({
            success: true,
            message: "Email verified successfully."
        },{
            status: 200
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        },{
            status: 500
        })
    }
}