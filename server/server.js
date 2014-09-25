// server.js

// create a http server

// listen for routes on question/:id
// GET - Will get a question
// POST - Will answer a question

//var http = require('http');
var app = require('./lib/questHandler.js');

var r = app.createQuestHandler();
app.debug_mode = true;
r.on("onFetch", function(res){
	console.log("Got evet: " +res);
});
r.dataFetch("echo me");

// Here we have fetch the data if first time from file if in memory from redis server


