/*
 * 
 * Licensed under the CC0 license.
 */

'use strict';
//var redisShuffler = require('./redisShuffler.js');
//var questions;
var events = require('events');
//var emitter = new EventEmitter();
var utils = require('utils');

// create an constructor to extends the EventEmitter functionallity
// use this as an internal Object that will be return in a factory method
function QuestHandler() {
	this.questions = [];

}
utils.inherits(QuestHandler, events.EventEmitter);

QuestHandler.prototype.dataFetch = function(res) {
	console.log("Im called att datafetch with res: " +res);
};

/**

	Should get all the questions set to a memory variable
	Should emmit an Event if successful
	Should emmit an Event if error
	
**/
exports.createQuestHandler = function() {
	// Should create the internal Object and return it
	var rqh = new QuestHandler();

	return rqh;
};



/**
	Should supply the right data for the right index
	Should throw an error if the data is not ready
**/
/*exports.getQuestion = function(index) {
	// Should controll if we have questions, if not read them
	if(questions === undefined) {
		emitter.emmit("error");
		return;
	}
	return questions[index];
};*/