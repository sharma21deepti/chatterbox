const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
    content: {
      type: String,
    },
    chatId: {
      type: String,
    },
    messageType: {
      type: String,
    },
    lastMsg: {
      type: Object,
    },
    viewOnce: {
      type: Boolean,
    },
    hasBeenViewed: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
