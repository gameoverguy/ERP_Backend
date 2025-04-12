const bcrypt = require("bcrypt");
const { User } = require("../models");
const generateToken = require("../utilis/index");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

async function sendOtp(req, res) {
  try {
    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP in an HTTP-only cookie
    res.cookie("otp", otp, {
      httpOnly: true, // Prevent client-side JS access
      secure: false, // Set `true` in production with HTTPS
      sameSite: "Lax",
      maxAge: 5 * 60 * 1000, // 5 minutes expiry
    });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gameoverguy@gmail.com",
        pass: "qaoe wdtr takw etge",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: "gameoverguy@gmail.com",
      to: "karthick251087@gmail.com",
      subject: "Super Admin Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    });

    res.status(200).json({ message: "OTP sent to Super Admin email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const { otp, newPassword } = req.body;

    console.log("Cookies received:", req.cookies);
    console.log("OTP received:", req.body.otp);
    console.log("Stored OTP in cookie:", req.cookies.otp);

    // Check if OTP matches the one in the cookie
    if (!req.cookies.otp || req.cookies.otp !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in DB (Modify as needed)
    await User.update(
      { password: hashedPassword },
      { where: { userId: "KM10001" } }
    );

    // Clear OTP cookie
    res.clearCookie("otp");

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function adminResetPassword(req, res) {
  try {
    const { newPassword } = req.body;
    const { userId } = req.params;

    // Check if user exists
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password
    await User.update({ password: hashedPassword }, { where: { userId } });

    res.status(200).json({ message: "Password reset by admin successful" });
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
  adminResetPassword,
};
