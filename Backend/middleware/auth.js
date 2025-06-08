// middleware/auth.js
const { body } = require("express-validator"); // ✅ This is required
const jwt = require("jsonwebtoken");
const secretKey = "121212";
const validateAuth = [
  body("userName").notEmpty().withMessage("UserName is required"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password should be strong (min 8 chars, 1 uppercase, 1 symbol, etc.)"
    ),
];

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token, secretKey, "token");
  if (!token) {
    return res.status(401).json({
      error: "Auth Token required",
    });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: "Invalid Auth Token",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = { validateAuth, authenticateToken };
