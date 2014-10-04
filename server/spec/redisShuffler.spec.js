

describe("REDISSHUFFLER - Testing the Redis connection", function() {

	var state = false;

	beforeEach(function() {
		var redis = require("redis");
		var client = redis.createClient(6379, "127.0.0.1");

		client.on("ready", function() {
			state = true;
		});

		waitsFor(function() {
			return state;
		}, "Timeout on checking Redis connection", 2000);
	});

	it("Should connect to redis on localhost port 6379", function() {
		expect(state).toBeTruthy();
	});
});



describe("REDISSHUFFLER - Testing calling redis on a bad URL:port", function() {
	var badCon = false;
	beforeEach(function() {
		var redis = require("redis");
		var client = redis.createClient(666, "127.0.0.1");

		client.on("error", function() {
			badCon = true;
		});

		waitsFor(function() {
			return badCon;
		}, "Timeout on checking Redis connection", 2000);
	});
	it("Should get an error connection", function() {
		expect(badCon).toBeTruthy();
	});
});


describe("REDISSHUFFLER - Test the module with bad path call to datafile", function() {
	var r = require('../lib/redisShuffler.js');
	var data;
	var redis = require("redis");
	var client = redis.createClient(6379, "127.0.0.1");
	var HNAME = "questions";


	beforeEach(function() {
		client.del(HNAME);
		//console.log("CALL ME");
		r.getData(function(res) {
			data = res;
		}, "path/to/hell");


		// the test waits for teh returnstatement below to be true
		// after 2000 ms we got an timeout
		waitsFor(function() {
			return data !== undefined;
		}, 'Timeout getting data', 2000);
	});
	it("Should return false if we provide a bad path", function() {
		expect(data).toBeFalsy();
	});
});

/*
describe("REDISSHUFFLER - Test to read a bad parsed json file", function(){
	// conect to the redis server
	var redis = require("redis");
	var client = redis.createClient(6379, "127.0.0.1");
	var HNAME = "questions";
	var r = require('../lib/redisShuffler.js');
	var data;
	client.del(HNAME);
	// empty all data - could it be done?
	beforeEach(function() {

		r.getData(function(res) {
			data = res;
			client.end();
		}, "./nojson.json");

		// the test waits for teh returnstatement below to be true
		// after 2000 ms we got an timeout
		waitsFor(function() {
			return data !== undefined;
		}, 'Timeout getting data', 2000);
	});
	// call get data
	it("Should return false when there are bad data", function() {
		expect(data).toBeFalsy();
	});

});
*/
/*
describe("REDISSHUFFLER - Test to read a jasonfile with bad key-values", function(){
	// conect to the redis server
	var redis = require("redis");
	var client = redis.createClient(6379, "127.0.0.1");
	var HNAME = "questions";
	var r = require('../lib/redisShuffler.js');
	var data;
	client.del(HNAME);
	// empty all data - could it be done?
	beforeEach(function() {

		r.getData(function(res) {
			data = res;
			client.end();
		}, "./baddata.json");

		// the test waits for teh returnstatement below to be true
		// after 2000 ms we got an timeout
		waitsFor(function() {
			return data !== undefined;
		}, 'Timeout getting data', 2000);
	});
	// call get data
	it("Should return false when there are bad data", function() {
		expect(data).toBeFalsy();
	});
});
*/



describe("REDISSHUFFLER - Testing the data we getting from Redis (cached data)", function() {

	var r = require('../lib/redisShuffler.js');
	var data;
	// before the test we set upp the call
	beforeEach(function() {
		r.getData(function(res) {
			data = res;
		});

		// the test waits for teh returnstatement below to be true
		// after 2000 ms we got an timeout
		waitsFor(function() {
			return data !== undefined;
		}, 'Timeout getting data', 2000);
	});


	it("Should get an array from a call", function() {
		expect(data instanceof Array).toBeTruthy();
	});

	it("Should have 1 or more elemet in the result array", function(){
		expect(data.length > 0).toBeTruthy();
	});

	it("All elements should include JSON with id, question and answer", function() {
		var status = true;
		//console.log(data);
		data.forEach(function(el){

			// This is a controlled test so no need to catch error parsing
			//try {
				// Must I stringify the object...blagi
				var data = JSON.parse( JSON.stringify(el) );
				status = (data.id !== undefined) && (data.question !== undefined ) && (data.answer !== undefined);
			//}
			/*catch(err) {
				console.log(err);
				status = false;
			}*/
		});

		expect(status).toBeTruthy();
	});

});


describe ("REDISSHUFFLER - Testing getting the data (no cache)", function() {

	// conect to the redis server
	var redis = require("redis");
	var client = redis.createClient(6379, "127.0.0.1");
	var HNAME = "questions";
	var r = require('../lib/redisShuffler.js');
	var data;
	client.del(HNAME);
	// empty all data - could it be done?
	beforeEach(function() {

		r.getData(function(res) {
			data = res;
			client.end();
		});

		// the test waits for teh returnstatement below to be true
		// after 2000 ms we got an timeout
		waitsFor(function() {
			return data !== undefined;
		}, 'Timeout getting data', 2000);
	});
	// call get data
	it("Should get an array from a call to a non cache", function() {
		expect(data instanceof Array).toBeTruthy();
	});

	it("All elements should include JSON with question and answer after this", function() {
		var status = true;
		//console.log(data);
		data.forEach(function(el){

			var data = JSON.parse( JSON.stringify(el) );
			status = (data.question !== undefined ) && (data.answer !== undefined);
		});

		expect(status).toBeTruthy();
	});
});


