const Hacker = require("../models/userModel");
const User = require("../models/adminModel");

// Function to verify all hackers and update their documents
async function verifyAllHackers(userId) {
  try {
    // Find the user document
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Find all hacker documents and update them
    const hackers = await Hacker.find();
    for (const hacker of hackers) {
      hacker.verifiedBy = {
        user: userId,
        verifiedAt: new Date(),
      };
      await hacker.save();
      console.log(`Hacker ${hacker._id} updated successfully`);
    }

    console.log("All hackers updated successfully");
  } catch (error) {
    console.error("Error occurred while updating hackers:", error);
  }
}

// Example usage:
const userId = "65cbbae325146b625043e97d";

verifyAllHackers(userId);
