import dbConnect from "@/lib/db";
import UserModel from "@/model/User.model";
import { Message } from "@/model/User.model";

export async function POST(request: Request){
    await dbConnect()

    try {
        
        const {username, content} = await request.json()

        const user = await UserModel.findOne({username})

        if(!user){
            return Response.json({
                success: false,
                message: "User not found."
            }, {
                status: 404
            })
        }

        if(!user.isAcceptingMessage){
            return Response.json({
                success: false,
                message: "User not accepiting message."
            }, {
                status: 403
            })
        }

        const newMessage = {
            content,
            createdAt: new Date()
        }

        user.message.push(newMessage as Message)

        await user.save()

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, {
            status: 200
        })

    } catch (error) {
        console.error("Error while sending messages.", error);
        return Response.json({
            success: false,
            message: "Error while sending messages."
        }, {
            status: 500
        })
    }
}