/*
 * quiz_assignment
 * user/repo
 *
 * Copyright (c) 2014 John Häggerud
 * Licensed under the CC0 license.
 */

'use strict';

var redis = require("redis");
var client = redis.createClient(6379, "127.0.0.1");
var fr = require("./fileReader.js");


exports.getData = function() {
	console.log("Getting data");
	// check if data is in cache otherwise reload the data
	var data = fr.readFile("data/data.json");
	if(data) {
		console.log("redis...");
		client.set("data", data, redis.print);
		return true;
	}
	return false;
};
