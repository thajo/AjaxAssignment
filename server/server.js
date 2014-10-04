// server.js

// create a http server

// listen for routes on question/:id
// GET - Will get a question
// POST - Will answer a question

//var http = require('http');


// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

var r = require('./lib/questHandler.js').createQuestHandler();
r.on("onData", function() {
	router.get("/question/:id", function(req, res) {
		var id = req.params.id;
		var question;
		try {
			question = r.getQuestion(id);
		}
		catch (err){
			console.log(err);
			res.status(400); // Should be 404, but for this assignment we indicate a call to a question not found
			res.end();
			return;
		}

		// Remove the answer for now
		delete question.answer;

		// Send back the question
		question.nextURL = "/answer/" +id;
		question.message = "You got your question! Now send me the answer via HTTP POST to the nextURL";

		res.send(question);
	});

	router.get("/answer/:id", function(req, res) {
		res.status(405).send('{"message" : "This URL only accept POST"}');
		res.end();
	});
//http://scotch.io/tutorials/javascript/build-a-restful-api-using-node-and-express-4
	router.route("/answer/:id").post(function(req, res) {
		var id = req.params.id;
		var question;

		try {
			question = r.getQuestion(id);
			console.log(JSON.stringify(question));
		}
		catch (err){
			res.status(400).send({"message" : "Bad URL - no question found on that URI"}); // Should be 404, but for this assignment we indicate a call to a question not found
			res.end();
			return;
		}
		// Check if user send correct json
		if(!req.body.hasOwnProperty("answer")) {
			res.status(400).send({"message" : "Missing correct JSON with answer key"});
			res.end();
			return;
		}
		else {
			console.log(question.answer);
			console.log(req.body.answer);
			if(question.answer === req.body.answer) {
				// fetch the nest question
				var nextID = r.getNextQuestion(id).id;
				var nextUrl = "http://localhost:8000/question/" +nextID;
				res.status(200).send({"message" : "Correct answer", "nextURL" : nextUrl});
			}
			else {
				res.status(400).send({"message" : "Wrong answer"});
			}
		}
		res.end();

	});



	router.get('*', function(req, res){
  		res.status(404);
  		res.end();
	});

	router.post('*', function(req, res){
  		res.status(404);
  		res.end();
	});

	app.use('/', router);
	app.listen(8000); console.log("Server listen on port 8000 in dev MODE");
});
r.fetchData();


// Using express for watching stuff


