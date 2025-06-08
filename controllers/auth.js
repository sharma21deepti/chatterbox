const { contextsKey } = require("express-validator/lib/base");
const Auth = require("../models/auth");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function handleAuth(req, res) {
  const { userName, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = { userName, password: hashedPassword };
  await Auth.create(newUser);
  return res.status(200).json({
    message: "User registered Successfully",
  });
}

async function handleLogin(req, res) {
  try {
    const { userName, password } = req.body;
    const isUser = await Auth.findOne({ userName });
    if (!isUser) {
      res.status(400).json({
        error: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Password not matched",
      });
    } else {
      const token = await jwt.sign({ userId: isUser._id }, "access_token", {
        expiresIn: "1h",
      });
      await User.findByIdAndUpdate({ _id: isUser._id }, token);
      res.json({ token });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { handleAuth, handleLogin };
