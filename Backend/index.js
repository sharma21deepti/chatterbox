const express = require("express");
const cors = require("cors");
const http = require("http");
const { setupSocket } = require("./controllers/sockethandler");
const { connectMongoDb } = require("./connections");
const { Server } = require("socket.io");
const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS globally
app.use(cors(corsOptions));

// // Optional: preflight route handling
// app.options("/*", cors(corsOptions));

const PORT = 8000;
const server = http.createServer(app);
const io = new Server(server, {
  path: "/chat/socket.io",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

setupSocket(io);
app.use(express.json());

const AuthRoutes = require("./routes/auth");
const DiaryRoutes = require("./routes/diary");
const ContactRoute = require("./routes/contacts");
const ChatRoute = require("./routes/chat");
app.use("/auth", AuthRoutes);
app.use("/diary", DiaryRoutes);
app.use("/contact", ContactRoute);
app.use("/chat", ChatRoute);
connectMongoDb("mongodb://127.0.0.1:27017/diary");
server.listen(PORT, () => console.log("Server Started"));
