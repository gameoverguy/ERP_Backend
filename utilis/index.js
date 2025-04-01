const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) =>
  jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: "59m" });

module.exports = generateToken;
