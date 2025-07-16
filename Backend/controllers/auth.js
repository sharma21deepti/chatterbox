const bcrypt = require("bcrypt");
const Auth = require("../models/auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "123456";
async function handleRegister(req, res) {
  try {
    const { userName, email, phone, password, gender, age } = req.body;

    const userExists = await Auth.findOne({ userName });
    if (userExists) {
      return res.status(400).json({
        error: "User already exists.",
      });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await Auth.create({
      userName,
      email,
      phone,
      password: hashedPass,
      gender,
      age,
    });

    res.status(201).json({
      message: "User registered successfully!",

      user: {
        id: newUser._id,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err); // helpful for debugging
    res.status(400).json({
      error: err.message || "Something went wrong.",
    });
  }
}

async function handleLogin(req, res) {
  try {
    const { userName, password } = req.body;
    const query = userName ? { userName } : { email };
    const userData = await Auth.findOne(query); // ✅ FIXED

    if (!userData) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const isPassMatch = await bcrypt.compare(password, userData.password); // ✅ now this works fine

    if (!isPassMatch) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ id: userData._id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Logged in successfully",
      token,
      userData,
    });
  } catch (err) {
    console.error("Login error:", err); // helpful for debugging
    res.status(400).json({
      err: err.message || "Something went wrong",
    });
  }
}

async function getUser(req, res) {
  try {
    console.log(req, "params");
    const { id } = req.params;
    const userData = await Auth.findById({ _id: id });
    if (!userData) {
      res.status(400).json({
        msg: "User Not Found",
      });
      return;
    }
    res.status(200).json({
      msg: "User Data Fetched Successfully",
      data: userData,
    });
  } catch (err) {
    res.status(400).json({
      err: err.msg || "Something went wrong",
    });
  }
}

async function updateUser(req, res) {
  try {
    const { userName, gender, email, phone, mode, id,age } = req.body;

    const userData = await Auth.findByIdAndUpdate(
      {_id:id},
      { userName, gender, email, phone, mode,age },
      { new: true }
    );

    if (!userData) {
      return res.status(400).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User Updated Successfully",data: userData });
  } catch (err) {
    res.status(500).json({
      err: err.message || "Something went wrong",
    });
  }
}

module.exports = { handleRegister, handleLogin, getUser, updateUser, SECRET_KEY };
