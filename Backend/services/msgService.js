// services/messageService.js
const chat = require("../models/chat");
const Message = require("../models/message");

async function createMessage({ senderId, receiverId, content, chatId, messageType,viewOnce,hasBeenViewed }) {
  const message = await Message.create({
    senderId,
    receiverId,
    content,
    chatId,
    messageType,
    viewOnce,
    hasBeenViewed,
  });
  await chat.findByIdAndUpdate(chatId, { lastMsg: message });
  return message;
}

module.exports = { createMessage };
