const Diary = require("../models/diary");

async function createDiary(req, res) {
  try {
    const { title, content, date, mood } = req.body;
    console.log(req.file, "file");
    const file = req.file
      ? {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        }
      : undefined;

    const diary = await Diary.create({ title, content, date, mood, file });
    res.status(201).json({
      message: "Diary Created Successfully",
      diary,
    });
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
}

async function readAllDiary(req, res) {
  try {
    const { title } = req.query;

    const query = title ? title : null;
    const data = await Diary.find({ query });

    res.status(200).json({
      message: "Data fetched Successfully",
      data,
    });
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
}

async function readDiary(req, res) {
  try {
    const id = req.params?.id;
    if (!id) {
      return res.status(400).json({
        message: "Invalid Id",
      });
    }
    const diaryData = await Diary.findById({ _id: id }).lean();
    if (!diaryData) {
      return res.status(400).json({
        message: "Diary not found",
      });
    }
    const imageBase64 = `data:${
      diaryData?.file.contentType
    };base64,${diaryData?.file.data.toString("base64")}`;
    res.status(200).json({
      message: "Diary fetched Successfully",
      ...diaryData,
      file: imageBase64,
    });
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      err: err.message || "something Went wrong",
    });
  }
}

async function updateDiary(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        message: "Invalid Id value",
      });
    }
    const updatedDiary = await Diary.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDiary) {
      return res.status(400).json({
        message: "User not updated",
      });
    }

    res.status(200).json({
      message: "Diary updated Successfully",
      updatedDiary,
    });
    
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      err: err.message || "Something Went wrong",
    });
  }
}

async function deleteDiary(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({
        message: "invalid Id",
      });
    }
    await Diary.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "Diary deleted Successfully",
    });
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      err: err.message || "Something Went wrong",
    });
  }
}

module.exports = {
  createDiary,
  readAllDiary,
  readDiary,
  updateDiary,
  deleteDiary,
};
