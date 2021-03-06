const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(`${process.env.MONGODB_URI}`, {useNewUrlParser: true});

module.exports.User = require("./user");
module.exports.Movie = require("./movie");
module.exports.UniqueUserId = require("./uniqueUserId");