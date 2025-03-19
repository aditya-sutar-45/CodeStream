import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import ExpressError from "./utils/ExpressError.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());

app.use("/", authRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError("Not Found!", 404));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    error: true,
    message,
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
});
