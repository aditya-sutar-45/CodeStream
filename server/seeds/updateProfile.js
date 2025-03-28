import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const updateUsersWithProfilePic = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    // Update users who do not have a profilePic field
    const result = await User.updateMany(
      { profilePic: { $exists: false } }, // Find users without profilePic
      [
        {
          $set: {
            profilePic: {
              $concat: [
                "/images/defaultProfilePics/",
                {
                  $toString: {
                    $add: [1, { $floor: { $multiply: [Math.random(), 10] } }],
                  },
                },
                ".png",
              ],
            },
          },
        },
      ]
    );

    console.log(`Updated ${result.modifiedCount} users with profile pictures.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating users:", error);
  }
};

updateUsersWithProfilePic();
