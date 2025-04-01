import mongoose from "mongoose";
export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dcthang489:thang123@cluster0.k9jbh.mongodb.net/Final').then(() => console.log("DB connected"));
} 