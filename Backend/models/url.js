const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      unique: true,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visithistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamp: true }
);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;
