import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import ExpressError from "./utils/ExpressError.js";
import cors from "cors";
import handleSocket from "./handleSocket.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const PORT = process.env.PORT || 6969;

app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}))

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

handleSocket(io);

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("listening to port:", PORT);
  });
});
