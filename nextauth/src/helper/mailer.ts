import nodemailer from 'nodemailer'

interface mailPropsType{
    email : String,
    emailType: String,
    userId: String
}


export const sendEmail = async ({email, emailType, userId}:any) => {
    try {

        //TODO: 

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

        const mailOption = {
            from: 'sourav@sourav.ai',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email." : "Reset your password.",
            html: "<b>Hello world?</b>",
          }

        const mailResponse = await transporter.sendMail(mailOption)

        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }
}