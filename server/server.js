// server.js

// create a http server

// listen for routes on question/:id
// GET - Will get a question
// POST - Will answer a question

//var http = require('http');


// add the simple log module
var l = require("./lib/l.js");
// set the debug flag
l.debug_mode = true;
// updat ethe variable l to the log function
l = l.l;

var express = require("express");
var app = express();



var r = require('./lib/questHandler.js').createQuestHandler();
r.on("onData", function() {
	app.get("/question/:id", function(req, res) {
		var id = req.params.id;
		var question;
		try {
			question = r.getQuestion(id);
		}
		catch (err){
			res.status(400); // Should be 404, but for this assignment we indicate a call to a question not found
			res.end();
			return;
		}

		// Remove the answer for now
		delete question.answer;

		// Send back the question
		question.nextURL = "/answer/" +id;
		question.message = "You got your question. Now send me the answer via HTTP POST to the nextURL";

		res.send(question);
	});

	app.get('*', function(req, res){
  		res.status(404);
	});


	app.listen(8000);
});
r.fetchData();





l("WELCOME DEBUG MODE IS ON");

// Using express for watching stuff


