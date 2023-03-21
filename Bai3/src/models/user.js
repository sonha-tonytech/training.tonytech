const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = Schema({
    index: {
        type: Number
    },
    userName: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    selected: {
        type: Boolean
    }
  });
  
  module.exports = UserModel = mongoose.model("User", UserSchema);