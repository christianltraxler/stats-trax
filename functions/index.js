const dotenv = require('dotenv').config();
const functions = require('firebase-functions');
const express = require('express');
var cors = require('cors');
const app = express();
const {MongoClient} = require('mongodb');

const MONGO_API_PASSWORD = `${process.env.REACT_APP_MONGO_API_PASSWORD}`;
const MONGO_API_USER = `${process.env.REACT_APP_MONGO_API_USER}`;
const MONGO_API_CLUSTER = `${process.env.REACT_APP_MONGO_API_CLUSTER}`;
const MONGO_API_DB = `${process.env.REACT_APP_MONGO_API_DB}`;

// Create async function to return the json data for the teams
// Passes in query to simplify data as necessary
async function getTeamsData(query, callBack){
  // Get the MongoDB connection string
  const uri = `mongodb+srv://${MONGO_API_USER}:${MONGO_API_PASSWORD}@${MONGO_API_CLUSTER}.ya13w.mongodb.net/${MONGO_API_DB}?retryWrites=true&w=majority`;

  // Connect to MongoDB Atlas
  MongoClient.connect(uri, (err, db) => {
    if(err) throw err;    
    // Fetch from the 'stats_trax' database, the 'teams' collection
    db.db('stats_trax').collection('teams', (err, collection) => {
      if(err) throw err;    
      // Get the teams that match the query, and sort the results
      collection.find(query).sort({'name': 1}).toArray((err, items) => {
        if(err) throw err;    
        return(callBack(items));
      });
    });
  })
}

// Create async function to return the json data for the players
// Passes in query to simplify data as necessary
async function getPlayersData(query, callBack){
  // Get the MongoDB connection string
  const uri = `mongodb+srv://${MONGO_API_USER}:${MONGO_API_PASSWORD}@${MONGO_API_CLUSTER}.ya13w.mongodb.net/${MONGO_API_DB}?retryWrites=true&w=majority`;

  // Connect to MongoDB Atlas
  MongoClient.connect(uri, (err, db) => {
    if(err) throw err;    
    // Fetch from the 'stats_trax' database, the 'players' collection
    db.db('stats_trax').collection('players', (err, collection) => {
      if(err) throw err;    
      // Get the players that match the query, and sort the results
      collection.find(query).toArray((err, items) => {
        if(err) throw err;    
        return(callBack(items));
      });
    });
  })
}

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Setup the '/teams' api endpoint 
app.get('/teams', (req, res) => {
  var query = {};

  // If a query is specified, add the query to the query object
  // For query teamId:
  if (typeof req.query.teamId != 'undefined') {
    query['id'] = parseInt(req.query.teamId);
  }

  // Fetch the teams data from MongoDB
  getTeamsData(query, function(result) {
    // Return the json data
    res.json(result);
  });
})
  
// Setup the '/players' api endpoint 
app.get('/players', (req, res) => {
  var query = {};

  // If a query is specified, add the query to the query object
  // For query playerId:
  if (typeof req.query.playerId != 'undefined') {
    query['id'] = parseInt(req.query.playerId);
  }
  // For query teamId;
  if (typeof req.query.teamId != 'undefined') {
    query['currentTeam.id'] = parseInt(req.query.teamId);
  }
  
  // Fetch the players data from MongoDB
  getPlayersData(query, function(result) {
    // Return the json data
    res.json(result);
  })
})

exports.app = functions.https.onRequest(app)