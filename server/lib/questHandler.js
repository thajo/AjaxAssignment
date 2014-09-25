/*
 * 
 * Licensed under the CC0 license.
 */

'use strict';
//var redisShuffler = require('./redisShuffler.js');
//var questions;
var events = require('events');
var util = require('util');

exports.debug_mode = false;
var l =  function(message) {

	if (!exports.debug_mode) { return; }
    console.log(message);
};

// create an constructor to extends the EventEmitter functionallity
// use this as an internal Object that will be return in a factory method
function QuestHandler() {
	this.questions = [];
}
util.inherits(QuestHandler, events.EventEmitter);
exports.QuestHandler = QuestHandler;

QuestHandler.prototype.dataFetch = function(res) {
	l("Im called att datafetch with res: " +res);
	this.emit("onData", "this is data");
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


