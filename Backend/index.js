const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 8000;
const userData = require("./MOCK_DATA.json");
const logReqRes = require("./middleware");
const path = require("path");

//Connection
const { connectMongoDb } = require("./connections");
connectMongoDb("mongodb://127.0.0.1:27017/practice");

//Setting Up Ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Loggin req and res data middleware
app.use(logReqRes("log.txt"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Routes
const userRoutes = require("./routes/users");
const urlRoutes = require("./routes/url");
const authRoutes = require("./routes/auth");
// Routes
app.use("/user", userRoutes);
app.use("/url", urlRoutes);
app.use("/auth", authRoutes);
app.listen(PORT, () => {
  console.log("server Started");
});
