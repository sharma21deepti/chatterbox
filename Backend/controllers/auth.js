const { contextsKey } = require("express-validator/lib/base");
const Auth = require("../models/auth");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secretKey = "121212";

async function handleAuth(req, res) {
  try {
    const {
      userName,
      password,
      firstName,
      lastName,
      age,
      email,
      mobileNumber,
    } = req.body;

    // Check if username already exists
    const existingAuth = await Auth.findOne({ userName });
    if (existingAuth) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create entry in the Auth collection
    const auth = await Auth.create({ userName, password: hashedPassword });

    // Create entry in the User collection and link it to Auth using authId
    const user = await User.create({
      authId: auth._id, // Link Auth document to User document
      userName,
      firstName,
      lastName,
      age,
      email,
      mobileNumber,
    });

    return res.status(201).json({
      message: "User registered successfully",
      authId: auth._id,
      userId: user._id,
      firstName,
      lastName,
      age,
      email,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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
      const token = await jwt.sign(
        { userId: isUser._id }, // Payload
        secretKey, // Secret key
        {
          expiresIn: "24h", // Options
        }
      );
      const userData = await User.findOne({ authId: isUser._id });
      console.log(userData, isUser._id, "id>>");
      res.json({ token, userData });
    }
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = { handleAuth, handleLogin };
