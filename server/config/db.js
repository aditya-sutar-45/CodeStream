import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.DB_URL);

const dbUrl = process.env.DB_URL;
//|| "mongodb://127.0.0.1:27017/CodeStream";
async function connectDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("connected to db!!!", mongoose.connection.name);
  } catch (error) {
    console.error("failed to connect to db!!!");
    console.error("full error: \n", error);
    process.exit(1);
  }
}

export default connectDB;
