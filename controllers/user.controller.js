const bcrypt = require("bcrypt");
const { User } = require("../models");
const generateToken = require("../utilis/index");

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

async function authenticate(req, res) {
  const { userId, password } = req.body;
  console.log(req.body);

  const user = await User.findOne({ where: { userId } });
  console.log(user, "This is the users");
  if (!user) {
    console.log(user);
    return res.json({ message: "User not found" });
  }

  // const isValidPassword = await bcrypt.compare(password, user.password);
  // if (!isValidPassword) {
  //   return res.status(404).json({ message: "Invalid Password" });
  // }

  if (password === user.password) {
    const token = generateToken(user);
    res.json({ token, role: user.role, displayName: user.displayName });
  } else {
    res.json({ message: "Invalid Credentials" });
  }
}

async function validateToken(req, res) {
  res.json({
    message: `welcome`,
    tokenExpired: false,
  });
}

module.exports = { index, addUser, authenticate, validateToken };
