/**
 * Request handlers
 * 
 */

// Dependencies
let _data = require('./data');

// Define the handlers
let handlers = {};

// movies
handlers.movies = (data,callback) => {
  let acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._movies[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for the movie submethods
handlers._movies = {};

// movie - post
// Required fields - movieTitle, movieDesc, year, rate, imdbLink, ganres, language, mpaRating, bgImage, coverImage, downloadLink
handlers._movies.post = (data,callback) => {
  // Check reqired fields
  let movieTitle = typeof(data.payload.movieTitle) == 'string' && data.payload.movieTitle.trim().length > 0 ? data.payload.movieTitle.trim() : false;
  let movieDesc = typeof(data.payload.movieDesc) == 'string' && data.payload.movieDesc.trim().length > 0 ? data.payload.movieDesc.trim() : false;
  let year = typeof(data.payload.year) == 'number' && data.payload.year == 4 ? data.payload.year : false;
  let rate = typeof(data.payload.rate) == 'number' && data.payload.rate >= 0 && data.payload.rate <= 5 ? data.payload.rate : false;
  let imdbLink = typeof(data.payload.imdbLink) == 'string' && data.payload.imdbLink.trim().length > 0 ? data.payload.imdbLink.trim() : false;
  let ganres = typeof(data.payload.ganres) == 'object' && data.payload.ganres instanceof Array && data.payload.ganres.length > 0 ? data.payload.ganres : false;
  let language = typeof(data.payload.language) == 'string' && data.payload.language.trim().length > 0 ? data.payload.language.trim().length : false;
  let mpaRating = typeof(data.payload.mpaRating) == 'number' && data.payload.mpaRating > 0 ? data.payload.mpaRating : false;
  let movieImage = typeof(data.payload.movieImage) == 'object' && data.payload.movieImage instanceof Array && data.payload.movieImage.length > 0 ? data.payload.movieImage : false;
  let downloadLink = typeof(data.payload.downloadLink) == 'object' && data.payload.downloadLink instanceof Array && data.payload.downloadLink.length > 0 ? data.payload.downloadLink : false;
  
  if (movieTitle && movieDesc && year && rate && imdbLink && ganres && language && mpaRating && movieImage && downloadLink) {
    console.log("movieTitle: " + movieTitle + " \nmovieDesc: " + movieDesc + " \nyear: " + year + " \nrate: " + rate + " \nimdbLink: " + imdbLink + " \nganres: ", ganres + " \nlanguage: " + language + " \nmpaRating: " + mpaRating + " \nmovieImage: ", movieImage + " \ndownloadLink: ", downloadLink);

    // Make sure movie doesn't already exist
    _data.read('movie', movieTitle, (err, data) => {
      if (err) {
        // Create movie object
        let movieObject = {
          'movieTitle': movieTitle,
          'movieDesc': movieDesc,
          'year': year,
          'rate': rate,
          'imdbLink': imdbLink,
          'ganres': ganres,
          'language': language,
          'mpaRating': mpaRating,
          'movieImage': movieImage,
          'downloadLink': downloadLink
        };

        // Store new movie to db
        _data.create('movie', movieTitle, movieObject, (err) => {
          if (!err) {
            callback(200);
          } else {
            callback(500,{'Error': 'Storing new movie to db'});
          }
        });
      } else {
        callback(400,{'Error': 'A movie by that name may already exits'});
      }
    });
  } else {
    console.log("movieTitle: " + movieTitle + " \nmovieDesc: " + movieDesc + " \nyear: " + year + " \nrate: " + rate + " \nimdbLink: " + imdbLink + " \nganres: ", ganres + " \nlanguage: " + language + " \nmpaRating: " + mpaRating + " \nmovieImage: ", movieImage + " \ndownloadLink: ", downloadLink);

    callback(400,{'Error': 'Missing required field(s)'});
  }
};

// movies - get
handlers._movies.get = (data, callback) => {

};

// movies - put
handlers._movies.put = (data, callback) => {

};

// movies - delete
handlers._movies.delete = (data, callback) => {

};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(400);
};

// Export module
module.exports = handlers;