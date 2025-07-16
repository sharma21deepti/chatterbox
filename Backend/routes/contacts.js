const express = require("express");
const router = express.Router();
const {
  handleAddContact,
  handleGetContactList,
} = require("../controllers/contact");
router.patch("/", handleAddContact);
router.get("/list/:id", handleGetContactList);
module.exports = router;
