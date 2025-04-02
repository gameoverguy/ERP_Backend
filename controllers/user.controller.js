const bcrypt = require("bcrypt");
const { User } = require("../models");
const generateToken = require("../utilis/index");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

async function sendOtp(req, res) {
  try {
    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in localStorage (client-side)
    res.setHeader("Set-Cookie", `otp=${otp}; HttpOnly; Path=/; Max-Age=300`); // 5 minutes expiry

    // Email details (hardcoded)
    const fromEmail = "gameoverguy@gmail.com";
    const toEmail = "karthick251087@gmail.com"; // Super Admin email

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: fromEmail,
        pass: "$Xx9789527337",
      },
    });

    const mailOptions = {
      from: fromEmail,
      to: toEmail,
      subject: "Super Admin Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "OTP sent to Super Admin email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { otp, newPassword } = req.body;

    // Get OTP from cookie
    const storedOtp = req.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("otp="))
      ?.split("=")[1];

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    // Check if OTP matches
    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Find Super Admin user (assuming userId is "KM10001")
    const user = await User.findOne({ where: { userId: "KM10001" } });
    if (!user) {
      return res.status(404).json({ message: "Super Admin not found" });
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Clear OTP cookie after use
    res.setHeader("Set-Cookie", "otp=; HttpOnly; Path=/; Max-Age=0");

    res
      .status(200)
      .json({ message: "Super Admin password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//create the user
async function addUser(req, res) {
  try {
    const { password, firstName, lastName, role, address } = req.body;
    console.log(req.body);

    //concat firstname and lastname
    const fullName = `${firstName} ${lastName}`.trim();
    console.log(fullName, "fullName");

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      password: hashedPassword,
      firstName,
      lastName,
      displayName: fullName,
      role,
      address,
    });

    // Assign userId and displayName
    newUser.userId = `KM${newUser.id.toString()}`;

    await newUser.save();

    return res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  try {
    const { userId } = req.params; // Get userId from URL

    // Find the user
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await user.destroy();

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

//get the user
async function index(req, res) {
  try {
    const users = await User.findAll();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching USERs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updatePassword(req, res) {
  try {
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Find user
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    // Hash new password and update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateUserFields(req, res) {
  try {
    const { userId } = req.params;
    const updates = req.body; // Only send fields you want to update

    // Find user
    const user = await User.findOne({ where: { userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only provided fields
    Object.keys(updates).forEach((key) => {
      if (key !== "password") {
        user[key] = updates[key];
      }
    });

    // Update displayName if firstName or lastName is updated
    if (updates.firstName || updates.lastName) {
      user.displayName = `${user.firstName} ${user.lastName}`.trim();
    }

    await user.save();
    return res
      .status(200)
      .json({ message: "User details updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function authenticate(req, res) {
  try {
    const { userId, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ where: { userId } });
    console.log(user, "This is the user");

    if (!user) {
      return res.json({ message: "User not found" });
    }

    // Compare hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.json({ message: "Invalid Credentials" });
    }

    // Generate token
    const token = generateToken(user);
    return res.json({ token, role: user.role, displayName: user.displayName });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function validateToken(req, res) {
  res.json({
    message: `welcome`,
    tokenExpired: false,
  });
}

module.exports = {
  index,
  addUser,
  authenticate,
  validateToken,
  updateUserFields,
  updatePassword,
  deleteUser,
  sendOtp,
  resetPassword,
};
