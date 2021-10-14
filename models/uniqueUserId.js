const mongoose = require("mongoose");

const uniqueUserIdSchema = new mongoose.Schema({
  currentMaxUserId: {
    type: Number,
    unique: true
  }
});

const UniqueUserId = mongoose.model("UniqueUserId", uniqueUserIdSchema);

module.exports = UniqueUserId;