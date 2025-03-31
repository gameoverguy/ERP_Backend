const jwt = require("jsonwebtoken");
const { User } = require("../models");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "authHeader");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Missing or invalid token format" });
    }
    console.log(authHeader.split(" "), "AUTH");

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, async (err, decode) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Inavalid token", tokenExpired: true });
      }

      console.log(decode, "DECODE");

      const user = await User.findByPk(decode.id);

      if (!user) {
        return res
          .status(404)
          .json({ message: "user not found", isLoggedIn: false });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = verifyToken;
