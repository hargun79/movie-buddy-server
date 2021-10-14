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
  date: {
    type: String,
  },
  imdb: {
    type: String,
  },
  Genre: [
   {
    type: String,
   }
  ]
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;