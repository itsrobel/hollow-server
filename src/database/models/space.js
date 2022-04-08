const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  owner: { type: Object, required: true },
  users: { type: Array, required: true}
});

module.exports = mongoose.model("Spaces", spaceSchema);
