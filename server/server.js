// server.js

// create a http server

// listen for routes on question/:id
// GET - Will get a question
// POST - Will answer a question

//var http = require('http');
var app = require('./lib/redisShuffler.js');
var onData = function(res) {
	
	console.log(typeof res);
	console.log(res instanceof Array);
	console.log(res);
};

try {
	app.getData(onData);
}
catch(err) {
	console.log(err);
}

// Here we have fetch the data if first time from file if in memory from redis server


