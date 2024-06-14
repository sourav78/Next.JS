import { dbConnect } from "@/db/dbConfig";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getIdFromToken";

dbConnect()

export async function POST(request: NextRequest){
    try {
        const userId = await getDataFromToken(request)

        const user  = await UserModel.findOne({_id: userId}).select("-password")

        if(!user){
            return NextResponse.json({
                success: false,
                error: "User not found"
            },{
                status: 400
            })
        }

        return NextResponse.json({
            success: true,
            data: user
        },{
            status: 200
        })
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        },{
            status: 500
        })
    }
}