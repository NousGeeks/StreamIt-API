/**
 * Request handlers
 * 
 */

// Dependencies

// Define the handlers
let handlers = {};

// Sample handler
handlers.sample = (data, callback) => {
  callback(406, { 'name': 'sample handler' });
};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(400);
};