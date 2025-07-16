const express = require("express");
const router = express.Router();
const { handleRegister, handleLogin, getUser,updateUser } = require("../controllers/auth");

router.post("/", handleRegister);
router.get("/:id", getUser);
router.post("/login", handleLogin);
router.patch("/",updateUser);
module.exports = router;
