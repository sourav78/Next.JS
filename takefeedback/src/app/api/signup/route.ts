import { sendVerificatioEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/db";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";


export async function POST(request: Request){
    await dbConnect()

    try {
        const {email, username, password} = await request.json() 

        const existingUserVerifiedByUsername = await UserModel.findOne({username, isVerified: true})

        console.log(existingUserVerifiedByUsername);
        
        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "Username is already taken."
            }, {
                status: 400
            })
        }

        const existingUserByEmail = await UserModel.findOne({email})

        const verificationCode = Math.floor(100000 + Math.random()*900000).toString()        

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "Email is already exist."
                }, {
                    status: 400
                })
            }else{
                const hashedPassword = await bcrypt.hash(password, 10)

                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verificationCode
                existingUserByEmail.verifyCodeExpire = new Date(Date.now() + 3600000)

                await existingUserByEmail.save()
            }
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                email,
                username,
                password: hashedPassword,
                verifyCode: verificationCode,
                verifyCodeExpire: expiryDate,
            })

            await newUser.save()

        }
        //Send verification email
        const emailResponse = await sendVerificatioEmail(email, username, verificationCode)        

        if(!emailResponse){
            return Response.json({
                success: false,
                message: "Verification Code not send - error"
            }, {
                status: 400
            })
        }

        return Response.json({
            success: true,
            message: "Verification code sent successfully."
        }, {
            status: 200
        })
    } catch (error) {
        console.error("Error registring user.", error);
        return Response.json({
            success: false,
            message: "Error registring user."
        }, {
            status: 500
        })
    }
}