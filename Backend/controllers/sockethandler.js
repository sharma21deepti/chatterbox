const { saveMsg } = require("./message");
const { createMessage } = require("../services/msgService");
const Message = require("../models/message");

function setupSocket(io) {
  io.on("connection", (socket) => {
    console.log("Socket connected", socket);

    socket.on("send-message", async (msg) => {
      try {
        const message = await createMessage(msg);
        console.log("📨 Message received:", message);
        socket.emit("chat-message", message);

        socket.broadcast.emit("chat-message", message); // or target a specific room/socket
      } catch (err) {
        console.error("Error saving message:", err);
        socket.emit("error-message", {
          message: err?.message || "Failed to send message",
        });
      }
    });
    socket.on("disconnect", () => {
      console.log("❌ Chat socket disconnected:", socket.id);
    });
  });
}
module.exports = { setupSocket };
