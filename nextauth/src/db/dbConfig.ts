import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)

        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDB connected");
        })
        connection.on("error", (err) => {
            console.log("DB not connected: " + err);
            process.exit()
        })

    } catch (error) {
        console.log(error);
        
    }
}