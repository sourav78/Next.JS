import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        reruired: true
    },
    email: {
        type: String,
        reruired: true
    },
    password: {
        type: String,
        reruired: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const UserModel = mongoose.models.users || mongoose.model("users", userSchema)

export default UserModel 