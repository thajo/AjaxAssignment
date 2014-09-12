// server.js

// create a http server

// listen for routes on question/:id
// GET - Will get a question
// POST - Will answer a question

//var http = require('http');
var app = require('./lib/quiz-assignment.js');

//http.createServer(function(req, res) {
app.getData();
//	res.writeHead(200, {"Content-Type": "test/html"});
//	res.end();
//}).listen(3333);
//console.log("Started server at port 3333");