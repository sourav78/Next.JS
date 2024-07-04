import dbConnect from "@/lib/db";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schema/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParams = {
            username: searchParams.get('username')
        }

        //Validate with ZOD
        const validatedUsername = UsernameQuerySchema.safeParse(queryParams)

        console.log(validatedUsername);

        if(!validatedUsername.success){
            const usernameErrors = validatedUsername.error.format().username?._errors || []

            return Response.json({
                success: false,
                message: usernameErrors.length > 0 ? usernameErrors.join(", ") : "Invalid query parameters"
            }, {status: 400})
        }

        const {username} = validatedUsername.data

        const exitingVerifiedUsername = await UserModel.findOne({username, isVerified: true})

        if(exitingVerifiedUsername){
            return Response.json({
                success: false,
                message: "Username is already taken."
            }, {
                status: 400
            })
        }

        return Response.json({
            success: true,
            message: "Username is unique."
        }, {
            status: 200
        })
        
    } catch (error) {
        console.error("Error while checking username", error);
        return Response.json({
            success: false,
            message: "Error while checking username"
        }, {
            status: 500
        })
    }
}