/*
 * 	redisShuffler - This is a redis specific adapter for
 *	for handling data
 * 	
 *	The adapter should have an getData method who takes an callback
 *	This will be called when the data is OK or return false if somethiong goes wrong
 *
 * 	Copyright (c) 2014 John Häggerud
 * 	Licensed under the CC0 license.
 */

'use strict';

// Start redis server for holding data in memory
var redis = require("redis");
var client = redis.createClient(6379, "127.0.0.1");
var HNAME = "questions";
var res = [];

//var util = require('util');

client.on("error", function() {
	throw "Could not connect to my Redis";
});

// Load file reader module (stupid but i'm on a training field)
var fr = require("./fileReader.js");


exports.getData = function(callback) {
	// check if data is in cache otherwise reload the data
	// using hashes

	client.get(HNAME, function (err, replies) {
		if(replies) {
			
			JSON.parse(replies).questions.forEach(function(el) {
				res.push(el);
			});
			//setInterval(function(){callback(res);}, 2300);
			callback(res);
				
		}
		else {
			console.log("ERR " +err);
			var data = fr.readFile("data/data.json");
			if(!data) {
				console.log("no data from file...");
				callback(false);
			}
			console.log("Set data into redis..." +data);
			//console.log(data);
			// handle it as JSON and itterate through the array
			res = JSON.parse(data).questions;
				// save all data as hashes {"question", 0, object with all the data}
				// Should it goes in a irratable stucture or is this way with a 0 maybe easier?
			client.set(HNAME, data);
						// return an array with questions
			callback(res);
		}
        
    });


	/*var data = client.hgetall(HNAME, function(err, reply) {
		if(reply) {
			console.log("Got data from redis");
			console.log(typeof reply); console.log(reply);
			//callback(reply);
		}
		else {
			d
		}
	});*/
};

