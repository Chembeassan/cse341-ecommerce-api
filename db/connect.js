const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }
  
  client.connect()
    .then(() => {
      database = client.db();
      console.log('✅ Connected to MongoDB successfully!');
      
      // List available collections
      database.listCollections().toArray()
        .then(collections => {
          console.log('📋 Available collections:', collections.map(c => c.name));
          callback(null, database);
        })
        .catch(err => callback(err));
    })
    .catch(err => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDb
};