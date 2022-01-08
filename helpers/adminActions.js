const db = require("../models");

exports.setUUID = async function(req, res, next) {
  try {
    let uuid = await db.UniqueUserId.findOne({});
    uuid.currentMaxUserId = req.body.uuid;
    await uuid.save();
    return res.status(200).json(uuid);
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.addMovie = async function(req, res, next) {
  try {
    let movie = await db.Movie.create({
      movieId: req.body.movieId,
      title: req.body.title,
      imdbId: req.body.imdbId,
      youtubeId: req.body.youtubeId,
      Genre: req.body.Genre,
      posterUrl: req.body.posterUrl,
      youtubeUrl: req.body.youtubeUrl
    });
    return res.status(200).json(movie);
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

exports.removeMovie = async function(req, res, next) {
  try {
    let movie = await db.Movie.findOneAndDelete({
      movieId: req.body.movieId
    });
    return res.status(200).json({msg: "Deleted"});
   } catch (err) {
    return res.status(400).json({error: err});
  }
}

module.exports = exports;