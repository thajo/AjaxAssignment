
describe("Check the creation phase", function() {

	var obj = require('../lib/questHandler.js');

	it("Should create a proper QuestHandler object", function(){
		var o = obj.createQuestHandler();
		expect(o instanceof obj.QuestHandler).toBeTruthy();
	});
});


describe("Check that we can get data\n", function() {
	var onData = false;
	var obj = require('../lib/questHandler.js');
	obj.debug_mode = true;


	it("Should throw an exception telling that we havn´t got any data yet", function(){
		var qh = obj.createQuestHandler();
		// must put this in anonymous fuction
		expect(function(){qh.getQuestion(1);} ).toThrow(new Error("Don´t have any data yet"));
	});


	// Use this object in the rest of the test
	var o = obj.createQuestHandler();

	// before the test we set upp the call
	beforeEach(function() {
		//var o = obj.createQuestHandler();
		o.on("onData", function() {
			onData = true;
		}); 
		o.fetchData();
		// the test waits for teh returnstatement below to be true
		// after 2000 ms we got an timeout
		waitsFor(function() {
			return onData;
		}, 'Timeout getting data', 2000);


	});
	it("Should get the event onData", function() {
		expect(onData).toBeTruthy();
	});

	it("Should return the number of Questions", function() {
		//var o = obj.createQuestHandler();
		var nr = o.getNumberOfQuestions();
		expect(typeof nr).toBe("number");
		expect(nr > 0).toBeTruthy();	
		
		
	});

	it("Should get an JSON object containing a Question and an Answer", function(){
	//	var o = obj.createQuestHandler();
		if(o.getNumberOfQuestions() > 0) {
			var l = o.getNumberOfQuestions();
			for(var i = 0; i < l; i++) {
				var data = o.getQuestion(i + 1);
				expect(data.question).toBeDefined();
			}
			
		}
	});

	it("Should throw an error indicating we trying to get an index outside the array", function(){
	//	var o = obj.createQuestHandler();
		expect(function(){ 
				o.getQuestion(o.getNumberOfQuestions() + 1);
			}).toThrow(new Error("Did call a question that doesn´t exists"));
	});
});

