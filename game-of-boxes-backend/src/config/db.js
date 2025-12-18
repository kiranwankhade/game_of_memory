import mongoose from "mongoose"

export const connection = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
}