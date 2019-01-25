/**
 * Request handlers
 * 
 */

// Dependencies

// Define the handlers
let handlers = {};

// Categories
handlers.categories = (data,callback) => {
  let acceptableMethods = ['post','get','put','delete'];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._categories[data.method](data,callback);
  } else {
    callback(405);
  }
};

// Container for the category submethods
handlers._categories = {};

// Categories - post
handlers._categories.post = (data,callback) => {

};

// Categories - get
handlers._categories.get = (data, callback) => {

};

// Categories - put
handlers._categories.put = (data, callback) => {

};

// Categories - delete
handlers._categories.delete = (data, callback) => {

};

// Not found handler
handlers.notFound = (data, callback) => {
  callback(400);
};

// Export module
module.exports = handlers;