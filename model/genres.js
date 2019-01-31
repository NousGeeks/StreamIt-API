/**
 * The main genre enterty model
 *
 */

// Dependencies
const mongoose = require('mongoose');

// Creating schema for genres
let genreSchema = new mongoose.Schema({
  name: String
});

// Compiling schema into module
let genres = mongoose.model('Genres', genreSchema);

// Exporting module
module.exports = genres;
