// server.js

// create a http server

// listen for routes on question/:id
// GET - Will get a question
// POST - Will answer a question

//var http = require('http');
var app = require('./lib/questHandler.js');

var r = app.createQuestHandler();
r.dataFetch("hej hej");

// Here we have fetch the data if first time from file if in memory from redis server


