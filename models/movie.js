const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  imdbId: {
    type: Number,
  },
  youtubeId: {
    type: String,
  },
  Genre: [
   {
    type: String,
   }
  ],
  posterUrl: {
    type: String,
  },
  youtubeUrl: {
    type: String,
  }
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;