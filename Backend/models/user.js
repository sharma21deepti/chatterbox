const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  contacts: [{ type: mongoose.Schema.Types.ObjectId }],
  online: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
