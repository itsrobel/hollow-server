const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chat: { type: String, required: false },
  user: { type: Object, required: true },
  msg:  { type: String, required: true },

  sender: { type: String, require: true },
  reciever: { type:String, require: false }
});

module.exports = mongoose.model("Message", messageSchema);
