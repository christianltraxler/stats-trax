

const functions = require('firebase-functions')
const express = require('express')
const app = express()


app.get('/team', (req, res) => {
    res.send("This is the teams page")
  })
  app.get('/player', (req, res) => {
    res.send("This is the players page")
  })

exports.app = functions.https.onRequest(app)