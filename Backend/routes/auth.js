const express = require("express");
const router = express.Router();
const { handleAuth, handleLogin } = require("../controllers/auth");
const { validationResult } = require("express-validator"); // ✅ fixed here
const { validateAuth } = require("../middleware/auth");
const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/", handleAuth);
router.post("/login", handleLogin);

module.exports = router;
