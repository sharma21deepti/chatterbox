const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    city: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: false,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: false,
    },
    authId: {
      type: String,
      sparse: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", schema);

module.exports = User;
