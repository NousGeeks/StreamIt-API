/**
 * Main entering of the DB
 * 
 */

// Dependencies
const MongoClient = require('mongodb').MongoClient;

// Db url
const uri = 'mongodb://localhost:27017';
const dbName = 'Movies'; // Db name

(async () => {
  let client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to DB");

    let db = client.db(dbName);
    let r;

    // Insert document

    // Update document

    // Read document

    // Delete document

  } catch (error) {
    console.log(error.stack);
  }


  // Close db
  client.close();
})();