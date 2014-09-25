
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
	//var o = obj.createQuestHandler();


	it("Should throw an exception telling that we havn´t got any data yet", function(){
		var o = obj.createQuestHandler();
		expect(o.getQuestion(1)).toThrow("Error: Don´t have any data yet");
	});

	// before the test we set upp the call
	beforeEach(function() {
		var o = obj.createQuestHandler();
		o.on("onData", function() {
			onData = true;
		}); 
		o.dataFetch();
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
		var o = obj.createQuestHandler();
		var nr = o.getNumberOfQuestions();
		expect(nr).toBe(typeof "number");
		expect(nr > 0).toBeTruthy();
	});

	it("Should get an JSON object containing a Question and an Answer", function(){
		var o = obj.createQuestHandler();
		if(o.getNumberOfQuestions() > 0) {
			var data = o.getQuestion(1);
			expect(data).toBeDefinied();
		}
		

	});

	it("Should throw an error indicating we trying to get an index outside the array", function(){
		var o = obj.createQuestHandler();
		expect(o.getQuestion(o.getNumberOfQuestions() + 1)).toThrow("Error: Don´t have any data yet");
	});
});

