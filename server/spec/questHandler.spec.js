
describe("Check the creation phase", function() {

	var obj = require('../lib/questHandler.js');

	it("Should create a proper QuestHandler object", function(){
		var o = obj.createQuestHandler();
		expect(o instanceof obj.QuestHandler).toBeTruthy();
	});
});


describe("Check that we get the fetched data\n", function() {
	var onData = false;
	var obj = require('../lib/questHandler.js');
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
	it("Should get the event 'onData'", function() {
		expect(onData).toBeTruthy();
	});
});