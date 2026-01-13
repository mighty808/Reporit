import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async (MONGODB_URI) => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database is connected...");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
