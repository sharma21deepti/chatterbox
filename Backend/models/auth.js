const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    sparse: true,
  },
});
const Auth = mongoose.model("Auth", authSchema);
module.exports = Auth;
