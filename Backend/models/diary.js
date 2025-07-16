const mongoose = require("mongoose");
const DiarySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  data: {
    type: Date,
  },
  mood: {
    type: String,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
});

const Diary = mongoose.model("diary", DiarySchema);
module.exports = Diary;
