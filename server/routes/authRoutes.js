import express from "express";
import {
  checkUsername,
  getUserById,
  getUserByUsername,
  signup,
  updateUser,
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/auth/checkUsername", checkUsername);
authRouter.post("/auth/signup", signup);
authRouter.get("/user/:uid", getUserById);
authRouter.get("/username/:username", getUserByUsername);
authRouter.patch("/user/:uid", updateUser);

export default authRouter;
