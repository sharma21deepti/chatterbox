const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const chatSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Auth" }],
    isGroupChat: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
