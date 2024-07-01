import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificatioEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {

        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Take Feedback - Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
        });

        return {
            success: true,
            message: "Verification email send successfully."
        }
    } catch (emailError) {
        console.error("Error sending in verification email.", emailError);
        return {
            success: false,
            message: "Failed to send verification email."
        }
    }
}
