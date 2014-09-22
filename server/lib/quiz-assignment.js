/*
 * quiz_assignment
 * user/repo
 *
 * Copyright (c) 2014 John Häggerud
 * Licensed under the CC0 license.
 */

'use strict';

// Start redis server for holding data in memory
var redis = require("redis");
var client = redis.createClient(6379, "127.0.0.1");

client.on("error", function() {
	throw "Could not connect to my Redis";
});

// Load file reader module (stupid but i'm on a training field)
var fr = require("./fileReader.js");


exports.getData = function(callback) {
	console.log("Getting data...");
	// check if data is in cache otherwise reload the data
	var data = client.get("data", function(err, reply) {
		if(reply) {
			console.log("Got data from redis");
			callback(reply);
		}
		else {
			data = fr.readFile("data/data.json");
			if(!data) {
				console.log("no data from file...");
				callback(false);
			}
			console.log("Set data into redis...");
			client.set("data", data, redis.print);
			callback(data);
		}
	});
};
