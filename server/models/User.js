import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "username is required!"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", UserSchema, "users");
