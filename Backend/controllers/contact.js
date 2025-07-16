const Auth = require("../models/auth");
const Chat = require("../models/chat");
const mongoose = require("mongoose");
const Message = require("../models/message");

async function handleAddContact(req, res) {
  try {
    const { phone, senderId } = req.body;
    const user = await Auth.findOne({ phone });
    console.log(user, "user");

    if (!user) {
      res.status(400).json({
        message: "User with this number is not registered",
      });
      return;
    }
    const chat = new Chat({
      participants: [user._id, senderId],
    });

    await chat.save();


    await Message.create({ chatId: chat?.chatId });
    const updatedUser = await Auth.findByIdAndUpdate(
      senderId,
      { $addToSet: { contacts: user._id } }, // avoids duplicates
      { new: true }
    );
    res.status(200).json({
      message: "Status updated Successfully",
      updatedUser,
    });
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
}

async function handleGetContactList(req, res) {
  try {

    const id = req.params.id;

    const user = await Auth.findOne({ _id: id });
    console.log(user, "user>>>>>>");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const userWithContacts = await User.findById(userId).populate("contacts");
    // const updatedUserContactList = await Promise.all(
    //   user.contacts.map((contactId) =>
    //     Auth.findById(contactId).populate("contacts")
    //   )
    // );

    const updatedUserContactList = await Auth.find({
      _id: { $in: user.contacts },
    });
    const updatedData = await Promise.all(
      updatedUserContactList?.map(async (contact) => {
        const chat = await Chat.findOne({
          participants: { $all: [req.params.id, contact?.id] },
        });
        return { ...contact.toObject(), chatId: chat?.chatId };
      })
    );

    console.log(updatedData, "list");

    res.status(200).json({
      message: "User Contact List fetched Successfully",
      contacts: updatedData,
    });
  } catch (err) {
    console.log(err, "err");
    res.status(400).json({
      message: err.message || "Something went wrong",
    });
  }
}

module.exports = { handleAddContact, handleGetContactList };
