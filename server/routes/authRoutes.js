import express from "express";
import { checkUsername, getUserById, signup } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/auth/checkUsername", checkUsername);
authRouter.post("/auth/signup", signup);
authRouter.get("/user/:uid", getUserById);

export default authRouter;
