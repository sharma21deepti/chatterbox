const User = require("../models/user");

async function getAllUsers(req, res) {
  try {
    const roleFilter = req.query.role ? { role: req.query.role } : {};
    const usersData = await User.find(roleFilter);
    const paginatedData = usersData.slice(0, req.query.pageSize);
    // res.json(usersData);
    res.status(200).json({
      message: "User Data fetched successfully",
      data: paginatedData,
    });
  } catch (err) {
    res.status(400).json("User data not found", err);
  }
}

async function getUserById(req, res) {
  try {
    const userList = await User.findById(req.params.id);
    if (userList) {
      res.status(200).json({
        message: "User fetched Successfully",
        data: userList,
      });
    } else {
      res.status(400).json({
        message: "User data not found",
        error: err.message,
      });
    }
  } catch (err) {
    res.status(400).json({ message: "invalid Id" });
  }
}

async function handleCreateUser(req, res) {
  try {
    // const { firstName, lastName, email, jobTitle } = req.body;

    await User.create(req.body);

    res.status(200).json({
      message: "User Created Successfully",
      data: req.body,
    });
  } catch (err) {
    console.log(err);
    const errorMsg =
      err?.code === 11000
        ? "Mobile number already exists"
        : "Failed to create User";
    res.status(400).json({ error: errorMsg });
  }
}

async function handleUpdateUser(req, res) {
  try {
    // const data = await User.findById(req.params.id);
    // if (data) {
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "User Updated Successfully",
      data: updatedUser,
    });
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.log(err);
    const isDuplicateKey =
      err?.codeName === "DuplicateKey" ||
      err?.errorResponse?.codeName === "DuplicateKey";
    const duplicateField = err?.keyPattern
      ? Object.keys(err.keyPattern).join(", ")
      : err?.errorResponse?.keyPattern
      ? Object.keys(err.errorResponse.keyPattern).join(", ")
      : "Field";
    const errMsg = isDuplicateKey
      ? `${duplicateField} already exists`
      : err.message || "Update failed";

    res.status(400).json({
      error: errMsg,
    });
  }
}

async function handleDeleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });
    if (deletedUser) {
      res.status(200).json({
        message: "User Deleted successfully",
      });
    } else {
      res.status(400).json({
        message: "UserId not found",
      });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
}
module.exports = {
  getAllUsers,
  getUserById,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
};
