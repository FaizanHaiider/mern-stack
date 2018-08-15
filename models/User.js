const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create new schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  permission: {
    type: Boolean,
    required: true
  }
});

module.exports = User = mongoose.model("users", UserSchema);
