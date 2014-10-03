/*
 *
 * Licensed under the CC0 license.
 */

(function(){
	'use strict';

	/** USED MODULES **/
	var redisShuffler = require('./redisShuffler.js');
	var events = require('events');
	var util = require('util');
	var l = require('./l.js').l;

	/** IMPLEMENTATION **/

	// Create an constructor to extends the EventEmitter functionallity
	// Use this as an internal Object that will be return in a factory method
	function QuestHandler() {
		//l("Init the object");
		this.questions = [];
	}
	util.inherits(QuestHandler, events.EventEmitter);

	// I have to export this object to get the tests working when
	// checking that the create-method is return a correct instance
	exports.QuestHandler = QuestHandler;



	/** Methods **/

	/*
		This method is used to start fetching data
		from the redis-server.
		emits the event "onData" when the data is ready
	*/
	QuestHandler.prototype.fetchData = function() {
		var currentObject = this;
		redisShuffler.getData(function(data){

			// this should be tested
			/*if(!data) {
				throw new Error("No data..yet");
			}*/

			currentObject.questions = data;
			currentObject.emit("onData");
		});
	};

	/*
		Return the number off questions that are ready
		return 0 if no questions are read
	*/
	QuestHandler.prototype.getNumberOfQuestions = function() {
		return this.questions.length;
	};

	/*
		get a specific question. The number parameter is
		the number, not the index (hide the implementation)
	*/
	QuestHandler.prototype.getQuestion = function(number) {
		l("Get question called with number: " +number);
		var len = this.questions.length;

		// TODO refactor
		if(len === 0) {
			throw new Error("Don´t have any data yet");
		}
		if((number - 1) >= len) {
			throw new Error("Did call a question that doesn´t exists");
		}
		return JSON.parse(JSON.stringify(this.questions[number-1]));
	};


	// exports the modeule
	exports.createQuestHandler = function() {
		// Should create the internal Object and return it
		var rqh = new QuestHandler();
		return rqh;
	};
})();
