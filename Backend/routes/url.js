const express = require("express");
const router = express.Router();
const { urlShortner, redirectUrl, viewUrl } = require("../controllers/url");

router.post("/", urlShortner);
router.get("/view", viewUrl);
router.get("/:shortUrl", redirectUrl);
module.exports = router;
