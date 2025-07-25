import mongoose from "mongoose";

export const connectDB= async ()=>{
  try {
    mongoose.connection.on('connected',()=> console.log("Database connected"));
  await mongoose.connect(`${process.env.MONGODB_URL}`)
  } catch (error) {
    console.log("Error in connectin database")
  }
}
