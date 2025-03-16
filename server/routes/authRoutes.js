import express from "express";
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.get("/checkUsername", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "username is required!" });
  }

  try {
    const existingUser = await User.findOne({ username });
    res.json({ isAvailable: !existingUser });
  } catch (error) {
    res.status(500).json({ message: "username is already taken!" });
  }
});

authRouter.post("/signup", async(req, res) => {
  // create the user here
  console.log(req.body);
  const {firebaseUid, username, email} = req.body;
  const newUser = new User({
    firebaseUid: firebaseUid,
    username: username,
    email: email,
  });
  await newUser.save();

  res.status(200).json({ message: "data recived succesfully!" });
});

export default authRouter;
