import UserModel from '@/model/user.model';
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'

export interface mailPropsType {
  email: String,
  emailType: String,
  userId: String
}


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {


    const hashedToken = await bcrypt.hash(userId.toString(), 10)

    if (emailType = "VERIFY") {
      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      })
    } else if (emailType = "RESET") {
      await UserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      })
    }

    const verifyEmail = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy paste the link in your browser. 
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`

    const resetPassword = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy paste the link in your browser. 
            <br> ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            </p>`

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "666daeabd24000",
        pass: "84232044c5e706"
      }
    });

    const mailOption = {
      from: 'sourav@sourav.ai',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
      html: emailType === "VERIFY" ? verifyEmail : resetPassword
    }

    const mailResponse = await transporter.sendMail(mailOption)

    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}