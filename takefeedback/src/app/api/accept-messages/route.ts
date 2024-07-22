import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User.model";
import {User} from 'next-auth'

export async function POST(request: Request){
    await dbConnect()

    const session = await getServerSession(authOption)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not authenticated."
        }, {
            status: 401
        })
    }

    const userId = user._id

    const {acceptMessage} = await request.json()

    try {

        console.log(acceptMessage);
        
        
        const updatedUser = await UserModel.findByIdAndUpdate(userId, 
            {
                isAcceptingMessage: acceptMessage
            },
            {new: true}
        )

        if(!updatedUser){
            return Response.json({
                success: false,
                message: "Failed to update accept message."
            }, {
                status: 401
            })
        }

        return Response.json({
            success: true,
            message: "Message acceptance status updated.",
            updatedUser
        }, {
            status: 200
        })

    } catch (error) {
        console.error("Failed to update accept message.", error);
        return Response.json({
            success: false,
            message: "Failed to update accept message."
        }, {
            status: 500
        })
    }
}

export async function GET(request: Request){
    await dbConnect()

    const session = await getServerSession(authOption)
    const user:User = session?.user as User

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "Not authenticated."
        }, {
            status: 401
        })
    }

    const userId = user._id

    try {
        
        const foundUser = await UserModel.findById(userId)

        if(!foundUser){
            return Response.json({
                success: false,
                message: "User not found."
            }, {
                status: 404
            })
        }

        return Response.json({
            success: true,
            message: "User found.",
            isAcceptingMessage: foundUser.isAcceptingMessage
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Failed to get status.", error);
        return Response.json({
            success: false,
            message: "Failed to get Status."
        }, {
            status: 500
        })
    }
}