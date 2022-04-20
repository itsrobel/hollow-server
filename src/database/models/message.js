const mongoose      = require("mongoose");
mongoose.promise	= Promise;
const messageSchema = new mongoose.Schema({
	chat: { type: String, required: true }, // chat id
	msg:  { type: String, required: true }, // message
	sender: { type: String, require: true }, // user id
	dateSent: { type: Date, default: Date.now, required: true },
});
module.exports 		= mongoose.model("Message", messageSchema);
