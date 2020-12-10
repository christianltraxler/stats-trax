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

const MONGO_API_KEY = `${process.env.REACT_APP_MONGO_API_KEY}`;



async function getTeamsJSON(callBack){
  const uri = `mongodb+srv://${MONGO_API_USER}:${MONGO_API_PASSWORD}@${MONGO_API_CLUSTER}.ya13w.mongodb.net/${MONGO_API_DB}?retryWrites=true&w=majority`;

  MongoClient.connect(uri, (err, db) => {
    if(err) throw err;    
    db.db('stats_trax').collection('teams', (err, collection) => {
      if(err) throw err;    
      collection.find().sort({'name': 1}).toArray((err, items) => {
        if(err) throw err;    
        return(callBack(items));
      });
    });
  })
}
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/teams', (req, res) => {
  getTeamsJSON(function(result) {
    res.json(result);
  });
  })
  
app.get('/players', (req, res) => {
    res.send("This is the players page")
  })

exports.app = functions.https.onRequest(app)