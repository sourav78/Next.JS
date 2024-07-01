import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    content: string,
    createdAt: Date
}

const MesssageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpire: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    message: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "User name is required."],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please use a valid email address."]
    },
    password: {
        type: String,
        required: [true, "Password is required."],
    },
    verifyCode: {
        type: String,
        required: [true, "Verify code is required."],
    },
    verifyCodeExpire: {
        type: Date,
        required: [true, "Verify code expiry date is required."],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    message: [MesssageSchema]
})

const UserModel = mongoose.models?.user as mongoose.Model<User> || mongoose.model<User>("user", UserSchema) 

export default UserModel