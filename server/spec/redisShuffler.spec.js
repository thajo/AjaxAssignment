describe("Testing the Redis connection", function() {
	
	var state = false;	

	beforeEach(function() {
		var redis = require("redis");
		var client = redis.createClient(6379, "127.0.0.1");
		
		/*client.on("error", function() {
			return state;
		});*/

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


describe("Testing the data we getting from Redis", function() {

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

	it("Should hav e1 or more elemet in teh result array", function(){
		expect(data.length > 0).toBeTruthy();
	});

	it("All elements should include JSON with question and answer", function() {
		var status = true;
		data.forEach(function(el){
			
			try {
				// Must I stringify the object...blagi
				var data = JSON.parse( JSON.stringify(el) );
				
				if(data.question === undefined) {
					status = false;
				}
				if(data.answer === undefined) {
					status = false;
				}
			}
			catch(err) {
				console.log(err);
				status = false;
			}
		});

		expect(status).toBeTruthy();
	});

});