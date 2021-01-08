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
      collection.find(query).sort({'name.lastName': 1}).toArray((err, items) => {
        if(err) throw err;    
        return(callBack(items));
      });
    });
  })
}

// Create async function to return the json data for the games
// Passes in query to simplify data as necessary
async function getGamesData(query, callBack){
  // Get the MongoDB connection string
  const uri = `mongodb+srv://${MONGO_API_USER}:${MONGO_API_PASSWORD}@${MONGO_API_CLUSTER}.ya13w.mongodb.net/${MONGO_API_DB}?retryWrites=true&w=majority`;

  // Connect to MongoDB Atlas
  MongoClient.connect(uri, (err, db) => {
    if(err) throw err;    
    // Fetch from the 'stats_trax' database, the 'games' collection
    db.db('stats_trax').collection('games', (err, collection) => {
      if(err) throw err;    
      // Get the players that match the query, and sort the results
      collection.find(query).toArray((err, items) => {
        if(err) throw err;    
        return(callBack(items));
      });
    });
  })
}

// Create async function to return the json data for the schedule
// Passes in query to simplify data as necessary
async function getScheduleData(query, callBack){
  // Get the MongoDB connection string
  const uri = `mongodb+srv://${MONGO_API_USER}:${MONGO_API_PASSWORD}@${MONGO_API_CLUSTER}.ya13w.mongodb.net/${MONGO_API_DB}?retryWrites=true&w=majority`;

  // Connect to MongoDB Atlas
  MongoClient.connect(uri, (err, db) => {
    if(err) throw err;    
    // Fetch from the 'stats_trax' database, the 'games' collection
    db.db('stats_trax').collection('schedule', (err, collection) => {
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
  // For query startsWith;
  if (typeof req.query.startsWith != 'undefined') {
    query['name.lastName'] = { $regex: `^${req.query.startsWith}` };
  }
  // For query playerIds;
  if (typeof req.query.playerIds != 'undefined') {
    query['id'] = { $in: req.query.playerIds.split(',').map(Number) };
  }
  
  // Fetch the players data from MongoDB
  getPlayersData(query, function(result) {
    // Return the json data
    res.json(result);
  })
})

// Setup the '/games' api endpoint 
app.get('/games', (req, res) => {
  var query = {};

  // If a query is specified, add the query to the query object
  // For query type;
  
  //if (typeof req.query.startDate != undefined && typeof req.query.endDate != undefined) {
    //query['name.lastName'] = { $regex: `^${req.query.startsWith}` };
  //}
  if (req.query.id != undefined) {
    query['id'] = parseInt(req.query.id);
  }

  if (req.query.season != undefined) {
    query['season'] = parseInt(req.query.season);
  }

  if (req.query.status != undefined && req.query.type == 'S') {
    query['statusCode'] = parseInt(req.query.status);
  }

  if (req.query.gameType != undefined) {
    query['gameType'] = req.query.gameType;
  }

  if (req.query.awayTeam != undefined) {
    if (req.query.type == 'S') {
      query['teams.away.team.id'] = parseInt(req.query.awayTeam);
    }
    else if (req.query.type == 'I') {
      query['teams.away.id'] = parseInt(req.query.awayTeam);
    }
  }

  if (req.query.homeTeam != undefined) {
    if (req.query.type == 'S') {
      query['teams.home.team.id'] = parseInt(req.query.homeTeam);
    }
    else if (req.query.type == 'I') {
      query['teams.home.id'] = parseInt(req.query.homeTeam);
    }
  }
  
  if (req.query.type == 'S') {
    // Fetch the players data from MongoDB
    getScheduleData(query, function(result) {
      // Return the json data
      res.json(result);
    })
  }

  if (req.query.type == 'I') {
    // Fetch the players data from MongoDB
    getGamesData(query, function(result) {
      // Return the json data
      res.json(result);
    })
  }
})

exports.app = functions.https.onRequest(app)