const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
    },
    userEmailId: {
      type: String,
    },
    userPassword: {
      type: String,
    },
    userAge: {
      type: Number,
      min: 18,
      max: 65,
    },
    userIsActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const UserData = mongoose.model("UserData", userSchema);
module.exports = UserData;
