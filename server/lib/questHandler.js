/*
 * 
 * Licensed under the CC0 license.
 */

'use strict';
var redisShuffler = require('./redisShuffler.js');
//var questions;
var events = require('events');
var util = require('util');

exports.debug_mode = false;
function l(message) {

	if (!exports.debug_mode) { return; }
    console.log(message);
}

// create an constructor to extends the EventEmitter functionallity
// use this as an internal Object that will be return in a factory method
function QuestHandler() {
	l("Init the object");
	this.questions = [];
}
util.inherits(QuestHandler, events.EventEmitter);
exports.QuestHandler = QuestHandler;

QuestHandler.prototype.dataFetch = function() {
	var that = this;
	redisShuffler.getData(function(data){
		
		if(!data) {
			throw new Error("Don´t have any data yet");
		}
		
		that.questions = data;
		that.emit("onData");
	});
};

QuestHandler.prototype.getNumberOfQuestions = function() {
	return this.questions.length;
};

QuestHandler.prototype.getQuestion = function(number) {
	//l(number);
	var len = this.questions.length;
	if(len === 0) {
		throw new Error("Don´t have any data yet");
	}
	if((number - 1) >= len) {
		throw new Error("Did call a question that doesn´t exists");
	}
	return JSON.parse(JSON.stringify(this.questions[number-1]));
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


