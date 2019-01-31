/**
 * Primary file for the API
 *
 */

//  Dependencies
const http = require('http');
const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const db = require('mongodb').MongoClient;
const Socket = require('socket.io');

// Library dependencies
const config = require("./lib/config");
const handlers = require("./lib/handlers");
const _data = require("./lib/data");

// TESTING
// @TODO Delete later
_data.delete('test','newFile',(err,data) => {
  console.log("This was the error",err);
});

// The server should respond to all request with a string
let server = http.createServer((req, res) => {
  // Get the URL and parse it
  let parsedUrl = url.parse(req.url,true);

  // Get the path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g,'');

  // Get the query string as an object
  let queryStringObject = parsedUrl.query;

  // Get the HTTP method
  let method = req.method.toLowerCase();

  // Get the headers as an object
  let headers = req.headers;

  // Get the payload, if any
  let decoder = new stringDecoder('utf-8');
  let buffer = '';
  req.on('data',data => buffer += decoder.write(data));
  req.on('end',() => {
    buffer += decoder.end();

    // Choose the handler this request should go to, if one is not found use the not found handler
    let chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Construct the data object to send to the handler
    let data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    // Route the request to the hander specified to the router
    chosenHandler(data,(statusCode,payload) => {
      // Use the statusCode called back by the handler, or default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      // Use the payload called back by the handler or default to an empty object
      payload = typeof(payload) == 'object' ? payload : {};

      // Convert the payload to a string
      let payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader('Content-Type','application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // Log the request path
      console.log("Return this response: ", statusCode,payloadString);
    });
  });
});

// setting up socket.io server
io = Socket(server);
let socket = io('http://localhost:11303');

// Define a request router
let router = {
  'cinema': handlers.cinema,
  'genres': handlers.genre,
  'latestMovies': handlers.latestMovies,
  'movies': handlers.movies,
  'movieDetails': handlers.movieDetails,
  'popularMovies': handlers.popularMovies,
  'search': handlers.search
};

// Strat server
server.listen(config.port, () => console.log("Server running on port: "+config.port+" in "+config.envName+" mode"));