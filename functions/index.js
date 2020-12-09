

const functions = require('firebase-functions')
const express = require('express')
const app = express()


app.get('/api/teams', (req, res) => {
    res.send("This is the teams page")
  })
  app.get('/api/players', (req, res) => {
    res.send("This is the players page")
  })

exports.app = functions.https.onRequest(app)