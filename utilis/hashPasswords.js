const bcrypt = require("bcrypt");
const { User } = require("../models");

async function hashExistingPasswords() {
  try {
    const users = await User.findAll();

    for (const user of users) {
      // Skip if already hashed (bcrypt hashes are always 60 chars long)
      if (user.password.length < 60) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        await user.save();
        console.log(`Updated password for user ${user.userId}`);
      }
    }

    console.log("Password migration complete!");
  } catch (error) {
    console.error("Error updating passwords:", error);
  }
}

hashExistingPasswords();
