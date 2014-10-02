// server.js

// create a http server

// listen for routes on question/:id
// GET - Will get a question
// POST - Will answer a question

//var http = require('http');
var app = require('./lib/questHandler.js');

// add the simple log module
var l = require("./lib/l.js");
// set the debug flag
l.debug_mode = true;
// updat ethe variable l to the log function
l = l.l;
var r = app.createQuestHandler();


l("WELCOME DEBUG MODE IS ON");
r.on("onFetch", function(res){
	console.log("Got evet: " +res);
});
r.fetchData("echo me");

// Here we have fetch the data if first time from file if in memory from redis server


