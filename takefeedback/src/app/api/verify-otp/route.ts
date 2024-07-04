import dbConnect from "@/lib/db";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
    await dbConnect()

    try {

        const { username, code } = await request.json()

        const decodedUsername = decodeURIComponent(username)
        console.log(decodedUsername);
        

        const user = await UserModel.findOne({username: decodedUsername})

        if (!user) {
            return Response.json({
                success: false,
                message: "User not found."
            }, {
                status: 400
            })
        }

        const isCodeVerified = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpire) > new Date()

        if(isCodeVerified && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: "Account verified successfully."
            }, {
                status: 200
            })
        }else if(!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Verification has expired. Signup again."
            }, {
                status: 400
            })
        }else{
            return Response.json({
                success: false,
                message: "Incorrect verification code."
            }, {
                status: 400
            })
        }

    } catch (error) {
        console.error("Error while checking OTP", error);
        return Response.json({
            success: false,
            message: "Error while checking OTP"
        }, {
            status: 500
        })
    }
}