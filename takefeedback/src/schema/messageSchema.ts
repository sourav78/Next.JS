import { z } from "zod";

export const MessagesSchema = z.object({
    content: z
        .string()
        .min(10, {message: "Content must be atleast 10 character long."})
        .max(300, {message: "Content must not be longer than 300 character long."})
})