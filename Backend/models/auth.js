const mongoose = require("mongoose");
const AuthSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    age: {
      type: Number,
    },
    userName: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum:["light", "dark"],
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Auth" }],
    online: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", AuthSchema);
module.exports = Auth;
