const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = Schema({
  index: {
    type: Number,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
  },
  status: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", ContactSchema);
