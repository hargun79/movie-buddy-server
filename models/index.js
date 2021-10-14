const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb+srv://SINGHHR:admin@cluster0.e7opo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true});

module.exports.User = require("./user");
module.exports.Movie = require("./movie");
module.exports.UniqueUserId = require("./uniqueUserId");