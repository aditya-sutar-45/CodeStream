import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";
import ExpressError from "../utils/ExpressError.js";

export const checkUsername = catchAsync(async (req, res) => {
  const { username } = req.query;

  if (!username) throw new ExpressError("no username found", 404);

  const existingUser = await User.findOne({ username });
  res.json({ isAvailable: !existingUser });
});

export const signup = catchAsync(async (req, res) => {
  // create the user here
  const { firebaseUid, username, email } = req.body;
  const existingUser = await User.findOne({ username });
  if (existingUser) throw new ExpressError("username already taken", 409);
  const newUser = new User({
    firebaseUid: firebaseUid,
    username: username,
    email: email,
  });
  await newUser.save();

  res.status(200).json({ message: "data recived successfully" });
});

export const getUserById = catchAsync(async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ firebaseUid: uid });
  if (!user) throw new ExpressError("user not found!", 404);
  res.json(user);
});
