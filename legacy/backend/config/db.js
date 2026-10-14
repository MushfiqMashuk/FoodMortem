import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Database connection succeded!");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
