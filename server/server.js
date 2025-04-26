import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import ExpressError from "./utils/ExpressError.js";
import cors from "cors";
import handleSocket from "./handleSocket.js";
import catchAsync from "./utils/catchAsync.js";
import { GoogleGenAI } from "@google/genai";
import { v4 as uuid } from "uuid";

dotenv.config();

const app = express();
const server = createServer(app);
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const PORT = process.env.PORT || 6969;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/", authRouter);

const chatHistories = new Map();
// gemini-2.5-flash-preview-04-17
app.post(
  "/chat",
  catchAsync(async (req, res) => {
    const userMessage = req.body.message;

    let conversationId = req.body.conversationId;
    if (!conversationId) {
      conversationId = uuid();
    }

    if (!chatHistories.has(conversationId)) {
      chatHistories.set(conversationId, []);
    }

    const history = chatHistories.get(conversationId);

    history.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    const chat = ai.chats.create({
      model: "gemini-2.0-flash",
      history: history,
    });

    const result = await chat.sendMessage({
      message: userMessage,
    });

    history.push({
      role: "model",
      parts: [{ text: result.text }],
    });

    res.json({
      username: "AI",
      message: result.text,
      timeStamp: new Date(),
      conversationId: conversationId,
    });
  })
);

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
