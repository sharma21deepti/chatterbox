const { nanoid } = require("nanoid");
const Url = require("../models/url");
async function urlShortner(req, res) {
  try {
    const body = req.body;
    if (!body?.url) return res.status(400).json({ message: "Url not found" });
    const shortnedUrl = nanoid(8);
    await Url.create({
      shortUrl: shortnedUrl,
      redirectUrl: body.url,
      visithistory: [],
    });
    return res.render("home", { shortUrl: shortnedUrl });
  } catch (err) {
    console.error("Error creating short URL:", err); // This is key!
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

async function redirectUrl(req, res) {
  try {
    const shortUrl = req.params.shortUrl;
    const entry = await Url.findOne({ shortUrl: shortUrl });
    // const entry = await Url.findOneAndUpdate(
    //   { shortUrl },
    //   {
    //     $push: {
    //       visithistory: {
    //         timestamp: Date.now(),
    //       },
    //     },
    //   }
    // );
    if (entry) res.redirect(entry.redirectUrl);
  } catch (err) {
    // console.error("Error creating short URL:", err); // This is key!
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

async function viewUrl(req, res) {
  try {
    console.log("Fetching all URLs...");
    const allUrl = await Url.find({});
    console.log("Data fetched:", allUrl);

    return res.render("home", {
      urls: allUrl,
    });
    // res.status(200).json({ message: "Hello" });
  } catch (err) {
    console.error("Error rendering EJS:", err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = { urlShortner, redirectUrl, viewUrl };
