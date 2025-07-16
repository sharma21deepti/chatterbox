const express = require("express");
const router = express.Router();
const multer = require("multer");
const { authenticateToken } = require("../middlewares/auth");
const {
  createDiary,
  readAllDiary,
  readDiary,
  updateDiary,
  deleteDiary,
} = require("../controllers/diary");
const upload = multer({ storage: multer.memoryStorage() });
router
  .get("/", authenticateToken, readAllDiary)
  .post("/", authenticateToken, upload.single("file"), createDiary);
router.get("/:id", authenticateToken, readDiary);
router.patch("/:id", authenticateToken, updateDiary);
router.delete("/:id", authenticateToken, deleteDiary);

module.exports = router;
