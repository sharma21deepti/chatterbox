const { createMessage } = require("../services/msgService");
const Message = require("../models/message");
async function saveMsg(req, res) {
  try {
    const message = await createMessage(req.body);
    res.status(200).json({
      message: "msg sent successfully",
      data: message,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "something went wrong",
    });
  }
}

async function handleChatHistory(req, res) {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId: chatId }).sort({
      createdAt: 1,
    });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(400).json({
      message: err.message || "something went wrong",
    });
  }
}

async function handleDeleteMsg(req, res) {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Msg Deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "something went wrong",
    });
  }
}

async function handleDownloadMsg(req, res) {
  try {

    const { id } = req.params;

    const msgData = await Message.findById({ _id: id });
    // console.log(msgData?.content, "content>>>");
    const base64data = msgData?.content;
    const isMatched = base64data?.match(/^data:(.+);base64,(.+)$/);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid image format" });
    }

    const mimeType = isMatched[1];
    const base64String = isMatched[2];
    const buffer = Buffer.from(base64String, "base64");
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", 'attachment; filename="downloaded-image.png"');
    res.send(buffer);
  } catch (err) {
    res.status(400).json({
      message: err.message || "something went wrong",
    });
  }
}

module.exports = { saveMsg, handleChatHistory, handleDeleteMsg, handleDownloadMsg };
