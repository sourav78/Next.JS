import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User.model";
import {User} from 'next-auth'
import mongoose from "mongoose";

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

    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        
        const user = await UserModel.aggregate([
            {$match: {id: userId}},
            {$unwind: '$message'},
            {$sort: {'message.createdAt': -1}},
            {$group: {_id: '$_id', messages: {$push: '$message'}}}
        ])

        if(!user || user.length === 0){
            return Response.json({
                success: false,
                message: "User not found."
            }, {
                status: 401
            })
        }

        console.log(user);
        

        return Response.json({
            success: true,
            data: user[0].messages
        }, {
            status: 200
        })

    } catch (error) {
        console.error("An unexcepted error ocuured while get message.", error);
        return Response.json({
            success: false,
            message: "An unexcepted error ocuured while get message."
        }, {
            status: 500
        })
    }
}