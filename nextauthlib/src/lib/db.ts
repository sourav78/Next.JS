import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if(mongoose.connections && mongoose.connections[0].readyState) return;

        const {connection} = await mongoose.connect(process.env.MONGO_URL!)

        console.log(`Connected to ${connection.host}`);
        
    } catch (error) {
        throw new Error("Error connecting to database")
    }
}