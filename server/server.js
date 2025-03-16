import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());

app.use("/", authRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
});
