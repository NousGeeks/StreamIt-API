/**
 * The main movie enterty model
 *
 */

// Dependencies
const mongoose = require("mongoose");

// Creating schema for genres
let movieSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  url: String,
  imdb_code: String,
  title: String,
  title_english: String,
  title_long: String,
  slug: String,
  year: Number,
  rating: Number,
  runtime: Number,
  genres: [],
  summary: String,
  description_full: String,
  synopsis: String,
  yt_trailar_code: String,
  language: String,
  mpa_rating: String,
  background_image: String,
  background_image_original: String,
  small_cover_image: String,
  medium_cover_image: String,
  large_cover_image: String,
  status: String,
  torrent: [{
    url: String,
    hash: String,
    quality: String,
    type: String,
    seeds: Number,
    peers: Number,
    size: String,
    size_bytes: Number,
    data_uploaded: String,
    data_uploaded_unix: Number
  }],
  data_uploaded: String,
  data_uploaded_unix: Number
});

// Compiling schema into module
let genres = mongoose.model("Movies", movieSchema);

// Exporting module
module.exports = genres;
