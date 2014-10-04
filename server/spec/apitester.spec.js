//apitester.spec.js

describe("APITESTER -- test calling the service", function(){
	var request = require('request');
	var base = "http://localhost:8000/";

	it('Server should respond to /question/1', function() {
    	request.get(base +'question/1', function(err, response){
        	expect(response.statusCode).toBe(200);
    	});
	});

	it('Server should respond to /bad with 404', function() {
    	request.get(base +'bad', function(err, response){
        	expect(response.statusCode).toBe(404);
    	});
	});

	it('Server should respond to /question/1234567xxx with 404', function() {
    	request.get(base +'question/1234567xxx', function(err, response){
        	expect(response.statusCode).toBe(400);
    	});
	});

	it("When a GET is send to /answer/:id a 405 (bad method) should be returned", function() {
		request.get(base +'answer/1', function(error, response, body){

        	expect(response.statusCode).toBe(405);
        	//var mess = JSON.parse(body).message;
        	//expect(mess).toBe("This URL only accept POST");

    	});
	});

	it("When wrong answer is submitted server should return 400 and a message", function() {
		request.post({
		  url:     base + 'answer/1',
		  body:    '{"answer" : "1"}',
		  headers: {
		    'Content-Type': 'application/json'
		  }
		}, function(error, response, body){
			expect(response.statusCode).toBe(400);
			//var mess = JSON.parse(body).message;
			//expect(mess).toBe("Missing the answer in json-format");
		});
	});

	it("When correct answer is submitted we should get a 200 and a nextURL", function() {
		request.post({
		  url:     base + 'answer/1',
		  body:    '{"answer" : "2"}',
		  headers: {
		    'Content-Type': 'application/json'
		  }
		}, function(error, response, body){
			expect(response.statusCode).toBe(200);
			var mess = JSON.parse(body).message;
			expect(mess).toContain("Correct answer");
			var next = JSON.parse(body).nextURL;
			expect(next).toBeDefined();

		});
	});
});