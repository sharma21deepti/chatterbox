const mongoose = require("mongoose");
const Message = require("../models/message");
const Chat = require("../models/chat");

async function handleSendMsg(req, res) {
  try {
    const { senderId, receiverId, content } = req.body;
    const msg = await Message.create({ senderId, receiverId, content });

    if (msg) {
      res.status(201).json({
        message: "Msg sent successfully",
        msg,
      });
    }
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
}

async function getChat(req, res) {
  try {
    const chatId = req.params.id;

    const chatData = Chat.findOne({ chatId });

    if (!chatData) {
      res.status(400).json({
        message: "Error in finding the chat Data",
      });
      return;
    }
    res.status(200).json({
      message: "Chat data fetched successfully",
      data: {
        chatData,
        messageData: {},
      },
    });
  } catch (err) {
    console.log(err, "error");
    res.status(400).json({
      message: "err.message" || "Something Went wrong",
    });
  }
}

module.exports = { handleSendMsg, getChat };
