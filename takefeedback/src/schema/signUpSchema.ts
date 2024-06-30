import { z } from "zod";

export const usernameValidation = z
    .string()
    .min(3, "Username must be atleast 3 character long.")
    .max(15, "User must be no more than 15 character long.")
    .regex(/^[a-zA-Z0-9_]+$/, "Username must not conatins special characters.")

export const SignupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be atleast 6 charcater long."})
})